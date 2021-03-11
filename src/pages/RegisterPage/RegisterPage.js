import React, { useState } from 'react'
import classes from "./RegisterPage.module.css";

//material UI
import { TextField,Button, } from '@material-ui/core';
import {  } from '@material-ui/icons';

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
            {/* <div className={classes.registerPage__header}>
                <h1>Sign Up</h1>

                <div>
                    <IconButton onClick={props.closeRegisterAction}>
                        <Close />
                    </IconButton>
                </div>
                
                
            </div> */}
            {/* <hr /> */}
            <div className={classes.registerPage__body}>
                <form>

                    <TextField variant="outlined"
                        label="FirstName"
                        type="text"
                        className={classes.registerPage__input}
                        name="firstName"
                        value={firstName.value}
                        onChange={
                            (event) => setFirstName(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <TextField variant="outlined"
                        label="LastName" type="text"
                        className={classes.registerPage__input}
                        name="lastName"
                        value={lastName.value}
                        onChange={
                            (event) => setLastName(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <TextField variant="outlined"
                        label="Email" type="email"
                        className={classes.registerPage__input}
                        name="email"
                        value={email.value}
                        onChange={
                            (event) => setEmail(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <TextField variant="outlined"
                        label="ContactNumber" type="number"
                        className={classes.registerPage__input}
                        name="contactNumber"
                        value={contactNumber.value}
                        onChange={
                            (event) => setContactNumber(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <TextField variant="outlined"
                        label="Password" type="password"
                        className={classes.registerPage__input}
                        name="password"
                        value={password.value}
                        onChange={
                            (event) => setPassword(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <TextField variant="outlined"
                        label="Confirm Password"
                        type="password"
                        className={classes.registerPage__input}
                        name="confirmPassword"
                        value={confirmPassword.value}
                        onChange={
                            (event) => setConfirmPassword(prevState => {
                                return {
                                    ...prevState,
                                    value: event.target.value
                                }
                            })
                        }
                    />

                    <Button variant="contained"
                        type="submit" color="primary"
                        className={classes.registerPage__button}
                    >
                        Register User
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
