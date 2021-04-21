import { Button } from '@material-ui/core';
import React, { useRef,useState} from 'react'
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import classes  from "./TemplateEngine.module.css";

function TemplateEngine(props) {


    const activetitle = useRef(null);
    const activeheader = useRef(null);
    const activebody = useRef(null);
    const activefooter = useRef(null);

    //upload field

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

    //modify template handler
    const [modifyTemplate, setModifyTemplate] = useState(false);

    const modifyTemplateHandler = () => setModifyTemplate(true);

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

    

    const addtitleactiveclassNameHandler = () => {
        activetitle.current.className = classes.modifyTemplate__body__header__content__title__active;
        activeheader.current.className = classes.modifyTemplate__body__header__content__header;
        activebody.current.className = classes.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes.modifyTemplate__body__header__content__footer;
        setShowheaderInner({
            title: true,
            header: false,
            body: false,
            footer: false,
            inner:true,
        })
    }

    const addheaderactiveclassNameHandler = () => {
        activetitle.current.className = classes.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes.modifyTemplate__body__header__content__header__active;
        activebody.current.className = classes.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes.modifyTemplate__body__header__content__footer;
        setShowheaderInner({
            title: false,
            header: true,
            body: false,
            footer: false,
            inner:true,
        })
    }

    const addbodyactiveclassNameHandler = () => {
        activetitle.current.className = classes.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes.modifyTemplate__body__header__content__header;
        activebody.current.className = classes.modifyTemplate__body__header__content__body__active;
        activefooter.current.className = classes.modifyTemplate__body__header__content__footer;
        setShowheaderInner({
            title: false,
            header: false,
            body: true,
            footer: false,
            inner:true,
        })
    }

    const addfooteractiveclassNameHandler = () => {
        activetitle.current.className = classes.modifyTemplate__body__header__content__title;
        activeheader.current.className = classes.modifyTemplate__body__header__content__header;
        activebody.current.className = classes.modifyTemplate__body__header__content__body;
        activefooter.current.className = classes.modifyTemplate__body__header__content__footer__active;
        setShowheaderInner({
            title: false,
            header: false,
            body: false,
            footer: true,
            inner:true,
        })
    }

    //new template
    const [newTemplate, setNewTemplate] = useState("");

    

    const createTemplateHandler = () => {
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
                template_url: props.iframerender, //template url
                template_name: props.template_name, //new template name
                bodyButtonColor: bodyButtonColorPicker
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                setNewTemplate(data.tempate_name);
                console.log("original url", `${props.iframerender}?template_name=${props.template_name}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div
                style={{
                    backgroundColor: props.selectTemplate.length > 0 ? "#2a3f54" : "white",
                    color: props.selectTemplate.length > 0  ? "white" : "black"
                }}>
                <p>Create Template</p>
            
                {
                    props.iframerender.length > 0
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
                        
                        {
                            modifyTemplate
                                ?
                                    <></>

                                :
                                    <Button
                                        variant="contained"
                                        style={{ textTransform: "capitalize" }}
                                        onClick={()=> setModifyTemplate(true)}
                                        
                                    >
                                        Modify Template
                                    </Button>

                        }
                    

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
            

            <div className={classes.modifyTemplate__body} style={{display: modifyTemplate ?  "block" : "none"}}>

                {/* ---------------header---------------- */}
                <div className={classes.modifyTemplate__body__header}>
                    <div className={classes.modifyTemplate__body__header__content__title}
                        onClick={addtitleactiveclassNameHandler}
                        ref={activetitle}
                    >
                        <p style={{cursor:"pointer"}}>Title</p>
                    </div>

                    <div className={classes.modifyTemplate__body__header__content__header}
                        onClick={addheaderactiveclassNameHandler}
                        ref={activeheader}
                    > 
                        <p>Header</p>
                    </div>

                    <div className={classes.modifyTemplate__body__header__content__body}
                        onClick={addbodyactiveclassNameHandler}
                        ref={activebody}
                    >
                        <p>Body</p>
                    </div>

                    <div className={classes.modifyTemplate__body__header__content__footer}
                        onClick={addfooteractiveclassNameHandler}
                        ref={activefooter}
                    >
                        <p>Footer</p>
                    </div> 
                </div>

                {/* --------------header inner ------------------ */}
                <div className={classes.modifyTemplate__body__header__inner}
                    style={{
                        display: showheaderInner.inner && 'flex'
                    }}
                >
                    <div className={classes.modifyTemplate__body__header__inner__title}
                        style={{
                            display: showheaderInner.title && 'flex'
                        }}
                    >
                        <p
                            id="titleLogo"
                            onClick={activeclassesTitleHandler}
                            style={{
                                color: activeclassesTitle.titleLogo ? "green" : "#2a3f54"
                            }}>Title Logo</p>
                        <p
                            id="titleName"
                            onClick={activeclassesTitleHandler}
                            style={{
                                color: activeclassesTitle.titleName ? "green" : "#2a3f54"
                            }}>Title Name</p>
                    </div>

                    <div className={classes.modifyTemplate__body__header__inner__header}
                        style={{
                            display: showheaderInner.header && 'flex'
                        }}
                    >
                        <p id="headerbackgroundColor"
                            onClick={activeclassesHeaderHandler}
                            style={{color: activeclassesHeader.headerbackgroundColor ? "green" : "#2a3f54"}}
                        >BackgroundColor</p>

                        <p id="headerColor"
                            onClick={activeclassesHeaderHandler}
                            style={{color: activeclassesHeader.headerColor ? "green" : "#2a3f54"}}
                        >Font Color</p>

                        <p id="headerLogo"
                            onClick={activeclassesHeaderHandler}
                            style={{color: activeclassesHeader.headerLogo ? "green" : "#2a3f54"}}
                        >Header Logo</p>

                        <p id="headerNavbar"
                            onClick={activeclassesHeaderHandler}
                            style={{color: activeclassesHeader.headerNavbar ? "green" : "#2a3f54"}}
                        >NavBar Name</p>
                    </div>

                    
                    <div className={classes.modifyTemplate__body__header__inner__body}
                        style={{
                            display: showheaderInner.body && 'flex'
                        }}
                    >
                        <p id="bodybackgroundColor"
                            onClick={activeclassesBodyHandler}
                            style={{ color: activeclassesBody.bodybackgroundColor ? "green" : "#2a3f54" }}>BackgroundColor</p>
                        
                        <p id="bodyColor"
                            onClick={activeclassesBodyHandler}
                            style={{ color: activeclassesBody.bodyColor ? "green" : "#2a3f54" }}>Font Color</p>
                        
                        <p id="bodyImage"
                            onClick={activeclassesBodyHandler}
                            style={{color: activeclassesBody.bodyImage ? "green" : "#2a3f54"}}>Landing Page Image</p>

                        <p id="bodybuttonColor"
                            onClick={activeclassesBodyHandler}
                            style={{color: activeclassesBody.bodybuttonColor ? "green" : "#2a3f54"}}>Button Color</p>
                    </div>

                    <div className={classes.modifyTemplate__body__header__inner__footer}
                        style={{
                            display: showheaderInner.footer && 'flex'
                        }}
                    >
                        <p id="footerBackgroundColor"
                            onClick={activeclassesFooterHandler}
                            style={{ color: activeclassesFooter.footerBackgroundColor ? "green" : "#2a3f54" }}>BackgroundColor</p>
                        
                        <p id="footerColor"
                            onClick={activeclassesFooterHandler}
                            style={{color: activeclassesFooter.footerColor ? "green" : "#2a3f54"}}>Font Color</p>
                    </div>
                </div>

                <div className={classes.modifyTemplate__body__body}>
                    <div className={classes.modifyTemplate__body__body__content}>
                        <div className={classes.modifyTemplate__body__body__title}>

                            {
                                (showheaderInner.title && activeclassesTitle.titleLogo ) &&
                                <div className={classes.modifyTemplate__body__body__titleLogo}>
                                    <label htmlFor="titleLogo" >Upload the Title Logo</label>
                                    <input type="file" id="titleLogo" onChange={ tileLogoHandler}/>
                                </div>
                            }

                            {
                                (showheaderInner.title && activeclassesTitle.titleName) &&
                                <div className={classes.modifyTemplate__body__body__titleName}>
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

                        <div className={classes.modifyTemplate__body__body__header} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                            
                            {
                                (showheaderInner.header && activeclassesHeader.headerbackgroundColor) &&
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
                                (showheaderInner.header && activeclassesHeader.headerColor) &&
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
                                (showheaderInner.header && activeclassesHeader.headerLogo) &&

                                <>
                                    
                                    <label htmlFor="headerLogo" >Header Logo</label>
                                    <input type="file" id="headerLogo" onChange={ headerLogoHandler}/>
                                
                                </>
                            }

                            {
                                (showheaderInner.header && activeclassesHeader.headerNavbar) &&

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

                        <div className={classes.modifyTemplate__body__body__body} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                            {
                                (showheaderInner.body && activeclassesBody.bodybackgroundColor) &&
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
                                (showheaderInner.body && activeclassesBody.bodyColor) &&
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
                                (showheaderInner.body && activeclassesBody.bodyImage) &&

                                <>
                                    
                                    <label htmlFor="bodyImage" >Body Landing Image</label>
                                    <input type="file" id="bodyImage" onChange={ bodyLandingImageHandler}/>
                                
                                </>
                            }

                            {
                                (showheaderInner.body && activeclassesBody.bodybuttonColor) &&
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

                        <div className={classes.modifyTemplate__body__body__body} style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                            {
                                (showheaderInner.footer && activeclassesFooter.footerBackgroundColor) &&

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
                                (showheaderInner.footer && activeclassesFooter.footerColor) &&

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
                    <div className={classes.createTemplate} style={{display: modifyTemplate ?  "flex" : "none"}}>
                        <Button
                            variant="contained"
                            style={{ textTransform: "capitalize" }}
                            onClick={createTemplateHandler}
                            size="small"
                        >
                            Create Template
                        </Button>

                    </div>
                }
                
            </div>
        </>
    )
}

export default TemplateEngine;
