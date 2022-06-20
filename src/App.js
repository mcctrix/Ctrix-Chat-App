import Signin from "./pages/SignIn";

import Home from "./pages/Home";

// Hooks
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="signin" />} />
        <Route path="/main" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
