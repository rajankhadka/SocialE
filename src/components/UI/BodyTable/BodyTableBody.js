import { Button, IconButton } from '@material-ui/core';
import { Close, Delete, Edit, Send, Visibility } from '@material-ui/icons';
import React,{useState} from 'react'
import classes from "./BodyTableBody.module.css";

function BodyTableBody(props) {

    let body = null;

    const [showSendEmail, setShowSendEmail] = useState(false);

    const [campaignId, setCampaignID] = useState(null);

    const [sendemailSubject, setSendemailSubject] = useState("");

    const [sendemailBody, setSendemailBody] = useState("");

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

                        <div className={classes.homePage__body__bodyTable__edit}>
                            <IconButton>
                                <Edit style={{ fontSize: 15, color: "green" }} />
                            </IconButton>
                        </div>

                        <div className={classes.homePage__body__bodyTable__edit}>
                            <IconButton>
                                <Delete style={{ fontSize: 15, color: "red" }} />
                            </IconButton>
                        </div>

                        <div className={classes.homePage__body__bodyTable__edit}>
                            <IconButton>
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

        fetch("http://127.0.0.1:8000/template/send/", {
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
                                        type="text" className={classes.sendEmail__subject}
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

            

            
        </div>
    )
}

export default BodyTableBody
