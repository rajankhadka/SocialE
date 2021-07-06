import React,{useState} from 'react'
import classes from "./ForgetPassword.module.css"

//material UI
import { Button, InputBase } from '@material-ui/core'

//redux
import { connect } from "react-redux";
import { openForgetPassword } from "../../redux/actions/showforgetpasswordAction";
import { closeForgetPassword } from "../../redux/actions/showforgetpasswordAction";

//router
import {  } from "react-router-dom";
import { signinApi } from '../../api/signin/signin';
import Spinner from '../../components/Spinner/Spinner';




function ForgetPassword(props) {
    // const forgotPasswordHistory = useHistory()

    const [email, setEmail] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [showopt, setShowotp] = useState(false);
    const [showemail, setShowemail] = useState(true);
    const [showpassword, setShowpassword] = useState(false);

    //opt
    const [otp, setotp] = useState("");

    //password
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //spinner
    const [spinnerModal, setSpinnerModal] = useState(false);

    const passwordverifyHandler = (event) => {
        event.preventDefault();
        console.log(password);
        console.log(confirmPassword);
        setSpinnerModal(true);
        if (password === confirmPassword) {
            fetch(signinApi.setpassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "new_password": password,
                    confirm_password:confirmPassword,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setSpinnerModal(false);
                    setErrormsg("");
                    props.closeForgetPasswordAction();
                    // forgotPasswordHistory.replace("/login");
                })
                .catch(err => console.log(err));
        } else {
            setSpinnerModal(false);
            setErrormsg("Password mismatch")
        }
    }

    //email verify
    const forgetPasswordHandler = (event) => {
        event.preventDefault();
        setSpinnerModal(true);
        fetch(signinApi.sendmail, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(response => {
                setSpinnerModal(false);
                if (response.status !== 200) {
                    return;
                }
                else {
                   return response.json();
                }
                
            })
            .then(data => {
                if (data === undefined) {
                    setErrormsg("Email is not associated to account");
                    setShowotp(false);
                    setShowemail(true);
                    setShowpassword(false);
                } else {
                    
                    setErrormsg("");
                    setShowotp(true);
                    setShowemail(false);
                    setShowpassword(false);
                }
                
            })
            .catch(err => console.log(err));
        // forgotPasswordHistory.push("/forgot-password/verify-your-email");   
    }

    //otphandler
    const otpverifyHandler = (event) => {
        setSpinnerModal(true);
        event.preventDefault();
        fetch(signinApi.forgetpasswordverfityotp, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                otp_code: otp
            })
        })      //status code
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSpinnerModal(false);
                if (data.status === "OTP Verified") {
                    setShowotp(false);
                    setShowemail(false);
                    setShowpassword(true);
                    setErrormsg("");
                } else {
                    setShowotp(true);
                    setShowemail(false);
                    setShowpassword(false);
                    setErrormsg("Invalid OTP")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.forgetPassword}>
            <div>
                <h2>Forget Password</h2>
            </div>
            {errormsg.length > 0 && <p style={{color:"red"}}>{ errormsg}</p>}
            {showemail &&
                <form onSubmit={forgetPasswordHandler}>
                    <InputBase
                        name="forgotPassword"
                        placeholder="Your Email Address"
                        type="email"
                        required={true}
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        disabled = {spinnerModal ? true : false}
                        style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            borderColor:  "rgb(158, 157, 157)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderRadius: "3px",
                            width: "130%",
                            paddingLeft: "10px",
                            fontWeight: "100",
                            
                        }}
                    />
                    <Button color="primary"
                        variant="contained"
                        style={{
                            width: "200px"
                        }}
                        type="submit"
                        disabled = {spinnerModal ? true : false}
                    >
                        Send Otp {spinnerModal && <Spinner className={classes.spinner} />}
                    </Button>
                </form>
            }

            {
                showopt &&
                <form onSubmit={otpverifyHandler}>
                    <InputBase
                        name="optverify"
                        placeholder="Enter the otp"
                        type="text"
                        required={true}
                        value={otp}
                        onChange={(event) => {
                            setotp(event.target.value);
                        }}
                        disabled = {spinnerModal ? true : false}
                        style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            borderColor:  "rgb(158, 157, 157)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderRadius: "3px",
                            width: "130%",
                            paddingLeft: "10px",
                            fontWeight: "100",
                            
                        }}
                    />
                    <Button color="primary"
                        variant="contained"
                        style={{
                            width: "200px"
                        }}
                        type="submit"
                        disabled = {spinnerModal ? true : false}
                    >
                        Verify {spinnerModal && <Spinner className={classes.spinner} />}
                    </Button>
                </form>
            }

            {
                showpassword &&
                <form onSubmit={passwordverifyHandler}>
                    <InputBase
                        name="password"
                        placeholder="Enter the new password"
                        type="password"
                        required={true}
                        value={password}
                        onChange={(event) => {
                            
                            setPassword(event.target.value);
                        }}
                        disabled = {spinnerModal ? true : false}
                        style={{
                            marginTop: "15px",
                            marginBottom: "20px",
                            borderColor:  "rgb(158, 157, 157)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderRadius: "3px",
                            width: "130%",
                            paddingLeft: "10px",
                            fontWeight: "100",
                            
                        }}
                    />
                    <InputBase
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        required={true}
                        value={confirmPassword}
                        disabled = {spinnerModal ? true : false}
                        onChange={(event) => {
                            
                            setConfirmPassword(event.target.value);
                        }}
                        style={{
                            marginTop: "-5px",
                            marginBottom: "20px",
                            borderColor:  "rgb(158, 157, 157)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderRadius: "3px",
                            width: "130%",
                            paddingLeft: "10px",
                            fontWeight: "100",
                            
                        }}
                    />
                    <Button color="primary"
                        variant="contained"
                        style={{
                            width: "200px"
                        }}
                        type="submit"
                        disabled = {spinnerModal ? true : false}
                    >
                        Submit {spinnerModal && <Spinner className={classes.spinner} />}
                    </Button>
                </form>
            }
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        openForgetPasswordAction: () => dispatch(openForgetPassword()),
        closeForgetPasswordAction: () => dispatch(closeForgetPassword()),
    }
}

export default connect(undefined,mapDispatchToProps) (ForgetPassword);
