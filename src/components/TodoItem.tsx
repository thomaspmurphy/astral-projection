import type { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onReorder: (direction: 'up' | 'down') => void;
}

export default function TodoItem(props: Props) {
  return (
    <li class="flex items-center justify-between p-2 bg-base-100 rounded-box shadow">
      <div class="flex items-center">
        <input
          type="checkbox"
          checked={props.todo.completed}
          onChange={props.onToggle}
          class="checkbox checkbox-primary mr-2"
        />
        <span class={props.todo.completed ? 'line-through text-base-content/50' : 'text-base-content'}>
          {props.todo.text}
        </span>
      </div>
      <div>
        <button
          onClick={() => props.onReorder('up')}
          class="btn btn-square btn-sm btn-outline mr-1"
        >
          ↑
        </button>
        <button
          onClick={() => props.onReorder('down')}
          class="btn btn-square btn-sm btn-outline"
        >
          ↓
        </button>
      </div>
    </li>
  );
}