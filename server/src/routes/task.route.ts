import {
    createTask,
    deleteTaskById,
    getAllTasks,
    getTaskById,
    streamingApi,
    updateTask,
} from '../controllers/task.controller';
import { Router } from 'express';

export const taskRouter: Router = Router();

taskRouter.route('/tasks').get(getAllTasks);
taskRouter.route('/tasks/:id').get(getTaskById);
taskRouter.route('/tasks').post(createTask);
taskRouter.route('/tasks/:id').put(updateTask);
taskRouter.route('/tasks/:id').delete(deleteTaskById);
taskRouter.route('/streaming').get(streamingApi);
