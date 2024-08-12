import { useMutation } from '@tanstack/react-query';
import { changeTaskStatusApi, createTaskApi, getAllTaskApi } from '../api';
import { createTaskApiProps, taskStatus } from '../types';

export const useCreateTaskApi = () => {
  return useMutation({
    mutationFn: ({ title, content, deadline }: createTaskApiProps) =>
      createTaskApi({ title, content, deadline }),
  });
};
export const useGetAllTaskApi = () => {
  return useMutation({
    mutationFn: () => getAllTaskApi(),
  });
};

export const useChangeTaskStatusApi = () => {
  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: taskStatus }) =>
      changeTaskStatusApi({ taskId, status }),
  });
};
