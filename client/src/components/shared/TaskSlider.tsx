import SliderBadge from '@/components/task-ui/SliderBadge';
import TaskCard from '@/components/task-ui/TaskCard';
import { useEffect, useState } from 'react';
import { useGetAllTaskApi } from '@/lib/query/query';
import { individualTaskType } from '@/lib/types';
import TaskSkeleton from '@/components/task-ui/TaskSkeleton';

const TaskSlider = () => {
  const [onProgressTasks, setOnProgressTasks] = useState<individualTaskType[]>(
    []
  );
  const [doneTasks, setDoneTasks] = useState<individualTaskType[]>([]);
  const [toDoTasks, setToDoTasks] = useState<individualTaskType[]>([]);
  const { mutateAsync: getAllTaskApi, isPending } = useGetAllTaskApi();
  useEffect(() => {
    getAllTaskApi()
      .then((response) => {
        setToDoTasks(response.toDoTasks);
        setDoneTasks(response.doneTasks);
        setOnProgressTasks(response.onProgressTasks);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, []);
  return (
    <section className="h-[92%] lg:h-full flex flex-col lg:flex-row justify-between w-full gap-4 md:pl-0 lg:pl-8">
      {/* THIS IS SLIDER 1 */}
      <div className="h-1/3 lg:h-[97%] w-full lg:w-[30%] shadow-task-shadow bg-task-gray rounded-md shadow-md flex flex-col items-start lg:items-center p-1 px-2 pb-2 lg:px-6 lg:p-3">
        <article className="flex flex-col w-13 lg:w-full">
          <SliderBadge
            className="lg:justify-center"
            label="To Do"
            listColor="bg-task-toDo"
            number="3"
          />
          <div className="bg-task-toDo h-[1.5px] lg:h-[3px] rounded-full w-full hidden lg:block" />
        </article>
        <aside className="flex flex-row lg:flex-col w-full h-full gap-2 lg:gap-5 lg:py-4">
          {toDoTasks.map((each) => {
            return (
              <li
                key={each.title}
                className="w-1/3 lg:w-full h-full lg:h-1/3 bg-task-white rounded-md px-3 md:px-5 py-2 lg:py-4 flex flex-col justify-start gap-2"
              >
                <TaskCard
                  badgeClass={each.priority.toLowerCase()}
                  taskTitle={each.title}
                  taskDescription={each.content}
                  taskDeadline={each.deadline}
                  badgeLabel={each.priority}
                  taskId={each.id}
                  taskStatus={each.status}
                />
              </li>
            );
          })}
          {isPending && (
            <>
              <TaskSkeleton />
              <TaskSkeleton />
              <TaskSkeleton />
            </>
          )}
        </aside>
      </div>
      {/* THIS IS SLIDER 2 */}
      <div className="h-1/3 lg:h-[97%] w-full lg:w-[30%] shadow-task-shadow bg-task-gray rounded-md shadow-md flex flex-col items-start lg:items-center p-1 px-2 pb-2 lg:p-3 ">
        <div className="flex flex-col w-13 lg:w-full">
          <SliderBadge
            className="lg:justify-center"
            label="On Progress"
            listColor="bg-task-onProgress"
            number="3"
          />
          <div className="bg-task-onProgress h-[1.5px] lg:h-[3px] rounded-full w-full hidden lg:block" />
        </div>
        <div className="flex flex-row lg:flex-col w-full h-full gap-2 lg:py-4 lg:gap-5">
          {onProgressTasks.map((each) => {
            return (
              <li
                key={each.title}
                className="w-1/3 lg:w-full h-full lg:h-1/3 bg-task-white rounded-md px-3 md:px-5 py-2 lg:py-4 flex flex-col justify-start gap-2"
              >
                <TaskCard
                  badgeClass={each.priority.toLowerCase()}
                  taskTitle={each.title}
                  taskDescription={each.content}
                  taskDeadline={each.deadline}
                  badgeLabel={each.priority}
                  taskId={each.id}
                  taskStatus={each.status}
                />
              </li>
            );
          })}
          {isPending && (
            <>
              <TaskSkeleton />
              <TaskSkeleton />
              <TaskSkeleton />
            </>
          )}
        </div>
      </div>
      {/* THIS IS SLIDER 3 */}
      <div className="h-1/3 lg:h-[97%] w-full lg:w-[30%] shadow-task-shadow bg-task-gray rounded-md shadow-md flex flex-col items-start lg:items-center p-1 px-2 pb-2 lg:p-3 ">
        <div className="flex flex-col w-13 lg:w-full">
          <SliderBadge
            className="lg:justify-center"
            label="Completed"
            listColor="bg-task-completed"
            number="3"
          />
          <div className="bg-task-badge-text-completed h-[1.5px] lg:h-[3px] rounded-full w-full hidden lg:block" />
        </div>
        <div className="flex flex-row lg:flex-col w-full h-full gap-2 lg:py-4 lg:gap-5">
          {doneTasks.map((each) => {
            return (
              <li
                key={each.title}
                className="w-1/3 lg:w-full h-full lg:h-1/3 bg-task-white rounded-md px-3 md:px-5 py-2 lg:py-4 flex flex-col justify-start gap-2"
              >
                <TaskCard
                  badgeClass={each.priority.toLowerCase()}
                  taskTitle={each.title}
                  taskDescription={each.content}
                  taskDeadline={each.deadline}
                  badgeLabel={each.priority}
                  taskId={each.id}
                  taskStatus={each.status}
                />
              </li>
            );
          })}
          {isPending && (
            <>
              <TaskSkeleton />
              <TaskSkeleton />
              <TaskSkeleton />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskSlider;
