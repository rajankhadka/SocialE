import { Close } from '@material-ui/icons';
import React,{useState,useEffect} from 'react'
import classes from "./TargetAudienceGroup.module.css";

//3rd party libarary
import validator from "validator";
import { Button, TextField } from '@material-ui/core';
import CreateGroup from './CreateGroup/CreateGroup';
import { targetAudienceApi } from '../../api/targetAudience/targetAudience';

function TargetAudienceGroup(props) {

    useEffect(() => {
        console.log("[target audience group components]");
        const fetchdata = async () => {

            if (props.groupData) {
               const data = await fetch(targetAudienceApi.targetuserget, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${window.localStorage.getItem('token')}`,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        id:props.groupData.id
                    })
                })
                const result = await data.json();
                let emails = '';
                result.payload.forEach(item => {
                    emails+=`${item.email};`
                })

                setTargetAudienceUser(prevState => {
                    return {
                        ...prevState,
                        targetAudienceUserEmail: {
                            ...prevState.targetAudienceUserEmail,
                            value:emails
                        }
                    }
                })

            }    
        }

        fetchdata();
    },[])

    //success and error message
    const [showSuccessmsg, setShowSuccessmsg] = useState(false);
    const [showErrormsg, setShowErrormsg] = useState(false);

    //group information
    const [newAudience, setNewAudience] = useState({
        groupName: {
            value: props.groupData === undefined ? "" : props.groupData.group_name,
            err:"",
        },
        department: {
            value: props.groupData === undefined ? "" : props.groupData.department,
            err:"",
        },
        organization: {
            value: props.groupData === undefined ? "" : props.groupData.organization,
            err:"",
        }

    });
    

    const newAudienceHandler = (event) => {
        switch (event.target.name) {
            case "audienceGroupName":
                
                setNewAudience(prevState => {
                    return {
                        ...prevState,
                        groupName: {
                            ...prevState.username,
                            value: event.target.value
                        }
                    }
                });
                break;
            
            case "audienceOrganization":
                setNewAudience(prevState => {
                    return {
                        ...prevState,
                        organization: {
                            ...prevState.email,
                            value:event.target.value
                        }
                    }
                });
                break
        
            case "audienceDepartment":
                setNewAudience(prevState => {
                    return {
                        ...prevState,
                        department: {
                            ...prevState.email,
                            value:event.target.value
                        }
                    }
                });
                break
            default:
                return newAudience;
        }
    }

    //targetAudience
    const [targetAudienceUser, setTargetAudienceUser] = useState({
        targetAudienceUserEmail: {
            value: "",
            valid:false,
        },
        targetAudienceUserUpload: {
            value: null,
            error: "",
        }
    });

    //targetAudienceUseremailhandler
    const targetAudienceUseremailhandler = (event) => {

        setTargetAudienceUser(prevState => {
            return {
                ...prevState,
                targetAudienceUserEmail: {
                    value: event.target.value,
                }
            }
        })
    }

    //targetAudienceUserUploadHandler
    const targetAudienceUserUploadHandler = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0].type.split("/")[1] === "csv") {
            setTargetAudienceUser(prevState => {
                return {
                    ...prevState,
                    targetAudienceUserUpload: {
                        value: event.target.files[0],
                        error:""
                    }
                }
            })
        } else {
            setTargetAudienceUser(prevState => {
                return {
                    ...prevState,
                    targetAudienceUserUpload: {
                        value:null,
                        error:"Invalid File"
                    }
                }
                
            })
        }
    }

    //create group
    const [uploadFieldActive, setUploadFieldActive] = useState(false);

    const setUploadFieldActiveInputHandler = () => {
        setUploadFieldActive(false);
    }

    const setUploadFieldActiveUploadHandler = () => {
        setUploadFieldActive(true);
    }


    //target audience create email second
    const targetAudienceCreateAPIHandler = (groupData) => {

        let validateEmailOnly = [];
        let splitEmail = targetAudienceUser.targetAudienceUserEmail.value.split(";");

        splitEmail.forEach(item => {
            if (validator.isEmail(item)) {
                validateEmailOnly.push(item);
            }
        });

        console.log(validateEmailOnly);
        

        fetch(targetAudienceApi.targetusercreate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: groupData.group_id,
                email:validateEmailOnly,
            })
        })
            .then(response => response.json())
            .then(audienceUserAdded => {
                console.log(audienceUserAdded);
                setShowSuccessmsg(true);
                setShowErrormsg(false);
            })
            .catch(err => console.log(err))
    }


    //target audience create upload csv second

    const targetAudienceUploadHandler = (groupData) => {
        let formData = new FormData();
        formData.append("file_name", targetAudienceUser.targetAudienceUserUpload.value)
        formData.append("id", groupData.group_id)
        
        console.log(formData.get("id"));
        console.log(formData.get("file_name"));

        fetch(targetAudienceApi.targetuserdump, {
            method: "POST",
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
                // "Content-Type":"multipart/form-data"
            },
            body:formData
        })
            .then(response => response.json())
            .then(audienceUserAdded => {
                console.log(audienceUserAdded);
                setShowSuccessmsg(true);
                setShowErrormsg(false);
            })
            .catch(err => console.log(err))
        
    }


    //add new audience handler
    const addnewAudienceHandler = (event) => {
        event.preventDefault();
        console.log("data submitted!!!")

        //first group create

        if (!uploadFieldActive && targetAudienceUser.targetAudienceUserEmail.value.length > 0) {
            console.log("user email")
            fetch(targetAudienceApi.targetusergroupcreate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    group_name: newAudience.groupName.value,
                    department: newAudience.department.value,
                    organization: newAudience.organization.value,
                })
            })
                .then(response => response.json())
                .then(groupData => {
                    
                    //target audience create email
                    targetAudienceCreateAPIHandler(groupData);
                    (props.groupData === undefined) && props.createGroupClickedHandlerON();
                    props.groupData && props.editandpreviewTriggerHandler()

                })
                .catch(err => console.log(err));
        } else if (uploadFieldActive && targetAudienceUser.targetAudienceUserUpload.value !== null) {
            console.log("user csv")
            fetch(targetAudienceApi.targetusergroupcreate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    group_name: newAudience.groupName.value,
                    department: newAudience.department.value,
                    organization: newAudience.organization.value,
                })
            })
                .then(response => response.json())
                .then(groupData => {
                    console.log(groupData);
                    targetAudienceUploadHandler(groupData)
                })
                .catch(err => console.log(err));
            
        }else {
            console.log("invalid Field");
        }
        
    }

    let title = null;
    let disable = false;

    if (props.preview !== undefined && props.edit === undefined) {
        title = props.preview;
        disable = true

    } else if (props.preview === undefined && props.edit !== undefined) {
        title = props.edit;
        disable = false
    } else {
        title = "Add New Audience";
        disable = false;
    }

    //edit part

    const editTargetAudienceEmailPart = (id) => {
        let validateEmailOnly = [];
        let splitEmail = targetAudienceUser.targetAudienceUserEmail.value.split(";");

        splitEmail.forEach(item => {
            if (validator.isEmail(item)) {
                validateEmailOnly.push(item);
            }
        });

        console.log(validateEmailOnly);
        

        fetch(targetAudienceApi.targetusercreate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: id,
                email:validateEmailOnly,
            })
        })
            .then(response => response.json())
            .then(audienceUserAdded => {
                console.log(audienceUserAdded);
                setShowSuccessmsg(true);
                setShowErrormsg(false);
                props.groupEditHandler();
                props.showGroupOFFhandler();
            })
            .catch(err => console.log(err))

    }

   


    const editTargetAudienceCSVPart = (id) => {
        let formData = new FormData();
        formData.append("file_name", targetAudienceUser.targetAudienceUserUpload.value)
        formData.append("id", id)
        
        console.log(formData.get("id"));
        console.log(formData.get("file_name"));

        fetch(targetAudienceApi.targetuserdump, {
            method: "POST",
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
                // "Content-Type":"multipart/form-data"
            },
            body:formData
        })
            .then(response => response.json())
            .then(audienceUserAdded => {
                console.log(audienceUserAdded);
                setShowSuccessmsg(true);
                setShowErrormsg(false);
                props.groupEditHandler();
                props.showGroupOFFhandler();
            })
            .catch(err => console.log(err))
        
    }

    const editGroupHandler = () => {
        
        if (!uploadFieldActive && targetAudienceUser.targetAudienceUserEmail.value.length > 0) {
            console.log("user email")
            fetch(targetAudienceApi.targetusergroupupdate, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: props.groupData.id,
                    group_name: newAudience.groupName.value,
                    department: newAudience.department.value,
                    organization: newAudience.organization.value,
                    user: props.groupData.user
                })
            })
                .then(response => response.json())
                .then(groupData => {
                    
                    //target audience create email
                    editTargetAudienceEmailPart(props.groupData.id)

                })
                .catch(err => console.log(err));
        } else if (uploadFieldActive && targetAudienceUser.targetAudienceUserUpload.value !== null) {
            console.log("user csv")
            fetch(targetAudienceApi.targetusergroupupdate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: props.groupData.id,
                    group_name: newAudience.groupName.value,
                    department: newAudience.department.value,
                    organization: newAudience.organization.value,
                    user: props.groupData.user
                })
            })
                .then(response => response.json())
                .then(groupData => {
                    
                    editTargetAudienceCSVPart(props.groupData.id)
                })
                .catch(err => console.log(err));
            
        }else {
            console.log("invalid Field");
        }
        
    }


     const editGroupClickHandler = (event) => {
        event.preventDefault();
         editGroupHandler();
        // editTargetAudienceEmailPart(props.groupData.id);
        // editTargetAudienceCSVPart(props.groupData.id);
         
    }

    //button
    let button = null;
    
    if (props.preview !== undefined && props.edit === undefined) {
        button = null;
        
    } else if (props.preview === undefined && props.edit !== undefined) {
        button = (
            <Button
                className={classes.createCampaignBody__addnewAudience__input}
                variant="contained"
                type="submit"
                onClick={editGroupClickHandler}
            >
                Edit Group
            </Button>
        );
    } else {
        button = (
            <Button
                className={classes.createCampaignBody__addnewAudience__input}
                variant="contained"
                type="submit"
            >
                Create Group
            </Button>
        );
    }

    return (
        <div className={classes.targetAudienceGroup}>
            <div className={classes.targetAudienceGroup__content}>

                {/* header */}
                <div className={classes.createCampaignBody__right__header}>
                    <div
                        className={classes.createCampaignBody__right__add}
                        onClick={() => {}}
                        style={{
                            marginLeft:"10px"
                            // backgroundColor: addNewAudience ? "#2bae66" : "#EDEDED",
                            // color: addNewAudience ? "#EDEDED" : "#2bae66"
                        }}
                    >
                        {title}
                    </div>

                    <Close
                        style={{
                            marginRight: "10px",
                            cursor:"pointer"
                        }}
                        onClick={props.showGroupOFFhandler}
                    />

                </div>


                {/* body */}

                <div className={classes.createCampaignBody__addnewAudience}>

                    {
                        showSuccessmsg &&
                        <div className={classes.createCampaignBody__addnewAudience__success}>
                            <h5>New Group Created !!!</h5>
                            <Close
                                fontSize="small"
                                style={{
                                    cursor:"pointer"
                                }}
                                onClick={() => setShowSuccessmsg(false)}
                            />
                        </div>
                    }
                    
                    {
                        showErrormsg &&
                        <div className={classes.createCampaignBody__addnewAudience__error}>
                            <h5>Invalid Data !!!</h5>
                            <Close
                                fontSize="small"
                                style={{
                                    cursor:"pointer"
                                }}
                                onClick={() => setShowErrormsg(false)}
                            />
                        </div>
                    }

                    <form method="post" onSubmit={addnewAudienceHandler} encType="multipart/form-data">

                        <TextField
                            name="audienceGroupName"
                            className={classes.createCampaignBody__addnewAudience__input}
                            variant="outlined" size="small" label="Group Name" required
                            type="text"
                            onChange={newAudienceHandler}
                            disabled = {disable}
                            value={newAudience.groupName.value}
                        />

                        <TextField
                            name="audienceOrganization"
                            className={classes.createCampaignBody__addnewAudience__input}
                            variant="outlined" size="small" label="Organization" required
                            type="text"
                            disabled = {disable}
                            onChange={newAudienceHandler}
                            value={ newAudience.organization.value}
                        />

                        <TextField
                            name="audienceDepartment"
                            className={classes.createCampaignBody__addnewAudience__input}
                            variant="outlined" size="small" label="Department" required
                            type="text"
                            disabled = {disable}
                            onChange={newAudienceHandler}
                            value={ newAudience.department.value}
                        />

                        <div className={classes.createCampaignBody__selectedField}>
                            {
                                !uploadFieldActive
                                    ?
                                    <CreateGroup
                                        uploadFieldActive={uploadFieldActive}
                                        disable = {disable}
                                        setUploadFieldActiveInputHandler={setUploadFieldActiveInputHandler}
                                        setUploadFieldActiveUploadHandler={setUploadFieldActiveUploadHandler}
                                        targetAudienceUseremailhandler={targetAudienceUseremailhandler}
                                        targetAudienceUserEmailValue={ targetAudienceUser.targetAudienceUserEmail.value}
                                        targetAudienceUserUploadHandler={targetAudienceUserUploadHandler}
                                        targetAudienceUserUpload={targetAudienceUser.targetAudienceUserUpload}
                                        
                                    />
                                    :
                                    <CreateGroup
                                        uploadFieldActive={uploadFieldActive}
                                        setUploadFieldActiveInputHandler={setUploadFieldActiveInputHandler}
                                        setUploadFieldActiveUploadHandler={setUploadFieldActiveUploadHandler}
                                        targetAudienceUseremailhandler={targetAudienceUseremailhandler}
                                        ttargetAudienceUserEmailValue={targetAudienceUser.targetAudienceUserEmail.value}
                                        targetAudienceUserUploadHandler={targetAudienceUserUploadHandler}
                                        targetAudienceUserUpload={targetAudienceUser.targetAudienceUserUpload}
                                    />
                                    
                            }
                        </div>

                        {button}
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default TargetAudienceGroup
