import React, { useState, useCallback } from 'react';
import Todos from './Todos';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<string[]>([]); // Specify the type for todos

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = useCallback((): void => {
    setTodos((t) => [...t, "New Todo"]);
  },[]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default App;
