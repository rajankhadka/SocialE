import React, { useState ,useEffect} from 'react'
import classes from "./RegisterPage.module.css";
import Modal from "../../components/Model/Model";
//material UI
import { TextField,Button, FormControl, InputLabel, Select, } from '@material-ui/core';
import {  } from '@material-ui/icons';

//implementing redux
import { connect } from "react-redux";
import { closeRegister } from "../../redux/actions/showregisterAction";
import UserPermissions from '../../components/UserPermissions/UserPermissions';
import { signinApi } from '../../api/signin/signin';

function RegisterPage(props) {

    const [firstName, setFirstName] = useState({
        error: false,
        helperText: "",
        value:""
    });

    const [lastName, setLastName] = useState({
        error: false,
        helperText: "",
        value: ""
    });

    const [email, setEmail] = useState({
        error: false,
        helperText: "",
        value: ""
    });

    const [contactNumber, setContactNumber] = useState({
        error: false,
        helperText: "",
        value: ""
    });

    const [password, setPassword] = useState({
        error: false,
        helperText: "",
        value: "",
        showPassword: false
    });

    const [confirmPassword, setConfirmPassword] = useState({
        error: false,
        helperText: "",
        value: "",
        showPassword: false
    });

    const [userName, setUserName] = useState({
        error: false,
        helperText: "",
        value: ""
    });

    const [group, setGroup] = useState({
        error: false,
        helperText: "",
        value:""
    });


    const [creategroup, setCreategroup] = useState(false);
    const [groupname, setGroupname] = useState("");

    const groupnameHandler = (event) => {
        console.log(groupname);
        setGroupname(event.target.value);
    }

    const creategroupHandler = () => {
        setCreategroup(false);

        if (groupname.length > 0) {
            setGroup(prevState => {
                return {
                    ...prevState,
                    value: groupname
                }
            });
        } else {
            setGroup(prevState => {
                return {
                    ...prevState,
                    value: ""
                }
            });
        }
        
    }

    //userregisterHandler
    const userregisterHandler = (event) => {
        event.preventDefault();
        console.log(firstName, lastName, userName, email, password, confirmPassword, contactNumber);
        if (password.value === confirmPassword.value) {
            console.log("password");
            fetch(signinApi.usersignup, {
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                    
                    <FormControl variant="outlined" className={classes.registerPage__input} size="small">
                        <InputLabel htmlFor="group">Group</InputLabel>
                        <Select
                            native
                            label="Group"
                            id="group"
                            name="group"
                            value={group.value}
                            onChange={(event) => {
                                
                                if (event.target.value === "Create Group") {
                                    setCreategroup(true);
                                }
                                setGroup((prevState) => {
                                    return {
                                        ...prevState,
                                        value: event.target.value
                                    }
                                })
                            }}
                        >
                            <option value="" />
                            <option value="Create Group">Create Group</option>
                            <option value="System Admin">Choose Group</option>
                        </Select>
                    </FormControl>

                    <Button variant="contained"
                        type="submit" color="primary"
                        className={classes.registerPage__button}
                    >
                        Register User
                    </Button>
                </form>
            </div>

            {
                creategroup
                    ?
                        
                            
                            <Modal>
                                <UserPermissions
                                    pageload={props.pageload}
                                    pageloadtrigger={props.pageloadtrigger}
                                    creategroup={creategroup}
                                    groupname={groupname}
                                    groupnameHandler={groupnameHandler}
                                    creategroupHandler={creategroupHandler}
                                />
                            </Modal>            
                        
                    :
                        null
                
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeRegisterAction : () => dispatch(closeRegister())
    }
}

export default connect(undefined, mapDispatchToProps)(RegisterPage);
