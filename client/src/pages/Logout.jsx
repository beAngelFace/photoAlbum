import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../service/axiosInstance";

/* eslint-disable react/prop-types */
function Logout({user, setUser}) {

    const navigate = useNavigate();

    const logoutUser = (event) => {
        event.preventDefault();
       
        axiosInstance.delete('/auth/logout')
            .then(({data}) => {
                setAccessToken(data.accessToken);
                setUser(null);
                navigate('/auth/authorization');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <h1>Logout for {user.name}</h1>
            <button onClick={logoutUser}>Yes, exit!</button>
        </> 
    );
}

export default Logout;