import React from 'react'
import classes from "./ForgetPassword.module.css"

//material UI
import { Button, InputBase } from '@material-ui/core'

//redux
import { connect } from "react-redux";
import { openForgetPassword } from "../../redux/actions/showforgetpasswordAction";

//router
import { useHistory } from "react-router-dom";

function ForgetPassword(props) {
    const forgotPasswordHistory = useHistory()

    const forgetPasswordHandler = (event) => {
        event.preventDefault();
        forgotPasswordHistory.push("/forgot-password/verify-your-email");   
    }

    return (
        <div className={classes.forgetPassword}>
            <div>
                <h2>Forget Password</h2>
            </div>
            
            <form onSubmit={forgetPasswordHandler}>
                <InputBase
                    name="forgotPassword"
                    placeholder="Your Email Address"
                    type="email"
                    required={true}
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        borderColor: "rgb(158, 157, 157)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "3px",
                        width: "130%",
                        paddingLeft: "10px",
                        fontWeight:"100"
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
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        openForgetPasswordAction : () => dispatch(openForgetPassword()),
    }
}

export default connect(undefined,mapDispatchToProps) (ForgetPassword);
