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

    const [userName, setUserName] = useState({
        error: false,
        helperText: "",
        value: ""
    })

    //userregisterHandler
    const userregisterHandler = (event) => {
        event.preventDefault();
        console.log(firstName, lastName, userName, email, password, confirmPassword, contactNumber);
        if (password.value === confirmPassword.value) {
            console.log("password");
            fetch("http://127.0.0.1:8000/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: firstName.value,
                    last_name: lastName.value,
                    email: email.value,
                    username: userName.value,
                    password: password.value,
                    confirm_password: confirmPassword.value,
                    phonenumber: contactNumber.value
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
        } else {
            console.log("password mismatch");
        }
    }

    return (
        <div className={classes.registerPage}>
            
            <div className={classes.registerPage__body}>
                <form onSubmit={userregisterHandler}>

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
                        label="UserName"
                        type="text"
                        className={classes.registerPage__input}
                        name="userName"
                        value={userName.value}
                        onChange={
                            (event) => setUserName(prevState => {
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
                        label="ContactNumber" type="text"
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
