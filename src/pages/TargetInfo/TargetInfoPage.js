import React from "react";
import classes from "./TargetInfoPage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

//redux
import { connect } from "react-redux";
import TokenVerification from "../../hoc/TokenVerification";

const TargetInfoPage = props => {
    
    
    return(

        <TokenVerification>
            <div className={classes.targetInfoPage}  >
                <Header />
                <div className={classes.targetInfoPage__body}>
                    <SideBar />
                    <h1>Target Info</h1>
                    
                </div>
            </div>
        </TokenVerification>
    );
}

const mapStateToProps = state => {
   
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(undefined,undefined) (TargetInfoPage);