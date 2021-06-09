import React from 'react'
import classes from "./VerifyYourEmail.module.css";

//material UI
import { Button } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

//router
import { useHistory } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { closeForgetPassword } from "../../redux/actions/showforgetpasswordAction";

function VerifyYourEmail(props) {

    const verifyyouremailHistory = useHistory();

    return (
        <div className={classes.verifyyouremail}>
            <div className={classes.verifyyouremail__body}>
                <h3>Check Your Email</h3>
                <CheckCircleOutline style={{
                    fontSize: 50,
                    marginTop: 10,
                    color: "green",
                    marginBottom:"10"
                }} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.closeForgetPasswordAction();
                        verifyyouremailHistory.replace("/login");
                    }}
                >
                    Back
                </Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        closeForgetPasswordAction : () => dispatch(closeForgetPassword())
    }
}

export default connect(undefined, mapDispatchToProps)(VerifyYourEmail);
