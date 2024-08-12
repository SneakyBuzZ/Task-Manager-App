export type createTaskApiProps = {
  title?: string;
  description?: string;
  deadline?: Date;
};

export type individualTaskType = {
  title: string;
  content: string;
  deadline: Date;
  priority: string;
  id: string;
  status: taskStatus;
};

export type taskStatus = 'ToDo' | 'OnProgress' | 'Done';
