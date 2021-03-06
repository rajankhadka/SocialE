import React from "react";
import classes from "./BodyTable.module.css";

//material UI
import { Button, IconButton, TextField } from '@material-ui/core';
import { Add, Edit, Search, Send, Delete } from '@material-ui/icons';

//importing components
import HomePageBodyHeader from "../../HomePageBodyHeader/HomePageBodyHeader";

//redux
import { connect } from "react-redux";

const BodyTable = (props) =>{
    console.log("bodytable",props)
    return(
        <div className={classes.homePage__body__body}
            style={{
                zIndex: !props.showtooltipReducers.bodyzIndex ? "-1" : "1" 
            }}
        >
            <HomePageBodyHeader 
                header={props.header} 
                buttonName={props.buttonName} 
                title={props.title}
                url={props.url}
            />
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showtooltipReducers: state.showtooltipReducers
    }
}

export default connect(mapStateToProps, undefined)(BodyTable);