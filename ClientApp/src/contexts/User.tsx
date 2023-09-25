import * as React from 'react';
import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import { maskCPF, maskDate, maskDateReverse, emailIsValid, maskPhone } from '../helpers/Masks';

import Api from "../helpers/Api";

const UserContext = createContext<IUserContextData>({} as IUserContextData);

interface ProviderProps {
    children: React.ReactNode
}

interface IUserContextData {
    name: string
    email: string
    cpf: string
    dateBirth: string
    password: string
    passwordConfirmation: string
    profile: string
    telephone: string
    cellPhone: string,
    status: boolean,

    SetName: any,
    SetEmail: any,
    SetCpf: any,
    SetDateBirth: any,
    SetPassword: any,
    SetPasswordConfirmation: any,
    SetProfile: any,
    SetTelephone: any,
    SetCellPhone: any,
    SetStatus: any,

    errorName: boolean,
    errorEmail: boolean,
    errorCPF: boolean,
    errorDateBirth: boolean,
    errorPassword: boolean,
    errorProfile: boolean,

    SetErrorName: any,
    SetErrorEmail: any,
    SetErrorCPF: any,
    SetErrorDateBirth: any,
    SetErrorPassword: any,
    SetErrorProfile: any,

    errorNameHelper: string,
    errorEmailHelper: string,
    errorCPFHelper: string,
    errorDateBirthHelper: string,
    errorPasswordHelper: string,

    openModal: boolean,
    handleOpenModal: any,
    handleCloseModal: any,
    showAlertSuccess: boolean,

    user: any,
    users: any
    userProfiles: any

    getUsers: any
    getUserById: any,
    removeUser: any,
    getUsersProfile: any
    postUser: any
    putUser: any
    validatePostUser: any,
}

export const UserProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => 
{

    const [user, setUser] = useState<any>({});
    const [users, setUsers] = useState<any[]>([]);
    const [userProfiles, setUserProfiles] = useState<any[]>([]);

    const [openModal, setOpenModal] = useState(false);
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [profile, setProfile] = useState('');
    const [telephone, setTelePhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [status, setStatus] = useState(false);

    const SetName = (value: string) => setName(value);
    const SetEmail = (value: string) => setEmail(value);
    const SetCpf = (value: string) => setCPF(value);
    const SetDateBirth = (value: string) => setDateBirth(value);
    const SetPassword = (value: string) => setPassword(value);
    const SetPasswordConfirmation = (value: string) => setPasswordConfirmation(value);
    const SetProfile = (value: string) => setProfile(value);
    const SetTelephone = (value: string) => setTelePhone(value);
    const SetCellPhone = (value: string) => setCellPhone(value);
    const SetStatus = (value: boolean) => setStatus(value);

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorCPF, setErrorCPF] = useState(false);
    const [errorDateBirth, setErrorDateBirth] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorProfile, setErrorProfile] = useState(false);

    const SetErrorName = (value: boolean) => setErrorName(value);
    const SetErrorEmail = (value: boolean) => setErrorEmail(value);
    const SetErrorCPF = (value: boolean) => setErrorCPF(value);
    const SetErrorDateBirth = (value: boolean) => setErrorDateBirth(value);
    const SetErrorPassword = (value: boolean) => setErrorPassword(value);
    const SetErrorProfile = (value: boolean) => setErrorProfile(value);

    const [errorNameHelper, setErrorNameHelper] = useState('');
    const [errorEmailHelper, setErrorEmailHelper] = useState('');
    const [errorCPFHelper, setErrorCPFHelper] = useState('');
    const [errorDateBirthHelper, setErrorDateBirthHelper] = useState('');
    const [errorPasswordHelper, setErrorPasswordHelper] = useState('');

    const SetErrorNameHelper = (value: string) => setErrorNameHelper(value);
    const SetErrorEmailHelper = (value: string) => setErrorEmailHelper(value);
    const SetErrorCPFHelper = (value: string) => setErrorCPFHelper(value);
    const SetErrorDateBirthHelper = (value: string) => setErrorDateBirthHelper(value);
    const SetErrorPasswordHelper = (value: string) => setErrorPasswordHelper(value);

    const handleOpenModal = () => {
        SetName('')
        SetEmail('')
        SetCpf('')
        SetDateBirth('')
        SetPassword('')
        SetPasswordConfirmation('')
        SetProfile('')
        SetTelephone('')
        SetCellPhone('')
        setOpenModal(true);
    }

    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        getUsers();
        getUsersProfile();
    }, []);

    return (
        <UserContext.Provider
            value={{
                name: name,
                email: email,
                cpf: cpf,
                dateBirth: dateBirth,
                password: password,
                passwordConfirmation: passwordConfirmation,
                profile: profile,
                telephone: telephone,
                cellPhone: cellPhone,
                status: status,

                SetName,
                SetEmail,
                SetCpf,
                SetDateBirth,
                SetPassword,
                SetPasswordConfirmation,
                SetProfile,
                SetTelephone,
                SetCellPhone,
                SetStatus,

                errorName: errorName,
                errorEmail: errorEmail,
                errorCPF: errorCPF,
                errorDateBirth: errorDateBirth,
                errorPassword: errorPassword,
                errorProfile: errorProfile,
            
                SetErrorName,
                SetErrorEmail,
                SetErrorCPF,
                SetErrorDateBirth,
                SetErrorPassword,
                SetErrorProfile,
            
                errorNameHelper: errorNameHelper,
                errorEmailHelper: errorEmailHelper,
                errorCPFHelper: errorCPFHelper,
                errorDateBirthHelper: errorDateBirthHelper,
                errorPasswordHelper: errorPasswordHelper,

                openModal,
                handleOpenModal,
                handleCloseModal,
                showAlertSuccess,

                user: user,
                users : users,
                userProfiles: userProfiles,

                getUsers,
                getUserById,
                removeUser,
                getUsersProfile,
                postUser,
                putUser,
                validatePostUser
            }}
        >
            {children}
        </UserContext.Provider>
    );

    async function getUsers() {
        await Api.get('/Api/v1/user')
            .then(function (response) {
                let users: any = [];
                 response.data.forEach((value: any) => {
                    users.push({
                        id : value.id,
                        name : value.name,
                        email : value.email,
                        cpf : maskCPF(value.cpf),
                        status : value.status ? 'Ativo' : 'Inativo'
                    });
                });
                setUsers(users)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getUserById(id: number) {
        await Api.get('/Api/v1/user/' + id)
            .then(function (response) {
                var birth = new Date(response.data.dateBirth);
                let user: any = {
                    id : response.data.id,
                    name : response.data.name,
                    email : response.data.email,
                    cpf : maskCPF(response.data.cpf),
                    telephone : response.data.telephone,
                    cellphone : response.data.cellphone,
                    dateBirth : moment(birth).format('DD/MM/YYYY'),
                    status : response.data.status ? 'Ativo' : 'Inativo'
                };
                setId(user.id);
                setName(user.name);
                setEmail(user.email);
                setCPF(user.cpf);
                setDateBirth(user.dateBirth);
                setProfile(response.data.profileId);
                setTelePhone(user.telephone);
                setCellPhone(user.cellphone);
                setStatus(user.status);
                setUser(user)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function getUsersProfile() {
        await Api.get('/Api/v1/UserProfile')
            .then(function (response) {
                setUserProfiles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function postUser() {
        await Api.post('/Api/v1/user', {
            name: name,
            email: email,
            cpf: cpf,
            dateBirth: maskDateReverse(dateBirth),
            telephone: telephone,
            cellPhone: cellPhone,
            password: password,
            profileId: profile
        })
            .then(function (response) {
                if (response.status == 200)
                {
                    handleCloseModal();
                    setName('');
                    setEmail('');
                    setCPF('');
                    setDateBirth('');
                    setPassword('');
                    setPasswordConfirmation('');
                    setProfile('');
                    setTelePhone('');
                    setCellPhone('');
                    getUsers();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function putUser() {
        await Api.put('/Api/v1/user', {
            id: id,
            name: name,
            email: email,
            cpf: cpf,
            telephone: telephone,
            cellPhone: cellPhone,
            dateBirth: maskDateReverse(dateBirth),
            password: password,
            profileId: profile
        })
            .then(function (response) {
                if (response.status == 200)
                {
                    getUsers();
                    setShowAlertSuccess(true);
                    setTimeout(() => {
                        setShowAlertSuccess(false);
                      }, 2000);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function removeUser(id: number) {
        await Api.delete('/Api/v1/user/' + id)
            .then(function (response) {
                if (response.status == 200)
                {
                    getUsers();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function validatePostUser(type: string)
    {
        let bool = false;
        setErrorName(false);
        setErrorEmail(false);
        setErrorCPF(false);
        setErrorDateBirth(false);
        setErrorPassword(false);
        setErrorProfile(false);
        setErrorNameHelper('');
        setErrorEmailHelper('');
        setErrorCPFHelper('');
        setErrorDateBirthHelper('');
        setErrorPasswordHelper('');

        if (profile == '') {
            bool = true
            setErrorProfile(true);
        }

        if (name == '') {
            bool = true
            setErrorName(true);
            setErrorNameHelper('Insira seu nome');
        }

        if (email == '') {
            bool = true
            setErrorEmail(true);
            setErrorEmailHelper('Insira seu e-mail');
        }
        else if (!emailIsValid(email))
        {
            bool = true
            setErrorEmail(true);
            setErrorEmailHelper('E-mail Inválido');
        }

        if (cpf == '') {
            bool = true
            setErrorCPF(true);
            setErrorCPFHelper('Insira seu cpf');
        }

        if (dateBirth == '') {
            bool = true
            setErrorDateBirth(true);
            setErrorDateBirthHelper('Insira sua data de aniversário');
        }

        if (type == 'put')
        {
            if (password != '' || passwordConfirmation != '') {
                if (password.length < 8 || passwordConfirmation.length < 8)
                {
                    bool = true
                    setErrorPassword(true);
                    setErrorPasswordHelper('Insira mais de 8 caracteres');
                }
                else if (password != passwordConfirmation)
                {
                    bool = true
                    setErrorPassword(true);
                    setErrorPasswordHelper('Senhas devem ser iguais');
                }
            }
        }
        else
        {
            if (password == '' || passwordConfirmation == '') {
                bool = true
                setErrorPassword(true);
                setErrorPasswordHelper('Insira sua senha e confirmação de senha');
            }
            else if (password.length < 8 || passwordConfirmation.length < 8)
            {
                bool = true
                setErrorPassword(true);
                setErrorPasswordHelper('Insira mais de 8 caracteres');
            }
            else if (password != passwordConfirmation)
            {
                bool = true
                setErrorPassword(true);
                setErrorPasswordHelper('Senhas devem ser iguais');
            }
        }


        if (!bool) { if (type == 'put') { putUser(); } else { postUser(); } }

    }

}

export function useUser() {
    return useContext(UserContext);
}