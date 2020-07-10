
import express from 'express';
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cygnetFinance';
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker: any, code: any, signal: any) : void => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {
    const app = express();
    const routes = require('./api/routes/');
    const bodyParser = require('body-parser');
    const DbService = require('./api/Services/DbService');
    const passport = require('passport');
    const cors = require('cors');
    
    const plaid = require('./api/routes/plaid');
    const users = require('./api/routes/users');

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    DbService.DbConnect(dbURI);
    app.use(passport.initialize());
    require('./config/passport')(passport);

    //routes
    app.use('/api/users', users);
    app.use('/api/plaid', plaid);

    //serve static file for produnction build - I think it is needed but not sure leaving it here for now, will test out if it works without
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    //test route to test if api is up and running - may remove later
    app.get('/api', function (request: express.Request, response: express.Response) {
        response.set('Content-Type', 'application/json');
        response.send('{"message": "Hello from the server!"}');
    

    
    })
    // app.get('*', function (request: express.Request, response: express.Response) {
    //     response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    // })

    app.use((request, response) => {
        response.status(404)
        .send('Route does not exist')
    })

    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });

    module.exports = app
}

