import express from  'express';
import { setRemainingRoutes } from './Controllers/RemainingController';
import { registerUser, loginUser } from './Controllers/UserController';


function routes(app: express.Application) {
    const router = express.Router();

    router.get('/', (request, response) => response.send('success'));
    router.get('*', setRemainingRoutes);
    router.post('/register', registerUser)
    router.post('/login', loginUser)

}

module.exports = routes;