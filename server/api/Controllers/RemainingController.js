"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
function setRemainingRoutes(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
}
module.exports.setRemainingRoutes = setRemainingRoutes;
