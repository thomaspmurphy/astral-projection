import { createSignal, For } from 'solid-js';
import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import type { JSX } from 'solid-js';

export default function TodoList() {
  const [todos, setTodos] = createSignal<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      order: todos().length,
    };
    setTodos([...todos(), newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos().map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const reorderTodos = (fromIndex: number, toIndex: number) => {
    const newTodos = [...todos()];
    const [reorderedItem] = newTodos.splice(fromIndex, 1);
    newTodos.splice(toIndex, 0, reorderedItem);
    setTodos(newTodos.map((todo, index) => ({ ...todo, order: index })));
  };

  return (
    <div class="max-w-md mx-auto mt-8 p-4 bg-base-200 rounded-box shadow-lg">
      <AddTodoForm onAddTodo={addTodo} />
      <ul class="mt-4 space-y-2">
        <For each={todos().sort((a, b) => a.order - b.order)} children={(todo: Todo, index: () => number) => (
          <TodoItem
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onReorder={(direction: 'up' | 'down') => {
              const newIndex = direction === 'up' ? index() - 1 : index() + 1;
              if (newIndex >= 0 && newIndex < todos().length) {
                reorderTodos(index(), newIndex);
              }
            }}
          />
        )}
        />
      </ul>
    </div>
  );
}