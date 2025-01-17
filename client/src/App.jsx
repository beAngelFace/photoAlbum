import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Authorization from "./pages/Authorization";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";
import Nav from "./components/Nav";
import axiosInstance, { setAccessToken } from "./service/axiosInstance";
import Photos from "./pages/Photos"; 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get('/tokens/refresh')
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
      });
  }, []);

  return (
    <BrowserRouter>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="auth/authorization" element={<Authorization setUser={setUser} />} />
        <Route path="auth/registration" element={<Registration setUser={setUser} />} />
        <Route path="/auth/logout" element={<Logout user={user} setUser={setUser} />} />
        <Route path="/albums/:albumId/photos" element={<Photos user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
