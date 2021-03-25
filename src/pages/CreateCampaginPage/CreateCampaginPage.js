import React from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";


const CreateCampaginPage = (props) =>{
    console.log(props)
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
                            <form>
                                <TextField variant="standard" 
                                        label="Campaign Name" 
                                        style={{  marginBottom: "20px",width:"250px"}}
                                    />

                                <TextField variant="standard" 
                                        label="Campaign Subject"
                                        style={{  marginBottom: "20px",width:"250px"}}
                                    />

                                <TextField variant="standard" 
                                        label="Campaign Description" 
                                        multiline={true} rowsMax={4}
                                        style={{  marginBottom: "20px",width:"250px"}}
                                    />

                                    <FormControl style={{width:"250px",marginBottom: "20px"}}>
                                        <InputLabel id="selectTemplate">Select Template</InputLabel>
                                        <Select labelId="selectTemplate">
                                            <MenuItem value="Nabil">Nabil</MenuItem>
                                            <MenuItem value="Nic">Nic</MenuItem>
                                        <   MenuItem value="BOK">BOK</MenuItem>
                                        </Select>
                                    </FormControl>

                                <Button variant="contained" style={{width:"250px"}}> Create Campaign</Button>
                            </form>
                        </div>
                       

                        <div className={classes.createCampaignBody__body__right}>
                            <p>Create Template</p>
                            
                            
                        </div>
                   </div>
                </div>
                
            </div>
        </div>
    );
}

export default CreateCampaginPage;