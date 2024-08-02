import { useState } from "react";
import axiosInstance, { setAccessToken } from "../service/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegistrationPage({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate()

  const registrationUser = (event) => {
    event.preventDefault();

    if (confirm === password) {
      axiosInstance
        .post("/auth/registration", { name, email, password })
        .then(({ data }) => {
          console.log(data);
          setAccessToken(data.accessToken);
          setUser(data.user);
          navigate('/');
         
        })

        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1>Registration</h1>

      <form onSubmit={registrationUser}>
        <input
          type="text"
          onChange={({ target }) => setName(target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          onChange={({ target }) => setConfirm(target.value)}
          placeholder="Confirm password"
          required
        />
        <button type="submit">Registration</button>
      </form>
    </>
  );
}

export default RegistrationPage;
