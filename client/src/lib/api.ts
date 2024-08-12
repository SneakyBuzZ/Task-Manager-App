import axios from 'axios';
import { createTaskApiProps } from './types';
import { delay } from './utils';

export const createTaskApi = async ({
  title,
  content,
  deadline,
}: createTaskApiProps) => {
  await axios.post('http://localhost:8000/taskmanager/api/v1/tasks', {
    title: title,
    content: content,
    deadline: deadline,
  });
};

export const getAllTaskApi = async () => {
  const { data } = await axios.get(
    'http://localhost:8000/taskmanager/api/v1/tasks'
  );

  await delay(500);

  return data.data;
};
