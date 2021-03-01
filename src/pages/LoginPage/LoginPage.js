import React from 'react';
import classes from "./LoginPage.module.css";

//material UI
import { Lock } from '@material-ui/icons';
import { Button, TextField } from '@material-ui/core';

//implementating redux
import { connect } from "react-redux";
import { openRegister } from "../../redux/actions/showregisterAction";

function LoginPage(props) {
    return (
        <div className={classes.loginPage}>
            <div className={classes.loginPage__header}>
                <Lock />
                <h3 className={classes.loginPage__header__login}>Login</h3>
            </div>
            <div className={classes.loginPage__body}>
                <form>
                    <TextField variant="outlined"
                        label="Email" type="email"
                        className={classes.loginPage__input}
                    />
                    <TextField variant="outlined" label="Password" type="password" className={ classes.loginPage__input } />
                    <Button variant="contained" type="submit" color="primary" className={ classes.loginPage__button }> Sign In </Button>
                </form>
            </div>
            <div className={classes.loginPage__footer}>
                <Button color="primary"
                    className={classes.loginPage__forget}
                    onClick ={props.openRegisterAction}
                >
                    Sign Up
                </Button>
                <Button color="primary" className={classes.loginPage__forget}  >Forgot Password</Button>
                
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openRegisterAction : () => dispatch(openRegister())
    }
}

export default connect(undefined,mapDispatchToProps)(LoginPage);
