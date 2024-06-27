
import './App.css';
import {Index} from "./page/index"
import { Route, BrowserRouter as Router, RouterProvider, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='*' element={<Index></Index>}></Route>
    </Routes>
    </Router>
  );
}

export default App;
