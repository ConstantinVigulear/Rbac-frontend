import React from 'react';
import './app-header.css';

const AppHeader = ({users, inactive}) => {
    return (
        <div className="app-header d-flex">
            <h1>Users List</h1>
            <h2>{users + inactive} total, {users} active, {inactive} inactive</h2>
        </div>
    );
};

export default AppHeader;