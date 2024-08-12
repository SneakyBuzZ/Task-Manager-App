import { useMutation } from '@tanstack/react-query';
import { createTaskApi, getAllTaskApi } from '../api';
import { createTaskApiProps } from '../types';

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
