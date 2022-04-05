import {useState, useEffect} from 'react';
import { Search } from './components/Search';
import { Table } from './components/Table';
import './styles/App.scss';

function App() {

  return (
    <div className="App">
      <Search/>
      <Table/>
    </div>
  );
}

export default App;
