function fieldRequired(v, message){
    return !!v || message
}

function emailFieldCheck(v) {
    return /.+@.+\..+/.test(v) || 'Email must be valid'
}

function passwordFieldCheck(v) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v) || 'Password must has min. 8 chars, 1 uppercase, 1 lowercase, and 1 number'
}

export { fieldRequired, emailFieldCheck, passwordFieldCheck }