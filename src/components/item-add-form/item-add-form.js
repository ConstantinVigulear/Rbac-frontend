import React from 'react';
import {useNavigate} from "react-router-dom";

import './item-add-form.css';

const ItemAddForm = () => {

    const navigate = useNavigate();

    const onSubmit = () => {
        navigate('/users/new');
    };

    const onRefresh = () => {
        navigate(0);
    }

    return (
        <span
            className="bottom-panel d-flex">
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick={onSubmit}>New +</button>
            <button type="button"
                    className="btn btn-outline-secondary float-right ml-auto"
                    onClick={onRefresh}>Refresh</button>
            </span>
    );
}

export default ItemAddForm;