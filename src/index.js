import React from "react";
import ReactDOM from "react-dom/client";
import UserPage from "./components/user-page";
import Main from "./components/main";
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Main/>}/>
            <Route path="/users" exact element={<Main/>}/>
            <Route path="/users/" exact element={<Main/>}/>
            <Route path="/users/:userEmail" element={<UserPage/>}/>
            <Route path="users/new" exact element={<UserPage/>}/>
        </Routes>
    </BrowserRouter>);