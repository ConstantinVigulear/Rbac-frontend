import React from 'react';
import {useNavigate} from "react-router-dom";
import './users-list-item.css';

const UsersListItem = ({active, name, email, onToggleActive, onDelete}) => {

    const navigate = useNavigate();
    const activeButtonClassName = 'btn ' + (active ? 'btn-success' : 'btn-outline-success') + ' btn-sm float-right';
    let classNames = 'users-list-item';

    if (!active) {
        classNames += ' inactive';
    }

    return (
        <span className={classNames}>
        <span
            className="users-list-item-label"
            onClick={() => {
                navigate(`/users/${email}`)
            }}
        >{name}</span>

        <button type="button"
                className={activeButtonClassName}
                onClick={onToggleActive}>
        <i className="fa fa-exclamation"></i>
        </button>

        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDelete}>
        <i className="fa fa-trash-o"></i>
        </button>
    </span>
    );
};

export default UsersListItem;