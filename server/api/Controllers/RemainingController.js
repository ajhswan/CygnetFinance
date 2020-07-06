"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRemainingRoutes = void 0;
const path = require('path');
function setRemainingRoutes(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
}
exports.setRemainingRoutes = setRemainingRoutes;
module.exports.setRemainingRoutes = setRemainingRoutes;
