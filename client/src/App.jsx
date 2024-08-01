import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authorization from "./pages/Authorization";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";

function App() {

  const [user, setUser] = useState(null)
  
  return (
    <BrowserRouter>

      <Nav user={user}/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/authorization" element={<Authorization />} />
        <Route path="auth/registration" element={<Registration setUser={setUser}/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
