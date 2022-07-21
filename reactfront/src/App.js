import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowTask from './components/ShowTask';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';


function App() {
  return ( 
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ShowTask/>}/>
          <Route path='/create' element={<CreateTask/>}/>
          <Route path='/edit/:id' element={<EditTask/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
