import { IconButton } from '@material-ui/core';
import { Delete, Edit, Send } from '@material-ui/icons';
import React from 'react'
import classes from "./BodyTableBody.module.css";

function BodyTableBody(props) {
    return (
        <div className={classes.homePage__body__bodyTable}>

            {/* ----------------------------table Header-------------------------- */}
            <div className={classes.homePage__body__bodyTableHeader}>
                <div className={classes.homePage__body__bodyTable__name}>
                    <h2>{props.title}</h2>
                </div>

                <div className={classes.homePage__body__bodyTable__create}>
                    <h2>Created</h2>
                </div>

                <div className={classes.homePage__body__bodyTable__uniqueOpen}>
                    <h2>Unique Open</h2>
                </div>

                <div className={classes.homePage__body__bodyTable__send}>
                    <h2>Send</h2>
                </div>

                <div className={classes.homePage__body__bodyTable__edit}>
                    <h2>Edit</h2>
                </div>

                <div className={classes.homePage__body__bodyTable__delete}>
                    <h2>Delete</h2>
                </div>
            </div>

            {/* -----------------------------table body-------------------------------------- */}
            <div className={classes.homePage__body__bodyTableBody}>

                <div className={classes.homePage__body__bodyTableBodyRow} onClick={props.campaigndetailURL ? props.routeURLHandler  : ()=> console.log("No Campaign detail")}>
                    <div className={classes.homePage__body__bodyTable__name}>
                        <p>Meet Sendy, our new app!</p>
                        
                    </div>

                    <div className={classes.homePage__body__bodyTable__create}>
                        <p>Mon, Oct 12, 2020, 12:00AM</p>
                        
                    </div>

                    <div className={classes.homePage__body__bodyTable__uniqueOpen}>
                        <p>279 opened</p>
                    </div>

                    <div className={classes.homePage__body__bodyTable__send}>
                        <IconButton onClick={()=> console.log("send")}>
                            <Send style={{fontSize:15 , color:"blue"}} />
                        </IconButton>
                    </div>

                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton>
                            <Edit style={{fontSize:15 ,color:"green"}} />
                        </IconButton>
                    </div>

                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton>
                            <Delete style={{fontSize:15 , color:"red"}} />
                        </IconButton>
                    </div>
                </div>


                <div className={classes.homePage__body__bodyTableBodyRow}>
                    <div className={classes.homePage__body__bodyTable__name}>
                        <p>Meet Sendy, our new app!</p>
                        
                    </div>

                    <div className={classes.homePage__body__bodyTable__create}>
                        <p>Mon, Oct 12, 2020, 12:00AM</p>
                        
                    </div>

                    <div className={classes.homePage__body__bodyTable__uniqueOpen}>
                        <p>279 opened</p>
                    </div>

                    <div className={classes.homePage__body__bodyTable__send}>
                        <IconButton>
                            <Send style={{fontSize:15 , color:"blue"}} />
                        </IconButton>
                    </div>

                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton>
                            <Edit style={{fontSize:15 ,color:"green"}} />
                        </IconButton>
                    </div>

                    <div className={classes.homePage__body__bodyTable__edit}>
                        <IconButton>
                            <Delete style={{fontSize:15 , color:"red"}} />
                        </IconButton>
                    </div>
                </div>
                
                

            </div>

            
        </div>
    )
}

export default BodyTableBody
