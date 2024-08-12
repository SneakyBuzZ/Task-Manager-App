import CreateTaskButton from '@/components/task-ui/CreateTaskButton';

const tasks = [
  {
    image: '/icons/expired-task.svg',
    label: 'Expired Tasks',
    status: 'expired',
    class: ' border-b border-b-task-expiry',
  },
  {
    image: '/icons/active-task.svg',
    label: 'All Active Tasks',
    status: 'active',
    class: ' border-b border-b-task-active',
  },
  {
    image: '/icons/completed-task.svg',
    label: 'Completed Tasks',
    status: 'completed',
    class: ' border-b border-b-task-completed',
  },
];

const TaskStatus = () => {
  return (
    <ul className=" w-full h-[8%] lg:h-[97%] bg-task-white gap-3 flex flex-row lg:flex-col lg:w-[20%] lg:items-start my-1 lg:my-0">
      {tasks.map((each) => (
        <li
          key={each.status}
          className="bg-task-gray w-1/3 lg:w-[98%] h-full lg:h-[30%] flex flex-row lg:flex-col px-2 py-4 rounded-md font-task-poppins items-center lg:items-start lg:justify-start gap-2 shadow-md shadow-task-shadow"
        >
          <img
            src={each.image}
            alt={each.label}
            className="size-7 lg:size-10 hidden md:block"
          />
          <span
            className={
              `text-[10px] sm:text-[12px] md:text-[14px] w-[80%] sm:w-[60%]  lg:w-full md:border-b-0 text-task-text-gray font-medium` +
              each.class
            }
          >
            {each.label}
          </span>
          <span className="text-xs md:text-lg lg:text-2xl mx-1 font-semibold">
            7
          </span>
        </li>
      ))}
      <CreateTaskButton />
    </ul>
  );
};

export default TaskStatus;
