import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';
import Error from '../error/error';
import CircularProgress from '@material-ui/core/CircularProgress';


const renderNameField = ({ input, label, meta, ...custom }) => (
    <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        autoComplete='off'
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
)

const renderEmailField = ({ input, label, meta, ...custom }) => {
    return <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        autoComplete='off'
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
}

const renderPasswordField = ({ input, label, meta, ...custom }) => {
    return <TextField
        className={custom.className}
        label={label}
        type="password"
        variant="outlined"
        margin="normal"
        autoComplete='off'
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
}

const Signup = ({ fixedWidth, handleSubmit, pristine, isLoading, msg }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="name"
                    component={renderNameField}
                    label="Name"
                    className={fixedWidth}
                />
            </div>
            <div>
                <Field
                    name="email"
                    component={renderEmailField}
                    label="Email"
                    className={fixedWidth}
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={renderPasswordField}
                    label="Password"
                    className={fixedWidth}
                />
            </div>
            { msg && <Error msg={msg} />}
            <div>
                <Button className={`btn ${fixedWidth}`} disabled={pristine} variant="contained" type="submit" >
                    {isLoading ? <CircularProgress color="secondary" /> : "Signup"}
                </Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'Sign up',
    validate,
})(Signup)
