const validate = values => {
    const errors = {}
    const requiredFields = [
        'name',
        'email',
        'password',
        'task'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

// const validateObj = {
//     required: value => {
//         console.log(value);
//         return value ? undefined : 'Required.....'
//     },
//     maxLength: max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
//     email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
// }

export default validate;