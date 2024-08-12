import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Ellipsis } from 'lucide-react';

type taskCardPropType = {
  badgeLabel?: string;
  badgeClass?: string;
  taskTitle?: string;
  taskDescription?: string;
  taskDeadline?: Date | string;
};

const TaskCard = ({
  badgeLabel,
  badgeClass,
  taskTitle,
  taskDescription,
  taskDeadline,
}: taskCardPropType) => {
  return (
    <>
      <div className="flex items-center justify-end md:justify-between  font-task-inter">
        <Badge className={` rounded-md hidden md:block ` + ` ` + badgeClass}>
          {badgeLabel}
        </Badge>
        <Ellipsis className="size-5" />
      </div>
      <div className="flex flex-col justify-between h-[70%]">
        <div className="flex-col gap-2">
          <h1 className="text-sm font-semibold lg:text-lg">{taskTitle}</h1>
          <span className="text-[10px] lg:text-[11px] xl:text-[13px]">
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
