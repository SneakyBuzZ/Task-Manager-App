import TaskSlider from '@/components/shared/TaskSlider';
import TaskStatus from '@/components/shared/TaskStatus';
('@/components/TaskStatus');

const TaskManager = () => {
  return (
    <section className="w-full h-full flex flex-col lg:flex-row items-start gap-3">
      <TaskStatus />
      <TaskSlider />
    </section>
  );
};

export default TaskManager;
