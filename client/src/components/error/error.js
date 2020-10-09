import React from 'react';
import { Alert } from '@material-ui/lab';

const Error = ({ msg }) => {
    return (
        <Alert style={{ margin: "0 10%" }} severity="error">{msg}</Alert>
    )
}

export default Error
