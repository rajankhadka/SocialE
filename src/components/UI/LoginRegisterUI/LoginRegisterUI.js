import React from 'react';
import classes from './LoginRegisterUI.module.css';
//pages
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";

//implmentating redux
import { connect } from "react-redux";

function LoginRegisterUI(props) {
    console.log(props.showRegisterState)
    console.log(props)
    //registerPage Enable
    let showregister = (
        <>
            
        </>
    )
    if (props.showRegisterState) {
        showregister =(
            <div className={classes.loginregisterUI__registerModal}>
                <RegisterPage />
            </div>
        )
    }

    return (
        <div className={classes.loginregisterUI} >

            <div className={classes.loginregisterUI__body}>
                <h1>SocialE</h1>
                <p>phishing campaign</p>
            </div>
            <LoginPage />

            {showregister}
            
           
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showRegisterState: state.showregisterReducers.showregister
    }
}

export default connect(mapStateToProps,undefined) (LoginRegisterUI);
