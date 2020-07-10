import express from 'express';
import { registerUser, loginUser } from '../Controllers/UserController';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);

// testing specific route delete once working
router.get('/test', function (request, response) {
    response.set('Content-Type', 'application/json');
    response.json('testing tsc workes')
});

module.exports = router;