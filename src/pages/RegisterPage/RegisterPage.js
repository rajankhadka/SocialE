import React from 'react'
import classes from "./RegisterPage.module.css";

//material UI
import { TextField,Button,IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

//implementing redux
import { connect } from "react-redux";
import { closeRegister } from "../../redux/actions/showregisterAction";

function RegisterPage(props) {
    return (
        <div className={classes.registerPage}>
            <div className={classes.registerPage__header}>
                <h1>Sign Up</h1>

                <div>
                    <IconButton onClick={props.closeRegisterAction}>
                        <Close />
                    </IconButton>
                </div>
                
                
            </div>
            <hr />
            <div className={classes.registerPage__body}>
                <form>
                    <TextField variant="outlined" label="FirstName" type="text" className={classes.registerPage__input} />
                    <TextField variant="outlined" label="LastName" type="text" className={ classes.registerPage__input }/>
                    <TextField variant="outlined" label="Email" type="email" className={classes.registerPage__input} />
                    <TextField variant="outlined" label="ContactNumber" type="number" className={ classes.registerPage__input }/>
                    <TextField variant="outlined" label="Password" type="password" className={classes.registerPage__input} />
                    <TextField variant="outlined" label="Confirm Password" type="password" className={ classes.registerPage__input }/>
                    <Button variant="contained" type="submit" color="primary" className={ classes.registerPage__button }> Sign Up </Button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeRegisterAction : () => dispatch(closeRegister())
    }
}

export default connect(undefined, mapDispatchToProps)(RegisterPage);
