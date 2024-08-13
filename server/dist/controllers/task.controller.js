"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTaskStatus = exports.streamingApi = exports.deleteTaskById = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const utils_1 = require("../utils");
const axios_1 = __importDefault(require("axios"));
// ALL THE CONTROLLERS THAT WERE MENTIONED IN THE ASSESSMENT DOCUMENT
exports.getAllTasks = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limit = 3, skip = 0 } = req.query;
    const allDoneTasks = yield utils_1.db.task.findMany({
        where: {
            status: 'Done',
        },
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
            deadline: 'asc',
        },
        select: {
            title: true,
            content: true,
            deadline: true,
            priority: true,
            id: true,
            status: true,
        },
    });
    const allOnProgressTasks = yield utils_1.db.task.findMany({
        where: {
            status: 'OnProgress',
        },
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
            deadline: 'asc',
        },
        select: {
            title: true,
            content: true,
            deadline: true,
            priority: true,
            id: true,
            status: true,
        },
    });
    const allToDoTasks = yield utils_1.db.task.findMany({
        where: {
            status: 'ToDo',
        },
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
            deadline: 'asc',
        },
        select: {
            title: true,
            content: true,
            deadline: true,
            priority: true,
            id: true,
            status: true,
        },
    });
    const allTasks = yield utils_1.db.task.findMany({
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
            deadline: 'asc',
        },
        select: {
            title: true,
            content: true,
            deadline: true,
            priority: true,
            id: true,
        },
    });
    if (!allDoneTasks || !allOnProgressTasks || !allToDoTasks) {
        return res.status(404).json(new utils_1.ApiResponse(404, {}, 'No tasks found'));
    }
    return res.status(200).json(new utils_1.ApiResponse(200, {
        doneTasks: allDoneTasks,
        onProgressTasks: allOnProgressTasks,
        toDoTasks: allToDoTasks,
        allTasks: allTasks,
    }, 'Successfully fetched tasks'));
}));
exports.getTaskById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new utils_1.ApiError(400, 'GET TASK BY ID: TASK CONTROLLER : taskId is required');
    }
    const task = yield utils_1.db.task.findUnique({
        where: {
            id: String(id),
        },
    });
    if (!task) {
        return res.status(404).json(new utils_1.ApiResponse(404, {}, 'Task not found'));
    }
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, task, 'Successfully fetched task'));
}));
exports.createTask = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, deadline } = req.body;
    if ([title, content, deadline].some((eachItem) => (eachItem === null || eachItem === void 0 ? void 0 : eachItem.trim()) === '')) {
        throw new utils_1.ApiError(400, 'All fields are required');
    }
    const newTask = yield utils_1.db.task.create({
        data: {
            title: String(title),
            content: String(content),
            deadline,
        },
    });
    if (!newTask) {
        return res
            .status(500)
            .json(new utils_1.ApiResponse(500, {}, 'Failed to create post'));
    }
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, newTask, 'Successfuly created post'));
}));
exports.updateTask = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, deadline } = req.body;
    const { id } = req.params;
    if (!id) {
        throw new utils_1.ApiError(400, 'UPDATE TASK : TASK CONTROLLER : taskId is required');
    }
    if ([title, content, deadline].some((eachItem) => (eachItem === null || eachItem === void 0 ? void 0 : eachItem.trim()) === '')) {
        throw new utils_1.ApiError(400, 'All fields are required');
    }
    const updatedTask = yield utils_1.db.task.update({
        where: {
            id: String(id),
        },
        data: {
            title: String(title),
            content: String(content),
            deadline,
        },
    });
    if (!updatedTask) {
        return res
            .status(500)
            .json(new utils_1.ApiResponse(500, {}, 'Failed to update the task'));
    }
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, updatedTask, 'Successfully updated task'));
}));
exports.deleteTaskById = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new utils_1.ApiError(400, 'DELETE TASK : TASK CONTROLLER : taskId is required');
    }
    const { id: deletedId } = yield utils_1.db.task.delete({
        where: {
            id: String(id),
        },
    });
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, {}, 'Successfully deleted post'));
}));
exports.streamingApi = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {} = req;
    const { data } = yield axios_1.default.get(`${String(process.env.YOUTUBE_STREAMING_API)}+${String(process.env.YOUTUBE_API_KEY)}`);
    if (!data) {
        return res
            .status(404)
            .json(new utils_1.ApiResponse(404, {}, 'No data found'));
    }
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, data, 'Successfully fetched data'));
}));
// ADDITIONAL CONTROLLERS
exports.changeTaskStatus = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId, status } = req.body;
    if (!taskId) {
        throw new utils_1.ApiError(400, 'START TASK : TASK CONTROLLER : taskId is required');
    }
    const updatedTask = yield utils_1.db.task.update({
        where: {
            id: String(taskId),
        },
        data: {
            status: status,
        },
    });
    if (!exports.updateTask) {
        return res
            .status(500)
            .json(new utils_1.ApiResponse(500, {}, 'Failed to update task status'));
    }
    return res
        .status(200)
        .json(new utils_1.ApiResponse(200, updatedTask, 'Successfully updated task status'));
}));
