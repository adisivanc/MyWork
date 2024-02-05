import React, { memo } from "react";

interface TodosProps {
  todos: string[];
  addTodo: () => void;
}

const Todos: React.FC<TodosProps> = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default memo(Todos);
