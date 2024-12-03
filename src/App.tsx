import React from 'react';
import AddTodo from './todo-functions/AddTodo';
import ListTodo from './todo-functions/ListTodo';
import { useGetTodosQuery } from './generated/graphql';

function App() {
  const { refetch } = useGetTodosQuery(); // refetch を取得

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo refetch={refetch} />
      <ListTodo />
    </div>
  );
}

export default App;
