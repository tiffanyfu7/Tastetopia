import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import axios from "axios";
import "../styles/Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, signInAsGuest } = useAuth();

    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangePassword = (event) => setPassword(event.target.value);

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const user = await login(email, password);
            navigate('/homepage');
        } catch (error) {
            setError(error.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginAsGuest = async () => {
        setLoading(true);
        setError("");
        try {
            const user = await signInAsGuest();
            await axios.post('http://localhost:8000/profile/create-guest', {
                uid: user.uid
            });
            navigate('/homepage');
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
                        <h1>Login</h1>
                    </div>
                    <div className='login-boxes'>
                        <input value={email} placeholder='Email' onChange={handleChangeEmail} />
                        <input value={password} type='password' placeholder='Password' onChange={handleChangePassword} />
                    </div>
                    <div className='login-option'>
                        <button className='login-button' onClick={handleLogin} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <div>
                        <div className="login-text">Don't have an account? <button className='text-button' onClick={() => navigate('/CreateAccount')}> Create Account </button></div>
                        <div className="login-text"><button className='text-button' onClick={handleLoginAsGuest}>Login as Guest</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";
// import { auth } from "../firebase";
// import axios from "axios";
// import { useUser } from "../components/UserContext";
// import "../styles/Login.css";

// export const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { setUser } = useUser();

//     const handleChangeEmail = (event) => setEmail(event.target.value);
//     const handleChangePassword = (event) => setPassword(event.target.value);

//     const login = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             // const userResponse = await axios.get(`/profile/user/${userCredential.user.uid}`);
//             setUser({ uid: userCredential.user.uid });
//             navigate('/homepage');
//         } catch (error) {
//             setError(error.message);
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const loginAsGuest = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const userCredential = await signInAnonymously(auth);
//             const userResponse = await axios.post('http://localhost:8000/profile/create-guest', {
//                 uid: userCredential.user.uid
//             });
//             setUser({ uid: userCredential.user.uid });
//             navigate('/homepage');
//         } catch (error) {
//             setError(error.message);
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='login-wrapper'>
//             <div className='login-body'>
//                 <div className='login-main'>
//                     <div className='login-main-header'>
//                         <h1>Login</h1>
//                     </div>
//                     <div className='login-boxes'>
//                         <input value={email} placeholder='Email' onChange={handleChangeEmail} />
//                         <input value={password} type='password' placeholder='Password' onChange={handleChangePassword} />
//                     </div>
//                     <div className='login-option'>
//                         <button className='login-button' onClick={login}> Login </button>
//                     </div>
//                     {error && <div className='error-message'>{error}</div>}
//                     <div>
//                         <div className="login-text">Don't have an account? <button className='text-button' onClick={() => navigate('/CreateAccount')}> Create Account </button></div>
//                         <div className="login-text"><button className='text-button' onClick={loginAsGuest}>Login as Guest</button></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
