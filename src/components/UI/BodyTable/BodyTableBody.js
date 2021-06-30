import { Button, FormControl, IconButton, InputLabel, Select, TextField } from '@material-ui/core';
import { Close, Delete, Edit, Group, Send, Visibility } from '@material-ui/icons';
import React,{useState,useContext,useEffect} from 'react'
import { SpecificCampaignDetailContext } from '../../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import EditCampaignDetail from '../../EditCampaign/EditCampaignDetail';
import Model from '../../Model/Model';
import classes from "./BodyTableBody.module.css";
import { template } from "../../../api/template/template";
import CampaignTargetAudienceGroup from '../../CampaignTargetAudienceGroup/CampaignTargetAudienceGroup';
import CampaignPreview from '../../CampaignPreview/CampaignPreview';

function BodyTableBody(props) {

    const [campaignDetail, setCampaignDetail] = useContext(SpecificCampaignDetailContext);

    let body = null;

    const [showSendEmail, setShowSendEmail] = useState(false);

    const [campaignId, setCampaignID] = useState(null);

    const [sendemailSubject, setSendemailSubject] = useState("");

    const [sendemailBody, setSendemailBody] = useState("");

    const [campaignEditSelected, setCampaignEditSelected] = useState(false);

    const campaignEditOff = () => setCampaignEditSelected(false);

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

    switch (props.title) {
        case "Campaign":
            
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
                                console.log(element);
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
                                    console.log(element);
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
            break;
    
        default:
            break;
    }

    const sendEmailHandler = (event) => {
        event.preventDefault();
        console.log(sendemailSubject);
        console.log(sendemailBody);
        console.log(campaignId);

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
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <div className={classes.homePage__body__bodyTable}>

            {/* ----------------------------table Header-------------------------- */}
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

            {/* campaign info edit  */}

            {
                props.campaignEditTrigger
                &&
                <Model>
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
                                    console.log("yes delete")
                                    props.campaignDeleteTriggerHandlerOFF();
                                }}
                            >
                                Yes
                                 
                            </button>
                            <button
                                className={classes.DeleteNotButton}
                                onClick={() => {
                                    console.log("no delete")
                                    props.campaignDeleteTriggerHandlerOFF();
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
