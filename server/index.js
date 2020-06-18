"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cygnetFinance';
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });
}
else {
    const app = express_1.default();
    const routes = require('./api/routes');
    const bodyParser = require('body-parser');
    const DbService = require('./api/Services/DbService');
    const passport = require('passport');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express_1.default.static(path.resolve(__dirname, '../react-ui/build')));
    app.get('/api', function (request, response) {
        response.set('Content-Type', 'application/json');
        response.send('{"message": "Hello from the server!"}');
    });
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
    app.use(passport.initialize());
    require('./config/passport')(passport);
    DbService.DbConnect(dbURI);
    routes(app);
    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
    });
    module.exports = app;
}
