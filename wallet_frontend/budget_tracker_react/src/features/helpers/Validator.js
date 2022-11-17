export const validateLoginForm = ({ mail, password }) => {
    const isMailValid = validateMail(mail)
    const isPasswordValid = validatePassword(password);

    return isMailValid && isPasswordValid;
}

export const validateRegisterForm = ({ email, password, username, name }) => {
    return (
        validateMail(email) &&
        validatePassword(password) &&
        validateUsername(username) &&
        validateName(name)
    )
}

const validatePassword = (password) => {
    return password.length > 5 && password.length < 16;
}

export const validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(mail)
}

const validateUsername = (username) => {
    return username.length > 2 && username.length < 13
}

const validateName = (name) => {
    return name.length > 2 && name.length < 25
}


