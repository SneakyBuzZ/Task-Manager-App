import {
    changeTaskStatus,
    createTask,
    deleteTaskById,
    getAllTasks,
    getTaskById,
    streamingApi,
    updateTask,
} from '../controllers/task.controller';
import { Router } from 'express';

export const taskRouter: Router = Router();

// ALL THE API ROUTES THAT WERE MENTIONED

taskRouter.route('/tasks').get(getAllTasks);
taskRouter.route('/tasks/:id').get(getTaskById);
taskRouter.route('/tasks').post(createTask);
taskRouter.route('/tasks/:id').put(updateTask);
taskRouter.route('/tasks/:id').delete(deleteTaskById);
taskRouter.route('/streaming').get(streamingApi);

// BUT TO ME THE APP ACCORDING TO THE DESCRIPTION , IT REQUIRES ADDIONAL APIS
taskRouter.route('/tasks').put(changeTaskStatus);
