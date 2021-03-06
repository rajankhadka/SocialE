import React from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import { Button, InputBase, InputLabel, MenuItem, TextField } from "@material-ui/core";

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

                            <TextField variant="standard" 
                                label="Select Template"
                                select={true} style={{width:"250px",marginBottom: "20px"}} 
                            >
                                <MenuItem value="Nabil">Nabil</MenuItem>
                                <MenuItem value="Nabil">Nic</MenuItem>
                                <MenuItem value="Nabil">BOK</MenuItem>
                            </TextField>

                           <Button variant="contained" style={{width:"250px"}}> Create Campaign</Button>
                       </form>
                   </div>
                </div>
                
            </div>
        </div>
    );
}

export default CreateCampaginPage;