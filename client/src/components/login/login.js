import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';

const renderEmailField = ({ input, label, meta, ...custom }) => (
    <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
)

const renderPasswordField = ({ input, label, meta, ...custom }) => (
    <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
)

const Login = ({ fixedWidth, handleSubmit, pristine, isLoading, errorMsg }) => {
    return (
        <form onSubmit={handleSubmit}>
            {errorMsg && errorMsg.status === "FAIL" && <h3>Invalid Credentails.</h3>}
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
            <div>
                <Button className={fixedWidth} disabled={pristine} variant="contained" color="primary" type="submit" >{isLoading ? "Loading..." : "Submit"}</Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'Login',
    validate,
})(Login)
