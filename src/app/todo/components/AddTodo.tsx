interface Props {
    newTodo: string;
    setNewTodo: (value: string) => void;
    addTodo: () => void;
}

export function AddTodo({ newTodo, setNewTodo, addTodo }: Props) {
    return (
        <div className="flex gap-2 mb-6">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add new todo..."
            />
            <button
                onClick={addTodo}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Add
            </button>
        </div>
    );
}