//@ts-check
import React, { useState, useEffect } from 'react';
import useFetch from 'use-http';
import './App.css';

function App() {
  // Create the count state.
  const [count, setCount] = useState(0);
  const [token, setToken] = useState('');
  const { loading, error, data: items = [] } = useFetch('/items', {}, []);

  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  return (
    <>
      <button
        onClick={(e) => {
          const { loading, error, data } = useFetch('/api/auth', {}, []);
          setToken(data);
        }}
      >
        {token ?? 'Register'}
      </button>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {/* {items?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))} */}
    </>
  );
}

export default App;
