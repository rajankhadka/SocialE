import React from 'react'
import classes from "./TemplateEngineHeader.module.css";

function TemplateEngineHeader(props) {

   
     //header inner 
    
    return (
        <>
            <div className={classes.modifyTemplate__body__header}>
                <div className={classes.modifyTemplate__body__header__content__title}
                    onClick={props.addtitleactiveclassNameHandler}
                    ref={props.activetitle}
                >
                    <p style={{cursor:"pointer"}}>Title</p>
                </div>

                <div className={classes.modifyTemplate__body__header__content__header}
                    onClick={props.addheaderactiveclassNameHandler}
                    ref={props.activeheader}
                > 
                    <p>Header</p>
                </div>

                <div className={classes.modifyTemplate__body__header__content__body}
                    onClick={props.addbodyactiveclassNameHandler}
                    ref={props.activebody}
                >
                    <p>Body</p>
                </div>

                <div className={classes.modifyTemplate__body__header__content__footer}
                    onClick={props.addfooteractiveclassNameHandler}
                    ref={props.activefooter}
                >
                    <p>Footer</p>
                </div> 
            </div>

            {/* --------------header inner ------------------ */}
            <div className={classes.modifyTemplate__body__header__inner}
                style={{
                    display: props.showheaderInner.inner && 'flex'
                }}
            >
                <div className={classes.modifyTemplate__body__header__inner__title}
                    style={{
                        display: props.showheaderInner.title && 'flex'
                    }}
                >
                    <p
                        id="titleLogo"
                        onClick={props.activeclassesTitleHandler}
                        style={{
                            color: props.activeclassesTitle.titleLogo ? "green" : "#2a3f54"
                        }}>Title Logo</p>
                    <p
                        id="titleName"
                        onClick={props.activeclassesTitleHandler}
                        style={{
                            color: props.activeclassesTitle.titleName ? "green" : "#2a3f54"
                        }}>Title Name</p>
                </div>

                <div className={classes.modifyTemplate__body__header__inner__header}
                    style={{
                        display: props.showheaderInner.header && 'flex'
                    }}
                >
                    <p id="headerbackgroundColor"
                        onClick={props.activeclassesHeaderHandler}
                        style={{color: props.activeclassesHeader.headerbackgroundColor ? "green" : "#2a3f54"}}
                    >BackgroundColor</p>

                    <p id="headerColor"
                        onClick={props.activeclassesHeaderHandler}
                        style={{color: props.activeclassesHeader.headerColor ? "green" : "#2a3f54"}}
                    >Font Color</p>

                    <p id="headerLogo"
                        onClick={props.activeclassesHeaderHandler}
                        style={{color: props.activeclassesHeader.headerLogo ? "green" : "#2a3f54"}}
                    >Header Logo</p>

                    <p id="headerNavbar"
                        onClick={props.activeclassesHeaderHandler}
                        style={{color: props.activeclassesHeader.headerNavbar ? "green" : "#2a3f54"}}
                    >NavBar Name</p>
                </div>

                
                <div className={classes.modifyTemplate__body__header__inner__body}
                    style={{
                        display: props.showheaderInner.body && 'flex'
                    }}
                >
                    <p id="bodybackgroundColor"
                        onClick={props.activeclassesBodyHandler}
                        style={{ color: props.activeclassesBody.bodybackgroundColor ? "green" : "#2a3f54" }}>BackgroundColor</p>
                    
                    <p id="bodyColor"
                        onClick={props.activeclassesBodyHandler}
                        style={{ color: props.activeclassesBody.bodyColor ? "green" : "#2a3f54" }}>Font Color</p>
                    
                    <p id="bodyImage"
                        onClick={props.activeclassesBodyHandler}
                        style={{color: props.activeclassesBody.bodyImage ? "green" : "#2a3f54"}}>Landing Page Image</p>

                    <p id="bodybuttonColor"
                        onClick={props.activeclassesBodyHandler}
                        style={{color: props.activeclassesBody.bodybuttonColor ? "green" : "#2a3f54"}}>Button Color</p>
                </div>

                <div className={classes.modifyTemplate__body__header__inner__footer}
                    style={{
                        display: props.showheaderInner.footer && 'flex'
                    }}
                >
                    <p id="footerBackgroundColor"
                        onClick={props.activeclassesFooterHandler}
                        style={{ color: props.activeclassesFooter.footerBackgroundColor ? "green" : "#2a3f54" }}>BackgroundColor</p>
                    
                    <p id="footerColor"
                        onClick={props.activeclassesFooterHandler}
                        style={{color: props.activeclassesFooter.footerColor ? "green" : "#2a3f54"}}>Font Color</p>
                </div>
            </div>
        </>
    )
}

export default TemplateEngineHeader
