import { IconButton } from '@material-ui/core';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import classes from "./BodyTableGroup.module.css";

import Modal from "../../../Model/Model";
import TargetAudienceGroup from '../../../TargetAudienceGroup/TargetAudienceGroup';
function BodyTableGroup(props) {

    const [groupLength, setGroupLength] = useState(0);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/targetusergroup/get/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGroups(data);
                setGroupLength(data.length);
                props.createGroupClickedHandlerOFF()
            })
        
    }, [groupLength, props.createGroupClicked]);


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
                            <IconButton>
                                <Delete style={{ fontSize: 15, color: "red" }} />
                            </IconButton>
                        </div>

                        
                    </div>
        )))
    }
        

    return (
        <div className={classes.homePage__body__bodyTable}>

            {/* ----------------------------table Header-------------------------- */}
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name}>
                    <h4>{props.title}</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__create}>
                    <h4> Organization</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__create}>
                    <h4> Department</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Edit</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Preview</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Delete</h4>
                </div>
            </div>

             {/* -----------------------------table body-------------------------------------- */}
            
            <div className={classes.homePage__body__bodyTableBody}>
                {body}
            </div>

                {/* for preview group information */}
                {
                    showCreateGroupPreview &&
                    <Modal>
                        <TargetAudienceGroup
                            preview = "Preview Group"
                            showGroupOFFhandler={showGroupOFFPreviewhandler}
                            groupData = {groupPreviewData}
                            />
                    </Modal>
            }
            
            {/* for edit group information */}
            {
                showCreateGroupEdit &&
                <Modal>
                    <TargetAudienceGroup
                        // preview="Edit Group"
                        edit = "Edit Group"
                        showGroupOFFhandler={showGroupOFFEdithandler}
                        groupData = {groupEditData}
                    />
                </Modal>
                

            }
            
        </div>
    )
}

export default BodyTableGroup
