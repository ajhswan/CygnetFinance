import express from  'express';
const RemainingController = require('./Controllers/RemainingController');

function routes(app: express.Application) {
    app.get('/', (request, response) => response.send('success'));
    app.get('*', RemainingController.setRemainingRoutes);
}

module.exports = routes;