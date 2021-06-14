import { FormControl, IconButton, InputLabel, Select } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React,{useState} from 'react'
import TemplateEngine from '../../TemplateEngine/TemplateEngine';
import classes from "./CreateTemplate.module.css";

//redux
import { connect } from "react-redux";
import {shownewtemplate } from "../../../redux/actions/shownewtemplate";

const templateData = [
    {
        templateName: "temp001",
        url:"http://localhost:3000/template/001",
    }, {
        templateName: "temp002",
        url:"http://localhost:3000/template/002",
    }
];

function CreateTemplate(props) {
       // console.log(props);
    const [template_name, setTemplate_name] = useState("");

    //template
    const [selectTemplate, setSelectTemplate] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [iframerender, setIframerender] = useState("");

    const IframerenderHandler = (event) => {

        if (event.target.value.length > 0) {
            const templatedata = templateData.filter(item => event.target.value === item.url);
            console.log(event.target.value);
            const url = `${event.target.value}`;
            setSelectTemplate(event.target.value);
            setIframerender(url);
            // setIframerender(event.target.value);
            console.log(templatedata[0].templateName);
            setTemplateName(templatedata[0].templateName);
            props.shownewtemplateAction(url);
        } else {
            setSelectTemplate(event.target.value);
            setTemplateName(event.target.value);
            setIframerender(event.target.value);
        }
        
    }

    //createCampaign
    const [createCampaign, setCreateCampaign] = useState(false);

    const createCampaignHandler = () => {
        setCreateCampaign(true);
    }

    return (
        <div className={classes.createTemplate}>

            <div className={classes.createTemplate__header}>
                <FormControl style={{width:"250px",marginBottom: "20px"}}>
                    <InputLabel id="selectTemplate">Choose Raw Template</InputLabel>
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

                {
                    selectTemplate.length > 0 && 
                    <div className={classes.createTemplate__header__preview}>
                        <IconButton onClick={() => window.open(`${iframerender}`)}>
                            <Visibility />
                        </IconButton>
                    </div>
                }

                
            </div>

            

            {
                templateName.length > 0 &&
                <TemplateEngine
                    template_name={ template_name}
                    iframerender={iframerender}
                    templateName={templateName}
                    selectTemplate={selectTemplate}
                    createCampaignHandler={createCampaignHandler}
                />
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        shownewtemplateAction: (url) => dispatch(shownewtemplate(url))
    }
}

export default connect(undefined,mapDispatchToProps)(CreateTemplate);
