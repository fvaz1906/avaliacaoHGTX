import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import Users from '../../components/Users';
import { Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Api from '../../helpers/Api';
import { useAuth } from '../../contexts/Auth';
import { useEffect, useState } from 'react';
import { maskCPF, maskDate, maskDateReverse, emailIsValid, maskPhone } from '../../helpers/Masks';
import { GridColDef } from '@mui/x-data-grid';
import CustomizeMenu from '../../components/StyledMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import { useUser } from '../../contexts/User';

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

export default function Dashboard() {

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

        openModal,
        handleOpenModal,
        handleCloseModal,

        users,
        userProfiles,

        validatePostUser
    } = useUser();
    const { token } = useAuth();
    
    Api.defaults.headers.authorization = `Bearer ${token}`;

    const [showPassword, setShowPassword] = useState(false);
    const [search, setSearch] = useState('');

	const [open, setOpen] = useState(false);

    const lower = search.toLowerCase();
    const filter = users.filter((user: any) => user.name.toLowerCase().includes(lower));

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const drawerWidth: number = 240;
	const mdTheme = createTheme();

	interface AppBarProps extends MuiAppBarProps {
		open?: boolean;
	}

	const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
		({ theme, open }) => ({
			'& .MuiDrawer-paper': {
				position: 'relative',
				whiteSpace: 'nowrap',
				width: drawerWidth,
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
				boxSizing: 'border-box',
				...(!open && {
					overflowX: 'hidden',
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					width: theme.spacing(7),
					[theme.breakpoints.up('sm')]: {
						width: theme.spacing(9),
					},
				}),
			},
		}),
	);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'E-mail', flex: 1 },
        { field: 'cpf', headerName: 'CPF', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 0.5 },
        { field: 'Actions', headerName: 'Ações', flex: 0.5, renderCell: (params) => ( <CustomizeMenu id={params.row.id} /> ) },
    ];

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== 'open',
	})<AppBarProps>(({ theme, open }) => ({
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar sx={{ pr: '24px' }} >
						<IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
							Usuários
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
                        <ListItemButton href='/'>
                            <ListItemIcon> <PeopleIcon /> </ListItemIcon>
                            <ListItemText primary="Usuários" />
                        </ListItemButton>
					</List>
				</Drawer>
				<Box component="main" sx={{
					backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>

							<Grid item xs={12}>
								<Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
                                    <Grid container sx={{ mb: 4 }} spacing={2} justifyContent="flex-start">
                                        <Grid item xs={2}>
                                            <Button sx={{ width: '100%' }} onClick={handleOpenModal} variant="contained" size='medium'>Adicionar</Button>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField sx={{ width: '100%' }} value={search} size='small' label="Buscar Usuários" variant="outlined" onChange={(event) => setSearch(event.target.value) } />
                                        </Grid>
                                    </Grid>
									<Users users={filter} columns={columns} />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
            <Modal
                open={openModal}
            >
                <Box sx={style} component={"form"} noValidate autoComplete='off'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Grid container spacing={2}>
                            <Grid item xs={1}> <AccountCircleIcon sx={{ fontSize: 35 }} /> </Grid>
                            <Grid item xs={10}> Adicionar Usuário </Grid>
                            <Grid item xs={1}> <IconButton onClick={handleCloseModal}> <CloseIcon /> </IconButton> </Grid>
                        </Grid>
                    </Typography>
                    <Divider sx={{ mt : 2 , mb: 2 }} />
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
                        <Grid item xs={6}>
                            <TextField  
                                label="Telefone" 
                                variant="standard" 
                                fullWidth={true} 
                                value={telephone}
                                onChange={ event => SetTelephone(maskPhone(event.target.value)) }
                                />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField  
                                label="Celular" 
                                variant="standard" 
                                fullWidth={true} 
                                value={cellPhone} 
                                onChange={ event => SetCellPhone(maskPhone(event.target.value)) } />
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
                            <Button sx={{ marginLeft: 'auto' }} onClick={validatePostUser} variant="contained" className="float-right">Salvar Usuário</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
		</ThemeProvider>
	);
}