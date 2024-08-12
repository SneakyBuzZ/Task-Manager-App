import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchInput = () => {
  return (
    <div className="flex items-center">
      <Button className="h-7 md:h-9 p-2 md:p-3" variant={'task-white'}>
        <Search className="size-3 md:size-4 lg:size-4.5" color="#000" />
      </Button>
      <Input
        placeholder="Search Project"
        className="bg-white h-7 md:h-9 w-40 md:w-48 lg:w-72  text-xs md:text-[14px] lg:text-[17px] rounded-l-none rounded-r-full font-task-poppins 
        "
      />
    </div>
  );
};

export default SearchInput;
