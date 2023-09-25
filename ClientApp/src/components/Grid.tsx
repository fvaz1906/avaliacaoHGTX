import * as React from 'react';
import { ptBR } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridColDef, GridValueGetterParams, nlNL } from '@mui/x-data-grid';
import Title from './Title';

interface Props {
    columns: GridColDef[],
    users : any,
    listName: string
}

export default function Grid(props : Props) {

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976d2' },
            },
        },
        ptBR,
    );

	return (
		<React.Fragment>
            <ThemeProvider theme={theme}>
                <Title>{props.listName}</Title>
                <DataGrid
                    rows={props.users}
                    columns={props.columns}
                    rowSelection={false}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 50, 100]}
                />
            </ThemeProvider>
		</React.Fragment>
	);
}