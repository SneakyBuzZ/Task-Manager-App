import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChangeTaskStatusApi } from '@/lib/query/query';
import { taskStatus } from '@/lib/types';
import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';

type taskMenu =
  | 'Start Task'
  | 'Finish Task'
  | 'Reopen Task'
  | 'Back to To Do'
  | 'Back to On Progress';

function TaskCardMenu({
  taskId,
  status,
}: {
  taskId: string;
  status: taskStatus;
}) {
  const { mutateAsync: changeTaskStatus } = useChangeTaskStatusApi();
  const [menuLabel1, setMenuLabel1] = useState<taskMenu | string>('');
  const [menuLabel2, setMenuLabel2] = useState('');

  useEffect(() => {
    switch (status) {
      case 'ToDo':
        setMenuLabel1('Start Task');
        setMenuLabel2('Finish Task');
        break;
      case 'OnProgress':
        setMenuLabel1('Finish Task');
        setMenuLabel2('Back to To Do');
        break;
      case 'Done':
        setMenuLabel1('Reopen Task');
        setMenuLabel2('Back to On Progress');
        break;
      default:
        setMenuLabel1('');
    }
  }, [status]);

  const handleClick = async (menu: taskMenu) => {
    if (menu === 'Start Task') {
      await changeTaskStatus({
        taskId,
        status: 'OnProgress',
      });
    } else if (menu === 'Finish Task') {
      await changeTaskStatus({
        taskId,
        status: 'Done',
      });
    } else if (menu === 'Reopen Task') {
      await changeTaskStatus({
        taskId,
        status: 'ToDo',
      });
    } else if (menu === 'Back to On Progress') {
      await changeTaskStatus({
        taskId,
        status: 'OnProgress',
      });
    } else if (menu === 'Back to To Do') {
      await changeTaskStatus({
        taskId,
        status: 'ToDo',
      });
    } else {
      console.log('No action required for this status');
      return; // No action required for this status. Just return to avoid errors.
    }

    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="size-5 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleClick(menuLabel1 as taskMenu)}
            className="cursor-pointer"
          >
            {menuLabel1}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleClick(menuLabel2 as taskMenu)}
            className="cursor-pointer"
          >
            {menuLabel2}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskCardMenu;
