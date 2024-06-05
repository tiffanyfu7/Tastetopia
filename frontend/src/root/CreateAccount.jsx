import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios';
import { useUser } from "../components/UserContext";

export const CreateAccount = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setUser = useUser();
    
    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);
    const handleChangeName = (event) => setName(event.target.value);
    const handleProfilePictureChange = (event) => setProfilePicture(event.target.files[0]);

    const uploadProfilePicture = async () => {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);

        const response = await axios.post('/profile/upload-profile-picture', formData);

        if (response.status !== 200) {
            throw new Error('Failed to upload profile picture');
        }

        return response.data.url;
    };

    const signUp = async () => {
        setLoading(true);
        setError("");
        try {
            const profilePictureURL = profilePicture ? await uploadProfilePicture() : null;

            const response = await axios.post('/profile/register', {
                email,
                password,
                name,
                profilePictureURL,
            });

            if (response.status !== 200) {
                throw new Error('Failed to register');
            }

            const { uid } = response.data;

            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);

            // Fetch user data from backend
            const userResponse = await axios.get(`/profile/user/${uid}`);
            setUser({ ...userResponse.data, uid });
            navigate('/login');
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='signup-body'>
            <div className='signup-main'>
                <div className='signup-main-header'>
                    <h1>Create Account</h1>
                </div>
                <div className='signup-boxes'>
                    <input value={name} placeholder='Name' onChange={handleChangeName} />
                    <input value={email} placeholder='Email' onChange={handleChangeEmail} />
                    <input value={password} type='password' placeholder='Password' onChange={handleChangePassword} />
                    <input type='file' onChange={handleProfilePictureChange} />
                </div>
                <div className='signup-option'>
                    <button className='signup-button' onClick={signUp} disabled={loading}>
                        {loading ? "Signing up..." : "SIGN UP"}
                    </button>
                </div>
                {error && <div className='error-message'>{error}</div>}
                <div>
                    <p>Already have an account? <button onClick={() => navigate('/login')}>Log in</button></p>
                </div>
            </div>
        </div>
    );
};
