import { createSignal } from 'solid-js';

interface Props {
  onAddTodo: (text: string) => void;
}

export default function AddTodoForm(props: Props) {
  const [text, setText] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (text().trim()) {
      props.onAddTodo(text().trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} class="flex">
      <input
        type="text"
        value={text()}
        onInput={(e: Event) => setText((e.target as HTMLInputElement).value)}
        placeholder="Add a new todo"
        class="input input-bordered flex-grow"
      />
      <button
        type="submit"
        class="btn btn-primary ml-2"
      >
        Add
      </button>
    </form>
  );
}