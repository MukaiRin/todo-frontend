import React, { useEffect } from 'react';
import {
  useGetTodosQuery,
  useCompleteTodoMutation,
  useDeleteTodoMutation,
} from '../generated/graphql';

function ListTodo() {
  const { data, loading, error, refetch } = useGetTodosQuery(); // Todoリストを取得
  const [completeTodoMutation] = useCompleteTodoMutation(); // CompleteTodoミューテーション
  const [deleteTodoMutation] = useDeleteTodoMutation(); // DeleteTodoミューテーション

  useEffect(() => {
    const deleteCompletedTodos = async () => {
      if (data?.todos) {
        const completedTodos = data.todos.filter((todo) => todo.completed);

        for (const todo of completedTodos) {
          try {
            await deleteTodoMutation({ variables: { id: todo.id } });
            console.log(`Deleted Todo: ${todo.title}`);
          } catch (err) {
            console.error(`Failed to delete completed Todo: ${todo.title}`, err);
          }
        }

        refetch(); // データをリフレッシュ
      }
    };

    deleteCompletedTodos();
  }, [data, deleteTodoMutation, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCheckboxChange = async (id: number) => {
    try {
      await completeTodoMutation({ variables: { id } }); // completed を true に更新
      alert('Todo marked as completed!');
      refetch(); // データを再取得してUIを更新
    } catch (err) {
      console.error('Error completing todo:', err);
      alert('Failed to mark todo as completed.');
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {data?.todos.length === 0 ? (
        <p>There are no todos to display!</p>
      ) : (
        <ul>
          {data?.todos.map((todo) => (
            <li key={todo.id}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTodo;
