import React,{useState,useEffect} from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import {
    Button,
    createMuiTheme,
    FormControl, InputLabel,
    
    Select, TextField,ThemeProvider
} from "@material-ui/core";
import { Add, Check, Close,List, } from "@material-ui/icons";


//redux
import { connect } from "react-redux";
import { setTemplate } from "../../redux/actions/templateAction";
import {
    availableTargetAudience,
    clickTargetAudience,
    disableTargetAudience,
    addnewTargetAudience,
    addnewGroup
} from "../../redux/actions/targetaudienceAction";

import { templatePageCreate,templatePageView } from "../../redux/actions/templatePageToggleAction";
import {templatesidebar } from "../../redux/actions/activesidebarAction"

import GroupSelect from "./GroupSelect/GroupSelect";

//react router 
import {useHistory } from "react-router-dom";


const CreateCampaginPage = (props) => {

    const createCampaignHistory = useHistory();

    //createTemplatePageRouteHandler
    const createTemplatePageRouteHandler = () => {
        props.templatePageCreateAction();
        createCampaignHistory.push("/home/templates");
        props.templatesidebarAction();
    }

    const theme = createMuiTheme({
        typography: {
            fontFamily: 'sans-serif',
            button: {
                textTransform: 'capitalize',
            }
        }
    });

    const [addNewAudience, setAddNewAudience] = useState(false);
    const [templateName, setTemplateName] = useState([]);
    const [groupData, setGroupData] = useState([]);

    //selected Group
    const [selected, setSelected] = useState([]);

    const selectedhandleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
        props.addnewGroupAction(event.target.value);
    };

    //choose Template
    const [chooseTemplate, setChooseTemplate] = useState(false);

    useEffect(() => {
        console.log("useEffect");
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
        
        //group name
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
                setGroupData(data);
            })
            .catch(err => console.log(err));
        
    }, []);


    //fetching all group name target audience
    useEffect(() => {
        console.log("every time call");
        console.log("groupName",props.groupName);

        props.groupName.forEach((group) => {
            fetch("http://127.0.0.1:8000/targetuser/get/", {
                "method": "POST",
                "headers": {
                    "Authorization": `Token ${window.localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    id: group
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("palyoad--->",data.payload);
                    // targetAudienceUserfetch.push(...data.payload)
                    props.availableTargetAudienceAction(data.payload);

                })
                .catch(err => console.log(err));
        });

        // console.log("all target user group is ", targetAudienceUserfetch);
        // props.availableTargetAudienceAction(targetAudienceUserfetch);
        
    }, [props.groupName])


    const chooseTemplateTriggerHandler = () => {
        setChooseTemplate(true);
    }

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

                if (event.target.value === "create template") {
                    createTemplatePageRouteHandler();
                }
                else {
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
                }
                
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

    
    

    let targetAudience = null;
    
    if (addNewAudience) {
        targetAudience = (
           null 
        )
    } else {
        targetAudience = (
            <>
               
                {
                    props.targetaudienceAvailable.map((item, index) => {
                        return (
                            <div key={`${item.id}key${index}`} onClick={() => {
                                
                                
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
                // "targetuser": campaignTargetUser,
                "start_date": campaignValue.campaignStartDate.value,
                "end_date": campaignValue.campaignEndDate.value,
                "targetusergroup":selected
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
                                    style={{  marginBottom: "10px", width:"250px"}}
                                />

                                <TextField
                                    variant="standard"
                                    name="Campaign Subject"    
                                    label="Campaign Subject"
                                    value={campaignValue.campaignSubject.value}
                                    onChange={campaignValueHandler}
                                    style={{ marginBottom: "10px", width:"250px"}}
                                    />

                                {/* <TextField
                                    variant="standard"
                                    label="Campaign Description" 
                                    multiline={true} rowsMax={4}
                                    style={{  width:"250px"}}
                                /> */}

                                {/* select template  */}
                                {/* <div className={classes.createCampaign__template}>
                                    <label htmlFor="template">Template</label>
                                    <div className={classes.createCampaign__template__button}>
                                        <ThemeProvider theme={theme} >
                                            <Button variant="text"
                                                startIcon={<Add />}
                                                style={{
                                                    fontSize: 15,
                                                    
                                                    fontWeight: '400',
                                                    marginLeft: "10px"
                                                }}
                                                onClick={createTemplatePageRouteHandler}
                                            >
                                                Create Template
                                            </Button>
                                        </ThemeProvider>
                                        
                                        <ThemeProvider theme={theme}>
                                            
                                            <Button variant="text"
                                                startIcon={<List />}
                                                style={{
                                                    fontSize: 15,
                                                    
                                                    fontWeight: 'lighter',
                                                    marginLeft: "10px"
                                                }}
                                                onClick={chooseTemplateTriggerHandler}
                                            >
                                                Choose Template
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </div> */}

                                <FormControl style={{width:"250px",marginBottom: "20px"}}>
                                    <InputLabel id="selectTemplate">Select Template</InputLabel>
                                    <Select
                                        name="selectTemplate"
                                        native
                                        labelId="selectTemplate"
                                        id="selectTemplate"
                                        value={campaignValue.selectTemplate.value}
                                        onChange={campaignValueHandler}
                                        
                                    >
                                        <option value="" />
                                        <option  value="create template">Create Template</option>
                                        
                                        {
                                            templateName.map(item => <option key={item.id} value={item.id}> {item.template_name} </option>)
                                        }

                                        
                                    </Select>
                                </FormControl>

                                {/* choose target audience group */}
                                <div className={classes.createCampaign__template}>
                                    <label htmlFor="template">Group</label>
                                    <div className={classes.createCampaign__template__button}>
                                        <ThemeProvider theme={theme} >
                                            <Button variant="text"
                                                startIcon={<Add />}
                                                style={{
                                                    fontSize: 15,
                                                    
                                                    fontWeight: '400',
                                                    marginLeft: "10px"
                                                }}
                                                
                                            >
                                                Create Group
                                            </Button>
                                        </ThemeProvider>
                                        
                                        <ThemeProvider theme={theme}>
                                            
                                            <Button variant="text"
                                                startIcon={<List />}
                                                style={{
                                                    fontSize: 15,
                                                    
                                                    fontWeight: 'lighter',
                                                    marginLeft: "10px"
                                                }}
                                                
                                            >
                                                Choose Group
                                            </Button>
                                        </ThemeProvider>
                                    </div>
                                </div>
                                


                                

                                {/* <GroupSelect
                                    groupData={groupData}
                                    selectedhandleChange={selectedhandleChange}
                                    selected={selected}
                                /> */}
                                
                                <label htmlFor="startDate">Start Date</label>

                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    style={{marginBottom:"10px" }}
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
        groupName: state.targetaudienceReducers.groupName,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setTemplateAction: (data) => dispatch(setTemplate(data)),
        availableTargetAudienceAction: (data) => dispatch(availableTargetAudience(data)),
        clickTargetAudienceAction: (id) => dispatch(clickTargetAudience(id)),
        disableTargetAudienceAction: (id) => dispatch(disableTargetAudience(id)),
        addnewTargetAudienceAction: (data) => dispatch(addnewTargetAudience(data)),
        addnewGroupAction: (data) => dispatch(addnewGroup(data)),
        templatePageCreateAction: () => dispatch(templatePageCreate()),
        templatesidebarAction: () => dispatch(templatesidebar()),
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(CreateCampaginPage);