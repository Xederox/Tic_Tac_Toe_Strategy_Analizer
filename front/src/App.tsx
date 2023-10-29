import React from 'react';
import './App.css';
import {TestFace} from "types";
import {Stage0} from './components/stage0/Stage0';

function App() {
  const asdf:TestFace = {
    x: 123,
  };

  return (
      <Stage0/>
  );
}

export default App;
