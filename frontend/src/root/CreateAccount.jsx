import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../styles/Login.css";

export const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);
    const handleChangeName = (event) => setName(event.target.value);
    const handleChangeProfilePicture = (event) => setProfilePicture(event.target.files[0]);

    const createAccount = async () => {
        setLoading(true);
        setError("");
        try {
            const user = await signup(email, password);
            const formData = new FormData();
            formData.append("uid", user.uid);
            formData.append("email", email);
            formData.append("name", name);
            formData.append("bio", "Add a bio...");
            formData.append("savedRecipes", JSON.stringify([]));
            formData.append("createdRecipes", JSON.stringify([]));
            if (profilePicture) {
                formData.append("profilePicture", profilePicture);
            }

            await axios.post('http://localhost:8000/profile/create', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate('/');
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-wrapper'>
            <div className='login-body'>
                <div className='login-main'>
                    <div className='login-main-header'>
                        <h1>Create Account</h1>
                    </div>
                    <div className='login-boxes'>
                        <input value={name} placeholder='Name' onChange={handleChangeName} />
                        <input value={email} placeholder='Email' onChange={handleChangeEmail} />
                        <input value={password} type='password' placeholder='Password' onChange={handleChangePassword} />
                        <input type='file' onChange={handleChangeProfilePicture} />
                    </div>
                    <div className='login-option'>
                        <button className='login-button' onClick={createAccount} disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <div>
                        <div className="login-text">Already have an account? <button className='text-button' onClick={() => navigate('/')}>Login</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};