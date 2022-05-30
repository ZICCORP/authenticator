

export const handleEmailOnChange = (event, setInputState, inputState) => {
    setInputState({ ...inputState, email: event.target.value })

}

export const handleFieldOnChange = (event, field, signupInputs, setSignupInputs, setIsFieldClicked) => {

    if (field === 'firstName') {
        setIsFieldClicked(true)
        return setSignupInputs({ ...signupInputs, firstName: event.target.value })
    }
    if (field === 'surName') {
        return setSignupInputs({ ...signupInputs, surName: event.target.value })
    }
    if (field === 'phoneNum') {
        return setSignupInputs({ ...signupInputs, phoneNum: event.target.value })
    }

    if (field === 'email') {
        return setSignupInputs({ ...signupInputs, email: event.target.value })
    }
    if (field === 'newPassword') {
        return setSignupInputs({ ...signupInputs, newPassword: event.target.value })
    }
    if (field === 'confirmPassword') {
        return setSignupInputs({ ...signupInputs, confirmPassword: event.target.value })
    }
    if (field === 'dob') {
        return setSignupInputs({ ...signupInputs, dob: event.target.value })
    }
    if (field === 'gender') {
        return setSignupInputs({ ...signupInputs, gender: event.target.value })
    }
}

export const handleClose = (event, reason, setShowError) => {
    if (reason === 'clickaway') {
        return;
    }

    setShowError(false)
};

export const handleCheckBoxOnchange = (event, inputState, setInputState) => {
    setInputState({ ...inputState, checked: event.target.checked })
    console.log(event.target.checked);
}



export const handleMouseDownPassword = (event) => {
    event.preventDefault()
}


export const handleClickShowPassword = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword)
}



export const handlePasswordOnChange = (event, setInputState, inputState) => {
    setInputState({ ...inputState, password: event.target.value })

}

export const checkPassword = (inputState, setErrormsg, setShowError) => {
    // To check a password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    if (inputState.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
        console.log('Valid password');
    }
    else {
        setErrormsg('Incorrect Password ')
        setShowError(true)
        console.log('Incorrect password');

    }
}

export const checkPhoneNum = (inputState, setErrormsg, setShowError) => {
    const temPhone = inputState.phone;
    var output = [temPhone.slice(0, 4), temPhone.slice(4, 9), temPhone.slice(9,)].join('');

    if (output.match(/^\+?(234)\)?[-]?([0-9]{5})[-]?([0-9]{5,6})$/)) {
        console.log('Yes. it match');
    } else {
        setErrormsg('Incorrect Phone Number')
        setShowError(true)
        console.log('No. it did not match');

    }
}


export const handleLoginSubmit = (event, isEmailCorrect, isPasswordCorrect, setErrormsg, setShowError) => {
    event.preventDefault()
    if (isEmailCorrect === true) {
        console.log('Valid email address');
        if (isPasswordCorrect === true) {
            console.log('Valid password');

        } else if (isPasswordCorrect === false) {
            console.log('Invalid password');
            setErrormsg('InValid password')
            setShowError(true)
        } else {
            console.log('Password field is empty');
            setErrormsg('Password field is empty')
            setShowError(true)
        }
    } else if (isEmailCorrect === false) {
        console.log('Invalid email address');
        setErrormsg('Invalid email address')
        setShowError(true)
    } else {
        console.log('Email address field is empty');
        setErrormsg('Email address field is empty')
        setShowError(true)
    }
}

export const handleButton = (setIndex, index) => {
    setIndex(index + 1)
}





export const validate = values => {
    let letters = /^[A-Za-z]+$/;
    let numbers = /^[+]?[0-9]+$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const errors = {
    };
    if (!values.firstName) {
        errors.firstName = 'Required'
    } else if (!values.firstName.match(letters)) {
        errors.firstName = 'Can only contain alphabets'
    } else if (values.firstName.length > 20) {
        errors.firstName = 'Must be 20 characters or less'
    } else if (values.firstName.length < 2) {
        errors.firstName = 'Must be 2 characters or more'
    }

    if (!values.lastName) {
        errors.lastName = 'Required'
    } else if (!values.lastName.match(letters)) {
        errors.lastName = 'Can only contain alphabets'
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less'
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Must be 2 characters or more'
    }

    if (!values.phoneNum) {
        errors.phoneNum = 'Required'
    } else if (!values.phoneNum.match(numbers)) {
        errors.phoneNum = 'can only contain numbers and an optional leading plus(+) sign'
    } else if (values.phoneNum.length > 15 || values.phoneNum.length < 11 || values.phoneNum.length === 12) {
        errors.phoneNum = 'Must be a valid phone number'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!values.email.match(mailformat)) {
        errors.email = 'Must be a valid email'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (!values.password.match(passwordformat)) {
        errors.password = 'Must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Must be the same as password'
    }

    return errors;
}
