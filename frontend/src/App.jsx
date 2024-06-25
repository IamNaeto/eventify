import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateEvent from "./components/pages/CreateEvent";
import EditEvent from "./components/pages/EditEvent";
import ManageEvent from "./components/pages/ManageEvent";
import ManageEvents from "./components/pages/ManageEvents";
import PrivateRoute from "./components/auth/PrivateRoute";
import SignInAuth from "./components/pages/SignInAuth";
import SignUpAuth from "./components/pages/SignUpAuth";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInAuth />} />
        <Route path="/signup" element={<SignUpAuth />} />

        <Route element={<PrivateRoute />}>
          <Route path="/event/create" element={<CreateEvent />} />
          <Route path="/event/edit/:id" element={<EditEvent />} />
          <Route path="/manage/events" element={<ManageEvents />} />
          <Route path="/manage/event/:id" element={<ManageEvent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
