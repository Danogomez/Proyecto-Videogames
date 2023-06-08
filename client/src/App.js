import './App.css';
import Landing from './views/Landing/Landing';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
