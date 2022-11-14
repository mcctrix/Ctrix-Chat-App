import Signin from "./pages/SignIn";

import Home from "./pages/Home";

import { ContextWrapper } from "./components/GlobalStore/Context";

// Hooks
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="signin" />} />
      <Route
        path="/main"
        element={
          <ContextWrapper>
            <Home />
          </ContextWrapper>
        }
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
