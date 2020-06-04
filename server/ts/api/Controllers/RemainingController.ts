import express from 'express';
const path = require('path');

export function setRemainingRoutes(request: express.Request, response: express.Response) : void {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
}

module.exports.setRemainingRoutes = setRemainingRoutes;
