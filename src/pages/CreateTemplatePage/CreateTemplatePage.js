import React from 'react'
import classes from "./CreateTemplatePage.module.css";

//importing components
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import UploadTemplate from './UploadTemplate/UploadTemplate';

function CreateTemplatePage(props) {
    return (
        <div className={classes.homePage}>
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
            </div>
        </div>
    )
}

export default CreateTemplatePage
