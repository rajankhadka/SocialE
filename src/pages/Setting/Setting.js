import React,{useState,useEffect} from 'react'
import classes from "./Setting.module.css";
import QRCode from "qrcode.react";


//material ui
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Switch } from '@material-ui/core';

//importing component
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { signinApi } from '../../api/signin/signin';
import TokenVerification from '../../hoc/TokenVerification';


function Setting(props) {

    useEffect(() => {
        fetch(signinApi.chech2fstatus, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.email_two_factor_auth === true) {
                    setTwoAuth('email');
                    setEnableTwoAuth(true);
                } else if (data.totp_two_factor_auth === true) {
                    setTwoAuth('qrcode');
                    setEnableTwoAuth(true);
                } else if (data.email_and_sms_two_factor_auth === true) {
                    setTwoAuth("sms");
                    setEnableTwoAuth(true);
                } else {
                    setTwoAuth("email");
                    setEnableTwoAuth(false)
                }
            })
            .catch(err => console.log(err));
    }, []);

    const [enableTwoAuth, setEnableTwoAuth] = useState(false);
    const [twoAuth, setTwoAuth] = useState("email");

    //qrcode img
    const [qrcodeimg, setQrcodeimg] = useState("");

    const [changePassword, setChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errmsg, setErrmsg] = useState("");
    const [successmsg, setSuccessmsg] = useState("");

    const twoauthHandler = () => {
        let email_two_factor_auth = false;
        let totp_two_factor_auth = false;
        let email_and_sms_two_factor_auth = false;
        // console.log("twoauthHandler");
        // console.log(twoAuth)
        let token = (window.localStorage.getItem('token'));
        if (twoAuth === 'email') {
            // console.log("email_two_factor_auth");
            email_two_factor_auth = true;
            totp_two_factor_auth = false;
            email_and_sms_two_factor_auth = false;
            // console.log(email_two_factor_auth,email_and_sms_two_factor_auth,totp_two_factor_auth)
        } else if (twoAuth === 'sms') {
            // console.log("email_and_sms_two_factor_auth");
            email_two_factor_auth = false;
            totp_two_factor_auth = false;
            email_and_sms_two_factor_auth = true;
            // console.log(email_two_factor_auth,email_and_sms_two_factor_auth,totp_two_factor_auth)

        } else {
            // console.log("totp_two_factor_auth");
            email_two_factor_auth = false;
            totp_two_factor_auth = true;
            email_and_sms_two_factor_auth = false;
            // console.log(email_two_factor_auth,email_and_sms_two_factor_auth,totp_two_factor_auth)

        }

        fetch(signinApi.select2f, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization":`Token ${token}`
            },
            body: JSON.stringify({
                email_two_factor_auth,
                totp_two_factor_auth,
                email_and_sms_two_factor_auth
            })
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                
            })
            .catch(err => {

                console.log(err);
            })

    }

    //password handler
    const changepasswordHandler = () => {
        if (newPassword === confirmPassword) {
            fetch(signinApi.passwordupdate, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword
                })
            })
                .then(response => {
                    
                    // console.log(response.status);
                    if (response.status === 403) {
                        setErrmsg("Old Password doesnot match!!!");
                        setSuccessmsg("");
                    } else if (response.status === 400) {
                        setErrmsg("New Password must be 8 character long");
                        setSuccessmsg("");
                    } else {
                        setErrmsg("");
                        setSuccessmsg("Successfull Password Changed!!!");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    
                })
                .catch(err => {
                    console.log(err);
                    
                });
            // console.log("password change")
        } else {
            setErrmsg("New Password Does not match!!!")
            // console.log("password mismatch");
            setSuccessmsg("");
        }
    }

    return (

        <TokenVerification>
            <div className={classes.setting}>
                <Header />
                <div className={classes.setting__body}>
                    <SideBar />
                    <div className={classes.setting__body__content}>
                        <div className={classes.setting__body__content__header}>
                            <h1>Setting</h1>
                        </div>

                        <div className={classes.setting__body__content__body}>

                            <div className={classes.setting__body__twoAuth}>
                            <div className={classes.setting__body__twoAuth__header}>
                                <h3>Enable Two Factor Auth</h3>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={enableTwoAuth}
                                            name="enableTwoAuth"
                                            onChange={(event) => {
                                                setEnableTwoAuth(event.target.checked)
                                                
                                                if (event.target.checked === false) {
                                                    
                                                    fetch(signinApi.disable2f, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                            "Authorization":`Token ${window.localStorage.getItem('token')}`
                                                        },
                                                        body: JSON.stringify({
                                                            "status":false
                                                        })
                                                    })
                                                        .then(response => response.json())
                                                        .then(data => {})
                                                        .catch(err => console.log(err))
                                                }
                                            }}
                                            color="primary"
                                        />
                                    }
                                    label={enableTwoAuth ? "enable" : "disable"}
                                />
                            </div>
                            {
                                enableTwoAuth
                                ?
                                    <div className={classes.setting__body__twoAuth__body}>
                                        <div className={classes.setting__body__twoAuth__body__header}>
                                            <h4>Choose One Of Them</h4>
                                        </div>
                                        <div className={classes.setting__body__twoAuth__body__content}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-label="twoAuth"
                                                    name="twoAuth"
                                                    value={twoAuth}
                                                    onChange={(event) => {
                                                        setTwoAuth(event.target.value);
                                                        console.log(event.target.value);
                                                        if (event.target.value === 'qrcode') {
                                                            console.log("qrcode called");
                                                            fetch(signinApi.enabletotp, {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                                                                }
                                                            })
                                                                .then(response => {
                                                                    
                                                                    return response.json()
                                                                })
                                                                .then(data => {
                                                                    // console.log("qrcode data--->",data);
                                                                    // console.log(data.qrcode)
                                                                    if(data){
                                                                        if(data.qrcode.length > 0){
                                                                            setQrcodeimg(data.qrcode)
                                                                        }
                                                                        
                                                                    }
                                                                    
                                                                })
                                                                .catch(err => console.log("err--->",err));
                                                        }
                                                    } }
                                                >
                                                    <FormControlLabel value="email" control={<Radio />} label="Email Based" />
                                                    <FormControlLabel value="sms" control={<Radio />} label="SMS Based" />
                                                    <FormControlLabel value="qrcode" control={<Radio />} label="QR Based" />
                                                </RadioGroup>
                                            </FormControl>
                                            
                                            {
                                                    twoAuth === 'qrcode'
                                                        ?
                                                        <div style={{marginLeft:"90px"}}>
                                                            <p >Scan the QR code first</p>
                                                            <div className={classes.qrcodeEnable} >
                                                                
                                                                {/* <Image src={ qrcodeimg}/> */}
                                                                {/* <img src={ qrcodeimg.toString()} alt="qrcode"/> */}
                                                                {  qrcodeimg.length> 0 && <QRCode value={qrcodeimg} style={{width:"180px",height:"180px",marginLeft:"10px",marginTop:"10px"}}/>}
                                                            </div>
                                                        </div>
                                                        
                                                        : null
                                                
                                            }


                                            <Button color="primary"
                                                    className={classes.setting__twoAuth__button}
                                                    onClick={twoauthHandler}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                : null
                            }
                            
                        </div>

                        {/* change password */}

                        <div className={classes.setting__body__password}>
                            <div className={classes.setting__body__password__header}>
                                <h3>Change Password</h3>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={changePassword}
                                            name="changePassword"
                                            onChange={(event) => {
                                                setChangePassword(event.target.checked)
                                                // console.log(changePassword)
                                            }}
                                            color="primary"
                                        />
                                    }
                                    // label={enableTwoAuth ? "enable" : "disable"}
                                />
                            </div>
                            
                            {
                                changePassword

                                    ?
                                        <div className={classes.setting__body__password__body}>
                                            {errmsg.length > 0 && <p style={{ marginLeft: "70px", marginBottom: "20px", color: "red" }}>{errmsg}</p>}
                                            {successmsg.length > 0 && <p style={{ marginLeft: "70px", marginBottom: "20px", color: "green" }}>{ successmsg}</p>}
                                            <div className={classes.oldPassword}>
                                                <label htmlFor="old Password">Old Password:</label>
                                                <input
                                                    type="password"
                                                    id="old Password"
                                                    name="old Password"
                                                    value={oldPassword}
                                                    onChange={(event) =>{
                                                        setOldPassword(event.target.value);
                                                        // console.log(event.target.value)
                                                    }}
                                                />
                                            </div>
                                            
                                            <div className={classes.newPassword}>
                                                <label htmlFor="old Password">new Password:</label>
                                                <input
                                                    type="password"
                                                    id="new Password"
                                                    name="new Password"
                                                    value={newPassword}
                                                    onChange={(event) =>{
                                                        setNewPassword(event.target.value);
                                                        // console.log(event.target.value)
                                                    }}
                                                />
                                            </div>

                                            <div className={classes.confirmPassword}>
                                                <label htmlFor="confirm Password">confirm Password:</label>
                                                <input
                                                    type="password"
                                                    id="confirm Password"
                                                    name="confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(event) =>{
                                                        setConfirmPassword(event.target.value);
                                                        // console.log(event.target.value)
                                                    }}

                                                />
                                            </div>

                                            <Button color="primary"
                                                className={classes.setting__password__button}
                                                onClick = {changepasswordHandler}
                                            >
                                                Change Password
                                            </Button>
                                        </div>
                                    : null
                            
                            }

                            

                            
                        </div>

                        </div>

                        {/* enable two factor auth */}
                        

                    </div>
                </div>
            </div>
        </TokenVerification>
    )
}

export default Setting;
