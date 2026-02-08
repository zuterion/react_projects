import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './components/register';
import Users from "./components/users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/users" element={<Users/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
