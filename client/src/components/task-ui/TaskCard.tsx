import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import TaskCardMenu from './TaskCardMenu';

type taskCardPropType = {
  badgeLabel?: string;
  badgeClass?: string;
  taskTitle?: string;
  taskDescription?: string;
  taskDeadline?: Date | string;
  taskId: string;
  taskStatus: 'OnProgress' | 'Done' | 'ToDo';
};

const TaskCard = ({
  badgeLabel,
  badgeClass,
  taskTitle,
  taskDescription,
  taskDeadline,
  taskId,
  taskStatus,
}: taskCardPropType) => {
  return (
    <>
      <div className="flex items-center justify-end md:justify-between  font-task-inter">
        <Badge
          className={
            ` rounded-md hidden md:block bg-task-badge-` +
            badgeClass +
            ` text-task-badge-text-` +
            badgeClass
          }
        >
          {badgeLabel}
        </Badge>
        <TaskCardMenu
          taskId={taskId}
          status={taskStatus}
          title={taskTitle!}
          description={taskDescription!}
          deadline={taskDeadline!}
        />
      </div>
      <div className="flex flex-col justify-between h-[70%]">
        <div className="flex-col gap-2">
          <h1 className="text-sm font-semibold lg:text-lg">{taskTitle}</h1>
          <span className="text-[10px] lg:text-[11px] xl:text-[13px] text-task-text-gray">
            {taskDescription}
          </span>
        </div>
        <div className="flex items-center flex-wrap font-task-poppins gap-1">
          <span className="font-bold text-xs text-task-border-gray">
            {taskDeadline ? format(taskDeadline, 'PPP') : null}
          </span>
          <span className="font-semibold text-xs text-task-border-gray"></span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
