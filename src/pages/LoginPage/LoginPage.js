import React,{useState,useRef} from 'react';
import classes from "./LoginPage.module.css";

//material UI
import {  Lock, Visibility, VisibilityOff } from '@material-ui/icons';
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
import { signinApi } from '../../api/signin/signin';



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
        showPassword : false
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
        // console.log(password.value)
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

    //get phonenumber
    const [phonenumber, setPhonenumber] = useState("");

    //submitting the data to the server
    const submitHandler = (event) => {
        event.preventDefault();
        setErrormsg("");
        fetch(signinApi.sigin, {
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

                //get phoneNumber
                fetch(signinApi.phonenumberget, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token.key}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setPhonenumber(data.status.phonenumber.slice(-3))
                    })
                    .catch(err => console.log(err));

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
                    
                    setButtondisable(false);

                    //checking the auth method
                    fetch(signinApi.chech2fstatus, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`Token ${token.key}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.totp_two_factor_auth) {
                                fetch(signinApi.sigin2f, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Authorization": `Token ${token.key}`
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log("Totp Implemented");
                                        setTwoAuth("totp");
                                        setMessage("Check Google Authenticator")
                                    })
                                    .catch(err => console.log(err))  
                            } else if (
                                data.email_two_factor_auth === false &&
                                data.totp_two_factor_auth === false &&
                                data.email_and_sms_two_factor_auth === false
                            ) {
                                window.localStorage.setItem('token', token.key);
                                console.log(token);
                                console.log("Two Factor Auth not implemented");
                                console.log("time to online");
                                setTwoAuth("");
                                setMessage("");
                                loginHistory.replace("/")
                            } else {
                                setTwoAuth("email");
                                setMessage("Check Your Email");
                            }
                        })
                        .catch(err => console.log(err))
                }
                
                
            })
            .catch(err => console.log(err));

    }

    //otp code verify
    const otpcodeHandler = (event) => {
        event.preventDefault();
        console.log(props.token);
        if (twoAuth === 'totp') {
            fetch(signinApi.signintotp, {
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
            fetch(signinApi.verifyotp, {
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

    //single based login
    let singlebasedlogin = null
    if (twoAuth.length === 0) {
        singlebasedlogin = (
            <form ref={form} onSubmit={submitHandler} >
                <TextField variant="outlined"
                    required
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
                    type={password.showPassword ? "text" : "password"} 
                    className={classes.loginPage__input}
                    onChange={inputFieldHandler}
                    value={password.value}
                    error={password.error}
                    required
                    InputProps={{
                        endAdornment: 
                            // <div style={{marginLeft:'85%'}}>
                                <IconButton
                                    style={{
                                        // marginLeft:'85%',                                        // marginLeft: password.showPassword && "62px",
                                        // backgroundColor:"red"
                                    }}
                                    onClick={showPasswordHandler}
                                    // edge="end"
                                >
                                    {/* {password.showPassword ? <Visibility /> :<VisibilityOff/>} */}
                                </IconButton>
                            // </div>
                            
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
        )
    } else {
        singlebasedlogin = null;
    }


    //qrcode and email_sms based

    const [twostepmsg, setTwostepmsg] = useState("");
    const emailref = useRef(null);
    const smsref = useRef(null);

    

    //sms based handler
    const twostepverificationsmsHandler = (event) => {
        
        setTwostepmsg("sms based");
        twostepverificationHandler();
    }

    //email based handler
    const twostepverificationemailHandler = (event) => {
        setTwostepmsg("email based");
        twostepverificationHandler();
    }


    const twostepverificationHandler = () => {

        fetch(signinApi.chech2fstatus, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${props.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("from twostephandler", data)
                //if two step is not google authenticator
                if (!data.totp_two_factor_auth) {
                    fetch(signinApi.sigin2f, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":`Token ${props.token}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            // setToken(data.key)
                            
                            console.log(data);
                            
                        })
                        .catch(err => console.log(err))
                } else {
                    fetch(signinApi.sendotpmail, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Token ${props.token}`
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));

        console.log("clicked!!!");
        console.log(props.token);
        
        
    }

    
    

    let twostepVerification = null;

    const [twosteptotp, setTwosteptotp] = useState("");


    //if google authenticator is enable
    if ((message === "Check Google Authenticator") && (twoAuth.length > 0)) {
        twostepVerification = (
            <div style={{ width: "300px" }}>
                <p>
                    2-Step Verification
                </p>
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

                <div className={classes.loginPage__tryanotherway}>
                    <Button variant="text"
                        type="submit" color="primary" 
                        className={classes.loginPage__button}
                        onClick={() => {
                            console.log("try another ways!!!");
                            setTwosteptotp('totp');
                            setMessage("try another way");
                            setTwoAuth('email');
                        }}
                    >
                        Try Another Ways
                    </Button>
                </div>
            </div>
        )
    } else if ((message !== "Check Google Authenticator") && (twoAuth.length > 0)) {
        let sliceEmail = null;
        if (email.value.split("@")[0].length > 3) {
            sliceEmail = email.value.slice(0, 3);
        } else {
            sliceEmail = email.value.split('@')[0]
        }

        sliceEmail += `...${email.value.slice(-3)}`

        twostepVerification = (
            <div style={{ width: "300px" }}>
                <h2>
                    2-Step Verification
                </h2>

                <div className={classes.twostepverification__emailandsms}>
                    <h3>
                        Choose the options
                    </h3>

                    <div className={classes.twostepverification__sms} onClick={twostepverificationsmsHandler} ref={smsref}>
                        {
                            phonenumber.length > 0
                                ?
                                <h5>Get a veification code at <sup>...</sup>{ phonenumber}</h5>
                                :
                                <h5>Error</h5>
                        }
                           
                    </div>

                    <div className={classes.twostepverification__email} onClick={twostepverificationemailHandler} ref={emailref}>
                        <h5>Send a verification code at {sliceEmail}</h5>
                    </div>
                </div>

            </div>
        )
        
    } else {
        twostepVerification = null;
    }


    // after choose email or sms based
    let email_sms = null;
    if (twostepmsg.length > 0) {
        email_sms = (
            <div style={{ width: "300px" }}>
                <h2>
                    2-Step Verification
                </h2>
                <p>
                    {twostepmsg}
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

                <div className={classes.loginPage__tryanotherway}>
                    <Button variant="text"
                        type="submit" color="primary" 
                        className={classes.loginPage__button}
                        onClick={() => setTwostepmsg("")}
                    >
                        Back
                    </Button>
                </div>
                
            </div>
        )
    } else {
        email_sms = null;
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

                {singlebasedlogin}
                {
                    twostepmsg.length === 0
                        ?
                            twostepVerification
                        :
                            null
                }   
                {email_sms}
                
            </div>
            <div className={classes.loginPage__footer}>

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
