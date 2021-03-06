import React from "react";
import classes from "./HomePageBodyHeader.module.css"

//material UI
import { Button, TextField } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';

//react router 
import {useHistory} from "react-router-dom"

const HomePageBodyHeader = (props) =>{
    const homepageHistory = useHistory();

    const campaignCreateHandler = () =>{
        homepageHistory.push(props.url)
    }

    const searchTitle = `Search ${props.title}`
    
    return(
        <div className={classes.homePage__body__bodyHeader}>
            <div className={classes.homePage__body__bodyHeaderTitle}>
                <h1>{props.header}</h1>
            </div>

            <div className={classes.homePage__body__bodyHeaderCompany}>
                <div className={classes.homePage__body__bodyHeaderCompanyLeft}>
                    <Button variant="contained"
                        startIcon={<Add />}
                        style={{
                            fontSize: 15,
                            textTransform: 'capitalize',
                            fontWeight: 'lighter',
                            marginLeft: "10px"
                        }}
                        onClick = {campaignCreateHandler}
                    >
                        {props.buttonName}
                    </Button>
                </div>

                <div className={classes.homePage__body__bodyHeaderCompanyRight}>
                    <TextField id="outlined-basic"
                        variant="outlined"
                        placeholder={searchTitle}
                        InputProps={{
                            startAdornment: <Search />
                        }}
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePageBodyHeader;