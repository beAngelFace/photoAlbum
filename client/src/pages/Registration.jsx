import { useState } from "react";
import AxiosInstance, { setAccessToken } from "../service/AxiosInstance";

function RegistrationPage({setUser}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const registrationUser = (event) => {
        event.preventDefault();

        if( confirm === password) {
            AxiosInstance.post('/auth/registration', {name, email, password})
                .then(({data}) => {
                    console.log(data);
                    setAccessToken(data.accessToken)
                    setUser(data.user)
                })
               
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <h1>Registration</h1>

            <form onSubmit={registrationUser}>
                <input type="text" onChange={({target}) => setName(target.value)} placeholder="Name" required/>
                <input type="text" onChange={({target}) => setEmail(target.value)} placeholder="Email" required />
                <input type="text" onChange={({target}) => setPassword(target.value)} placeholder="Password" required />
                <input type="text" onChange={({target}) => setConfirm(target.value)} placeholder="Confirm password" required />
                <button type="submit">Registration</button>
            </form>
        </>
        
    );
}

export default RegistrationPage;