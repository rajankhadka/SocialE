import React,{useState,useRef} from 'react';
import classes from "./LoginPage.module.css";

//material UI
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, IconButton, TextField } from '@material-ui/core';

//implementating redux
import { connect } from "react-redux";
import { openRegister } from "../../redux/actions/showregisterAction";
import { openForgetPassword } from "../../redux/actions/showforgetpasswordAction";

//using third party packages
import validator from 'validator';

//react-router
import { useHistory } from "react-router-dom";

function LoginPage(props) {

    let loginHistory = useHistory();
    // console.log("loginHistory", loginHistory);

    const form = useRef(null);

    const [email, setEmail] = useState({
        error: false,
        helperText: "",
        value:""
    });

    const [password, setPassword] = useState({
        error: false,
        helperText: "",
        value: "",
        showPassword : "false"
    });

    const [errormsg, setErrormsg] = useState("");

    const [buttondisable, setButtondisable] = useState(false);

    const [initialclick, setInitialclick] = useState(true);
    //saving value of input field to the local state

    const inputFieldHandler = (event) => {
        console.log(password.showPassword)
        switch (event.target.name) {
            case "email":
                setEmail(preState => {
                    return {
                        ...preState,
                        value: event.target.value
                    }
                })
                break;
            case "password":
                setPassword(preState => {
                    return {
                        ...preState,
                        value: event.target.value
                    }
                })
                break;
            default:
                break;
        }
    }

    //allowing and disallowing the password field

    const showPasswordHandler = () => {
        setPassword(prevState => {
            return {
                ...prevState,
                showPassword : !password.showPassword
            }
        })
    }

    // checking the validation  before login to the system
    const validationHandler = (event) => {
        switch (event.target.name) {
            case "email":
                if (!validator.isEmail(email.value)) {
                    setEmail(prevState => {
                        return {
                            ...prevState,
                            error: true,
                            helperText: "Invalid Email",
                        }
                    })
                    setButtondisable(true)
                } else {
                    setEmail(prevState => {
                        return {
                            ...prevState,
                            error: false,
                            helperText: "",
                        }
                    })
                    setButtondisable(false);
                    setInitialclick(false);
                }
                break;
            default:
                break;
        }
        
    }

    //submitting the data to the server
    const submitHandler = (event) => {
        event.preventDefault();
        
        fetch("http://127.0.0.1:8000/signin/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
            
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    setErrormsg(data.status);
                    setEmail(prevState => {
                        return {
                            ...prevState,
                            error: true,
                        }
                    });
                    setPassword(prevState => {
                        return {
                            ...prevState,
                            error: true,
                        }
                    })
                } else {
                    window.localStorage.setItem('user', data.user);
                    window.localStorage.setItem('token', data.key);
                    console.log("loginhistory--->", loginHistory);
                    setButtondisable(false);
                    loginHistory.replace("/")
                }
                
                
            })
            .catch(err => console.log(err));

    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.loginPage__header}>
                <Lock />
                <h3 className={classes.loginPage__header__login}>Login</h3>
            </div>
            <div className={classes.loginPage__body}>
                {errormsg.length > 0 &&
                    <p
                        style={{
                            
                        textAlign: "center",
                           color:"red", 
                            
                        }}
                    >
                        no user with such credentials
                    </p>}
                <form ref={form} onSubmit={submitHandler} >
                    <TextField variant="outlined"
                        label="Email" type="email" name="email"
                        className={classes.loginPage__input}
                        onChange={inputFieldHandler}
                        value={email.value}
                        onBlur={validationHandler}
                        error={email.error}
                        helperText = {email.helperText}
                    />

                    <TextField variant="outlined"
                        label="Password" name="password"
                        type={password.showPassword ? "password" : "text"} 
                        className={classes.loginPage__input}
                        onChange={inputFieldHandler}
                        value={password.value}
                        error={password.error}
                        InputProps={{
                            endAdornment: 
                                <IconButton
                                    onClick={showPasswordHandler}
                                    edge="end"
                                >
                                    {password.showPassword ?<Visibility /> :<VisibilityOff/>}  
                                </IconButton>
                        }}
                        
                    />

                    <Button variant="contained"
                        type="submit" color="primary" disabled={ buttondisable || initialclick }
                        className={classes.loginPage__button}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
            <div className={classes.loginPage__footer}>
                {/* <Button color="primary"
                    className={classes.loginPage__forget}
                    onClick ={props.openRegisterAction}
                >
                    Sign Up
                </Button> */}

                <Button color="primary"
                    className={classes.loginPage__forget}
                    onClick ={ props.openForgetPasswordAction}
                >
                    Forgot Password
                </Button>
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openRegisterAction: () => dispatch(openRegister()),
        openForgetPasswordAction : () => dispatch(openForgetPassword()),
    }
}

export default connect(undefined,mapDispatchToProps)(LoginPage);
