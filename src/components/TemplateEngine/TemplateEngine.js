import { Button } from '@material-ui/core';
import React, { useRef,useState} from 'react'
import classes  from "./TemplateEngine.module.css";
import TemplateEngineBody from './TemplateEngineBody/TemplateEngineBody';
import TemplateEngineHeader from './TemplateEngineHeader/TemplateEngineHeader';

import classes1 from "./TemplateEngineHeader/TemplateEngineHeader.module.css";

function TemplateEngine(props) {



    //new template
    const [newTemplate, setNewTemplate] = useState("");

    const newTemplateHandler = (data) => {
        setNewTemplate(data)
    }

    //modify template handler
    const [modifyTemplate, setModifyTemplate] = useState(false);

    const modifyTemplateHandler = () => setModifyTemplate(true);

    const activetitle = useRef(null);
    const activeheader = useRef(null);
    const activebody = useRef(null);
    const activefooter = useRef(null);


    //header inner 
    const [showheaderInner, setShowheaderInner] = useState({
        title: false,
        header: false,
        body: false,
        footer: false,
        inner: false,
    });

    
    //active classes 
    //title
    const [activeclassesTitle, setActiveclassesTitle] = useState({
        titleName: false,
        titleLogo: true,
    });

   
    //header 
    const [activeclassesHeader, setActiveclassesHeader] = useState({
        headerbackgroundColor: true,
        headerColor: false,
        headerLogo: false,
        headerNavbar: false,
    });

    //body
    const [activeclassesBody, setActiveclassesBody] = useState({
        bodybackgroundColor: true,
        bodyColor: false,
        bodyImage: false,
        bodybuttonColor : false,

    });
    
    //footer
    const [activeclassesFooter, setActiveclassesFooter] = useState({
        footerBackgroundColor: true,
        footerColor: false,
    });


    const activeclassesFooterHandler = (event) => {
        switch (event.target.id) {
            case "footerBackgroundColor":
                setActiveclassesFooter({
                    footerBackgroundColor: true,
                    footerColor: false,
                })
                break;
            
            case "footerColor":
                setActiveclassesFooter({
                    footerBackgroundColor: false,
                    footerColor: true,
                })
                break;
            default:
                break;
        }
    }

    const activeclassesBodyHandler = (event) => {
        switch (event.target.id) {
            case "bodybackgroundColor":
                setActiveclassesBody({
                    bodybackgroundColor: true,
                    bodyColor: false,
                    bodyImage: false,
                    bodybuttonColor : false, 
                });
                break;
            
            case "bodyColor":
                setActiveclassesBody({
                    bodybackgroundColor: false,
                    bodyColor: true,
                    bodyImage: false,
                    bodybuttonColor : false, 
                });
                break;
            
            case "bodyImage":
                setActiveclassesBody({
                    bodybackgroundColor: false,
                    bodyColor: false,
                    bodyImage: true,
                    bodybuttonColor : false, 
                });
                break;
            
            case "bodybuttonColor":
                setActiveclassesBody({
                    bodybackgroundColor: false,
                    bodyColor: false,
                    bodyImage: false,
                    bodybuttonColor : true, 
                });
                break;
            default:
                break;
        }
    }

    
    const activeclassesHeaderHandler = (event) => {
        switch (event.target.id) {
            case "headerbackgroundColor":
                setActiveclassesHeader({
                    headerbackgroundColor: true,
                    headerColor: false,
                    headerLogo: false,
                    headerNavbar: false,
                })
                break;
            case "headerColor":
                setActiveclassesHeader({
                    headerbackgroundColor: false,
                    headerColor: true,
                    headerLogo: false,
                    headerNavbar: false,
                })
                break;
            
            case "headerLogo":
                setActiveclassesHeader({
                    headerbackgroundColor: false,
                    headerColor: false,
                    headerLogo: true,
                    headerNavbar: false,
                })
                break;
            
            case "headerNavbar":
                setActiveclassesHeader({
                    headerbackgroundColor: false,
                    headerColor: false,
                    headerLogo: false,
                    headerNavbar: true,
                })
                break;
            
            default:
                break;
        }
    }

    const activeclassesTitleHandler = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titleName":
                setActiveclassesTitle({
                    titleName: true,
                    titleLogo: false,
                })
                break;
            case "titleLogo":
                setActiveclassesTitle({
                    titleName: false,
                    titleLogo: true,
                })
                break;
            default:
                break;
        }
    }

    
    
    //title part 
    const setShowheaderInnerTitleHandler = () => {
        setShowheaderInner({
            title: true,
            header: false,
            body: false,
            footer: false,
            inner:true,
        })
    }

    
    const addtitleactiveclassNameHandler = () => {
        activetitle.current.className = classes1.modifyTemplate__body__header__content__title__active;
        activeheader.current.className = classes1.modifyTemplate__body__header__content__header;
        activebody.current.className = classes1.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes1.modifyTemplate__body__header__content__footer;
        setShowheaderInnerTitleHandler()
    }

    //header part

    const setShowheaderInnerHeaderHandler = () => {
        setShowheaderInner({
            title: false,
            header: true,
            body: false,
            footer: false,
            inner:true,
        })
    }
   
    const addheaderactiveclassNameHandler = () => {
        activetitle.current.className = classes1.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes1.modifyTemplate__body__header__content__header__active;
        activebody.current.className = classes1.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes1.modifyTemplate__body__header__content__footer;
        setShowheaderInnerHeaderHandler();
    }

    //body part 
    const showheaderInnerBodyHandler = () => {
        setShowheaderInner({
            title: false,
            header: false,
            body: true,
            footer: false,
            inner:true,
        })
    }

     
    const addbodyactiveclassNameHandler = () => {
        activetitle.current.className = classes1.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes1.modifyTemplate__body__header__content__header;
        activebody.current.className = classes1.modifyTemplate__body__header__content__body__active;
        activefooter.current.className = classes1.modifyTemplate__body__header__content__footer;
        showheaderInnerBodyHandler();
    }

    //footer part 

    const showheaderInnerFooterHandler = () => {
        setShowheaderInner({
            title: false,
            header: false,
            body: false,
            footer: true,
            inner:true,
        })
    }

    
    const addfooteractiveclassNameHandler = () => {
        activetitle.current.className = classes1.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes1.modifyTemplate__body__header__content__header;
        activebody.current.className = classes1.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes1.modifyTemplate__body__header__content__footer__active;
        showheaderInnerFooterHandler();
    }

    
    return (
        <>
            <div
                style={{
                    backgroundColor: props.selectTemplate.length > 0 ? "#2a3f54" : "white",
                    color: props.selectTemplate.length > 0  ? "white" : "black"
                }}>
            
                {
                    // props.iframerender.length > 0
                    false
                    &&
                    <div>
                        <a style={{ color: "white" }}
                            onClick={() => {
                                console.log("a tag clicked!!!")
                            }}
                            href={`${props.iframerender}?template_name=${props.templateName}`} target="_blank"
                            rel="noreferrer"
                        >
                            Preview Template
                        </a>
                        
                        {/* {
                            modifyTemplate
                                ?
                                    <></>

                                :
                                    <Button
                                        variant="contained"
                                        style={{ textTransform: "capitalize" }}
                                        onClick={modifyTemplateHandler}
                                        
                                    >
                                        Modify Template
                                    </Button>

                        } */}
                    

                        {
                            newTemplate.length > 0 &&
                            <a style={{ color: "white" }}
                                href={`${props.iframerender}?template_name=${newTemplate}`} target="_blank"
                                rel="noreferrer"
                            >
                                new Template
                            </a>
                        }
                        

                    </div>
                }
            </div>
            

            <div className={classes.modifyTemplate__body}
                style={{
                    // display: modifyTemplate ? "block" : "none",
                    display: "block"
                }}>

                {/* ---------------header---------------- */}
                
                <TemplateEngineHeader
                    activeclassesTitle = { activeclassesTitle }
                    activeclassesHeader = { activeclassesHeader }
                    activeclassesBody = { activeclassesBody }
                    activeclassesFooter = {activeclassesFooter}
                    activetitle={activetitle}
                    activeheader={activeheader}
                    activebody={activebody}
                    activefooter={activefooter}
                    showheaderInner={showheaderInner}
                    activeclassesFooterHandler={activeclassesFooterHandler}
                    activeclassesBodyHandler = { activeclassesBodyHandler }
                    activeclassesHeaderHandler = { activeclassesHeaderHandler }
                    activeclassesTitleHandler={activeclassesTitleHandler}
                    addtitleactiveclassNameHandler = { addtitleactiveclassNameHandler }
                    addheaderactiveclassNameHandler = { addheaderactiveclassNameHandler }
                    addbodyactiveclassNameHandler = { addbodyactiveclassNameHandler }
                    addfooteractiveclassNameHandler = {addfooteractiveclassNameHandler}
                />

                <TemplateEngineBody
                    showheaderInner={showheaderInner }
                    activeclassesTitle ={activeclassesTitle}
                    activeclassesHeader ={activeclassesHeader}
                    activeclassesBody ={activeclassesBody}
                    activeclassesFooter={activeclassesFooter}
                    modifyTemplate={modifyTemplate}
                    newTemplateHandler={newTemplateHandler}
                    createCampaignHandler={props.createCampaignHandler}
                    modifyTemplateHandler={modifyTemplateHandler}
                    template_name={props.template_name}
                />
                
                
                
            </div>
        </>
    )
}

export default TemplateEngine;
