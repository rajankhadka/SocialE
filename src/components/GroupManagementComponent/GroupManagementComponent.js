import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React,{useState,useEffect} from 'react'
import { userapi } from '../../api/userapi/user';
import { UserPermissionSelectContentProvider } from '../../contextAPI/UserPermissionSelectContent/UserPermissionSelectContent';
import Model from '../Model/Model';
import BodyTable from '../UI/BodyTable/BodyTable';
import UserPermissions from '../UserPermissions/UserPermissions';
import classes from './GroupManagementComponent.module.css';

function GroupManagementComponent(props) {

    //all group data
    const [groups, setGroups] = useState([]);

    //delete trigger
    const [groupdelete, setGroupdelete] = useState(false);
    const groupDeleteTriggerHandler = () =>{
        setGroupdelete(prevState => !prevState);
    }

    //update group
    const [groupUpdate, setGroupUpdate] = useState(false);
    const groupUpdateTriggerHandler = () => {
        setGroupUpdate(prevState => !prevState);
    }

    //create group
    const [groupCreate, setGroupCreate] = useState(false);
    const [groupCreateTrigger, setGroupCreateTrigger] = useState(false);

    const pageloadtrigger = () => {
        setGroupCreateTrigger(prevState => !prevState);
    }

    const creategroupHandler = () =>{
        setGroupCreate(false);
    }

    useEffect(()=>{
        // console.log("update trigger");
        fetch(userapi.grouplist,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(groupData => {
                // console.log(groupData);
                setGroups([...groupData]);
            })
            .catch(err => console.log(err));
    },[groupdelete,groupUpdate,groupCreateTrigger])

    let showgroups = null;

    if(groups.length > 0){
        showgroups = (
                <BodyTable 
                    title="Group Management"
                    header="Group Management"
                    groups = {groups}
                    groupUpdateTriggerHandler={groupUpdateTriggerHandler}
                    groupDeleteTriggerHandler={groupDeleteTriggerHandler}
                />
        )
    }
    return (

        <div className={classes.groupmanagement}>
            <div className={classes.header}>
                <Close 
                    style={{cursor:'pointer'}}
                    onClick={props.groupManagementModalOFF}
                />
            </div>

            {/* -----------body ----------- */}

            <div className={classes.body}>
                { showgroups }

                
            </div>
            
            <div className={classes.footer}>
                <Button 
                    style={{textTransform:'capitalize'}}
                    onClick={()=> {
                        setGroupCreate(true);
                        // console.log("object")
                    }}
                > 
                    Create Group
                </Button>
            </div>


            {
                groupCreate &&
                <Model>
                    
                    <UserPermissionSelectContentProvider>
                        <UserPermissions 
                            creategroup = {groupCreate}
                            creategroupHandler={creategroupHandler}
                            pageloadtrigger={pageloadtrigger}
                        />
                    </UserPermissionSelectContentProvider>
            
                </Model>
            }   
        </div>
        
    )

}

export default GroupManagementComponent
