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
            <h1>{user.name}, вы точно хотите выйти?</h1>
            <button onClick={logoutUser}>Да, я за новыми фотками!</button>
        </> 
    );
}

export default Logout;