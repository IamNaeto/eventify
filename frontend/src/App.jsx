import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import CreateEvent from './components/pages/CreateEvent';

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/create" element={<CreateEvent />} />
      </Routes>
   </div>
  )
}

export default App
