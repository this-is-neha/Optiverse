import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateTodo from "../todo/list.create";
import TodoList from "../todo/list.all";
import EditTodo from "../todo/list.edit";
import Home from "../home/home";

const RoutingConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/todos/create" element={<CreateTodo />} />
            <Route path="/todos/edit/:id" element={<EditTodo />} />

        </Routes>
    );
};

export default RoutingConfig;
