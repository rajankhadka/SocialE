import React from "react";
import classes from "./UserPermissions.module.css";

//material ui
import { ArrowBack, ArrowBackIos, ArrowForward, ArrowForwardIos } from "@material-ui/icons";

const UserPermissions = (props) =>{
    return(
        <div className={classes.userpermissions}>
           <div className={classes.userpermissions__header}>
               <p>User Permissions:</p>
           </div>

           <div className={classes.userpermissions__body}>

               {/* body__left */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        <p>Available UserPermissions</p>
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        <p>admin | can log entry | user create | admin | | can log entry | user create |</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create | admin</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create | admin</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create | admin</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create | admin</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                    </div>

                    <div className={classes.userpermissions__body__left__footer}>
                        <p>choose All Permissions</p>
                        <ArrowForwardIos style={{fontSize:"15px"}}/>
                    </div>
                </div>
                
                {/* body middle */}
                <div className ={ classes.userpermissions__body__middle}>
                   <div>
                        <ArrowForward style={{fontSize:"20px", marginBottom: "10px" }} />
                        <ArrowBack style={{fontSize:"20px"}} />
                   </div>
                </div>
                
                {/* body right */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        <p>Chosen user permissions</p>
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                        <p>admin | can log entry | user create</p>
                    </div>

                    <div className={classes.userpermissions__body__left__footer}>
                        <ArrowBackIos style={{fontSize:"15px"}}/>
                        <p>choose All Permissions</p>
                    </div>
                </div>
           </div>
        </div>
    );
}


export default UserPermissions;