import CreateTaskButton from '@/components/task-ui/CreateTaskButton';
import { useGetAllTaskApi } from '@/lib/query/query';
import { individualTaskType } from '@/lib/types';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const TaskStatus = () => {
  const [expiredTasksLength, setExpiredTasksLength] = useState(0);
  const [doneTasksLength, setDoneTasksLength] = useState<number>(0);
  const [toDoTasksLength, setToDoTasksLength] = useState<number>(0);
  const { mutateAsync: getAllTaskApi, isPending } = useGetAllTaskApi();
  useEffect(() => {
    getAllTaskApi()
      .then((response) => {
        const deadTasks = response.allTasks.filter(
          (each: individualTaskType) => {
            const deadlineDate = new Date(each.deadline);
            return deadlineDate < new Date();
          }
        );
        setExpiredTasksLength(deadTasks.length);
        setToDoTasksLength(response.toDoTasks.length);
        setDoneTasksLength(response.doneTasks.length);
      })
      .catch((err) => {
        console.log('ERROR: ', err);
      });
  }, []);
  return (
    <ul className=" w-full h-[8%] lg:h-[97%] bg-task-white gap-3 flex flex-row lg:flex-col lg:w-[20%] lg:items-start my-1 lg:my-0">
      <li className="bg-task-gray w-1/3 lg:w-[98%] h-full lg:h-[30%] flex flex-row lg:flex-col px-2 py-4 rounded-md font-task-poppins items-center lg:items-start lg:justify-start gap-2 shadow-md shadow-task-shadow">
        <img
          src="/icons/expired-task.svg"
          alt="Expired Tasks"
          className="size-7 lg:size-10 hidden md:block"
        />
        <span
          className={`text-[10px] sm:text-[12px] md:text-[14px] w-[80%] sm:w-[60%]  lg:w-full md:border-b-0 text-task-text-gray font-medium border-b border-b-task-expiry`}
        >
          Expired Tasks
        </span>
        <span className="text-xs md:text-lg lg:text-2xl mx-1 font-semibold">
          {isPending ? (
            <>
              <ClipLoader size={20} />
            </>
          ) : (
            <>{expiredTasksLength}</>
          )}
        </span>
      </li>
      <li className="bg-task-gray w-1/3 lg:w-[98%] h-full lg:h-[30%] flex flex-row lg:flex-col px-2 py-4 rounded-md font-task-poppins items-center lg:items-start lg:justify-start gap-2 shadow-md shadow-task-shadow">
        <img
          src="/icons/active-task.svg"
          alt="All Active Tasks"
          className="size-7 lg:size-10 hidden md:block"
        />
        <span
          className={`text-[10px] sm:text-[12px] md:text-[14px] w-[80%] sm:w-[60%]  lg:w-full md:border-b-0 text-task-text-gray font-medium border-b border-b-task-active`}
        >
          All Active Tasks
        </span>
        <span className="text-xs md:text-lg lg:text-2xl mx-1 font-semibold">
          {isPending ? (
            <>
              <ClipLoader size={20} />
            </>
          ) : (
            <>{Number(toDoTasksLength) + Number(doneTasksLength)}</>
          )}
        </span>
      </li>

      <li className="bg-task-gray w-1/3 lg:w-[98%] h-full lg:h-[30%] flex flex-row lg:flex-col px-2 py-4 rounded-md font-task-poppins items-center lg:items-start lg:justify-start gap-2 shadow-md shadow-task-shadow">
        <img
          src="/icons/completed-task.svg"
          alt="Completed Tasks"
          className="size-7 lg:size-10 hidden md:block"
        />
        <span
          className={`text-[10px] sm:text-[12px] md:text-[14px] w-[80%] sm:w-[60%]  lg:w-full md:border-b-0 text-task-text-gray font-medium border-b border-b-task-completed`}
        >
          Completed Tasks
        </span>
        <span className="text-xs md:text-lg lg:text-2xl mx-1 font-semibold">
          {isPending ? (
            <>
              <ClipLoader size={20} />
            </>
          ) : (
            <>{doneTasksLength}</>
          )}
        </span>
      </li>

      <CreateTaskButton />
    </ul>
  );
};

export default TaskStatus;
