import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { useUser } from "../components/UserContext";
import "../styles/Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);

    const login = async () => {
        setLoading(true);
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // const userResponse = await axios.get(`/profile/user/${userCredential.user.uid}`);
            setUser({ uid: userCredential.user.uid });
            navigate('/homepage');
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loginAsGuest = async () => {
        setLoading(true);
        setError("");
        try {
            const userCredential = await signInAnonymously(auth);
            const userResponse = await axios.post('http://localhost:8000/profile/create-guest', {
                uid: userCredential.user.uid
            });
            setUser({ uid: userCredential.user.uid });
            navigate('/homepage');
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-body'>
            <div className='login-main'>
                <div className='login-main-header'>
                    <h1>Login</h1>
                </div>
                <div className='login-boxes'>
                    <input value={email} placeholder='Email' onChange={handleChangeEmail} />
                    <input value={password} type='password' placeholder='Password' onChange={handleChangePassword} />
                </div>
                <div className='login-option'>
                    <button className='login-button' onClick={login}> Login </button>
                </div>
                {error && <div className='error-message'>{error}</div>}
                <div>
                    <p>Don't have an account? <button className='text-button' onClick={() => navigate('/CreateAccount')}> Create Account </button></p>
                    <p><button className='text-button' onClick={loginAsGuest}>Login as Guest</button></p>
                </div>
            </div>
        </div>
    );
};
