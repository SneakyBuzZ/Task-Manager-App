"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
var task_controller_1 = require("../controllers/task.controller");
var express_1 = require("express");
exports.taskRouter = (0, express_1.Router)();
// ALL THE API ROUTES THAT WERE MENTIONED
exports.taskRouter.route('/tasks').get(task_controller_1.getAllTasks);
exports.taskRouter.route('/tasks/:id').get(task_controller_1.getTaskById);
exports.taskRouter.route('/tasks').post(task_controller_1.createTask);
exports.taskRouter.route('/tasks/:id').put(task_controller_1.updateTask);
exports.taskRouter.route('/tasks/:id').delete(task_controller_1.deleteTaskById);
exports.taskRouter.route('/streaming').get(task_controller_1.streamingApi);
// BUT TO ME THE APP ACCORDING TO THE DESCRIPTION , IT REQUIRES ADDIONAL APIS
exports.taskRouter.route('/tasks').put(task_controller_1.changeTaskStatus);
