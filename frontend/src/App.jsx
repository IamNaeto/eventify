import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import CreateEvent from './components/pages/CreateEvent';
import EditEvent from './components/pages/EditEvent';
import ManageEvent from './components/pages/ManageEvent';
import ManageEvents from './components/pages/ManageEvents';

function App() {
  return (
   <div>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/create" element={<CreateEvent />} />
        <Route path="/event/edit" element={<EditEvent />} />
        <Route path="/manage/events" element={<ManageEvents />} />
        <Route path="/manage/event/:id" element={<ManageEvent />} />
      </Routes>
   </div>
  )
}

export default App
