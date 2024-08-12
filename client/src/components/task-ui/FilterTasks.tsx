'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const status = [
  {
    value: 'Done',
    label: 'Done',
  },
  {
    value: 'On Progress',
    label: 'On Progress',
  },
  {
    value: 'To Do',
    label: 'To Do',
  },
];
function FilterTasks() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="justify-between h-7 md:h-9 p-1 md:p-3 items-center gap-2 text-task-text-gray border-task-border-gray rounded-sm"
        >
          <img
            className="h-[12px] relative top-0.5"
            src="/icons/filter.svg"
            alt="filter-icon"
          />
          {value
            ? status.find((each) => each.value === value)?.label
            : 'Filter'}
          <img
            className="h-[12px] relative top-0.5"
            src="/icons/arrow-down.svg"
            alt="down-icon"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 mr-3">
        <Command>
          <CommandList>
            <CommandGroup>
              {status.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterTasks;
