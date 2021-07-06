import React,{useState,useEffect} from "react";
import classes from "./UserPermissions.module.css";

//material ui
import {
    ArrowBack, ArrowBackIos,
    ArrowForward, ArrowForwardIos, Close
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import { userapi } from "../../api/userapi/user";

const GroupPermission = (props) => {

   

    //permission part which is while creating new group
    //saving all permission
    const [allPermission, setAllPermission] = useState([]);

    //leftside permission
    const [leftSidePermission, setLeftSidePermission] = useState([]);

    //rightside permission
    const [rightSidePermission, setRightSidePermission] = useState([]);

    //group name
    const [group, setGroup] = useState({
        error:false,
        value:''
    });

    function returnName(all,group){
        let right = [];
        //right side permission
        for(let i=0;i<all.length;i++ ){
            let flag = false;
            for(let j=0;j< group.length;j++){
                if(group[j] === all[i].id){
                    flag = true;
                    break;
                }
            }
            if(flag){
                right.push({...all[i]})
            }
        }
        // console.log("right",right);
        return right;
    }

    function arr_diff (a1, a2) {

        let a = [], diff = [];
    
        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
    
        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
    
        for (let k in a) {
            diff.push(parseInt(k));
        }
    
        return diff;
    }

    useEffect(() => {

            setGroup(prevState => {
                return {
                    ...prevState,
                    value:props.groupManagementSpecificData.name
                }
            })

            fetch(userapi.availableAdjustedPermission,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${window.localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(allpermission => {
                    
                    const allper = allpermission.permissions.map(per => {
                        return{
                            ...per,
                            click:false
                        }
                    });

                    const allpermissionID = allper.map(per => per.id);
                    // console.log(allpermissionID);

                    //leftside data that is not choosen
                    const leftid = arr_diff(allpermissionID,props.groupManagementSpecificData.permissions);
                    // console.log(leftid); 

                    const left = returnName(allper,leftid);

                    const right = returnName(allper,props.groupManagementSpecificData.permissions)
                    

                    setAllPermission([...allper]);
                    setLeftSidePermission([...left]);
                    setRightSidePermission([...right]);

                    //specific group permission data 
                    // console.log(props.groupManagementSpecificData);
                    // console.log(allper);
                })
                .catch(err => console.log(err));
        
        
    },[] );

    //select permission handler
    //left side
    const selectpermissionleftsideHandler = (permission) =>{

       
            const updatepermission = leftSidePermission.map(per => {
                if(per.id === permission.id){
                    return {
                        ...per,
                        click:!permission.click
                    }
                }else{
                    return{
                        ...per
                    }
                }
            });
            setLeftSidePermission([...updatepermission])
        
        
        
    }

    //right side
    const selectpermissionrightsideHandler = (permission) =>{
        
            const updatepermission = rightSidePermission.map(per => {
                if(per.id === permission.id){
                    return {
                        ...per,
                        click:!permission.click
                    }
                }else{
                    return{
                        ...per
                    }
                }
            });
            setRightSidePermission([...updatepermission])
        
    }
        
    

    //permission
    let showleftsidepermission = null;
    let showrightsidepermission = null;

    
    //left side permission showing
    if(leftSidePermission.length > 0){
        showleftsidepermission = leftSidePermission.map(permission =>{
            return (
                <p 
                    className={permission.click ? classes.actve_p : '' }
                    key={permission.id}
                    onClick = {() => selectpermissionleftsideHandler(permission)}
                >
                    {permission.name}
                </p>
            )
        })
    }


   

    //right side permission showing
    if(rightSidePermission.length > 0){
        showrightsidepermission = rightSidePermission.map(permission =>{
            return (
                <p 
                    className={permission.click ? classes.actve_p : '' }
                    key={permission.id}
                    onClick = {() => selectpermissionrightsideHandler(permission)}
                >
                    {permission.name}
                </p>
            )
        })
    }

    
    //selecting all permission that is choosen or selected or moving to right side
    const choosePermissionHandler = () => {


            //create group
            //filtering permission that is only selected
            let filterselectedpermission  = leftSidePermission.filter(permission => permission.click);
            
            filterselectedpermission = filterselectedpermission.map(permission => {
                return {
                    ...permission,
                    click:false
                }
            })

            //removing from left side
            //removing all the permission that is moved to right side
            let removingselectedpermission = leftSidePermission.filter(permission => !permission.click);
            setLeftSidePermission([...removingselectedpermission]);


            //saving the selected permission to the right side
            setRightSidePermission(prevState => [...prevState,...filterselectedpermission])
        
        
    }

    

    //selecting or removing all permission that is choosen or moving to left side from right
    const removePermissionHandler = () =>{

      
            //create group
            //filtering permission that is only selected
            let filterselectedpermission  = rightSidePermission.filter(permission => permission.click);
                
            filterselectedpermission = filterselectedpermission.map(permission => {
                return {
                    ...permission,
                    click:false
                }
            })

            //removing from right side
            //removing all the permission that is moved to left side
            let removingselectedpermission = rightSidePermission.filter(permission => !permission.click);
            setRightSidePermission([...removingselectedpermission]);


            //saving the selected permission to the right side
            setLeftSidePermission(prevState => [...prevState,...filterselectedpermission])
        

    }

    //choose all permission
    const chooseAllPermissionHandler = () =>{

 
            setRightSidePermission(prevState => [...prevState,...leftSidePermission])
            setLeftSidePermission([])
        
        
    }

    //remove all permission
    const removeAllPermissionHandler = () =>{


            setLeftSidePermission(prevState => [...prevState,...rightSidePermission]);
            setRightSidePermission([]);
        
    }

    // console.log(props.groupManagementSpecificData);
    //create group handler
    const createGroupHandler = (event) => {
        event.preventDefault();
        // console.log(props.groupManagementSpecificData);
        
        let permissionid = rightSidePermission.map(permission => permission.id);
        // console.log(permissionid);
        if(group.value.length > 0 && permissionid.length > 0){
            fetch(userapi.updateGroup,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":`Token ${window.localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    name:group.value,
                    permissions: permissionid,
                    id:props.groupManagementSpecificData.id
                })
            })
                .then(res => {
                    // console.log(typeof res.status);
                    // return res.json();
                    if(res.status === 200){
                        return res.json();
                    }
                    else{
                        alert('Group name must be unique')
                    }
                    
                })
                .then(result => {
                    // console.log(result);
                    if(result){
                        props.groupManagementUpdateOffHandler();
                        props.groupUpdateTriggerHandler();
                        // props.creategroupHandler();
                        // props.pageloadtrigger()
                    }
                    
                })
                .catch(err => console.log(err))
        }else{
            if(group.value.length  < 1){
                alert('group name is required!!!');
            }else{
                alert('Permission Must be Selected!!!');
            }
            
        }
    }

    return(
        <div className={classes.userpermissions}>
            <div className={classes.userpermissions__header}>
                <div className={classes.userpermissions__header__top}>
                    <p>User Permissions:</p> 
                    
                             <Close 
                                    style={{cursor:'pointer'}}
                                    onClick={() =>{
                                    props.groupManagementUpdateOffHandler();
                                }}
                                />
                     
                </div>
                
                <div className={classes.userpermissions__header__bottom}>
                       
                                <TextField variant="outlined"
                                    label="Group Name" type="text"
                                    className={classes.registerPage__input}
                                    name="Group Name"
                                    size="small"
                                    value={group.value}
                                    required
                                    onChange={ event =>{
                                        setGroup(prevState =>{
                                            return {
                                                ...prevState,
                                                value: event.target.value
                                            }
                                        })
                                    }}
                                    style={{
                                        marginTop:"10px"
                                    }}
                                />
                       
                </div>

                
           </div>

           <div className={classes.userpermissions__body}>

               {/* body__left */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        <p>Available UserPermissions</p> 
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        { showleftsidepermission}
                    </div>

                    <div
                        className={classes.userpermissions__body__left__footer}
                        onClick={chooseAllPermissionHandler}
                    >
                        <p style={{ cursor: "pointer" }} onClick={() => {
                            
                        }}>{ props.groupcreate ? 'choose All Permissions' : 'choose All Groups' }</p>
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
                            onClick={removePermissionHandler}
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
                        { showrightsidepermission}
                    </div>

                    <div className={classes.userpermissions__body__left__footer}>
                        <ArrowBackIos style={{fontSize:"15px",cursor:"pointer"}}/>
                        <p style={{ cursor: "pointer" }} onClick={removeAllPermissionHandler}>{ props.groupcreate ? 'remove All Permissions' : 'remove All Groups' }</p>
                    </div>
                </div>
            </div>
            
            <div className={classes.userpermissions__button}>
                
                            <Button
                                variant="contained"
                                type="submit" color="primary"
                                className={classes.registerPage__button}
                                onClick={createGroupHandler}
                            >
                                   Update Group
                            </Button>
            </div>
            
        </div>
    );
}


export default GroupPermission;