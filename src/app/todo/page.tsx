"use client";
import { useState } from "react";
import { AddTodo } from "./components/AddTodo";
import { TodoItem } from "./components/TodoItem";
import { useAuth } from "../context/auth-context";

interface Props {
  id: number;
  text: string;
  isPinned: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Props[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Props[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const { isAuthenticated, isLoading } = useAuth();

  // Auth check
  if (!isAuthenticated || isLoading) {
    return null; // The auth provider will handle redirecting
  }
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, isPinned: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      setDeletedTodos([...deletedTodos, todoToDelete]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const restoreTodo = (id: number) => {
    const todoToRestore = deletedTodos.find((todo) => todo.id === id);
    if (todoToRestore) {
      setTodos([...todos, todoToRestore]);
      setDeletedTodos(deletedTodos.filter((todo) => todo.id !== id));
    }
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
  };

  const togglePin = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo
      )
    );
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

      <div className="space-y-3">
        {sortedTodos.map((todo: Props) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
            togglePin={togglePin}
            startEdit={startEdit}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>

      {deletedTodos.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Deleted Items</h2>
          <div className="space-y-3">
            {deletedTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded"
              >
                <span>{todo.text}</span>
                <button
                  onClick={() => restoreTodo(todo.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
