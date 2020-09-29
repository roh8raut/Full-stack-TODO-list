import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validate';


const renderNameField = ({ input, label, meta, ...custom }) => (
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

const renderEmailField = ({ input, label, meta, ...custom }) => {
    return <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
}

const renderPasswordField = ({ input, label, meta, ...custom }) => {
    return <TextField
        className={custom.className}
        label={label}
        variant="outlined"
        margin="normal"
        error={meta.touched && !meta.valid}
        helperText={meta.touched && meta.error}
        {...input}
    />
}

const handleSubmit = (event, values) => {
    event.preventDefault()
    console.log("handling submit", event, values);
}


const Signup = ({ fixedWidth, handleSubmit, pristine, submitting }) => {

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
            <div>
                <Button className={fixedWidth} disabled={pristine} variant="contained" color="primary" type="submit" >Sign Up</Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'Sign up',
    validate,
    handleSubmit
})(Signup)
