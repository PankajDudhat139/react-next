interface TodoProps {
    id: number;
    text: string;
    isPinned: boolean;
}

interface Props {
    todo: TodoProps;
    editingId: number | null;
    editText: string;
    setEditText: (value: string) => void;
    saveEdit: (id: number) => void;
    togglePin: (id: number) => void;
    startEdit: (editingId: number, editText: string) => void;
    deleteTodo: (id: number) => void;
}

export function TodoItem({
    todo,
    editingId,
    editText,
    setEditText,
    saveEdit,
    togglePin,
    startEdit,
    deleteTodo,
}: Props) {
    return (
        <>
            <div
                className={`flex items-center gap-2 p-4 border rounded-lg ${
                    todo.isPinned ? 'bg-yellow-50' : 'bg-white'
                }`}
            >
                <span className="flex-1">{todo.text}</span>
                <button
                    onClick={() => togglePin(todo.id)}
                    className={`p-2 rounded-lg ${
                        todo.isPinned ? 'text-yellow-600' : 'text-gray-400'
                    }`}
                >
                    📌
                </button>
                <button
                    onClick={() => startEdit(todo.id, todo.text)}
                    className="p-2 text-blue-500 hover:text-blue-600"
                >
                    ✏️
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-red-500 hover:text-red-600"
                >
                    🗑️
                </button>
            </div>

            {editingId === todo.id && (
                <dialog
                    open
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg border"
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Edit Todo</h3>
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => startEdit(0, '')}
                                className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => saveEdit(todo.id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}