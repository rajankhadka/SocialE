import React from 'react';
import classes from './LoginRegisterUI.module.css';
//pages
import LoginPage from "../../../pages/LoginPage/LoginPage";
import ForgetPassword from '../../../pages/ForgetPassword/ForgetPassword';


//implmentating redux
import { connect } from "react-redux";
import { closeForgetPassword } from "../../../redux/actions/showforgetpasswordAction";

function LoginRegisterUI(props) {
    console.log(props.showForgetPasswordState)
    console.log(props)

    //registerPage Enable
    // let showregister = (
    //     <>
            
    //     </>
    // )
    // if (props.showRegisterState) {
    //     showregister =(
    //         <div className={classes.loginregisterUI__registerModal}>
    //             <RegisterPage />
    //         </div>
    //     )
    // }

    //forgetpassword Enable
    let showforgetpassword = (
        <>
            
        </>
    )
    if (props.showForgetPasswordState) {
        showforgetpassword =(
            <div className={classes.loginregisterUI__registerModal}>
                <div
                    style={{
                        width: "100vh",
                        height: "100vh",
                    }}
                    onClick={props.closeForgetPasswordAction}
                ></div>
                <div>
                    <ForgetPassword />
                    <div
                        onClick={props.closeForgetPasswordAction}
                        style={{
                            width: "40vh",
                            height:"70vh",
                        }}
                    ></div>
                </div>
                
                <div
                    onClick={props.closeForgetPasswordAction}
                    style={{
                        width: "100vh",
                        height: "100vh",
                    }}
                ></div>
            </div>
        )
    }

    return (
        <div className={classes.loginregisterUI} >

            <h1>SocialE</h1>
            <LoginPage />
            {showforgetpassword}
            
            
            {/* {showregister} */}
            
           
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showRegisterState: state.showregisterReducers.showregister,
        showForgetPasswordState: state.showforgetpasswordReducers.showforgetpassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeForgetPasswordAction : () => dispatch(closeForgetPassword()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (LoginRegisterUI);
