import React,{useState} from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import {
    Button,
    FormControl, InputLabel,
    Select, TextField
} from "@material-ui/core";



const CreateCampaginPage = (props) =>{
    console.log(props);
    const [selectTemplate, setSelectTemplate] = useState("");

    

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
                                        style={{  marginBottom: "10px",width:"250px"}}
                                    />

                                <TextField variant="standard" 
                                        label="Campaign Subject"
                                        style={{  marginBottom: "10px",width:"250px"}}
                                    />

                                <TextField variant="standard" 
                                        label="Campaign Description" 
                                        multiline={true} rowsMax={4}
                                        style={{  marginBottom: "10px",width:"250px"}}
                                    />

                                <FormControl style={{width:"250px",marginBottom: "20px"}}>
                                    <InputLabel id="selectTemplate">Select Template</InputLabel>
                                    <Select
                                        native
                                        labelId="selectTemplate"
                                        id="selectTemplate"
                                        value={selectTemplate}
                                        onChange={(event) => setSelectTemplate(event.target.value)}
                                    >
                                        <option value="" />
                                        <option value="template001">Template 001</option>
                                        <option value="template002">Template 002</option>
                                        <option value="template003">Template 003</option>
                                    </Select>
                                </FormControl>
                                
                                <label htmlFor="startDate">Start Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="startDate"
                                    style={{marginTop:"10px",marginBottom: "10px"}}
                                    onChange={(event) => console.log(event.target.value)}
                                />

                                <label htmlFor="endDate">End Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="endDate"
                                    style={{marginTop:"10px",marginBottom: "10px"}}
                                    onChange={(event) => console.log(event.target.value)}
                                />

                                <Button variant="contained" style={{width:"250px"}}> Create Campaign</Button>
                            </form>
                        </div>
                       

                        <div className={classes.createCampaignBody__body__right}>
                            <p>Create Template</p>
                            <iframe
                                name="template"
                                title="template"
                                src="http://127.0.0.1:5500/src/pages/CreateCampaginPage/index.html"
                                height="500px"
                                width="800px"
                                style={{border:"none"}}
                            />
                            
                        </div>
                   </div>
                </div>
                
            </div>
        </div>
    );
}

export default CreateCampaginPage;