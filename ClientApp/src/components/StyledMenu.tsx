import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Modal from '@mui/material/Modal';
import Api from '../helpers/Api';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import CustomTabPanel from './CustomTabPanel';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { maskCPF, maskDate, emailIsValid, maskDateReverse, maskPhone } from '../helpers/Masks';
import moment from 'moment';
import { useAuth } from '../contexts/Auth';
import { Button, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import Swal from 'sweetalert2';
import Alert from '@mui/material/Alert';
import { useUser } from '../contexts/User';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
}));

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface Props {
    id : number
}

export default function CustomizeMenu(props : Props) 
{
    const { 
        name,
        email,
        cpf,
        dateBirth,
        password,
        passwordConfirmation,
        profile,
        telephone,
        cellPhone,
        status,

        SetName,
        SetEmail,
        SetCpf,
        SetDateBirth,
        SetPassword,
        SetPasswordConfirmation,
        SetProfile,
        SetTelephone,
        SetCellPhone,

        errorName,
        errorEmail,
        errorCPF,
        errorDateBirth,
        errorPassword,
        errorProfile,
    
        errorNameHelper,
        errorEmailHelper,
        errorCPFHelper,
        errorDateBirthHelper,

        showAlertSuccess,

        users,
        userProfiles,

        getUsersProfile,
        getUserById,
        removeUser,
        validatePostUser
    } = useUser();
    const { token } = useAuth();
    
    Api.defaults.headers.authorization = `Bearer ${token}`;
    const [showPassword, setShowPassword] = useState(false);

    const [openModalDetails, setOpenModalDetails] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [value, setValue] = useState(0);
    const open = Boolean(anchorEl);
    
    const [user, setUser] = useState<any>({});

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleOpenModalEdit = () => {
        getUsersProfile();
        getUserById(props.id);
        setAnchorEl(null);
        setOpenModalEdit(true);
    }

    const handleOpenModalDetails = () => {
        getUserById(props.id);
        setAnchorEl(null);
        setOpenModalDetails(true);
    }

    const handleRemoveUser = () => {
        setAnchorEl(null);
        Swal.fire({
            title: 'Atenção',
            text: "Deseja mesmo remover este usuário?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Não',
            confirmButtonText: 'Sim'
        }).then((result) => {
            if (result.isConfirmed) {
                removeUser(props.id);

            }
        })
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
        <div>
            <IconButton onClick={handleClick}> <MoreVertIcon /> </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleOpenModalEdit} disableRipple> <EditIcon /> Editar </MenuItem>
                <MenuItem onClick={handleRemoveUser} disableRipple> <DeleteForeverIcon /> Remover </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleOpenModalDetails} disableRipple> <AssignmentIndIcon /> Detalhes </MenuItem>
            </StyledMenu>
            <Modal
                open={openModalEdit}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Grid container spacing={2}>
                            <Grid item xs={1}> <AccountCircleIcon sx={{ fontSize: 35 }} /> </Grid>
                            <Grid item xs={10}> Editar Usuário </Grid>
                            <Grid item xs={1}> <IconButton onClick={() => setOpenModalEdit(false)}> <CloseIcon /> </IconButton> </Grid>
                        </Grid>
                    </Typography>
                    <Divider sx={{ mt : 1 , mb: 3 }} />
                    { showAlertSuccess ? 
                        <Alert variant="standard" severity="success"> Usuário Editado com sucesso </Alert>
                        : null
                    }
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Informações" {...a11yProps(0)} />
                            <Tab label="Contatos" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField 
                                    label="Nome" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    error={errorName} 
                                    helperText={errorNameHelper} 
                                    value={name} 
                                    onChange={ event => SetName(event.target.value) } />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField  
                                    label="E-mail" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    error={errorEmail} 
                                    helperText={errorEmailHelper} 
                                    value={email} 
                                    onChange={ event => SetEmail(event.target.value) } />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField  
                                    label="CPF" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    error={errorCPF} 
                                    helperText={errorCPFHelper} 
                                    value={cpf}
                                    onChange={ event => SetCpf(maskCPF(event.target.value)) }
                                    />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField  
                                    label="Data de Aniversário" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    error={errorDateBirth} 
                                    helperText={errorDateBirthHelper} 
                                    value={dateBirth} 
                                    onChange={ event => SetDateBirth(maskDate(event.target.value)) } />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth={true}
                                            error={errorPassword}
                                            value={password} 
                                            onChange={ event => SetPassword(event.target.value) }
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth={true}>
                                    <InputLabel htmlFor="standard-adornment-password">Confirmar Senha</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            fullWidth={true}
                                            error={errorPassword}
                                            value={passwordConfirmation} 
                                            onChange={ event => SetPasswordConfirmation(event.target.value) }
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                        />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" sx={{ mt: 2, minWidth: 360 }}>
                                    <InputLabel>Perfil de Usuário</InputLabel>
                                    <Select
                                        value={profile}
                                        label="Perfil do Usuário"
                                        error={errorProfile}
                                        onChange={event => SetProfile(event.target.value)}                                    
                                    >
                                        {userProfiles.map((item: any, i: number) => (
                                            <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <Button sx={{ marginLeft: 'auto' }} onClick={ () => validatePostUser('put') } variant="contained" className="float-right">Editar Usuário</Button>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Telefone" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    value={telephone} 
                                    onChange={ event => SetTelephone(maskPhone(event.target.value)) } />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField  
                                    label="Celular" 
                                    variant="standard" 
                                    fullWidth={true} 
                                    value={cellPhone} 
                                    onChange={ event => SetCellPhone(maskPhone(event.target.value)) } />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', mt: 3 }}>
                                <Button sx={{ marginLeft: 'auto' }} onClick={ () => validatePostUser('put')} variant="contained" className="float-right">Editar Contato</Button>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                </Box>
            </Modal>
            <Modal
                open={openModalDetails}
                
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Grid container spacing={2}>
                            <Grid item xs={1}> <AccountCircleIcon sx={{ fontSize: 35 }} /> </Grid>
                            <Grid item xs={10}> {name} </Grid>
                            <Grid item xs={1}> <IconButton onClick={() => setOpenModalDetails(false)}> <CloseIcon /> </IconButton> </Grid>
                        </Grid>
                    </Typography>
                    <Divider sx={{ mt : 1 , mb: 3 }} />
                    <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                <EmailIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box p={1}>
                                <Typography variant="body1" component="span"> {email} </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                <CalendarMonthIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box p={1}>
                                <Typography variant="body1" component="span"> {dateBirth} </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                {user.status ? <CheckIcon sx={{ fontSize: 20 }} /> : <CloseIcon sx={{ fontSize: 20 }} />}
                            </Box>
                            <Box p={1}>
                                <Typography variant="body1" component="span"> {status ? "Ativo" : "Inativo"} </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Divider sx={{ mt : 1 , mb: 3 }} />
                    <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                Contatos
                            </Box>
                        </Box>
                    </Grid>
                    { telephone != '' && telephone != null ? <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                <CallIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box p={1}>
                                <Typography variant="body1" component="span"> {telephone} </Typography>
                            </Box>
                        </Box>
                    </Grid> : null}
                    { cellPhone != '' && cellPhone != null ? <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                <CallIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box p={1}>
                                <Typography variant="body1" component="span"> {cellPhone} </Typography>
                            </Box>
                        </Box>
                    </Grid> : null}
                    {cellPhone == '' || cellPhone == null && telephone == '' || telephone == null ? <Grid container spacing={2}>
                        <Box display="flex" flexDirection="row" p={1}>
                            <Box p={1}>
                                <Typography variant="body2" component="span"> Nenhum contato cadastrado </Typography>
                            </Box>
                        </Box>
                    </Grid> : null}
                </Box>
            </Modal>
        </div>
    );

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
}