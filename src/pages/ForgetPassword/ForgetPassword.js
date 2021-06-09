import React,{useState} from 'react'
import classes from "./ForgetPassword.module.css"

//material UI
import { Button, InputBase } from '@material-ui/core'

//redux
import { connect } from "react-redux";
import { openForgetPassword } from "../../redux/actions/showforgetpasswordAction";
import { closeForgetPassword } from "../../redux/actions/showforgetpasswordAction";

//router
import { useHistory } from "react-router-dom";

function ForgetPassword(props) {
    const forgotPasswordHistory = useHistory()

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

    const passwordverifyHandler = (event) => {
        event.preventDefault();
        console.log(password);
        console.log(confirmPassword);
        if (password === confirmPassword) {
            fetch("http://127.0.0.1:8000/setpassword/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "new_password": password,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setErrormsg("");
                    props.closeForgetPasswordAction();
                    // forgotPasswordHistory.replace("/login");
                })
                .catch(err => console.log(err));
        } else {
            setErrormsg("Password mismatch")
        }
    }

    //email verify
    const forgetPasswordHandler = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/sendmail/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    console.log("email is not ass");
                    console.log(response);
                    
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
                    console.log("data--->",data);
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
        event.preventDefault();
        fetch("http://127.0.0.1:8000/verify/otp/", {
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
                            console.log(event.target.value);
                            setEmail(event.target.value);
                        }}
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
                            width: "50px"
                        }}
                        type="submit"
                    >
                        Verify
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
                            console.log(event.target.value);
                            setotp(event.target.value);
                        }}
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
                            width: "50px"
                        }}
                        type="submit"
                    >
                        Verify
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
                            console.log(event.target.value);
                            setPassword(event.target.value);
                        }}
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
                        onChange={(event) => {
                            console.log(event.target.value);
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
                            width: "50px"
                        }}
                        type="submit"
                    >
                        Submit
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
