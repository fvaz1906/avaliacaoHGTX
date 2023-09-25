import * as React from 'react';
import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';

import Api from "../helpers/Api";

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface ProviderProps {
    children: React.ReactNode
}

interface IAuthContextData {
    token: string

    signed: any
    signIn: any
    signOut: any
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {

    const [token, setToken] = useState('');

    useEffect(() => {

        function loadStoragedData() {

            const data = {
                token: localStorage.getItem("token"),
                expiration: localStorage.getItem("expiration")
            }

            if (new Date(moment(data.expiration).format()) > new Date()) {
                if (data.token && data.expiration) {
                    Api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    setToken(data.token);
                }
            } else { signOut(); }

        }

        loadStoragedData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signed: !!token,
                token: token,

                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );

    async function signIn(email: string, password: string) {
        await Api.post('/Api/v1/Auth/Login', {
            Email: email,
            Password: password
        })
            .then(function (response) {
                if (response.data.token === null || response.data.token === "") {
                    console.log('erro');
                }
                else {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('expiration', response.data.validTo);
                    setToken(response.data.token);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function signOut() {
        if (!!token) {
            window.localStorage.clear();
            window.location.href = "/"
        }
    }

}

export function useAuth() {
    return useContext(AuthContext);
}