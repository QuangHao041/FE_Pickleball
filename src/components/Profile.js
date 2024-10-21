import React from 'react';

const Profile = ({ user }) => {
    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="profile">
            <h1>User Profile</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                {/* Add more user details as needed */}
            </div>
        </div>
    );
};

export default Profile;