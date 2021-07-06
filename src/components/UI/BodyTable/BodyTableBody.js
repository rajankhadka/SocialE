import { Button, IconButton, } from '@material-ui/core';
import { Close, Delete, Edit, Group, Send, Visibility } from '@material-ui/icons';
import React,{useState,useContext,useEffect} from 'react'
import { SpecificCampaignDetailContext } from '../../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import EditCampaignDetail from '../../EditCampaign/EditCampaignDetail';
import Model from '../../Model/Model';
import classes from "./BodyTableBody.module.css";
import { template } from "../../../api/template/template";
import CampaignTargetAudienceGroup from '../../CampaignTargetAudienceGroup/CampaignTargetAudienceGroup';
import CampaignPreview from '../../CampaignPreview/CampaignPreview';
import { campaignApi } from '../../../api/campaign/campaign';
import { userapi } from '../../../api/userapi/user';
import GroupPermission from '../../UserPermissions/GroupPermission';
import Template001 from '../../../template/Template001';
import Template002 from '../../../template/Template002';

function BodyTableBody(props) {

    const [campaignDetail, setCampaignDetail] = useContext(SpecificCampaignDetailContext);
    

    const [showSendEmail, setShowSendEmail] = useState(false);

    const [campaignId, setCampaignID] = useState(null);

    const [sendemailSubject, setSendemailSubject] = useState("");

    const [sendemailBody, setSendemailBody] = useState("");

    // const [campaignEditSelected, setCampaignEditSelected] = useState(false);

    // const campaignEditOff = () => setCampaignEditSelected(false);

    //user campaign target audience group
    const [showgroupModal, setShowgroupModal] = useState(false);

    //group modal hanlder
    const showgroupmodaloffHandler = () => setShowgroupModal(false);
    const showgroupmodalonHandler = () => setShowgroupModal(true);

    //preview campaign 
    const [previewModalShow, setPreviewModalShow] = useState(false);

    //preview campaign handler
    const showpreviewmodaloffHandler = () => setPreviewModalShow(false);
    const showpreviewmodalonHandler = () => setPreviewModalShow(true);

    let body = null;

    //usermanagement data
    const [userSpecificData, setUserSpecificData] = useState({});
    const [userSpecificGroup, setUserSpecificGroup] = useState(null);
    //preview user management
    const [userPreview, setUserPreview] = useState(false);

    //group management
    const [groupManagementSpecificData, setGroupManagementSpecificData] = useState({});
    const [groupManagementModal, setGroupManagementModal] = useState(false);
    const [groupPermissionList, setGroupPermissionList] = useState({});
    const [groupDeleteModal, setGroupDeleteModal] = useState(false);
    const [groupUpdateModal, setGroupUpdateModal] = useState(false);
    //preview
    const groupManagementModalOff = () =>{
        setGroupManagementModal(false)
    }

    const groupManagementModalOn = () => {
        setGroupManagementModal(true)
    }

    //delete
    const groupManagementDeleteOffHandler = () =>{
        setGroupDeleteModal(false);
    }
    const groupManagementDeleteOnHandler =() =>{
        setGroupDeleteModal(true);
    }

    //update
    const groupManagementUpdateOffHandler = () =>{
        setGroupUpdateModal(false);
    }
    const groupManagementUpdateOnHandler = () =>{
        setGroupUpdateModal(true);
    }

    //template management
    const [templateSpecificData, setTemplateSpecificData] = useState({});

    //template preview
    const [templatePreviewModal, setTemplatePreviewModal] = useState(false);

    const templatePreviewModalOffHandler = () => setTemplatePreviewModal(false);
    const templatePreviewModalOnHandler = () => setTemplatePreviewModal(true);

    //template delete
    const [templateDelete, setTemplateDelete] = useState(false);

    // conditionally template rendering
    let templateRendering = null;
    if(templateSpecificData.id && templatePreviewModal){
        const split = templateSpecificData.template_url.split('/');
        
        if(split.length >=5){
            // console.log(split);
            let template_url = [split[3],split[4]].join('/');
            // console.log(template_url);
            if(template_url === 'template/001'){
                templateRendering = <Template001 template_name={templateSpecificData.template_name} />
            }else if(template_url === 'template/002'){
                templateRendering = <Template002 template_name={templateSpecificData.template_name} />
            }else{
                templateRendering =<h1>No Template</h1>
            }
        }else{
            templateRendering =<h1>No Template</h1>
        }
    }

    //fetching data to preview user management group and permission

    useEffect(() =>{
        // console.log("user effect");
        switch(props.title){
            case 'User':
                
                const fetchuserPerviewData = async() => {
                    const res = await fetch(userapi.usergroup,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Token ${window.localStorage.getItem('token')}`
                        },
                        body:JSON.stringify({
                            user_id: userSpecificData.id
                        })
                    })
                    if(res.status === 200){
                        const data = (await res.json());
                        setUserSpecificGroup({...data});
                    }
                }

                if(userSpecificData.id){
                    fetchuserPerviewData();
                }
                
                break;
            
            case 'Group Management':
                // console.log("groupManagementSpecificData");
                
                    fetch(userapi.viewgrouppermission,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'Authorization':`Token ${window.localStorage.getItem('token')}`
                        },
                        body:JSON.stringify({
                            group_id: groupManagementSpecificData.id
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            setGroupPermissionList({...data})
                            // console.log(data);
                        })
                        .catch(err => console.log(err));
                
                break;

            default:
                break;
        }
    },[userPreview, groupManagementSpecificData.id])

    switch (props.title) {

        case 'Template':
            if(props.templateData.length > 0){
                body = (
                    props.templateData.map(element => (
                        <div className={classes.homePage__body__bodyTableBodyRow} key={element.id}>
                            <div className={classes.homePage__body__bodyTable__name__template__1}>
                                <p>{element.template_name}</p>
                            </div>
    
                            {/* template edit */}
                            {/* <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    
                                >
                                    <Edit style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div> */}
    
                            {/* template preview */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick = {()=>{
                                        // console.log(element);
                                        templatePreviewModalOnHandler();
                                        setTemplateSpecificData({...element})
                                    }}
                                >
                                    <Visibility style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>

                            {/* template delete */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() => {
                                        // console.log(element)
                                        setTemplateDelete(true);
                                        setTemplateSpecificData({...element})
                                    }}
                                >
                                    <Delete style={{ fontSize: 15, color: "red" }} />
                                </IconButton>
                            </div>
    
                            
                        </div>
                    ))
                )
            }
            
            break;

        case "Campaign":
            if(props.data.length > 0){
                body = (
                    props.data.map(element => (
                        <div className={classes.homePage__body__bodyTableBodyRow} key={element.id}>
                            <div className={classes.homePage__body__bodyTable__name}>
                                <p>{element.campaign_name}</p>
                            </div>
    
                            <div className={classes.homePage__body__bodyTable__create}>
                                <p>{element.start_date}</p>
                            </div>
    
                             <div className={classes.homePage__body__bodyTable__create}>
                                <p>{element.end_date}</p>
                            </div>
    
                            <div className={classes.homePage__body__bodyTable__uniqueOpen}>
                                <p>279 opened</p>
                            </div>
    
                            <div className={classes.homePage__body__bodyTable__send}>
                                <IconButton onClick={() => {
                                    // console.log(element);
                                    setCampaignID(element.id)
                                    setShowSendEmail(true)
                                }}>
                                    <Send style={{ fontSize: 15, color: "blue" }}  />
                                </IconButton>
                            </div>
    
                            {/* campaign edit */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() => {
                                        // console.log(element);
                                        // setCampaignEditSelected(true);
                                        setCampaignDetail(element);
                                        props.campaignEditTriggerHanlderON()
                                    }}
                                >
                                    <Edit style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>
    
                            
                            {/* group edit */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() => {
                                        showgroupmodalonHandler();
                                        setCampaignDetail(element);
                                    }}
                                >
                                    <Group style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>
    
                            {/* campaign delete */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() => {
                                        props.campaignDeleteTriggerHandlerON()
                                        setCampaignDetail(element);
                                    }}
                                >
                                    <Delete style={{ fontSize: 15, color: "red" }} />
                                </IconButton>
                            </div>
    
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() => {
                                        showpreviewmodalonHandler();
                                        setCampaignDetail(element);
                                    }}
                                >
                                    <Visibility style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>
                        </div>
                    ))
                    
                   
                )    
            }
            
            break;
        
        case 'User':
            if(props.allUser.length > 0){
                body =(
                    props.allUser.map(element =>(
                        <div className={classes.homePage__body__bodyTableBodyRow} key={element.id}>

                            <div className={classes.homePage__body__bodyTable__name__user}>
                                <p>{element.username}</p>
                            </div>

                            <div className={classes.homePage__body__bodyTable__name__email}>
                                <p>{element.email}</p>
                            </div>

                            <div className={classes.homePage__body__bodyTable__name__email}>
                                <p>{element.phonenumber}</p>
                            </div>

                            {/* user permission edit */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() =>{
                                        // console.log("edit",element);
                                        setUserSpecificData({...element})
                                    }}
                                >
                                    <Edit style={{ fontSize: 15, color: "blue" }} />
                                </IconButton>
                            </div>

                            {/* user delete
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() =>{
                                        console.log("delete",element);
                                        setUserSpecificData({...element})
                                    }}
                                >
                                    <Delete style={{ fontSize: 15, color: "red" }} />
                                </IconButton>
                            </div> */}
    
                            {/* user preview */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() =>{

                                        // console.log("preview",element);
                                        setUserSpecificData({...element});
                                        setUserPreview(true);
                                    }}
                                >
                                    <Visibility style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>

                        </div>
                    ))
                )
            }
            break;

        case 'Group Management':
            if(props.groups.length > 0){
                body =(
                    props.groups.map((element => (
                        <div key={element.id} className={classes.homePage__body__bodyTableHeader}>
                            <div className={classes.homePage__body__bodyTable__name__template}>
                                <p className={classes.h4}>{ element.name }</p>
                            </div>

                            {/* group edit */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() =>{
                                        setGroupManagementSpecificData({...element});
                                        groupManagementUpdateOnHandler()
                                    }}
                                >
                                    <Edit style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>
    
                            {/* group delete */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                    onClick={() =>{
                                        setGroupManagementSpecificData({...element});
                                        groupManagementDeleteOnHandler();
                                    }}
                                >
                                    <Delete style={{ fontSize: 15, color: "red" }} />
                                </IconButton>
                            </div>
    
                            {/* group preview */}
                            <div className={classes.homePage__body__bodyTable__edit}>
                                <IconButton
                                   onClick={() =>{
                                        setGroupManagementSpecificData({...element});
                                        groupManagementModalOn();
                                }}
                                >
                                    <Visibility style={{ fontSize: 15, color: "green" }} />
                                </IconButton>
                            </div>
                        </div>
                    )))
                )
            }
            break;

        default:
            break;
    }

    const sendEmailHandler = (event) => {
        event.preventDefault();
        // console.log(sendemailSubject);
        // console.log(sendemailBody);
        // console.log(campaignId);

        fetch(template.templatesend, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: campaignId,
                body_message: sendemailBody,
                subject_message: sendemailSubject
            })
        })
            .then(response => response.json())
            .then(data => {
                //mail send status
                console.log(data)
            })
            .catch(err => console.log(err));
    }

    let header = null;
    if(props.title === 'Campaign'){
        header = (
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name}>
                    <h4>{props.title}</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__create}>
                    <h4> Start Date</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__create}>
                    <h4> End Date</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__uniqueOpen}>
                    <h4>Unique Open</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__send}>
                    <h4>Send</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Edit</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Group</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Delete</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Preview</h4>
                </div>
            </div>
        )
    }else if(props.title === 'Template'){
        header =(
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name__template__1}>
                    <h4>{props.title}</h4>
                </div>

                {/* <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Edit</h4>
                </div> */}

                

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Preview</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Delete</h4>
                </div>
            </div>
        )
    }else if(props.title === 'User'){
        header=(
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name__user}>
                    <h4>{props.title}Name</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__name__email}>
                    <h4> Email</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__name__email}>
                    <h4> Contact Number</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Edit</h4>
                </div>

                {/* <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Delete</h4>
                </div> */}

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Preview</h4>
                </div>
            </div>
        )
    }else if(props.title === 'Group Management'){
        header=(
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name__template}>
                    <h4>Group Name</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h4>Edit</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Delete</h4>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h4>Preview</h4>
                </div>
            </div>
            )
    }

    return (
        <div className={classes.homePage__body__bodyTable}>

            {/* ----------------------------table Header-------------------------- */}

            {header}
            

            {/* -----------------------------table body-------------------------------------- */}
            
            <div className={classes.homePage__body__bodyTableBody}>
                {body}
            </div>
            
            {/* send mail  */}
               
            {
                showSendEmail &&
                <div className={classes.homePage__sendEmail}>

                    <div className={classes.homePage__sendEmail__body}>
                        <div className={classes.homePage__sendEmail__body__header}>
                            <h5>Send Email</h5>
                            <Close style={{ marginTop: "-5px", cursor: "pointer" }} onClick={() => setShowSendEmail(false) }/>
                        </div>

                        <div className={classes.homePage__sendEmail__body__body}>
                            <div className={classes.homePage__sendEmail__content}>
                                <form onSubmit={sendEmailHandler}>
                                    <label htmlFor="subject">Subject :</label>
                                    <input name="subject"
                                        type="text"
                                        className={classes.sendEmail__subject}
                                        required={true}
                                        value={sendemailSubject}
                                        onChange={(event) => setSendemailSubject(event.target.value)}
                                    />
                                    
                                    <label htmlFor="body">Body :</label>
                                    <textarea name="body"
                                        type="text" className={classes.sendEmail__body} required
                                        value={sendemailBody}
                                        onChange={(event) => setSendemailBody(event.target.value)}
                                    />
                                    
                                    <Button variant="contained"
                                        style={{
                                            width:'97%',
                                            backgroundColor: "green",
                                            marginRight: "10px", marginTop: "10px"
                                        }}
                                        type="submit"

                                    >
                                        Send
                                    </Button>
                                </form>

                            </div>
                            
                        </div>    

                    </div>

                </div>
            }

            {/* user management preview */}
            {
                userPreview &&
                <Model>
                    <div className={classes.usermanagement__preview}>
                        <div className={classes.usermanagement__preview__header}>
                            <Close style={{cursor:'pointer'}} onClick={() => setUserPreview(false)} />
                        </div>

                        <div className={classes.usermanagement__preview__body}>
                            {/* left side (group name) */}
                            <div className={classes.usermanagement__preview__left}>
                                <h3>Group</h3>
                                {
                                    userSpecificGroup &&

                                    <div>
                                        {
                                            userSpecificGroup.group_associated.map((group,index) => <p key={index} >{index +1 }) {group}</p>)
                                        }
                                    </div>
                                    
                                }
                            </div>

                            {/* right side permission name */}
                            <div className={classes.usermanagement__preview__right}>
                                <h3>Permission</h3>
                                {
                                    userSpecificGroup &&

                                    <div>
                                        {
                                            userSpecificGroup.permission_list.map((permission,index) => <p key={index}>{index +1 }) {permission}</p>)
                                        }
                                    </div>

                                    
                                }
                            </div>
                            
                        </div>
                    </div>
                </Model>
            }

            {/* campaign info edit  */}
            {
                props.campaignEditTrigger
                &&
                <Model>
                    {/* data is passed using context api */}
                    <EditCampaignDetail campaignEditTriggerHanlderOFF={props.campaignEditTriggerHanlderOFF}/>
                </Model>
            }


            {/* campaign target audience  */}
            {
                showgroupModal &&
                <Model>
                    <CampaignTargetAudienceGroup
                        showgroupmodaloffHandler={showgroupmodaloffHandler}
                        campaignDetail={campaignDetail}
                    />
                </Model>
            }

            {/* campaign preview  */}
            {
                previewModalShow &&
                <Model>
                    <CampaignPreview
                        campaignDetail={campaignDetail}
                        showpreviewmodaloffHandler={showpreviewmodaloffHandler}
                    />
                </Model>
            }

            {/* campaign delete  */}
            {
                props.campaignDeleteTrigger &&

                <Model>
                    <div className={classes.deleteGroup} style={{
                        display: 'flex',
                        flexDirection: 'column', alignItems: 'center'

                    }}>
                        <p style={{paddingTop:'10px',paddingBottom:'10px'}} >Are You Sure!!!</p>
                        <div style={{marginTop:'15px',paddingBottom:'20px'}}>
                            <button
                                className={classes.DeleteButton}
                                onClick={() => {
                                    // console.log("yes delete");

                                    fetch(campaignApi.campaigndelete,{
                                        method:'DELETE',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'Authorization':`Token ${window.localStorage.getItem('token')}`
                                        },
                                        body:JSON.stringify({
                                            campaign_id:campaignDetail.id
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            // console.log(data);
                                            props.campaignDeleteTriggerHandlerOFF();
                                        })
                                        .catch(err => console.log(err))
                                    
                                }}
                            >
                                Yes
                                 
                            </button>
                            <button
                                className={classes.DeleteNotButton}
                                onClick={() => {
                                    // console.log("no delete")
                                    props.campaignDeleteTriggerHandlerOFF();
                                }}
                            >
                                No
                            </button>
                        </div>
                        
                    </div>
                    

                </Model>
            }

            {/* group management preview */}
            {
                (groupManagementModal && groupPermissionList.group ) &&
                <Model>

                    <div className={classes.usermanagement__preview}>
                        <div className={classes.groupManagement__preview__header}>
                            {groupManagementSpecificData.name}
                            <Close style={{cursor:'pointer'}} onClick={() => groupManagementModalOff(false)} />
                        </div>

                        <div className={classes.usermanagement__preview__body}>
                            {/* left side (group name) */}
                            <div className={classes.usermanagement__preview__left}>
                                {
                                    groupPermissionList.group &&

                                    <div>
                                        {
                                            groupPermissionList.permissons.map((group,index) => <p key={index} >{index +1 }) {group}</p>)
                                        }
                                    </div>
                                    
                                }
                            </div>                    
                        </div>
                    </div>

                </Model>
            }

            {/* group management delete */}

            {
                groupDeleteModal &&
            <Model>
                    <div className={classes.deleteGroup} style={{
                        display: 'flex',
                        flexDirection: 'column', alignItems: 'center'

                    }}>
                        <p style={{paddingTop:'10px',paddingBottom:'10px'}} >Are You Sure!!!</p>
                        <div style={{marginTop:'15px',paddingBottom:'20px'}}>
                            <button
                                className={classes.DeleteButton}
                                onClick={() => {
                                    // console.log("yes delete");
                                    

                                    fetch(userapi.deleteGroup,{
                                        method:'DELETE',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'Authorization':`Token ${window.localStorage.getItem('token')}`
                                        },
                                        body:JSON.stringify({
                                            id:groupManagementSpecificData.id
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(result => {
                                            groupManagementDeleteOffHandler();
                                            props.groupDeleteTriggerHandler();
                                        })
                                        .catch(err => console.log(err));
                                }}
                            >
                                Yes
                                 
                            </button>
                            <button
                                className={classes.DeleteNotButton}
                                onClick={() => {
                                    // console.log("no delete")
                                    groupManagementDeleteOffHandler();
                                }}
                            >
                                No
                            </button>
                        </div>
                        
                    </div>
                    

                </Model>
            }

            {/* group management update  */}
            {
                groupUpdateModal &&
                <Model>
                    <GroupPermission 
                        groupUpdateTriggerHandler={props.groupUpdateTriggerHandler}
                        groupManagementSpecificData={groupManagementSpecificData}
                        groupManagementUpdateOffHandler={groupManagementUpdateOffHandler}
                    />
                </Model>
            }


            {/* template management */}
            {
                (templatePreviewModal && templateSpecificData.template_name) &&
                <Model>
                    <div className={classes.templatepreview}>
                        <div className={classes.templatepreview__header}>
                            <p style={{paddingBottom:'10px',paddingLeft:'10px'}}> Template Name : {templateSpecificData.template_name}</p>

                            <Close 
                                style={{cursor:'pointer',paddingRight:'5px'}}
                                onClick={templatePreviewModalOffHandler}
                            />
                        </div>

                        {/* conditionally template rendering */}
                        { templateRendering }
                    </div>
                </Model>
            }

            {/* template delete  */}

            {
                templateDelete &&

                <Model>
                    <div className={classes.deleteGroup} style={{
                        display: 'flex',
                        flexDirection: 'column', alignItems: 'center'

                    }}>
                        <p style={{paddingTop:'10px',paddingBottom:'10px'}} >Are You Sure!!!</p>
                        <div style={{marginTop:'15px',paddingBottom:'20px'}}>
                            <button
                                className={classes.DeleteButton}
                                onClick={() => {
                                    // console.log("yes delete");
                                    
                                    fetch(template.templatedelete,{
                                        method:'DELETE',
                                        headers:{
                                            'Content-Type':'application/json',
                                            'Authorization':`Token ${window.localStorage.getItem('token')}`
                                        },
                                        body:JSON.stringify({
                                            id:templateSpecificData.id
                                        })
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            // console.log(data);
                                            if(data.success){
                                                setTemplateDelete(false);
                                                props.templategetTriggerHandler();
                                            }else{
                                                alert(`Cannot delete resource , since they are associated in following campaigns \n ${data['Cannot delete resource , since they are associated in following campaigns']}`)
                                            }
                                            
                                        })
                                        .catch(err => console.log(err))
                                    
                                }}
                            >
                                Yes
                                 
                            </button>
                            <button
                                className={classes.DeleteNotButton}
                                onClick={() => {
                                    // console.log("no delete")
                                    setTemplateDelete(false)
                                }}
                            >
                                No
                            </button>
                        </div>
                        
                    </div>
                    

                </Model>
            }
        </div>
    )
}

export default BodyTableBody
