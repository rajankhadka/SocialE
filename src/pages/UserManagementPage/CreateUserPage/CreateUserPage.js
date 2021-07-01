import React, { useState } from "react";
import classes from "./CreateUserPage.module.css";

//importing components
import Header from "../../../components/Header/Header"
import SideBar from "../../../components/SideBar/SideBar"
import RegisterPage from "../../RegisterPage/RegisterPage";
import UserPermissions from "../../../components/UserPermissions/UserPermissions";
import TokenVerification from "../../../hoc/TokenVerification";

const CreateUserPage = (props) =>{

    const [pageload, setPageload] = useState(false);

    const pageloadtrigger = () => {
        setPageload(prevState => !prevState)
    }

    return(
        <TokenVerification>
            <div className={classes.createuserPage}>
                <Header />
                <div className={classes.createuserPage__body}>
                    <SideBar />
                    <div className={classes.createuserPageBody}>
                    <div className={classes.createuserPageBodyHeader}>
                            <h2>Create User</h2>
                    </div>

                    <div className={classes.createuserPageBody__body}>
                        <RegisterPage 
                            pageload={pageload}
                            pageloadtrigger={pageloadtrigger}
                        />
                        <UserPermissions  
                            pageload={pageload}
                            pageloadtrigger={pageloadtrigger}
                        />
                    </div>
                    </div>
                    
                </div>
            </div>
        </TokenVerification>
    );
}

export default CreateUserPage;