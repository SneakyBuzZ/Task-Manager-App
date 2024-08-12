import NavBar from '@/components/shared/NavBar';
import TaskManager from '@/components/shared/TaskManager';

const DashBoard = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col p-3 md:p-4 gap-3 md:gap-4 lg:gap-9">
        <NavBar />
        <TaskManager />
      </div>
    </>
  );
};

export default DashBoard;
