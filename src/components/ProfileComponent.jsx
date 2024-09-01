import axios from 'axios';
import TopBarComponet from './TopBarComponet';
import React, { useEffect, useState } from 'react';

function ProfileComponent() {
    const [userData, setUserData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    };

    const APIURL = 'https://electricity-manager-api.onrender.com/'


    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const res = await axios.get(`${APIURL}/users/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            setUserData(res.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        checkAuth(); // Check authentication status when the component mounts
        if (isAuthenticated) {
            fetchUserData(); // Fetch user data if authenticated
        }
    }, [isAuthenticated]);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        padding: '20px',
        width: '100%',
        textAlign: 'center'
    };

    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#343a40'
    };

    const infoStyle = {
        fontSize: '16px',
        color: '#495057'
    };

    const messageStyle = {
        textAlign: 'center',
        fontSize: '18px',
        color: '#6c757d'
    };

    return (
        <>
            <TopBarComponet />
            <div style={containerStyle}>
                {isAuthenticated ? (
                    userData.length > 0 ? (
                        <div style={cardStyle}>
                            <h2 style={titleStyle}>User Profile</h2>
                            <div style={infoStyle}>
                                <p><strong>Username:</strong> {userData[0].username}</p>
                                <p><strong>Email:</strong> {userData[0].email}</p>
                                {/* Display other user data as needed */}
                            </div>
                        </div>
                    ) : (
                        <p style={messageStyle}>Loading user data...</p>
                    )
                ) : (
                    <p style={messageStyle}>You must be logged in to view this content.</p>
                )}
            </div>
        </>
    );
}

export default ProfileComponent;
