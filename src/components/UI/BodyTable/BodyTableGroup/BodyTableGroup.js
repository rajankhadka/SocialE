import { IconButton } from '@material-ui/core';
import { Delete, Edit, Group, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import classes from "./BodyTableGroup.module.css";

import Modal from "../../../Model/Model";
import TargetAudienceGroup from '../../../TargetAudienceGroup/TargetAudienceGroup';
import { targetAudienceApi } from '../../../../api/targetAudience/targetAudience';
import TargetAudienceAddGroup from '../../../TargetAudienceAddGroup/TargetAudienceAddGroup';
function BodyTableGroup(props) {

    const [groupLength, setGroupLength] = useState(0);
    const [groups, setGroups] = useState([]);
    const [editandpreviewTrigger, setEditandpreviewTrigger] = useState(false);
    const [groupEdit, setGroupEdit] = useState(false);

    const editandpreviewTriggerHandler = () => {
        setEditandpreviewTrigger(prevState => {
            return !prevState
        })
    }

    const groupEditHandler = () => setGroupEdit(true);
    
    //organization name 
    const [organizationName, setOrganizationName] = useState([]);

    useEffect(() => {
        console.log("[Body Table Group components]");
        
        fetch(targetAudienceApi.targetusergroupget, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const organization = [];
                // console.log(data);
                setGroups(data);
                setGroupLength(data.length);
                props.createGroupClickedHandlerOFF();
                setGroupEdit(false);
                data.forEach(org => {
                    if (organization.length === 0) {
                        organization.push({org:org.organization,click:false});
                    } else {
                        let found = organization.find(o => o.org.toLowerCase() === org.organization.toLowerCase());
                        if (!found) {
                           organization.push({org:org.organization,click:false}); 
                        }
                    }
                })
                console.log(organization);
                setOrganizationName([...organization]);

            })
        
        
        
    }, [groupLength, props.createGroupClicked,groupEdit]);
    

    
    

    //show create group model for edit and preview

    // -----------------------preview group ----------
    const [showCreateGroupPreview, setShowCreateGroupPreview] = useState(false);
    const [groupPreviewData, setGroupPreviewData] = useState({});

    //trigger on the show group preview
    const showGroupONPreviewHandler = () => {
        
        setShowCreateGroupPreview(true);
    }

    //trigger off the show group preview
    const showGroupOFFPreviewhandler = () => {
        
        setShowCreateGroupPreview(false);
    }

    // -----------------------------------

    // -----------------------edit group
    const [showCreateGroupEdit, setShowCreateGroupEdit] = useState(false);
    const [groupEditData, setGroupEditData] = useState({});

    //trigger on the show group preview
    const showGroupONEditHandler = () => {
        
        setShowCreateGroupEdit(true);
    }

    //trigger off the show group preview
    const showGroupOFFEdithandler = () => {
        
        setShowCreateGroupEdit(false);
    }

    //-------------------delete group
    const [deleteGroup, setDeleteGroup] = useState(false);


    // add target audience 
    const [showAddTargetAudience, setShowAddTargetAudience] = useState(false);

    const showAddTargetAudienceONHandler = () => setShowAddTargetAudience(true);
    const showAddTargetAudienceOFFHandler = () => setShowAddTargetAudience(false);

    // -----------------------------------
    

    let body = null;

    if (groups.length > 0) {

        body = (
            groups.map(element => (
                    <div className={classes.homePage__body__bodyTableBodyRow} key={element.id}>
                        <div className={classes.homePage__body__bodyTable__name}>
                            <p>{element.group_name}</p>
                        </div>

                        <div className={classes.homePage__body__bodyTable__create}>
                            <p>{element.organization}</p>
                        </div>

                         <div className={classes.homePage__body__bodyTable__create}>
                            <p>{element.department}</p>
                        </div>


                        <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton
                            onClick={() => {
                                showGroupONEditHandler();
                                setGroupEditData(element);
                                showGroupOFFPreviewhandler();
                                // console.log(element);
                                editandpreviewTriggerHandler();
                                // console.log(editandpreviewTrigger);
                                
                            }}>
                                <Edit style={{ fontSize: 15, color: "blue" }} />
                            </IconButton>
                        </div>
                        
                        <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton
                            onClick={() => {
                                showGroupONPreviewHandler();
                                setGroupPreviewData(element);
                                showGroupOFFEdithandler();
                            }}
                        >
                                <Visibility style={{ fontSize: 15, color: "green" }} />
                            </IconButton>
                        </div>

                        <div className={classes.homePage__body__bodyTable__edit}>
                            <IconButton
                                onClick={() => {
                                    console.log("groupDelete")
                                    console.log(element)
                                    setDeleteGroup(true);
                                    setGroupPreviewData(element);
                                }}
                            >
                                <Delete style={{ fontSize: 15, color: "red" }} />
                            </IconButton>
                        </div>

                        
                    </div>
            ))
        )
    }

    //organization
    const [specificOrgGroup, setSpecificOrgGroup] = useState([]);


    let organization = null;
    let groupOrgName = null;

    if (specificOrgGroup.length > 0) {
        groupOrgName = (
            specificOrgGroup.map(element => (

                <div
                    className={classes.homePage__body__bodyTableBodyRow}
                    key={element.id}
                    style={{backgroundColor:'#EDEDED'}}
                >
                    <div className={classes.homePage__body__bodyTable__name}>
                        <p>{element.group_name}<span className={classes.span }>(group)</span></p>
                    </div>

                    <div className={classes.homePage__body__bodyTable__create}>
                        <p>{element.organization}<span className={classes.span }>(org)</span></p>
                    </div>

                        <div className={classes.homePage__body__bodyTable__create}>
                        <p>{element.department}<span className={classes.span }>(dep)</span></p>
                    </div>


                    <div className={classes.homePage__body__bodyTable__edit}>
                    <IconButton
                        onClick={() => {
                            showGroupONEditHandler();
                            setGroupEditData(element);
                            showGroupOFFPreviewhandler();
                            // console.log(element);
                            editandpreviewTriggerHandler();
                            // console.log(editandpreviewTrigger);
                            
                        }}>
                            <Edit style={{ fontSize: 15, color: "blue" }} />
                        </IconButton>
                    </div>
                    
                    {/* add group target audience edit */}
                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton
                            onClick={() => {
                                console.log('edit target audience group')
                                // showGroupONPreviewHandler();
                                setGroupPreviewData(element);
                                showAddTargetAudienceONHandler();
                            }}
                        >
                            <Group style={{ fontSize: 15, color: "green" }} />
                        </IconButton>
                    </div>


                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton
                            onClick={() => {
                                showGroupONPreviewHandler();
                                setGroupPreviewData(element);
                                showGroupOFFEdithandler();
                            }}
                        >
                            <Visibility style={{ fontSize: 15, color: "green" }} />
                        </IconButton>
                    </div>

                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton
                            onClick={() => {
                                console.log("groupDelete")
                                console.log(element)
                                setDeleteGroup(true);
                                setGroupPreviewData(element);
                            }}
                        >
                            <Delete style={{ fontSize: 15, color: "red" }} />
                        </IconButton>
                    </div>

                    
                </div>
            ))
        )
    }


    if (organizationName.length > 0) {
        organization = organizationName.map((org, index) => (
            <div key={index}
                style={{
                    backgroundColor: org.click && '#EDEDED',
                    
                }}>
                <div
                    id={org.org}    
                    style={{
                        paddingLeft: '10px',
                        justifyContent: 'space-between',
                        border:org.click &&'1px solid black',
                    }}
                    className={classes.homePage__body__bodyTableBodyRow }
                    onClick={(event) => {
                        // console.log(org);
                        setSpecificOrgGroup((showGroupConditionally(org.org)));
                        specificOrgGroupClickHandler(org.org)
                    }}
                >
                    <p className={classes.org_Name}>{ org.org}</p>
                    {/* <div className={classes.org_line} /> */}
                    <div className={classes.org_down}>
                        {
                            org.click
                                ?
                                <KeyboardArrowUp style={{ fontSize: 25, color: "black" }} />
                                :
                                <KeyboardArrowDown style={{ fontSize: 25, color: "black" }}/>
                        }
                        
                    </div>
                    
                </div>

                {/* specificOrgGroup */}

                {/* scrollable height is maintained in here */}
                {
                    org.click &&  
                    <div className={classes.allgroup}>
                        {
                            groupOrgName
                        }
                    </div>
                }
                
            </div>
            

        ))
    }


    const specificOrgGroupClickHandler = (orgName) => {
        const clickedOrg = organizationName.map(org => {
            if (org.org.toLowerCase() === orgName.toLowerCase()) {
                return {
                    ...org,
                    click: !org.click
                }
            } else {
                return{
                    ...org,
                    click: false,
                }
            }
        })
        // console.log(specificOrgGroup);
        setOrganizationName([...clickedOrg]);
    }

    const showGroupConditionally = (orgName) => {
        if (groups.length > 0) {
            const foundGroup = groups.filter(group =>  group.organization.toLowerCase() === orgName.toLowerCase());
            return foundGroup;
        } else {
            return null;
        }
    }
        

    return (
        <div className={classes.homePage__body__bodyTable}>

             {/* -----------------------------table body-------------------------------------- */}
            
            <div className={classes.homePage__body__bodyTableBody}>
                {/* {body} */}
                {organization}

            </div>

                {/* for preview group information */}
            {
                showCreateGroupPreview &&
                <Modal>
                    <TargetAudienceGroup
                        type = "Preview Group"
                        showGroupOFFhandler={showGroupOFFPreviewhandler}
                        groupData={groupPreviewData}

                    />
                </Modal>
            }
            
            {/* for edit group information */}
            {
                showCreateGroupEdit &&
                <Modal>
                    <TargetAudienceGroup
                        // preview="Edit Group"
                        type = "Edit Group"
                        edit = "Edit Group"
                        showGroupOFFhandler={showGroupOFFEdithandler}
                        groupData={groupEditData}
                        editandpreviewTriggerHandler={editandpreviewTriggerHandler}
                        editandpreviewTrigger={editandpreviewTrigger}
                        groupEditHandler={groupEditHandler}
                    />
                </Modal>
                
                
            }

            {/* for delete group information */}
            {
                deleteGroup &&
                <Modal>
                    <div style={{
                        backgroundColor: 'white'
                        , width: '50%', display: 'flex',
                        flexDirection: 'column', alignItems: 'center',
                        height: '15vh',

                    }}>
                        <p >Are You Sure!!!</p>
                        <div style={{marginTop:'15px'}}>
                            <button
                                className={classes.DeleteButton}
                                onClick={() => {
                                    groupEditHandler();
                                    setDeleteGroup(false);
                                    console.log(groupPreviewData);
                                }}
                            >
                                Yes
                                 
                            </button>
                            <button
                                className={classes.DeleteNotButton}
                                onClick={() => {
                                    setDeleteGroup(false);    
                                }}
                            >
                                No
                            </button>
                        </div>
                        
                    </div>
                    

                </Modal>
            }

            {/* add target audience  */}

            {
                showAddTargetAudience &&
                <Modal>
                    <TargetAudienceAddGroup
                        showAddTargetAudienceOFFHandler={showAddTargetAudienceOFFHandler}
                        groupData = {groupPreviewData}
                    />
                </Modal>
                
            }
            
        </div>
    )
}

export default BodyTableGroup
