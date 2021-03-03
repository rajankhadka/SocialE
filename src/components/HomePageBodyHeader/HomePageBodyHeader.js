import React from "react";
import classes from "./HomePageBodyHeader.module.css"

//material UI
import { Button, TextField } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';

const HomePageBodyHeader = (props) =>{
    return(
        <div className={classes.homePage__body__bodyHeader}>
            <div className={classes.homePage__body__bodyHeaderTitle}>
                <h1>Campaigns</h1>
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
                    >
                        Add New Campaign
                    </Button>
                </div>

                <div className={classes.homePage__body__bodyHeaderCompanyRight}>
                    <TextField id="outlined-basic"
                        variant="outlined"
                        placeholder="Search Campaign"
                        InputProps={{
                            startAdornment: <Search />
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePageBodyHeader;