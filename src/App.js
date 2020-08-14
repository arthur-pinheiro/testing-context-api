import React, { useEffect, useCallback, useContext } from 'react';

import { api } from './service/api';

const SearchContext = React.createContext();

function SearchProvider({ children }) {
  const [filter, setFilter] = React.useState('');
  const [state, setState] = React.useState({ name: 'José', todos: [] });

  const loadData = useCallback(async (todoId = null) => {
    const response = await api.get(todoId ? `/todos/${todoId}` : `/todos`);

    console.log(response.data);

    setState((prev) => {
      return {
        name: 'foi',
        todos: response.data,
      };
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SearchContext.Provider value={{ filter, setFilter, state, loadData }}>
      {children}
    </SearchContext.Provider>
  );
}

const isArray = function (a) {
  return !!a && a.constructor === Array;
};

function ResultComponent() {
  const { state } = React.useContext(SearchContext);

  const count = isArray(state.todos) ? state.todos.length : state ? 1 : 0;

  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <h1>Aqui é o elemento que consome o contexto</h1>
      <div>{state.name}</div>
      <h1>Tamanho da lista: {count}</h1>
    </div>
  );
}

function PagedButton() {
  const { loadData } = React.useContext(SearchContext);

  return (
    <button
      onClick={() => {
        loadData(1);
      }}
    >
      1
    </button>
  );
}

function SearchComponent() {
  const { setFilter, loadData, filter } = React.useContext(SearchContext);

  return (
    <>
      <input
        placeholder="Digite aqui o id da todo para mutar o contexto"
        style={{ width: '100%' }}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          loadData(filter);
        }}
      >
        Buscar TODO
      </button>
    </>
  );
}

function App() {
  return (
    <>
      <div className="App">
        <h1>HEADER</h1>
      </div>

      <SearchProvider>
        <SearchComponent />
        <ResultComponent />
        <PagedButton />
      </SearchProvider>

      <div className="App">
        <h1>FOOTER</h1>
      </div>
    </>
  );
}

export default App;
