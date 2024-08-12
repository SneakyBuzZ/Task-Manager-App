import { Skeleton } from '@/components/ui/skeleton';

const TaskSkeleton = () => {
  return (
    <Skeleton className="w-1/3 lg:w-full h-full lg:h-1/3 bg-task-white rounded-md px-3 md:px-5 py-2 lg:py-4 flex flex-col justify-start gap-2">
      <div className="flex items-center justify-end md:justify-between  font-task-inter">
        <Skeleton className="h-5 w-1/3 bg-neutral-300" />
        <Skeleton className="h-4 w-1/6 bg-neutral-300" />
      </div>
      <div className="flex flex-col justify-between h-[70%] my-2">
        <div className="flex-col gap-4">
          <Skeleton className="h-5 w-1/3 my-1 bg-neutral-300" />
          <Skeleton className="h-12 w-w-full bg-neutral-300" />
        </div>
      </div>
    </Skeleton>
  );
};

export default TaskSkeleton;
