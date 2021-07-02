import React,{useState,useEffect,useContext} from "react";
import classes from "./UserPermissions.module.css";

//material ui
import {
    ArrowBack, ArrowBackIos,
    ArrowForward, ArrowForwardIos, Close
} from "@material-ui/icons";
import { Button, TextField } from "@material-ui/core";
import { userapi } from "../../api/userapi/user";
import { UserPermissionSelectContent } from "../../contextAPI/UserPermissionSelectContent/UserPermissionSelectContent";


const UserPermissions = (props) => {

    //context api
    const [usergroupStateContext,usergroupDispatchContext] = useContext(UserPermissionSelectContent);

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

    //group select part which is while creating new user
    
    const [allgroupSaved, setAllgroupSaved] = useState([]);
    //left side group
    const [leftsidegroup, setLeftsidegroup] = useState([]);

    //rightside group
    const [rightsidegroup, setRightsidegroup] = useState([]);


    useEffect(() => {
        

        if(props.creategroup){
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
                    setAllPermission([...allper]);
                    setLeftSidePermission([...allper])
                })
                .catch(err => console.log(err));
        }else{
            fetch(userapi.grouplist,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${window.localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(allgroup => {
                    
                    const allgrp = allgroup.map(group => {
                        return{
                            ...group,
                            click:false
                        }
                    });
                    setAllgroupSaved([...allgrp])
                    setLeftsidegroup([...allgrp]);
                    setRightsidegroup([]);
                    usergroupDispatchContext({type:'REMOVEALL'})
                })
                .catch(err => console.log(err));
        }
        
        
    },[props.pageload] );

    //select permission handler
    //left side
    const selectpermissionleftsideHandler = (permission) =>{

        //create group
        if(props.creategroup){
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
        //group select
        else{
            const updategroup = leftsidegroup.map(per => {
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
            setLeftsidegroup([...updategroup])
        }
        
    }

    //right side
    const selectpermissionrightsideHandler = (permission) =>{
        if(props.creategroup){
            //group create
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
        else{
            //select group
            const updatepermission = rightsidegroup.map(per => {
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
            setRightsidegroup([...updatepermission])
        }
        
    }

    //permission
    let showleftsidepermission = null;
    let showrightsidepermission = null;

    //group
    let showleftsidegroup = null;
    let showrightsidegroup = null;

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


    //left side group
    if(leftsidegroup.length > 0){
        
        showleftsidegroup = leftsidegroup.map(permission =>{
            return (
                <p 
                    className={permission.click ? classes.actve_p : '' }
                    key={permission.id}
                    onClick = {() => selectpermissionleftsideHandler(permission)}
                >
                    {permission.name}
                </p>
            )
        });

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

    //right side group showing
    if(rightsidegroup.length > 0){
        showrightsidegroup = rightsidegroup.map(permission =>{
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

        if(props.creategroup){
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
        }else{
            //filtering permission that is only selected
            let filterselectedpermission  = leftsidegroup.filter(permission => permission.click);
            
            filterselectedpermission = filterselectedpermission.map(permission => {
                return {
                    ...permission,
                    click:false
                }
            })

            //removing from left side
            //removing all the permission that is moved to right side
            let removingselectedpermission = leftsidegroup.filter(permission => !permission.click);
            setLeftsidegroup([...removingselectedpermission]);


            //saving the selected permission to the right side
            setRightsidegroup(prevState => [...prevState,...filterselectedpermission])

            const senddata = [...rightsidegroup]

            //context api
            usergroupDispatchContext({type:'ADD',data:senddata})
        }
        
    }

    

    //selecting or removing all permission that is choosen or moving to left side from right
    const removePermissionHandler = () =>{

        if(props.creategroup){
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
        }else{
            //group select
            //filtering permission that is only selected
            let filterselectedpermission  = rightsidegroup.filter(permission => permission.click);
                
            filterselectedpermission = filterselectedpermission.map(permission => {
                return {
                    ...permission,
                    click:false
                }
            })

            //removing from right side
            //removing all the permission that is moved to left side
            let removingselectedpermission = rightsidegroup.filter(permission => !permission.click);
            setRightsidegroup([...removingselectedpermission]);

            //context api
            usergroupDispatchContext({type:'REMOVE',data:removingselectedpermission})

            //saving the selected permission to the right side
            setLeftsidegroup(prevState => [...prevState,...filterselectedpermission])
        }
       

    }

    //choose all permission
    const chooseAllPermissionHandler = () =>{

        if(props.creategroup){
            setRightSidePermission(prevState => [...prevState,...leftSidePermission])
            setLeftSidePermission([])
        }else{
            setRightsidegroup(prevState => [...prevState,...leftsidegroup])
            setLeftsidegroup([])

            //use context api
            usergroupDispatchContext({type:'ADDALL',data:leftsidegroup})
        }
        
    }

    //remove all permission
    const removeAllPermissionHandler = () =>{

        if(props.creategroup){
            setLeftSidePermission(prevState => [...prevState,...rightSidePermission]);
            setRightSidePermission([]);
        }else{
            setLeftsidegroup(prevState => [...prevState,...rightsidegroup]);
            setRightsidegroup([]);

            //usecontext api
            usergroupDispatchContext({type:'REMOVEALL'})
        }
        
    }

    useEffect(()=>{
       if((!props.creategroup) && (usergroupStateContext.userSaved)){
        setLeftsidegroup([...allgroupSaved]);
        setRightsidegroup([]) 
       } 
       
    },[usergroupStateContext.userSaved])

    //create group handler
    const createGroupHandler = (event) => {
        event.preventDefault();
        
        
        let permissionid = rightSidePermission.map(permission => permission.id);
        if(group.value.length > 0 && permissionid.length > 0){
            fetch(userapi.groupcreate,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":`Token ${window.localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    name:group.value,
                    permissions: permissionid
                })
            })
                .then(res => {
                    console.log(typeof res.status);
                    if(res.status === 201){
                        return res.json();
                    }
                    else{
                        alert('Group name must be unique')
                    }
                    
                })
                .then(result => {
                    console.log(result);
                    if(result){
                        props.creategroupHandler();
                        props.pageloadtrigger()
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
                    {props.groupcreate ? <p>User Permissions:</p> : <p>Groups:</p>}
                    {
                        props.creategroup
                            ? <Close 
                                    style={{cursor:'pointer'}}
                                    onClick={() =>{
                                    props.creategroupHandler()
                                    props.pageloadtrigger()
                                }}
                                />
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
                            : null
                    }
                </div>

                
           </div>

           <div className={classes.userpermissions__body}>

               {/* body__left */}
                <div className={classes.userpermissions__body__left}>
                    <div className={classes.userpermissions__body__left__header}>
                        {props.groupcreate ? <p>Available UserPermissions</p> : <p>Available Groups</p>}
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        { !props.creategroup ? showleftsidegroup : showleftsidepermission}
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
                        {props.groupcreate ? <p>Chosen user permissions</p> : <p>Chosen Groups</p>}
                    </div>

                    <div className={classes.userpermissions__body__left__body}>
                        { !props.creategroup ? showrightsidegroup : showrightsidepermission}
                    </div>

                    <div className={classes.userpermissions__body__left__footer}>
                        <ArrowBackIos style={{fontSize:"15px",cursor:"pointer"}}/>
                        <p style={{ cursor: "pointer" }} onClick={removeAllPermissionHandler}>{ props.groupcreate ? 'remove All Permissions' : 'remove All Groups' }</p>
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
                                onClick={createGroupHandler}
                            >
                                    Create Group
                            </Button>
                    
                        : null
                }
            </div>
            
        </div>
    );
}


export default UserPermissions;