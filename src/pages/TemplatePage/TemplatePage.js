import React from "react";
import classes from "./TemplatePage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import BodyTable from "../../components/UI/BodyTable/BodyTable";

//redux
import { connect } from "react-redux";
import { closeTooltip } from "../../redux/actions/showToolTipAction";

const TemplatePage = props =>{
    return(
        <div className={classes.homePage}  >
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                <BodyTable 
                    header="Templates" 
                    buttonName = "Create New Template" 
                    title="Template"
                    url="/home/create-template"
                />
                
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        closeTooltipAction : () => dispatch(closeTooltip())
    }
}

export default connect(undefined,mapDispatchToProps) (TemplatePage);