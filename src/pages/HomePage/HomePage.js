import React from 'react'
import classes from "./HomePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';

//material UI
import { Button, TextField } from '@material-ui/core';
import { Add, Search } from '@material-ui/icons';


function HomePage(props) {
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />

                <div className={classes.homePage__body__body}>
                    <div className={classes.homePage__body__bodyHeader}>
                        <div className={classes.homePage__body__bodyHeaderTitle}>
                            <h1>Companies</h1>
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
                                    Add New Company
                                </Button>
                            </div>

                            <div className={classes.homePage__body__bodyHeaderCompanyRight}>
                                <TextField id="outlined-basic"
                                    variant="outlined"
                                    placeholder="Search company"
                                    InputProps={{
                                        startAdornment: <Search />
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
