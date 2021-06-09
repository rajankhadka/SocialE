import React from "react";
import classes from "./CreateUserPage.module.css";

//importing components
import Header from "../../../components/Header/Header"
import SideBar from "../../../components/SideBar/SideBar"
import RegisterPage from "../../RegisterPage/RegisterPage";
import UserPermissions from "../../../components/UserPermissions/UserPermissions";

const CreateUserPage = (props) =>{
    console.log(props)
    return(
        <div className={classes.createuserPage}>
            <Header />
            <div className={classes.createuserPage__body}>
                <SideBar />
                <div className={classes.createuserPageBody}>
                   <div className={classes.createuserPageBodyHeader}>
                        <h2>Create User</h2>
                   </div>

                   <div className={classes.createuserPageBody__body}>
                       <RegisterPage />
                       <UserPermissions />
                   </div>
                </div>
                
            </div>
        </div>
    );
}

export default CreateUserPage;