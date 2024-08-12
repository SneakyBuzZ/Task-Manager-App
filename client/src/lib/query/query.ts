import { useMutation } from '@tanstack/react-query';
import {
  changeTaskStatusApi,
  createTaskApi,
  deleteTaskApi,
  getAllTaskApi,
  updateTaskApi,
} from '@/lib/api';
import { createTaskApiProps, taskStatus } from '@/lib/types';

export const useCreateTaskApi = () => {
  return useMutation({
    mutationFn: ({ title, description, deadline }: createTaskApiProps) =>
      createTaskApi({ title, description, deadline }),
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

export const useUpdateTaskApi = () => {
  return useMutation({
    mutationFn: ({
      taskId,
      title,
      content,
      deadline,
    }: {
      taskId: string;
      title: string;
      content: string;
      deadline: Date;
    }) =>
      updateTaskApi({
        taskId,
        title,
        content,
        deadline,
      }),
  });
};

export const useDeleteTaskApi = () => {
  return useMutation({
    mutationFn: ({ taskId }: { taskId: string }) => deleteTaskApi({ taskId }),
  });
};
