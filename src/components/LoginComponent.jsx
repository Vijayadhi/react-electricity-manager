import React, { useState } from 'react'
import '../login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TopBarComponet from './TopBarComponet';
import FootBarComponent from './FootBarComponent';
import { Link } from 'react-router-dom'

function LoginComponent() {
    let [email, setemail] = useState('');
    let [password, setPassword] = useState('');
    let [auth_token, setAuthToken] = useState();

    const navigate = useNavigate();

    const APIURL = 'https://electricity-manager-api.onrender.com/api'

    const getAuth = async (e) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        try {
            const res = await axios.post(`${APIURL}/login/`, {
                username: email,  // Assuming the API expects 'username' instead of 'email'
                password: password
            });

            // Check if the response status is 200
            if (res.status === 200) {
                // Store the token in state and localStorage
                const token = res.data.token;  // Make sure to access `token` from `res.data`
                setAuthToken(token);
                navigate('/dashboard')
                localStorage.setItem('authToken', token);
            } else {
                toast.error("Failed to Login")
            }
        } catch (error) {
            toast.error("Failed to Login");
            console.error('Error during authentication:');
        }
    };

    return (
        <>
            {auth_token}
            <TopBarComponet />
            <br />
            <div className="login-wrap">
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label for="tab-2" className="tab">Sign Up</label>

                    <div className="login-form">
                        <form onSubmit={getAuth}>
                            <div className="sign-in-htm">
                                <div className="group">
                                    <label for="user" className="label">Username</label>
                                    <input id="user" type="text" className="input" onChange={e => setemail(e.target.value)} />
                                </div>
                                <div className="group">
                                    <label for="pass" className="label">Password</label>
                                    <input id="pass" type="password" className="input" data-type="password" onChange={e => setPassword(e.target.value)} />
                                </div>
                                <div className="group">
                                    <input type="submit" className="button" value="Sign In" />
                                </div>
                                <div className="hr"></div>
                            </div>
                        </form>
                        <div className="sign-up-htm">
                            <br></br>
                            <h5 style={{ color: "#fff" }}>Please Contact developer for Registration Assistance</h5>
                            <br /><br />
                            <h4 ><Link to='/contact_us' style={{ color: "#fff" }}>Click Here to contact developer</Link></h4>
                            {/* <div className="group">
                                <label for="user" className="label">Username</label>
                                <input id="user" type="text" className="input" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" data-type="password" />
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Email Address</label>
                                <input id="pass" type="text" className="input" />
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up" />
                            </div>
                            <div className="hr"></div>
                            <div className="foot-lnk">
                                <label for="tab-1">Already Member?</label>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <FootBarComponent />
        </>
    )
}

export default LoginComponent