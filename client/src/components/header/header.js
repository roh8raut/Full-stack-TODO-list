import React from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { logOutUser } from '../../actions/taskaction';
import Grid from '@material-ui/core/Grid';


function Header({ isLoggedIn, dispatch }) {
    return (
        <Grid container justify="center">
            <Grid item style={{ marginLeft: "auto" }}>
                <Box fontWeight="fontWeightBold" fontSize="h4.fontSize" className="header" lineHeight={3}>
                    Todo List
                </Box>
            </Grid>
            <Grid item style={{ alignSelf: "center", marginLeft: "auto", marginRight: "10px" }}>
                {isLoggedIn && <Button variant="contained" onClick={() => dispatch(logOutUser())} color="secondary">Logout</Button>}
            </Grid>

        </Grid>

    )
}

export default Header
