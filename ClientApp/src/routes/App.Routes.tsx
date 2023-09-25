import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Home from '../views/app/Home';

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );

}