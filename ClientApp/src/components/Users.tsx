import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Grid from '../components/Grid';

interface Props {
    columns: GridColDef[],
    users : any
}

export default function Users(props : Props) {
	return (
		<React.Fragment>
            <Grid columns={props.columns} users={props.users} listName={"Lista de Usuários"} />
		</React.Fragment>
	);
}