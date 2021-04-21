import React,{useState,useEffect,useRef} from "react";
import classes from "./CreateCampaginPage.module.css";

//importing components
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import {
    Button,
    FormControl, InputLabel,
    Select, TextField
} from "@material-ui/core";

//color picker 
import ColorPicker from "../../components/ColorPicker/ColorPicker";

//redux
import { connect } from "react-redux";
import { setTemplate } from "../../redux/actions/templateAction";
import TemplateEngine from "./TemplateEngine";

const templateData = [
    {
        templateName: "temp001",
        url:"http://localhost:3000/template/001",
    }, {
        templateName: "temp002",
        url:"http://localhost:3000/template/002",
    }
];


const CreateCampaginPage = (props) =>{
    // console.log(props);
    const [template_name, setTemplate_name] = useState("");

    //template
    const [selectTemplate, setSelectTemplate] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [optionvalue, setOptionValue] = useState([]);
    const [iframerender, setIframerender] = useState("");

    

    const IframerenderHandler = (event) => {
        const templatedata = templateData.filter(item => event.target.value === item.url);
        console.log(event.target.value);
        const url = `${event.target.value}`;
        setSelectTemplate(event.target.value);
        setIframerender(url);
        // setIframerender(event.target.value);
        console.log(templatedata[0].templateName);
        setTemplateName(templatedata[0].templateName);
    }

    //createCampaign
    const [createCampaign, setCreateCampaign] = useState(false);

    const createCampaignHandler = () => {
        setCreateCampaign(true);
    }

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
                                    value={template_name}
                                    onChange={(event)=> setTemplate_name(event.target.value)}
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
                                        onChange={IframerenderHandler}
                                    >
                                        <option value="" />

                                        {templateData.map((item, index) => {
                                            return <option key={index} value={item.url} >{item.templateName}</option>
                                        })}
                                    </Select>
                                </FormControl>
                                
                                <label htmlFor="startDate">Start Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="startDate"
                                    style={{marginBottom: "20px"}}
                                    onChange={(event) => console.log(event.target.value)}
                                />

                                <label htmlFor="endDate">End Date</label>
                                <TextField
                                    variant="standard"
                                    type="date"
                                    id="endDate"
                                    style={{marginBottom: "20px"}}
                                    onChange={(event) => console.log(event.target.value)}
                                />

                                <Button variant="contained" style={{width:"250px"}} disabled={!createCampaign}> Create Campaign</Button>
                            </form>
                        </div>
                       
                        {/* right part  */}

                        <div className={classes.createCampaignBody__body__right}>
                            
                            <TemplateEngine
                                template_name={ template_name}
                                iframerender={iframerender}
                                templateName={templateName}
                                selectTemplate={selectTemplate}
                                createCampaignHandler={createCampaignHandler}
                            />
                        </div>
                   </div>
                </div>
                
            </div>
        </div>
    );
}

const mapDispatchtoProps = (dispatch) => {
    return {
        setTemplateAction: (data) => dispatch(setTemplate(data))
    }
}

export default connect(undefined,mapDispatchtoProps)(CreateCampaginPage);