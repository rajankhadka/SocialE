import React from 'react'
import classes from "./HeaderTooltip.module.css";

//material UI
import { AccountCircle, ExitToApp, Settings } from '@material-ui/icons';

//redux
import { connect } from "react-redux";

//router
import { useHistory} from "react-router-dom";

function HeaderTooltip(props) {

    const headertooltipHistory = useHistory();

    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        headertooltipHistory.replace("/login");
    }

    return (
        <div className={classes.headerTooltip__content}
            style={{
                visibility: !props.showtooltipReducers.visibility ? "hidden" : "visible"
            }}>
            <p> <AccountCircle /> User Profile</p>
            <p onClick={()=>console.log("setting")}> <Settings /> Setting</p>
            <p onClick={logoutHandler}> <ExitToApp /> Logout</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showtooltipReducers : state.showtooltipReducers
    }
}

export default connect(mapStateToProps,undefined)(HeaderTooltip);
