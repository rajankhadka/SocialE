import React,{useEffect, useState} from "react";
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
import { template as templateApi } from "../../api/template/template";
import TokenVerification from "../../hoc/TokenVerification";

const token = window.localStorage.getItem('token');
const user = window.localStorage.getItem('user')

const TemplatePage = props => {
    
    const templatePageHistory = useHistory();

    //header part to select only and all template list
    const [selectTemplate, setSelectTemplate] = useState('only');

    const selectTemplateValueHandler = (event) =>{
    setSelectTemplate(event.target.value);
    }

    //saving template data
    const [templateData, setTemplateData] = useState([]);

    useEffect(()=>{
        console.log(selectTemplate)

        //fetch the template of specific user
        if(selectTemplate === 'only'){
            setTemplateData([]);
            fetch(templateApi.resource_list,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${window.localStorage.getItem('token')}`
                },
                
            })
                .then(res => res.json())
                .then(templateData => {
                    console.log(templateData);
                    setTemplateData([...templateData.data]);
                })
                .catch(err => console.log(err));
        }else if(selectTemplate === 'all'){

            const fetchallTemplate = async() =>{
                const res = await fetch(templateApi.templateallget,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Token ${window.localStorage.getItem('token')}`
                    },
                });

                if(res.status === 200){
                    const allTemplate = await res.json();
                    setTemplateData([...allTemplate])
                }else{
                    setTemplateData([]);
                }
            }
            fetchallTemplate();
            
        }
    },[selectTemplate])

    useEffect(()=>{
        
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
        <TokenVerification>
            <div className={classes.homePage} >
                {window.localStorage.getItem("token") === null && templatePageHistory.replace('/login')}
                <Header />
                <div className={classes.homePage__body}>
                    <SideBar />
                    
                    <SpecificCampaignDetailProvider>

                        <BodyTable

                            //choose
                            selectTemplate={selectTemplate}
                            selectTemplateValueHandler={selectTemplateValueHandler}

                            //template data
                            templateData = {templateData}
                            header="Templates" 
                            buttonName = "Create New Template" 
                            title="Template"
                            url="/home/create-template"
                        />
                    </SpecificCampaignDetailProvider>
                    
                    
                </div>
            </div>
        </TokenVerification>
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