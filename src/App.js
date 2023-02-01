import { BrowserRouter, Route, Routes } from "react-router-dom";
import Comments from "./components/Comments";
import Tasks from "./components/Tasks";
import Login from "./components/Login";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>

    <Routes>

        <Route path='/' element={<Login />} />

        <Route path='/tasks' element={<Tasks />} />

        <Route path='/comments/:category/:id' element={<Comments />} />

    </Routes>

</BrowserRouter>
  );
}

export default App;
