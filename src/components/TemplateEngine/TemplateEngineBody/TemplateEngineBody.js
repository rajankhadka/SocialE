import { Button, TextField } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import React,{useState} from 'react'
import ColorPicker from '../../ColorPicker/ColorPicker';
import classes from "./TemplateEngineBody.module.css";

//redux
import { connect } from "react-redux";

function TemplateEngineBody(props) {

    //upload field

    //template name
    const [templateName, setTemplateName] = useState("");

    //color
    //header color
    const [headerbackgroundColorPicker,setHeaderbackgroundColorPicker] = useState("#ffffff")

    const colorHandler = ( color) => {
        setHeaderbackgroundColorPicker(color.hex);
        console.log(color.hex);
    }

    const [headerColorPicker, setHeaderColorPicker] = useState("#ffffff");

    const headerColorPickerHandler = (color) => {
        setHeaderColorPicker(color.hex);
    }

    //body color

    const [bodybackgroundColorPicker, setBodybackgroundColorPicker] = useState("#ffffff");

    const bodybackgroundColorPickerHandler = (color) => {
        setBodybackgroundColorPicker(color.hex);
    }

    const [bodyColorPicker, setBodyColorPicker] = useState("#ffffff");

    const bodyColorPickerHandler = (color) => {
        setBodyColorPicker(color.hex);
    }

    const [bodyButtonColorPicker, setBodyButtonColorPicker] = useState("#ffffff");

    const bodyButtonColorPickerHandler = (color) => {
        setBodyButtonColorPicker(color.hex);
    }

    //footer color
    const [footerbackgroundColorPicker, setFooterbackgroundColorPicker] = useState("#ffffff");

    const footerbackgroundColorPickerHandler = (color) => {
        setFooterbackgroundColorPicker(color.hex);
    }

    const [footerColorPicker, setFooterColorPicker] = useState("#ffffff");

    const footerColorPickerHandler = color => setFooterColorPicker(color.hex);

    
    const [titleLogo, setTitleLogo] = useState("");
    const [titleName, setTitleName] = useState("");

    const [headerLogo, setHeaderLogo] = useState();
    const [headerNav1, setHeaderNav1] = useState("");
    const [headerNav2, setHeaderNav2] = useState("");
    const [headerNav3, setHeaderNav3] = useState("");

    const [bodyLandingImage, setBodyLandingImage] = useState();

    //title logo handler 
    const tileLogoHandler = (event) => {
        console.log(event.target.files[0]);
        setTitleLogo(event.target.files[0]);
    }

    const headerLogoHandler = (event) => {
        setHeaderLogo(event.target.files[0]);
    }

    const bodyLandingImageHandler = event => {
        setBodyLandingImage(event.target.files[0]);
    }

    const [createnewTemplate, setCreatenewTemplate] = useState(false);
    
    const createTemplateHandler = () => {
        setCreatenewTemplate(true);
        props.modifyTemplateHandler()
        props.createCampaignHandler();
        console.log("Submitted!!!");
        console.log("title logo", titleLogo);
        console.log("title Name", titleName);

        console.log("header background color", headerbackgroundColorPicker);
        console.log("header Font color", headerColorPicker);
        console.log("header logo", headerLogo);
        console.log("header navbar ", headerNav1, "\n", headerNav2, "\n", headerNav3);

        console.log("body background color", bodybackgroundColorPicker);
        console.log("body color", bodyColorPicker);
        console.log("body landing page", bodyLandingImage);
        console.log("body button color", bodyButtonColorPicker);

        console.log("footer background color", footerbackgroundColorPicker);
        console.log("footer font color", footerColorPicker);

        console.log("props.iframerender-->", props.iframerender);

        fetch("http://127.0.0.1:8000/template/resource/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                headerBackgroundColor: headerbackgroundColorPicker,
                headerFontColor: headerColorPicker,
                bodyBackgroundcolor: bodybackgroundColorPicker,
                bodyFontColor: bodyColorPicker,
                headerNav1: headerNav1,
                headerNav2: headerNav2,
                headerNav3: headerNav3,
                template_url: props.shownewtemplateReducers, //template url
                template_name: templateName, //new template name
                bodyButtonColor: bodyButtonColorPicker
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                props.newTemplateHandler(data.tempate_name);
                console.log("original url", `${props.iframerender}?template_name=${props.template_name}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        <div className={classes.templateEngine__body__body}>
            <div className={classes.templateEngine__body__body__content}>
                <div className={classes.templateEngine__body__body__title}>

                    {
                        (props.showheaderInner.title && props.activeclassesTitle.titleLogo ) &&
                        <div className={classes.templateEngine__body__body__titleLogo}>
                            <label htmlFor="titleLogo" >Upload the Title Logo</label>
                            <input type="file" id="titleLogo" onChange={ tileLogoHandler}/>
                        </div>
                    }

                    {
                        (props.showheaderInner.title && props.activeclassesTitle.titleName) &&
                        <div className={classes.templateEngine__body__body__titleName}>
                            <label htmlFor="titleName" >Title Name</label>
                            <input type="text"
                                id="titleName"
                                placeholder="Enter the title name"
                                value={titleName}
                                onChange={(event) => setTitleName(event.target.value)}
                            />
                        </div>
                    }
                </div>

                <div className={classes.templateEngine__body__body__header} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    
                    {
                        (props.showheaderInner.header && props.activeclassesHeader.headerbackgroundColor) &&
                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={colorHandler}
                                color={headerbackgroundColorPicker}
                            />
                            <input type="text"
                                placeholder="Header Background Color"
                                value={headerbackgroundColorPicker}
                                onChange={(event) => setHeaderbackgroundColorPicker(event.target.value)}
                            />
                        </>
                        
                        
                    }

                    {
                        (props.showheaderInner.header && props.activeclassesHeader.headerColor) &&
                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={headerColorPickerHandler}
                                color={headerColorPicker}
                            />
                            <input type="text"
                                placeholder="Header Color"
                                value={headerColorPicker}
                                onChange={(event) => setHeaderColorPicker(event.target.value)}
                            />
                        </>
                    }

                    {
                        (props.showheaderInner.header && props.activeclassesHeader.headerLogo) &&

                        <>
                            
                            <label htmlFor="headerLogo" >Header Logo</label>
                            <input type="file" id="headerLogo" onChange={ headerLogoHandler}/>
                        
                        </>
                    }

                    {
                        (props.showheaderInner.header && props.activeclassesHeader.headerNavbar) &&

                        <>
                            <label htmlFor="nav1" >Nav 1</label>
                            <input type="text"
                                id="nav1"
                                placeholder="enter first nav name"
                                value={headerNav1}
                                onChange={(event) => setHeaderNav1(event.target.value)}
                            />
                            
                            <label htmlFor="nav2" >Nav 2</label>
                            <input type="text" id="nav2"
                                placeholder="enter second nav name"
                                value={headerNav2}
                                onChange={(event) => setHeaderNav2(event.target.value)}
                            />
                            
                            <label htmlFor="nav3" >Nav 3</label>
                            <input type="text" id="nav3"
                                placeholder="enter third nav name"
                                value={headerNav3}
                                onChange={(event) => setHeaderNav3(event.target.value)}
                            />
                        
                        </>
                    }

                </div>

                <div className={classes.templateEngine__body__body__body} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    {
                        (props.showheaderInner.body && props.activeclassesBody.bodybackgroundColor) &&
                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={bodybackgroundColorPickerHandler}
                                color={bodybackgroundColorPicker}
                            />
                            <input type="text"
                                placeholder="Body Background Color"
                                value={bodybackgroundColorPicker}
                                onChange={(event) => setBodybackgroundColorPicker(event.target.value)}
                            />
                        </>
                    }

                    {
                        (props.showheaderInner.body && props.activeclassesBody.bodyColor) &&
                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={bodyColorPickerHandler}
                                color={bodyColorPicker}
                            />
                            <input type="text"
                                placeholder="Body Color"
                                value={bodyColorPicker}
                                onChange={(event) => setBodyColorPicker(event.target.value)}
                            />
                        </>
                    }

                    {
                        (props.showheaderInner.body && props.activeclassesBody.bodyImage) &&

                        <>
                            
                            <label htmlFor="bodyImage" >Body Landing Image</label>
                            <input type="file" id="bodyImage" onChange={ bodyLandingImageHandler}/>
                        
                        </>
                    }

                    {
                        (props.showheaderInner.body && props.activeclassesBody.bodybuttonColor) &&
                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={bodyButtonColorPickerHandler}
                                color={bodyButtonColorPicker}
                            />
                            <input type="text"
                                placeholder="Body Button Color"
                                value={bodyButtonColorPicker}
                                onChange={(event) => setBodyButtonColorPicker(event.target.value)}
                            />
                        </>
                    }
                </div>

                <div className={classes.templateEngine__body__body__body} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    {
                        (props.showheaderInner.footer && props.activeclassesFooter.footerBackgroundColor) &&

                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={footerbackgroundColorPickerHandler}
                                color={footerbackgroundColorPicker}
                            />
                            <input type="text"
                                placeholder="Footer Background Color"
                                value={footerbackgroundColorPicker}
                                onChange={(event) => setFooterbackgroundColorPicker(event.target.value)}
                            />
                        </>
                    }

                    {
                        (props.showheaderInner.footer && props.activeclassesFooter.footerColor) &&

                        <>
                            <ColorPicker
                                width={150}
                                disableAlpha={true}
                                onChangeComplete={footerColorPickerHandler}
                                color={footerColorPicker}
                            />
                            <input type="text"
                                placeholder="Footer Color"
                                value={footerColorPicker}
                                onChange={(event) => setFooterColorPicker(event.target.value)}
                            />
                        </>
                    }
                </div>
            </div>
            </div>
            {
                <div className={classes.createTemplate}
                    style={{
                        // display: props.modifyTemplate ? "flex" : "none"
                        display: "flex"
                    }}
                >
                    <div className={classes.createTemplate__newTemplate}>
                        <TextField
                            id="newTemplate"
                            label="New Template Name"
                            variant="outlined" size="small" required
                            value={templateName}
                            onChange={(event) => setTemplateName(event.target.value)}
                        />
                    </div>
                    {
                        templateName.length > 0 &&
                        <Button
                            variant="contained"
                            style={{ textTransform: "capitalize",marginRight:"400px" }}
                            onClick={createTemplateHandler}
                            size="small"

                        >
                            Create Template
                        </Button>
                    }

                    {
                        (templateName.length > 0 && createnewTemplate ) &&
                        <Button
                            variant="contained"
                            style={{ textTransform: "capitalize",marginRight:"20px" }}
                            onClick={() => window.open(`${props.shownewtemplateReducers}?template_name=${templateName}`)}
                            size="small"
                        >
                            <Visibility />
                        </Button>
                    }

                </div>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        shownewtemplateReducers: state.shownewtemplateReducers.shownewtemplate
    }
}

export default connect(mapStateToProps)(TemplateEngineBody);
