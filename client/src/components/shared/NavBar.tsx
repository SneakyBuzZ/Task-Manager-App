import SearchInput from '@/components/task-ui/SearchInput';
import FilterTasks from '@/components/task-ui/FilterTasks';

const NavBar = () => {
  return (
    <nav className="bg-task-gray p-3 py-6 h-10 md:h-14 lg:h-16 flex justify-between items-center rounded-xl shadow-task-shadow shadow-md">
      <SearchInput />
      <FilterTasks />
    </nav>
  );
};

export default NavBar;
