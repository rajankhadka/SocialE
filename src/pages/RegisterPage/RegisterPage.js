import React, { useState } from 'react'
import classes from "./RegisterPage.module.css";

//material UI
import { TextField,Button,IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

//implementing redux
import { connect } from "react-redux";
import { closeRegister } from "../../redux/actions/showregisterAction";

function RegisterPage(props) {

    const [firstName, setFirstName] = useState({
        error: false,
        helperText: "",
        value:""
    });

    const [lastName, setLastName] = useState({
        error: false,
        helperText: "",
        value:""
    })

    const [email, setEmail] = useState({
        error: false,
        helperText: "",
        value:""
    })

    const [contactNumber, setContactNumber] = useState({
        error: false,
        helperText: "",
        value:""
    })

    const [password, setPassword] = useState({
        error: false,
        helperText: "",
        value: "",
        showPassword: false
    })

    const [confirmPassword, setConfirmPassword] = useState({
        error: false,
        helperText: "",
        value: "",
        showPassword: false
    })

    return (
        <div className={classes.registerPage}>
            <div className={classes.registerPage__header}>
                <h1>Sign Up</h1>

                <div>
                    <IconButton onClick={props.closeRegisterAction}>
                        <Close />
                    </IconButton>
                </div>
                
                
            </div>
            <hr />
            <div className={classes.registerPage__body}>
                <form>

                    <TextField variant="outlined"
                        label="FirstName"
                        type="text"
                        className={classes.registerPage__input}
                        name="firstName"
                        value={firstName.value}
                    />

                    <TextField variant="outlined"
                        label="LastName" type="text"
                        className={classes.registerPage__input}
                        name="lastName"
                        value={lastName.value}
                    />

                    <TextField variant="outlined"
                        label="Email" type="email"
                        className={classes.registerPage__input}
                        name="email"
                        value={email.value}
                    />

                    <TextField variant="outlined"
                        label="ContactNumber" type="number"
                        className={classes.registerPage__input}
                        name="contactNumber"
                        value={contactNumber.value}
                    />

                    <TextField variant="outlined"
                        label="Password" type="password"
                        className={classes.registerPage__input}
                        name="password"
                        value={password.value}
                    />

                    <TextField variant="outlined"
                        label="Confirm Password"
                        type="password"
                        className={classes.registerPage__input}
                        name="confirmPassword"
                        value={confirmPassword.value}
                    />

                    <Button variant="contained"
                        type="submit" color="primary"
                        className={classes.registerPage__button}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeRegisterAction : () => dispatch(closeRegister())
    }
}

export default connect(undefined, mapDispatchToProps)(RegisterPage);
