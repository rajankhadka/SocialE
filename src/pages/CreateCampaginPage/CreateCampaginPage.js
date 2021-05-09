import React,{useState,useEffect} from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import {
    Button,
    FormControl, InputLabel,
    Select, TextField
} from "@material-ui/core";
import { Add, Check, Close } from "@material-ui/icons";


//redux
import { connect } from "react-redux";
import { setTemplate } from "../../redux/actions/templateAction";
import {
    availableTargetAudience,
    clickTargetAudience,
    disableTargetAudience,
    addnewTargetAudience
} from "../../redux/actions/targetaudienceAction";
import CreateGroup from "./CreateGroup/CreateGroup";


//3rd party library
import validator from "validator"

const CreateCampaginPage = (props) => {

    const [addNewAudience, setAddNewAudience] = useState(false);
    const [templateName, setTemplateName] = useState([]);
    
    useEffect(() => {
        console.log("useEffect");

        //target user audience
        // fetch("http://127.0.0.1:8000/targetuser/get/", {
        //     "method": "GET",
        //     "headers": {
        //         "Authorization": `Token ${window.localStorage.getItem('token')}`,
                
        //     },
        //     // "body": JSON.stringify({
        //     //     id:2
        //     // })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         // console.log(data.payload);
                
        //         props.availableTargetAudienceAction(data.payload);
        //     })
        //     .catch(err => console.log(err));
        
        //template name

        fetch("http://127.0.0.1:8000/template/resource/list/", {
            "method": "GET",
            "headers": {
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data.data);
                let newtemplateName = [];
                // newtemplateName = [...newtemplateName,...data.data]

                data.data.forEach(element => {
                    // console.log(element);
                    newtemplateName.push({
                        id: element.id,
                        template_name: element.template_name,
                        template_url:element.template_url
                    })
                });

                
                // console.log("newtemplateName", newtemplateName);
                setTemplateName(newtemplateName);
            })
            .catch(err => console.log(err));
        
    }, []);

    //add new target audience

    //campaign value
    const [campaignValue, setCampaignValue] = useState({
        campaignName: {
            value: "",
            err: "",
            lenth: 0,
            valid: false,
        },
        campaignSubject: {
            value: "",
            err: "",
            lenth: 0,
            valid: false,
        },
        selectTemplate: {
            value: "",
            err: "",
            lenth: 0,
            valid: false,
            id:"",
        },
        campaignStartDate: {
            value: "",
            err: "",
            lenth: 0,
            valid: false,
        },
        campaignEndDate: {
            value: "",
            err: "",
            lenth: 0,
            valid: false,
        },

    });


    //target user id for create campaign
    const [campaignTargetUser, setCampaignTargetUser] = useState([]);

    const campaignTargetUserHandler = (id) => {
        console.log("remove!!!");
        console.log(id);
        const targetUserID = campaignTargetUser.filter(item => item !== id);
        setCampaignTargetUser(targetUserID);
        console.log(campaignTargetUser);
    }
    
    const campaignValueHandler = (event) => {
        console.log(campaignValue);
        console.log(event.target.name);
        console.log(event.target.value);
        switch (event.target.name) {
            case "Campaign Name":
                console.log(`${event.target.value.length > 0  ? true : false}`);
                setCampaignValue(prevState => {
                    return {
                        ...prevState,
                        campaignName: {
                            value: event.target.value,
                            length: event.target.value.length,
                            valid : event.target.value.length > 0  ? true : false
                        }
                    }  
                });
                break;
            
            case "Campaign Subject":
                setCampaignValue(prevState => {
                    return {
                        ...prevState,
                        campaignSubject: {
                            value: event.target.value,
                            length: event.target.value.length,
                            valid : event.target.value.length > 0  ? true : false
                        }
                    }  
                });
                break;
            
            case "selectTemplate":
                setCampaignValue(prevState => {
                    return {
                        ...prevState,
                        selectTemplate: {
                            value: event.target.value.toString(),
                            length: event.target.value.length,
                            valid : event.target.value.length > 0  ? true : false
                        }
                    }  
                });
                break;
            
            case "startDate":
                setCampaignValue(prevState => {
                    return {
                        ...prevState,
                        campaignStartDate: {
                            value: event.target.value,
                            length: event.target.value.length,
                            valid : event.target.value.length > 0  ? true : false
                        }
                    }  
                });
                break;
            
            case "endDate":
                setCampaignValue(prevState => {
                    return {
                        ...prevState,
                        campaignEndDate: {
                            value: event.target.value,
                            length: event.target.value.length,
                            valid : event.target.value.length > 0  ? true : false
                        }
                    }  
                });
                break;
            
            default:
                setCampaignValue(prevState => {
                    return {
                        ...prevState
                    }
                })
                break;
        }
    }

    const [newAudience, setNewAudience] = useState({
        groupName: {
            value: "",
            err:"",
        },
        department: {
            value: "",
            err:"",
        },
        organization: {
            value: "",
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
        

        fetch("http://127.0.0.1:8000/targetuser/create/", {
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
            .then(audienceUserAdded => console.log(audienceUserAdded))
            .catch(err => console.log(err))
    }


    //target audience create upload csv second

    const targetAudienceUploadHandler = (groupData) => {
        let formData = new FormData();
        formData.append("file_name", targetAudienceUser.targetAudienceUserUpload.value)
        formData.append("id", groupData.group_id)
        
        console.log(formData.get("id"));
        console.log(formData.get("file_name"));

        fetch("http://127.0.0.1:8000/targetuser/dump/", {
            method: "POST",
            headers: {
                "Authorization": `Token ${window.localStorage.getItem('token')}`,
                // "Content-Type":"multipart/form-data"
            },
            body:formData
        })
            .then(response => response.json())
            .then(audienceUserAdded => console.log(audienceUserAdded))
            .catch(err => console.log(err))
        
    }


    const addnewAudienceHandler = (event) => {
        event.preventDefault();
        console.log("data submitted!!!")
        // console.log(targetAudienceUser.targetAudienceUserEmail.value);

        //first group create

        if (!uploadFieldActive && targetAudienceUser.targetAudienceUserEmail.value.length > 0) {
            console.log("user email")
            fetch("http://127.0.0.1:8000/targetusergroup/create/", {
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

                })
                .catch(err => console.log(err));
        } else if (uploadFieldActive && targetAudienceUser.targetAudienceUserUpload.value !== null) {
            console.log("user csv")
            fetch("http://127.0.0.1:8000/targetusergroup/create/", {
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
        

        // fetch("http://127.0.0.1:8000/targetuser/create/", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Token ${window.localStorage.getItem('token')}`
        //     },
        //     body: JSON.stringify({
        //         username: newAudience.username.value,
        //         email: newAudience.email.value,
        //     })
        // })
        //     .then(response => {
        //         console.log(response.status);
        //         if (response.status === 400) throw new Error("Invalid Data");
        //         return response.json()
        //     })
        //     .then(data => {
        //         console.log(data);
        //         let newTargetAudience = {
        //             id: data.target_user_id,
        //             email: data.email,
        //             username: data.target_username,
        //             click: true
        //         }
        //         props.addnewTargetAudienceAction(newTargetAudience);
        //         setShowSuccessmsg(true);
        //         setShowErrormsg(false);
        //         setCampaignTargetUser(prevState => prevState.concat(newTargetAudience.id))
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setShowSuccessmsg(false);
        //         setShowErrormsg(true);
        //     });
    }

    const [showSuccessmsg, setShowSuccessmsg] = useState(false);
    const [showErrormsg, setShowErrormsg] = useState(false);

    let targetAudience = null;

    //create group
    const [uploadFieldActive, setUploadFieldActive] = useState(false);

    const setUploadFieldActiveInputHandler = () => {
        setUploadFieldActive(false);
    }

    const setUploadFieldActiveUploadHandler = () => {
        setUploadFieldActive(true);
    }
    
    if (addNewAudience) {
        targetAudience = (
            <div className={classes.createCampaignBody__addnewAudience}>

                {
                    showSuccessmsg &&
                    <div className={classes.createCampaignBody__addnewAudience__success}>
                        <h5>New Audience Added !!!</h5>
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
                        value={newAudience.groupName.value}
                    />

                    <TextField
                        name="audienceOrganization"
                        className={classes.createCampaignBody__addnewAudience__input}
                        variant="outlined" size="small" label="Organization" required
                        type="text"
                        onChange={newAudienceHandler}
                        value={newAudience.organization.value}
                    />

                    <TextField
                        name="audienceDepartment"
                        className={classes.createCampaignBody__addnewAudience__input}
                        variant="outlined" size="small" label="Department" required
                        type="text"
                        onChange={newAudienceHandler}
                        value={newAudience.department.value}
                    />

                     <div className={classes.createCampaignBody__selectedField}>
                        {
                            !uploadFieldActive
                                ?
                                <CreateGroup
                                    uploadFieldActive={uploadFieldActive}
                                    setUploadFieldActiveInputHandler={setUploadFieldActiveInputHandler}
                                    setUploadFieldActiveUploadHandler={setUploadFieldActiveUploadHandler}
                                    targetAudienceUseremailhandler={targetAudienceUseremailhandler}
                                    targetAudienceUserEmailValue={targetAudienceUser.targetAudienceUserEmail.value}
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

                    <Button
                        className={classes.createCampaignBody__addnewAudience__input}
                        variant="contained"
                        type="submit"
                    >
                        Create Group
                    </Button>
                </form>
                
            </div>
        )
    } else {
        targetAudience = (
            <>
               
                {
                    props.targetaudienceAvailable.map((item, index) => {
                        return (
                            <div key={item.id} onClick={() => {
                                
                                
                                if (item.click) {
                                    props.disableTargetAudienceAction(item.id);
                                    campaignTargetUserHandler(item.id);

                                } else {
                                    props.clickTargetAudienceAction(item.id);
                                    console.log("item", item);
                                    setCampaignTargetUser(prevState => prevState.concat(item.id))
                                }
                                // console.log(item.id);
                                
                            }}>
                                <p className={classes.createCampaignBody__id}>{ index + 1}</p>
                                <p className={classes.createCampaignBody__email}>{ item.email}</p>
                                
                                {
                                    item.click ?
                                        
                                        <p className={classes.createCampaignBody__add}>
                                            <Check style={{ color: "green" }} />
                                        </p>
                                        :
                                        <p className={classes.createCampaignBody__add}>
                                            <Add style={{ color: "black" }} />
                                        </p>
                                            
                                }
                            </div>
                        );
                    })
                }

            </>
            
        )
    }

    const campaignDataHandler = (event) => {
        event.preventDefault();
        console.log("create campaign", campaignValue.selectTemplate.value);
        console.log("target audience", campaignTargetUser);

        fetch("http://127.0.0.1:8000/campaign/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                "campaign_name": campaignValue.campaignName.value,
                "campaign_title": campaignValue.campaignSubject.value,
                "templateresource": campaignValue.selectTemplate.value,
                "targetuser": campaignTargetUser,
                "start_date": campaignValue.campaignStartDate.value,
                "end_date": campaignValue.campaignEndDate.value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCreateCampaignSuccess(true);
                setCreateCampaignError(false);
            })
            .catch(err => console.log(err));

    }

    const [createCampaignSuccess, setCreateCampaignSuccess] = useState(false);
    const [createCampaignError, setCreateCampaignError] = useState(false);

    return(
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <div className={classes.createCampaignBody}>
                   <div className={classes.createCampaignBodyHeader}>
                        <h2>Create Campaign</h2>
                   </div>

                    <div className={classes.createCampaignBody__body}>
                        <div className={classes.createCampaignBody__body__left}>

                            {
                                createCampaignSuccess &&
                                <div className={classes.createCampaign__success}>
                                    <p>Successfully Created!!!</p>
                                    <Close onClick={ () => setCreateCampaignSuccess(false)}/>
                                </div>
                            }
                            
                            {
                                createCampaignError &&
                                <div className={classes.createCampaign__invalid}>
                                    <p>Invalid Data!!!</p>
                                    <Close onClick={ () => setCreateCampaignError(false)}/>
                                </div>
                            }
                            <form method="POST" onSubmit={campaignDataHandler}>
                                <TextField variant="standard"
                                    name="Campaign Name"
                                    label="Campaign Name"
                                    value={campaignValue.campaignName.value}
                                    onChange={campaignValueHandler}
                                    style={{  marginBottom: "10px",width:"250px"}}
                                />

                                <TextField
                                    variant="standard"
                                    name="Campaign Subject"    
                                    label="Campaign Subject"
                                    value={campaignValue.campaignSubject.value}
                                    onChange={campaignValueHandler}
                                    style={{  marginBottom: "10px",width:"250px"}}
                                    />

                                <TextField
                                    variant="standard"
                                    label="Campaign Description" 
                                    multiline={true} rowsMax={4}
                                    style={{  marginBottom: "10px",width:"250px"}}
                                />

                                <FormControl style={{width:"250px",marginBottom: "20px"}}>
                                    <InputLabel id="selectTemplate">Select Template</InputLabel>
                                    <Select
                                        name="selectTemplate"
                                        native
                                        labelId="selectTemplate"
                                        id="selectTemplate"
                                        value={campaignValue.selectTemplate.value}
                                        onChange={campaignValueHandler }
                                    >
                                        <option value="" />
                                        
                                        {
                                            templateName.map(item => <option key={item.id} value={item.id}> {item.template_name} </option>)
                                        }

                                        {/* <option  value="TemplateName">TemplateName</option> */}
                                    </Select>
                                </FormControl>
                                
                                <label htmlFor="startDate">Start Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    style={{ marginBottom: "20px" }}
                                    value={campaignValue.campaignStartDate.value}
                                    onChange={campaignValueHandler}
                                />

                                <label htmlFor="endDate">End Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    style={{marginBottom: "20px"}}
                                    value={campaignValue.campaignEndDate.value}
                                    onChange={campaignValueHandler}
                                />
                                
                               
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ width: "250px" }}
                                    disabled={
                                        !(
                                            campaignValue.campaignName.valid &&
                                            campaignValue.campaignSubject.valid &&
                                            campaignValue.selectTemplate.valid &&
                                            campaignValue.campaignStartDate.valid &&
                                            campaignValue.campaignEndDate.valid &&
                                            (campaignTargetUser.length > 0 ? true : false)
                                        )
                                            ? true
                                            : false
                                        
                                    }
                                >
                                    Create Campaign
                                </Button>
                            </form>
                        </div>
                       
                        {/* right part  */}

                        <div className={classes.createCampaignBody__body__right}>
                            
                            <div className={classes.createCampaignBody__right__header}>
                                <div
                                    className={classes.createCampaignBody__right__available}
                                    onClick={() => setAddNewAudience(false)}
                                    style={{
                                        backgroundColor: !addNewAudience ? "#2bae66" : "#EDEDED",
                                        color: !addNewAudience ? "#EDEDED" : "#2bae66"
                                    }}
                                >
                                    Available Targeted Audience
                                </div>

                                <div
                                    className={classes.createCampaignBody__right__add}
                                    onClick={() => setAddNewAudience(true)}
                                    style={{
                                        backgroundColor: addNewAudience ? "#2bae66" : "#EDEDED",
                                        color: addNewAudience ? "#EDEDED" : "#2bae66"
                                    }}
                                >
                                    Add New Audience
                                </div>

                            </div>

                            <div className={classes.createCampaignBody__right__body}>

                                {
                                  targetAudience  
                                }

                                
                            </div>

                        </div>
                   </div>
                </div>
                
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        targetaudienceAvailable: state.targetaudienceReducers.availableAudience,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setTemplateAction: (data) => dispatch(setTemplate(data)),
        availableTargetAudienceAction: (data) => dispatch(availableTargetAudience(data)),
        clickTargetAudienceAction: (id) => dispatch(clickTargetAudience(id)),
        disableTargetAudienceAction: (id) => dispatch(disableTargetAudience(id)),
        addnewTargetAudienceAction : (data) => dispatch(addnewTargetAudience(data)),
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(CreateCampaginPage);