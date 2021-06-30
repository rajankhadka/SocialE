import React from "react";
import classes from "./UserProfilePage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

//redux
import { connect } from "react-redux";
import TokenVerification from "../../hoc/TokenVerification";

const UserProfilePage = props => {
    
    
    return(
        <TokenVerification>
            <div className={classes.userProfilePage}  >
                <Header />
                <div className={classes.userProfilePage__body}>
                    <SideBar />
                    <h1>user Profile</h1>
                    
                </div>
            </div>
        </TokenVerification>
    );
}

const mapStateToProps = state => {
   
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(undefined,undefined) (UserProfilePage);