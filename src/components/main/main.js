import React, {useEffect, useState} from "react";
import RbacService from "../../services/rbac-service";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import "./main.css"
import UsersList from "../users-list";
import {useLocation} from 'react-router-dom';
const Main = () => {

    const rbacService = new RbacService();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    let location = useLocation();
    const [key, setKey] = useState('');

    useEffect(() => {
        rbacService.getAllUsers().then(data => {
            setUsers(data.sort((a, b) => a.name > b.name ? 1 : -1))
            setKey(location.key)
        });

    }, [key]);

    const toggleProperty = (arr, index, propName) => {
        const oldItem = arr[index];
        const value = !oldItem[propName];

        const item = {...arr[index], [propName]: value};
        rbacService.updateUser(item).then(() => {
        });
        return [...arr.slice(0, index), item, ...arr.slice(index + 1)];
    };

    const onToggleActive = (index) => {
        setUsers(toggleProperty(users, index, 'active'));
    };

    const onDelete = (index) => {

        const user = users[index];

        setUsers([...users.slice(0, index), ...users.slice(index + 1)]);

        rbacService.deleteUser(user).then(() => {
        });
    };

    const onFilterChange = (filter) => {
        setFilter(filter);
    };

    const onSearchChange = (search) => {
        setSearch(search);
    };

    const filterItems = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (item.active));
        } else if (filter === 'inactive') {
            return items.filter((item) => (!item.active));
        }
    }

    const searchItems = (items, search) => {
        if (search.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    }

    const inactiveCount = users.filter((item) => item.active).length;
    const usersCount = users.length - inactiveCount;
    const visibleItems = searchItems(filterItems(users, filter), search);

    return (<div className="rbac-main">
            <AppHeader users={usersCount} inactive={inactiveCount}/>

            <div className="search-panel d-flex">
                <SearchPanel
                    onSearchChange={onSearchChange}/>

                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={onFilterChange}/>
            </div>

            <UsersList
                items={visibleItems}
                onToggleActive={onToggleActive}
                onDelete={onDelete}
            />

            <ItemAddForm/>
        </div>);
}

export default Main;