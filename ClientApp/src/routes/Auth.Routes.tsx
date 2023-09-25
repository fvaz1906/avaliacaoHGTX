import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import SignIn from '../views/auth/SignIn';

export default function AuthRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </>
    );

}