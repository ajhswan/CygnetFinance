const RemainingController = require('./Controllers/RemainingController');
function routes(app) {
    app.get('/', (request, response) => response.send('success'));
    app.get('*', RemainingController.setRemainingRoutes);
}
module.exports = routes;
