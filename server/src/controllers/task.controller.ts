import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { db } from '../utils/db';
import { ApiResponse } from '../utils/ApiResponse';
import asyncHandler from '../utils/AsyncHandler';
import { TaskStatus } from '../utils/types';

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

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const { taskId } = req.query;

    if (!taskId) {
        throw new ApiError(
            400,
            'DELETE TASK : TASK CONTROLLER : taskId is required'
        );
    }

    const { id } = await db.task.delete({
        where: {
            id: String(taskId),
        },
    });

    console.log('DELETED ID: ', id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Successfully deleted post'));
});

export const toggleTaskStatus = async (req: Request, res: Response) => {
    const { taskId, status } = req.query;

    [taskId, status].some((each) => {
        if (!each) {
            throw new ApiError(
                400,
                'TOGGLE TASK STATUS : TASK CONTROLLER : All fields are required'
            );
        }
    });

    const statusValue = status as TaskStatus;

    const toggledTask = await db.task.update({
        where: {
            id: String(taskId),
        },
        data: {
            status: statusValue,
        },
    });

    if (!toggledTask) {
        return res
            .status(500)
            .json(new ApiResponse(500, {}, 'Failed to toggle the task'));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, toggledTask, 'Successfully toggled task'));
};
