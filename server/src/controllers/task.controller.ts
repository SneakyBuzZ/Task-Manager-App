import { Request, Response } from 'express';
import { asyncHandler, ApiResponse, db, ApiError } from '@src/utils';
import { TaskStatus } from '@src/utils/types';
import axios from 'axios';

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
    let { limit, skip } = req.query;

    if (!limit || !skip) {
        throw new ApiError(
            400,
            'GET ALL TASKS : TASK CONTROLLER : limit and skip are required'
        );
    }

    const allTasks = await db.task.findMany({
        take: Number(limit),
        skip: Number(skip),
        orderBy: {
            deadline: 'asc',
        },
    });

    if (!allTasks) {
        return res.status(404).json(new ApiResponse(404, {}, 'No tasks found'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allTasks, 'Successfully fetched tasks'));
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            400,
            'GET TASK BY ID: TASK CONTROLLER : taskId is required'
        );
    }

    const task = await db.task.findUnique({
        where: {
            id: String(id),
        },
    });

    if (!task) {
        return res.status(404).json(new ApiResponse(404, {}, 'Task not found'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, task, 'Successfully fetched task'));
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, deadline } = req.body;

    [title, content, deadline].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'CREATE TASK: TASK CONTROLLER : All fields are required'
            );
        }
    });

    const newTask = await db.task.create({
        data: {
            title: String(title),
            content: String(content),
            deadline,
        },
    });

    if (!newTask) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to create post'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, newTask, 'Successfuly created post'));
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, content, status, deadline } = req.body;
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            400,
            'UPDATE TASK : TASK CONTROLLER : taskId is required'
        );
    }

    [title, content, deadline, status].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'UPDATE TASK: TASK CONTROLLER : All fields are required'
            );
        }
    });

    const updatedTask = await db.task.update({
        where: {
            id: String(id),
        },
        data: {
            title: String(title),
            content: String(content),
            deadline,
            status: status as TaskStatus,
        },
    });

    if (!updatedTask) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to update the task'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, 'Successfully updated task'));
});

export const deleteTaskById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            throw new ApiError(
                400,
                'DELETE TASK : TASK CONTROLLER : taskId is required'
            );
        }

        const { id: deletedId } = await db.task.delete({
            where: {
                id: String(id),
            },
        });

        console.log('DELETED ID: ', deletedId);

        return res
            .status(200)
            .json(new ApiResponse(200, {}, 'Successfully deleted post'));
    }
);

export const streamingApi = asyncHandler(
    async (req: Request, res: Response) => {
        const {} = req;

        const { data } = await axios.get(
            `${String(process.env.YOUTUBE_STREAMING_API)}+${String(process.env.YOUTUBE_API_KEY)}`
        );

        if (!data) {
            return res
                .status(404)
                .json(new ApiResponse(404, {}, 'No data found'));
        }

        return res
            .status(200)
            .json(new ApiResponse(200, data, 'Successfully fetched data'));
    }
);
