import React,{useState,useEffect} from "react";
import classes from "./UserPermissions.module.css";

//material ui
import {
    ArrowBack, ArrowBackIos,
    ArrowForward, ArrowForwardIos, Close
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";

const data = [
    "admin | can log entry | user create",
    "admin | can log entry | user create 1",
    "admin | can log entry | user create 2",
    "admin | can log entry | user create 3",
    "admin | can log entry | user create",
    "admin | can log entry | user create"
];



const UserPermissions = (props) => {

    useEffect(() => {
        console.log("yes");
        setInitialData(data);
    },[] );

    const [selectItem, setSelectItem] = useState([]);
    // const currentPtag = useRef(false)
    const [choosePermission, setChoosePermission] = useState([]);
    const [initialData, setInitialData] = useState([]);


    const addClassNameHandler = (event) => {
        console.log(event.target);
        console.log(event.target.innerText);
        console.log(selectItem)
        console.log(event.target.className)
        if (event.target.className === classes.actve_p) {
            event.target.className = ""
            const newItem = selectItem.filter(item => {
                return item !== event.target.innerText
            });
            setSelectItem(newItem);
        } else {
            event.target.className = classes.actve_p;
            const newItem = selectItem.concat(event.target.innerText);
            setSelectItem(newItem);
        }
    }

    const choosePermissionHandler = () => {
        console.log("selectItem");
        if (choosePermission.length > 0) {
            let unique = [];
            let found = false;
            for (let i = 0; i < selectItem.length; i++){
                found = false;
                for (let j = 0; j < choosePermission.length; j++){
                    if (choosePermission[i] === selectItem[j]) {
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    unique.push(selectItem[i]);
                }
            }
            let choosepermission = choosePermission.concat(unique);
            let uniqueset = Array.from(new Set(choosepermission));
            setChoosePermission(uniqueset);
        } else {
            console.log("choose i.length --->", choosePermission);
            setChoosePermission((prevState) => {
                return [...prevState, ...selectItem]
            });
        }
        console.log("choosePermission--->", choosePermission);
        setSelectItem([]);
    }

    return(
        <div className={classes.userpermissions}>
            <div className={classes.userpermissions__header}>
                <div className={classes.userpermissions__header__top}>
                    <p>User Permissions:</p>
                    {
                        props.creategroup
                            ? <Close onClick={props.creategroupHandler} />
                            : null
                            
                    }
                </div>
                
                <div className={classes.userpermissions__header__bottom}>
                    {
                        props.creategroup
                            ?   
                                <TextField variant="outlined"
                                label="Group Name" type="text"
                                className={classes.registerPage__input}
                                name="Group Name"
                                size="small"
                                value={props.groupname}
                                onChange={props.groupnameHandler}
                                style={{
                                    marginTop:"10px"
                                }}
                                />
                            : null
                    }
                </div>

                
           </div>

           <div className={classes.userpermissions__body}>

               {/* body__left */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        <p>Available UserPermissions</p>
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        {initialData.map((item, index) => {
                            return (
                                <p key={index} onClick={(event) => addClassNameHandler(event)}>
                                    {item}
                                </p>
                            )
                        })}
                        
                    </div>

                    <div
                        className={classes.userpermissions__body__left__footer}
                        onClick={()=> console.log("Choose All Permission")}
                    >
                        <p style={{ cursor: "pointer" }} onClick={() => {
                            setChoosePermission([...initialData])
                        }}>choose All Permissions</p>
                        <ArrowForwardIos style={{fontSize:"15px",cursor:"pointer"}}/>
                    </div>
                </div>
                
                {/* body middle */}
                <div className ={ classes.userpermissions__body__middle}>
                   <div >
                        <ArrowForward
                            style={{ fontSize: "20px", marginBottom: "10px" }}
                            className={classes.arrowForward}
                            
                            onClick={choosePermissionHandler}
                        />

                        <ArrowBack style={{ fontSize: "20px", }}
                            onClick={() => {
                                console.log("arrow Backward");
                                for (let i = choosePermission.length - 1; i >= 0; i--){
                                    for (let j = 0; j < selectItem.length; j++){
                                        if (choosePermission[i] === selectItem[j]) {
                                            choosePermission.splice(i, 1);
                                        }
                                    }
                                }
                                console.log(choosePermission);
                                setChoosePermission(choosePermission);
                            }}
                            className={classes.arrowBackward}
                        />
                   </div>
                </div>
                
                {/* body right */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        <p>Chosen user permissions</p>
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        {choosePermission.map((item, index) => {
                            return (
                                <p key={index} onClick={(event) => addClassNameHandler(event)}>
                                    {item}
                                </p>
                            )
                        })}
                    </div>

                    <div className={classes.userpermissions__body__left__footer}>
                        <ArrowBackIos style={{fontSize:"15px",cursor:"pointer"}}/>
                        <p style={{ cursor: "pointer" }} onClick={() => {
                            console.log("remove all");
                            setChoosePermission([]);
                        }}>remove All Permissions</p>
                    </div>
                </div>
            </div>
            
            <div className={classes.userpermissions__button}>
                {
                    props.creategroup
                        ?
                            <Button
                                variant="contained"
                                type="submit" color="primary"
                                className={classes.registerPage__button}
                            >
                                    Register User
                            </Button>
                    
                        : null
                }
            </div>
            
        </div>
    );
}


export default UserPermissions;