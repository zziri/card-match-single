import { CSSProperties } from 'react';
import Board from './components/Board';
import FinishModal from './components/FinishModal';

const customStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100vh'
};

function App() {
  return (
    <div style={customStyle}>
      <Board />
      <FinishModal />
    </div>
  );
}

export default App;
