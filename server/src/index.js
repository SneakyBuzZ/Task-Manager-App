"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
require("module-alias/register");
dotenv_1.default.config();
//############## APP ##################
var app = (0, express_1.default)();
var PORT = process.env.PORT;
//################ UTILITIES #############
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.json({ limit: '16kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '16kb' }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
//############## ROUTES #####################
var task_route_1 = require("../src/routes/task.route");
app.use('/taskmanager/api/v1', task_route_1.taskRouter);
app.get('/', function (req, res) {
    res.send('WORKING');
});
app.listen(PORT, function () {
    console.log('App is listening on port: ', PORT);
});
