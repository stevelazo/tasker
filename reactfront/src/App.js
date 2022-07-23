import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowTask from './components/ShowTask';


function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
