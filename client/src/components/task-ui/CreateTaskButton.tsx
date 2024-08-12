import { PlusIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateTaskForm from '@/components/shared/CreateTaskForm';
import SliderBadge from './SliderBadge';

const CreateTaskButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-1/6 lg:w-[100%] h-full lg:h-[10%]">
          <article className="w-full h-full rounded-xl lg:rounded-[1.3rem] flex items-center px-4 py-2 text-task-white gap-2 bg-task-neutral hover:bg-task-neutral">
            <PlusIcon color="#fff" className="size-4" />
            <span className="hidden md:block">ADD TASK</span>
          </article>
        </DialogTrigger>

        <DialogContent className="w-[333px] h-[504px] flex flex-col rounded-[10px] p-0 px-5 py-1 border border-black">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <article className="flex justify-between items-center border-b-2 py-3">
              <SliderBadge
                label="Add Task"
                listColor="bg-add-task mr-1"
                className="lg:justify-start"
                labelClass="text-xl font-task-poppins font-semibold"
              />
              <DialogTrigger className="h-full">
                <PlusIcon className="h-4 w-4" color="#0D25FF" />
              </DialogTrigger>
            </article>
            <CreateTaskForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskButton;
