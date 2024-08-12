import axios from 'axios';
import { createTaskApiProps } from './types';
import { delay } from './utils';

const server = import.meta.env.VITE_SERVER_URL;

export const createTaskApi = async ({
  title,
  content,
  deadline,
}: createTaskApiProps) => {
  await axios.post(`${server}/tasks`, {
    title: title,
    content: content,
    deadline: deadline,
  });
};

export const getAllTaskApi = async () => {
  const { data } = await axios.get(`${server}/tasks`);

  await delay(500);

  return data.data;
};
