import React,{} from "react";
import classes from "./HomePageBodyHeader.module.css"

//material UI
import { Button, TextField } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';

//react router 
import {useHistory} from "react-router-dom"

//redux
import { connect } from "react-redux";
import { templatePageCreate,templatePageView } from "../../redux/actions/templatePageToggleAction";

const HomePageBodyHeader = (props) =>{
    const homepageHistory = useHistory();

    const campaignCreateHandler = () =>{
        homepageHistory.push(props.url)
    }

    const searchTitle = `Search ${props.title}`
    
    let searchButton = null;

    if (props.header === 'Templates' && props.templatePageToggle === "view") {
        searchButton = (
            <div className={classes.homePage__body__bodyHeaderCompanyRight}
                // style={{
                //     justifyContent: props.header !== 'Templates' ? "center" : "flex-end"
                // }}
            >
                <TextField id="outlined-basic"
                    variant="outlined"
                    placeholder={searchTitle}
                    InputProps={{
                        startAdornment: <Search />
                    }}
                    size="small"
                />
            </div>
        );
    } else if (props.header === 'Templates' && props.templatePageToggle === "create") {
        searchButton = null;
    }else if(props.header === "User Management"){

    } 
    
    else {
        searchButton = (
            <div className={classes.homePage__body__bodyHeaderCompanyRight}
                // style={{
                //     justifyContent: props.header !== 'Templates' ? "center" : "flex-end"
                // }}
            >
                <TextField id="outlined-basic"
                    variant="outlined"
                    placeholder={searchTitle}
                    InputProps={{
                        startAdornment: <Search />
                    }}
                    size="small"
                />
            </div>
        );
    }

    return(
        <div className={classes.homePage__body__bodyHeader}>
            <div className={classes.homePage__body__bodyHeaderTitle}>
                <div className={classes.homePage__tabView}>
                    <h2>{props.header}</h2>
                    {
                        props.header === 'Templates' &&
                        <div className={classes.homePage__tabView__right}>
                            <div
                                className={classes.homePage__tabView__right__view}
                                onClick={() => {
                                    props.templatePageViewAction();
                                }}
                                style={{
                                    backgroundColor: props.templatePageToggle === "view" ? "#2bae66" : "#fcf6f5",
                                    color: props.templatePageToggle === "view" ? "#fcf6f5" : "#2bae66"
                                }}
                            >
                                View Template
                            </div>

                            <div
                                className={classes.homePage__tabView__right__create}
                                onClick={() => {
                                    props.templatePageCreateAction()
                                }}
                                style={{
                                    backgroundColor: props.templatePageToggle === "create" ? "#2bae66" : "#fcf6f5",
                                    color: props.templatePageToggle === "create" ? "#fcf6f5" : "#2bae66"
                                }}
                            >
                                Create Template
                            </div>
                        </div>
                    }
                </div>
                
            </div>

            <div className={classes.homePage__body__bodyHeaderCompany}
                style={{
                    justifyContent:  props.header === "Templates" && "flex-end"
                }}
            >
                {
                    props.header !== 'Templates' &&
                    // campaign header 
                    <div className={classes.homePage__body__bodyHeaderCompanyLeft}>
                        <Button variant="text"
                            startIcon={<Add />}
                            style={{
                                fontSize: 15,
                                textTransform: 'capitalize',
                                fontWeight: 'lighter',
                                marginLeft: "10px"
                            }}
                            onClick = { () =>{
                                if(props.header === 'Campaigns'){
                                    campaignCreateHandler();
                                }else if(props.header === 'User Management'){
                                        console.log("user management");
                                        console.log(props.url)
                                        homepageHistory.push(props.url);
                                }else{
                                    props.showcreateGroupONhandler()
                                }
                            }}
                        >
                            {props.buttonName}
                        </Button>

                        
                        {
                            // props.header === "Campaigns" &&
                                // <>
                                //                 {/* All group  */}
                                //     <Button variant="text"
                                //         startIcon={<List />}
                                //         style={{
                                //             // fontSize: 15,
                                //             textTransform: 'capitalize',
                                //             marginLeft: "10px",
                                //         }}
                                //         onClick = {props.showONAllGroupHandler}
                                //     >
                                //         {props.showAllGroup}
                                //     </Button>

                                //     {/* create group  */}
                                //     <Button variant="text"
                                //         startIcon={<Add />}
                                //         style={{
                                //             // fontSize: 15,
                                //             textTransform: 'capitalize',
                                //             marginLeft: "10px",
                                //         }}
                                //         onClick = {props.showGroupONHandler}
                                //     >
                                //         {props.groupName}
                                //     </Button>
                                // </>
                        }

                        
                        
                    </div>
                }

                {searchButton}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        templatePageToggle: state.templatePageToggleReducers.templatePageToggle
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        templatePageCreateAction: () => dispatch(templatePageCreate()),
        templatePageViewAction:() => dispatch(templatePageView()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (HomePageBodyHeader);