import React,{useState,useRef} from "react";
import classes from "./UserPermissions.module.css";

//material ui
import {
    ArrowBack, ArrowBackIos,
    ArrowForward, ArrowForwardIos
} from "@material-ui/icons";

const UserPermissions = (props) => {

    const [selectItem, setSelectItem] = useState([]);
    const currentPtag = useRef(false)
    const [choosePermission, setChoosePermission] = useState([]);

    const addClassNameHandler = (event) => {
        console.log(event.target);
        console.log(event.target.innerText);
        console.log(selectItem)
        if (event.target.className === classes.actve_p) {
            event.target.className = ""
            const newItem = selectItem.filter(item => {
                return item !== event.target.innerText
            });
            setSelectItem(newItem)
        } else {
            event.target.className = classes.actve_p;
            const newItem = selectItem.concat(event.target.innerText);
            setSelectItem(newItem);
        }
    }

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
                        <p onClick={(event)=> addClassNameHandler(event) } >admin | can log entry | user create | admin | | can log entry | user create |</p>
                        <p onClick={(event)=> addClassNameHandler(event)}>admin | can log entry | user create</p>
                        <p onClick={(event)=> addClassNameHandler(event) }>admin | can log entry | user create</p>
                        <p onClick={(event)=> addClassNameHandler(event) }>admin | can log entry | user create</p>
                        <p onClick={(event)=> addClassNameHandler(event) }>admin | can log entry | user create</p>
                        <p onClick={(event)=> addClassNameHandler(event) }>admin | can log entry | user create | admin</p>
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
                   <div >
                        <ArrowForward style={{fontSize:"20px", marginBottom: "10px" }} className={classes.arrowForward} onClick ={() => console.log("arrow forward")}/>
                        <ArrowBack style={{fontSize:"20px"}} onClick ={() => console.log("arrow Backward")} className={classes.arrowBackward}/>
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
                        <p>remove All Permissions</p>
                    </div>
                </div>
           </div>
        </div>
    );
}


export default UserPermissions;