"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
//############## APP ##################
const app = (0, express_1.default)();
const PORT = process.env.PORT;
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
const task_route_1 = require("./routes/task.route");
app.use('/taskmanager/api/v1', task_route_1.taskRouter);
app.get('/', (req, res) => {
    res.send('WORKING');
});
app.listen(PORT, () => {
    console.log('App is listening on port: ', PORT);
});
