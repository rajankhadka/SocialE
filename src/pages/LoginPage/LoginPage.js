import React,{useState,useRef} from 'react';
import classes from "./LoginPage.module.css";

//material UI
import { Lock, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, IconButton, TextField } from '@material-ui/core';

//implementating redux
import { connect } from "react-redux";
import { openRegister } from "../../redux/actions/showregisterAction";
import { openForgetPassword } from "../../redux/actions/showforgetpasswordAction";
import { savedtoken } from "../../redux/actions/tokensavedAction"

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

    //two factor auth
    const [twoAuth, setTwoAuth] = useState("");
    const [message, setMessage] = useState("");
    const [otpcode, setOtpcode] = useState({
        value: "",
        error: false,
        helperText:"",
    });


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
        setErrormsg("");
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
            .then(token => {
                props.savedtokenAction(token.key);
                console.log(token);
                if (token.status) {
                    setErrormsg(token.status);
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
                    
                    console.log("loginhistory--->", loginHistory);
                    setButtondisable(false);
                    fetch("http://127.0.0.1:8000/signin/2f/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`Token ${token.key}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            // setToken(data.key)
                            
                            console.log(data);
                            if (data.status === "Email Based"){
                                console.log("Email Based");
                                setTwoAuth("email");
                                setMessage("Check Your Email");
                            } else if (data.message === "Totp Implemented") {
                                console.log("Totp Implemented");
                                setTwoAuth("totp");
                                setMessage("Check Google Authenticator")
                            } else if (data.status === "SMS Based") {
                                console.log("SMS Based");
                                setTwoAuth("sms");
                                setMessage("Check Your SMS")
                            } else if(data.message === "Two Factor Auth not implemented") {
                                window.localStorage.setItem('token', token.key);
                                console.log(token);
                                console.log("Two Factor Auth not implemented");
                                console.log("time to online");
                                setTwoAuth("");
                                setMessage("");
                                loginHistory.replace("/")
                            }
                        })
                        .catch(err => console.log(err))
                    // loginHistory.replace("/")
                }
                
                
            })
            .catch(err => console.log(err));

    }

    //otp code verify
    const otpcodeHandler = (event) => {
        event.preventDefault();
        console.log(props.token);
        if (twoAuth === 'totp') {
            fetch("http://127.0.0.1:8000/signin/totp/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${props.token}`
                },
                body: JSON.stringify({
                    otp_code:otpcode.value
                })
            })
                .then(response => response.json())
                .then(data1 => {
                    console.log(data1);
                    if (data1.message === "OTP Verified") {

                        
                        window.localStorage.setItem('token', props.token);
                        setOtpcode(prevState => {
                            return {
                                ...prevState,
                                error: false,
                                helperText:""
                            }
                        })

                        loginHistory.replace("/")
                    } else  {
                        setOtpcode(prevState => {
                            return {
                                ...prevState,
                                error: true,
                                helperText:"Incorrect OTP"
                            }
                        })
                    }
                })
                .catch(err => console.log(err));
        } else {
            console.log(otpcode.value);
            fetch("http://127.0.0.1:8000/verify/otp/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${props.token}`
                },
                body: JSON.stringify({
                    otp_code:otpcode.value
                })
            })
                .then(response => response.json())
                .then(data1 => {
                    console.log(data1);
                    if (data1.status === "OTP Verified") {

                        
                        window.localStorage.setItem('token', props.token);
                        setOtpcode(prevState => {
                            return {
                                ...prevState,
                                error: false,
                                helperText:""
                            }
                        })

                        loginHistory.replace("/")
                    } else  {
                        setOtpcode(prevState => {
                            return {
                                ...prevState,
                                error: true,
                                helperText:"Incorrect OTP"
                            }
                        })
                    }
                })
                .catch(err => console.log(err));
        }        
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.loginPage__header}>
                <Lock />
                <h3 className={classes.loginPage__header__login}>Login</h3>
            </div>
            <div className={classes.loginPage__body}>
                {errormsg.length  > 0 &&
                    <p
                        style={{
                            
                        textAlign: "center",
                           color:"red", 
                            
                        }}
                    >
                        no user with such credentials
                    </p>
                }

                {
                    twoAuth.length === 0
                        ?
                        <form ref={form} onSubmit={submitHandler} >
                            <TextField variant="outlined"
                                label="Email" type="email" name="email"
                                className={classes.loginPage__input}
                                onChange={inputFieldHandler}
                                value={email.value}
                                onBlur={validationHandler}
                                error={email.error}
                                helperText={email.helperText}
                                onFocus={() => {
                                    console.log("no focus called");
                                    setErrormsg("");
                                    setEmail(prevState => {
                                        return {
                                            ...prevState,
                                            error: false
                                        }
                                    })
                                }}
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
                                            style={{marginLeft: password.showPassword && "62px" }}
                                            onClick={showPasswordHandler}
                                            edge="end"
                                        >
                                            {password.showPassword ? <Visibility /> :<VisibilityOff/>}
                                        </IconButton>
                                }}

                                onFocus={() => {
                                    setPassword(prevState => {
                                        return {
                                            ...prevState,
                                            error : false,
                                        }
                                    })
                                }}
                                
                            />

                            <Button variant="contained"
                                type="submit" color="primary" disabled={ buttondisable || initialclick }
                                className={classes.loginPage__button}
                            >
                                Sign In
                            </Button>

                        </form>
                        :
                        <div style={{ width: "300px" }}>
                            <p>
                                {message}
                            </p>
                            <form onSubmit={otpcodeHandler}>
                                <TextField
                                    style={{width:"300px"}}
                                    variant="outlined"
                                    label="OTP Code" type="text" name={twoAuth}
                                    className={classes.loginPage__input}
                                    onChange={(event) => {
                                        setOtpcode(prevState => {
                                            return {
                                                ...prevState,
                                                value:event.target.value
                                            }
                                        })
                                    }}
                                    value={otpcode.value}
                                    onBlur={()=>{}}
                                    error={otpcode.error}
                                    helperText={otpcode.helperText}
                                    onFocus={() => {
                                        console.log("no focus called");
                                        
                                        setOtpcode(prevState => {
                                            return {
                                                ...prevState,
                                                error: false
                                            }
                                        })
                                    }}
                                />
                                <Button variant="contained"
                                    type="submit" color="primary" 
                                    className={classes.loginPage__button}
                                >
                                    Verify OTP
                                </Button>
                            </form>
                        </div>
                        
                        
                }
            </div>
            <div className={classes.loginPage__footer}>
                {/* <Button color="primary"
                    className={classes.loginPage__forget}
                    onClick ={props.openRegisterAction}
                >
                    Sign Up
                </Button> */}

                {
                    twoAuth.length === 0
                    &&
                    <Button color="primary"
                    className={classes.loginPage__forget}
                    onClick ={ props.openForgetPasswordAction}
                    >
                        Forgot Password
                    </Button>
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token:state.tokensavedReducers.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openRegisterAction: () => dispatch(openRegister()),
        openForgetPasswordAction: () => dispatch(openForgetPassword()),
        savedtokenAction:(data) => dispatch(savedtoken(data)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
