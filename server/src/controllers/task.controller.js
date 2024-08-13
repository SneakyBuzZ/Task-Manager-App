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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTaskStatus = exports.streamingApi = exports.deleteTaskById = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
var utils_1 = require("../utils");
var axios_1 = require("axios");
// ALL THE CONTROLLERS THAT WERE MENTIONED IN THE ASSESSMENT DOCUMENT
exports.getAllTasks = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, limit, _c, skip, allDoneTasks, allOnProgressTasks, allToDoTasks, allTasks;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a.limit, limit = _b === void 0 ? 3 : _b, _c = _a.skip, skip = _c === void 0 ? 0 : _c;
                return [4 /*yield*/, utils_1.db.task.findMany({
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
                    })];
            case 1:
                allDoneTasks = _d.sent();
                return [4 /*yield*/, utils_1.db.task.findMany({
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
                    })];
            case 2:
                allOnProgressTasks = _d.sent();
                return [4 /*yield*/, utils_1.db.task.findMany({
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
                    })];
            case 3:
                allToDoTasks = _d.sent();
                return [4 /*yield*/, utils_1.db.task.findMany({
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
                    })];
            case 4:
                allTasks = _d.sent();
                if (!allDoneTasks || !allOnProgressTasks || !allToDoTasks) {
                    return [2 /*return*/, res.status(404).json(new utils_1.ApiResponse(404, {}, 'No tasks found'))];
                }
                return [2 /*return*/, res.status(200).json(new utils_1.ApiResponse(200, {
                        doneTasks: allDoneTasks,
                        onProgressTasks: allOnProgressTasks,
                        toDoTasks: allToDoTasks,
                        allTasks: allTasks,
                    }, 'Successfully fetched tasks'))];
        }
    });
}); });
exports.getTaskById = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, task;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    throw new utils_1.ApiError(400, 'GET TASK BY ID: TASK CONTROLLER : taskId is required');
                }
                return [4 /*yield*/, utils_1.db.task.findUnique({
                        where: {
                            id: String(id),
                        },
                    })];
            case 1:
                task = _a.sent();
                if (!task) {
                    return [2 /*return*/, res.status(404).json(new utils_1.ApiResponse(404, {}, 'Task not found'))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, task, 'Successfully fetched task'))];
        }
    });
}); });
exports.createTask = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, deadline, newTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content, deadline = _a.deadline;
                if ([title, content, deadline].some(function (eachItem) { return (eachItem === null || eachItem === void 0 ? void 0 : eachItem.trim()) === ''; })) {
                    throw new utils_1.ApiError(400, 'All fields are required');
                }
                return [4 /*yield*/, utils_1.db.task.create({
                        data: {
                            title: String(title),
                            content: String(content),
                            deadline: deadline,
                        },
                    })];
            case 1:
                newTask = _b.sent();
                if (!newTask) {
                    return [2 /*return*/, res
                            .status(500)
                            .json(new utils_1.ApiResponse(500, {}, 'Failed to create post'))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, newTask, 'Successfuly created post'))];
        }
    });
}); });
exports.updateTask = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, deadline, id, updatedTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content, deadline = _a.deadline;
                id = req.params.id;
                if (!id) {
                    throw new utils_1.ApiError(400, 'UPDATE TASK : TASK CONTROLLER : taskId is required');
                }
                if ([title, content, deadline].some(function (eachItem) { return (eachItem === null || eachItem === void 0 ? void 0 : eachItem.trim()) === ''; })) {
                    throw new utils_1.ApiError(400, 'All fields are required');
                }
                return [4 /*yield*/, utils_1.db.task.update({
                        where: {
                            id: String(id),
                        },
                        data: {
                            title: String(title),
                            content: String(content),
                            deadline: deadline,
                        },
                    })];
            case 1:
                updatedTask = _b.sent();
                if (!updatedTask) {
                    return [2 /*return*/, res
                            .status(500)
                            .json(new utils_1.ApiResponse(500, {}, 'Failed to update the task'))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, updatedTask, 'Successfully updated task'))];
        }
    });
}); });
exports.deleteTaskById = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    throw new utils_1.ApiError(400, 'DELETE TASK : TASK CONTROLLER : taskId is required');
                }
                return [4 /*yield*/, utils_1.db.task.delete({
                        where: {
                            id: String(id),
                        },
                    })];
            case 1:
                deletedId = (_a.sent()).id;
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, {}, 'Successfully deleted post'))];
        }
    });
}); });
exports.streamingApi = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req;
                return [4 /*yield*/, axios_1.default.get("".concat(String(process.env.YOUTUBE_STREAMING_API), "+").concat(String(process.env.YOUTUBE_API_KEY)))];
            case 1:
                data = (_b.sent()).data;
                if (!data) {
                    return [2 /*return*/, res
                            .status(404)
                            .json(new utils_1.ApiResponse(404, {}, 'No data found'))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, data, 'Successfully fetched data'))];
        }
    });
}); });
// ADDITIONAL CONTROLLERS
exports.changeTaskStatus = (0, utils_1.asyncHandler)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, taskId, status, updatedTask;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, taskId = _a.taskId, status = _a.status;
                if (!taskId) {
                    throw new utils_1.ApiError(400, 'START TASK : TASK CONTROLLER : taskId is required');
                }
                return [4 /*yield*/, utils_1.db.task.update({
                        where: {
                            id: String(taskId),
                        },
                        data: {
                            status: status,
                        },
                    })];
            case 1:
                updatedTask = _b.sent();
                if (!exports.updateTask) {
                    return [2 /*return*/, res
                            .status(500)
                            .json(new utils_1.ApiResponse(500, {}, 'Failed to update task status'))];
                }
                return [2 /*return*/, res
                        .status(200)
                        .json(new utils_1.ApiResponse(200, updatedTask, 'Successfully updated task status'))];
        }
    });
}); });
