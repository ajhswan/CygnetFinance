"use strict";
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
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
    const app = express();
    const routes = require('./api/routes');
    const bodyParser = require('body-parser');
    const DbService = require('./api/Services/DbService');
    app.use(bodyParser.json());
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    DbService.DbConnect();
    routes(app);
    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
    });
}
