import React, { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';
import { UserProvider } from '../contexts/User';

export default function IndexRoutes() {
    const { signed } = useAuth();

    return (
        signed ? 
            <UserProvider>
                <AppRoutes />
            </UserProvider> 
        : <AuthRoutes />
    );
}