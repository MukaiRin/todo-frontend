import React, { useState } from 'react';
import { useAddTodoMutation } from '../generated/graphql';
import { ApolloQueryResult } from '@apollo/client';
import { GetTodosQuery } from '../generated/graphql';

type AddTodoProps = {
  refetch: () => Promise<ApolloQueryResult<GetTodosQuery>>;
};

function AddTodo({ refetch }: AddTodoProps) {
  const [todoTitle, setTodoTitle] = useState('');
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle.trim()) {
      alert('Todo title cannot be empty');
      return;
    }
    try {
      await addTodo({
        variables: { title: todoTitle },
      });
      setTodoTitle('');
      alert('Todo added successfully!');
      refetch(); // リストを更新
    } catch (err) {
      console.error('Error adding todo', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoTitle}
        placeholder="Enter Todo"
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;
