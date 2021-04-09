import React,{useState} from 'react'
import classes from "./Setting.module.css";

//material ui
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Switch } from '@material-ui/core';

//importing component
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

function Setting(props) {

    const [enableTwoAuth, setEnableTwoAuth] = useState(false);
    const [twoAuth, setTwoAuth] = useState("email");
    

    const [changePassword, setChangePassword] = useState(false);

    return (
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
                                            console.log(enableTwoAuth)
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
                                                    console.log(event.target.value)
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
                                                            <img alt="qrcode" src="https://i.stack.imgur.com/Mspmr.png" />
                                                        </div>
                                                    </div>
                                                    
                                                    : null
                                            
                                        }


                                        <Button color="primary"
                                            className={classes.setting__twoAuth__button}
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
                                            console.log(changePassword)
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
                            
                                        <div className={classes.oldPassword}>
                                            <label htmlFor="old Password">Old Password:</label>
                                            <input type="password" id="old Password" name="old Password" />
                                        </div>
                                        
                                        <div className={classes.newPassword}>
                                            <label htmlFor="old Password">new Password:</label>
                                            <input type="password" id="new Password" name="new Password" />
                                        </div>

                                        <div className={classes.confirmPassword}>
                                            <label htmlFor="confirm Password">confirm Password:</label>
                                            <input type="password" id="confirm Password" name="confirm Passwprd" />
                                        </div>

                                        <Button color="primary"
                                            className={classes.setting__password__button}
                                        >
                                            Submit
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
    )
}

export default Setting;
