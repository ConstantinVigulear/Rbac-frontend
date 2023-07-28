import React from 'react';

import UsersListItem from '../users-list-item/users-list-item';

import './users-list.css';

const UsersList = ({items, onToggleActive, onDelete, onUserToggle}) => {

    const elements = items.map((item, index) => {
        const {...itemProps} = item;
        return (
            <li key={index} className="list-group-item">
                <UsersListItem
                    index={index}
                    {...itemProps}
                    onToggleActive={() => onToggleActive(index)}
                    onDelete={() => onDelete(index)}
                    onUserToggle={onUserToggle}
                />
            </li>
        );
    });

    return (<ul className="users-list list-group">{elements}</ul>);
};

export default UsersList;