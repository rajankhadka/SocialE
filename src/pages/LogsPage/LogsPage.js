import React from "react";
import classes from "./LogsPage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

//redux
import { connect } from "react-redux";
import TokenVerification from "../../hoc/TokenVerification";

const LogPage = props => {
    
    
    return(

        <TokenVerification>
            <div className={classes.logPage}  >
                <Header />
                <div className={classes.logPage__body}>
                    <SideBar />
                    <h1>Logs Page</h1>
                </div>
            </div>
        </TokenVerification>
        
    );
}

const mapStateToProps = state => {
   
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(undefined,undefined) (LogPage);