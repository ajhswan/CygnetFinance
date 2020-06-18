import express from  'express';
import path from 'path'
// import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';



export function routes(app: express.Application) {
    
    app.get('/', (request, response) => response.send('success'));
    app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html')));
    app.post('/users/register', registerUser)
    app.post('/users/login', loginUser)
}

module.exports = routes;