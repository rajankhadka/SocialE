import React from "react";
import classes from "./UserProfilePage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

//redux
import { connect } from "react-redux";

const UserProfilePage = props => {
    
    
    return(
        <div className={classes.userProfilePage}  >
            <Header />
            <div className={classes.userProfilePage__body}>
                <SideBar />
                <h1>user Profile</h1>
                
            </div>
        </div>
    );
}

const mapStateToProps = state => {
   
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(undefined,undefined) (UserProfilePage);