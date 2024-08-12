import { createTaskSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EllipsisVertical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Calendar } from '@/components/ui/calendar';
import React from 'react';
import { format } from 'date-fns';
import { useCreateTaskApi, useUpdateTaskApi } from '@/lib/query/query';

const CreateTaskForm = ({
  title,
  description,
  deadline,
  taskId,
}: {
  title?: string;
  description?: string;
  deadline?: Date | string;
  taskId?: string;
}) => {
  const [date, setDate] = React.useState<Date>();
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      taskTitle: title || '',
      taskDescription: description || '',
    },
  });

  const { mutateAsync: createTaskApi } = useCreateTaskApi();
  const { mutateAsync: updateTaskApi } = useUpdateTaskApi();

  async function onSubmit(values: z.infer<typeof createTaskSchema>) {
    if (title && description && deadline && taskId) {
      await updateTaskApi({
        taskId: taskId,
        title: values.taskTitle,
        content: values.taskDescription,
        deadline: date!,
      });
    } else {
      await createTaskApi({
        title: values.taskTitle,
        description: values.taskDescription,
        deadline: date!,
      });
    }
    window.location.reload();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-3">
          <FormField
            control={form.control}
            name="taskTitle"
            render={({ field }) => (
              <FormItem className="flex items-start justify-between">
                <FormControl>
                  <Input
                    placeholder="TASK"
                    className="placeholder:text-black font-bold text-xs"
                    {...field}
                  />
                </FormControl>
                <EllipsisVertical
                  className="size-5 relative left-1"
                  color="#9C9DA4"
                />
              </FormItem>
            )}
          />
          <div className="bg-black h-[1px] relative bottom-2" />
          <FormField
            control={form.control}
            name="taskDescription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="border-none p-0 font-task-inter"
                    placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis, aspernatur recusandae ex eligendi, obcaecati officiis architecto autem veritatis perferendis, iusto necessitatibus accusamus sequi! Molestias numquam fuga et nemo architecto libero.
                  "
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center w-full justify-between font-task-poppins font-medium">
            <div className="flex flex-col justify-center items-start">
              {deadline ? (
                <>
                  <Dialog>
                    <DialogTrigger className="font-semibold text-task-text-gray text-sm">
                      {!deadline ? (
                        <>{date ? format(date, 'dd-mm-yyyy') : null}</>
                      ) : (
                        <>{format(deadline!, 'dd-mm-yyyy')}</>
                      )}
                    </DialogTrigger>
                    <DialogContent className="w-[315px] h-[298px] rounded-[20px]">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <Calendar
                          className="w-full h-full"
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  {!date ? (
                    <>
                      <Dialog>
                        <DialogTrigger>
                          <h1 className="font-semibold text-task-text-gray">
                            Deadline
                          </h1>
                        </DialogTrigger>
                        <DialogContent className="w-[315px] h-[298px] rounded-[20px]">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>

                            <DialogDescription></DialogDescription>
                            <Calendar
                              className="w-full h-full"
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <>
                      <Dialog>
                        <DialogTrigger className="font-semibold text-task-text-gray text-sm">
                          <>{date ? format(date, 'dd-mm-yyyy') : null}</>
                        </DialogTrigger>
                        <DialogContent className="w-[315px] h-[298px] rounded-[20px]">
                          <DialogHeader>
                            <DialogTitle></DialogTitle>
                            <DialogDescription></DialogDescription>
                            <Calendar
                              className="w-full h-full"
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </>
              )}
            </div>

            <DialogTrigger>
              <Button
                className="font-semibold text-task-text-gray"
                type="submit"
                variant={'link'}
              >
                Assigned to
              </Button>
            </DialogTrigger>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateTaskForm;
