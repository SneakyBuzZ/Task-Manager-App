import axios from 'axios';
import { createTaskApiProps, taskStatus } from './types';
import { delay } from './utils';

const server = import.meta.env.VITE_SERVER_URL;

export const createTaskApi = async ({
  title,
  description,
  deadline,
}: createTaskApiProps) => {
  await axios.post(`${server}/tasks`, {
    title: title,
    content: description,
    deadline: deadline,
  });
};

export const getAllTaskApi = async () => {
  const { data } = await axios.get(`${server}/tasks`);

  await delay(500);

  return data.data;
};

export const changeTaskStatusApi = async ({
  taskId,
  status,
}: {
  taskId: string;
  status: taskStatus;
}) => {
  await axios.put(`${server}/tasks`, {
    taskId: taskId,
    status: status,
  });
};

export const updateTaskApi = async ({
  taskId,
  title,
  content,
  deadline,
}: {
  taskId: string;
  title: string;
  content: string;
  deadline: Date; // Date object
}) => {
  await axios.put(`${server}/tasks/${taskId}`, {
    title,
    content,
    deadline,
  });
};

export const deleteTaskApi = async ({ taskId }: { taskId: string }) => {
  await axios.delete(`${server}/tasks/${taskId}`);
};
