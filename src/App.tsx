import { CSSProperties } from 'react';
import Board from './components/Board';
import Restart from './components/Restart';
import './App.css';

function App() {
  return (
    <div>
      <div className='vertical-divide-top'>

      </div>
      <div className='vertical-divide-mid'>
        <Board />
      </div>
      <div className='vertical-divide-bottom'>
        <Restart />
      </div>
    </div>
  );
}

export default App;
