import React,{useEffect} from "react";
import classes from "./TemplatePage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import BodyTable from "../../components/UI/BodyTable/BodyTable";

//redux
import { connect } from "react-redux";
import { closeTooltip } from "../../redux/actions/showToolTipAction";
import { SpecificCampaignDetailProvider } from "../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext";
import { signinApi } from "../../api/signin/signin";

//react router dom
import { useHistory } from "react-router-dom";

const token = window.localStorage.getItem('token');
const user = window.localStorage.getItem('user')

const TemplatePage = props => {
    
    const templatePageHistory = useHistory();

    useEffect(()=>{
        console.log("object");
        fetch(signinApi.tokenverification,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                token:window.localStorage.getItem('token'),
                username:window.localStorage.getItem('user')
            })
        })
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    templatePageHistory.replace('/login');
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                }
                
            })
            .catch(err => console.log(err));
    },[token,user])
    
    return(
        <div className={classes.homePage} >
            {window.localStorage.getItem("token") === null && templatePageHistory.replace('/login')}
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />
                
                <SpecificCampaignDetailProvider>

                    <BodyTable
                        header="Templates" 
                        buttonName = "Create New Template" 
                        title="Template"
                        url="/home/create-template"
                    />
                </SpecificCampaignDetailProvider>
                
                
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        templatePageToggle: state.templatePageToggleReducers.templatePageToggle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeTooltipAction : () => dispatch(closeTooltip())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (TemplatePage);