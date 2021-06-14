import classes from './CampaignPreview.module.css'
import React,{useState,useEffect} from 'react'
import { Close } from '@material-ui/icons'
import { template } from '../../api/template/template';
import { targetAudienceApi } from '../../api/targetAudience/targetAudience';

function CampaignPreview(props) {

    const [templateName, setTemplateName] = useState('');
    const [groupName, setGroupName] = useState([]);
    const [targetAudienceName, setTargetAudienceName] = useState([]);

    useEffect(() => {
        //fetching the template name
        fetch(template.resource_list, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                data.data.forEach(template => {
                    if (template.id === props.campaignDetail.templateresource) {
                        setTemplateName(template.template_name);
                    }
                })
            })
            .catch(err => console.log(err));
        
        //fetching target mail
        let mail = [];
        if (props.campaignDetail.target_users_mail_list.length > 0) {
            
            props.campaignDetail.target_users_mail_list.split(',').forEach(m => {
                mail.push(m.slice(1, (m.length - 1)))
            });
            setTargetAudienceName(prevState => [...prevState,...mail])
        }
        
        //fetching all group name and target audience name

        fetch(targetAudienceApi.targetusergroupget, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                data.forEach(group => {
                    props.campaignDetail.targetusergroup.forEach(groupid => {
                        
                        if (groupid === group.id) {

                            //group name
                            setGroupName(prevState => [...prevState, group.group_name]);

                            //target audience name
                            fetch(targetAudienceApi.targetuserget, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Token ${window.localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    group_id: groupid
                                })
                            })
                                .then(res => res.json())
                                .then(targetdata => {

                                    if (targetdata.payload.length > 0) {
                                        targetdata.payload.forEach(targetAudience => {
                                            setTargetAudienceName(prevState => [...prevState, targetAudience.email])
                                        })
                                    }

                                })
                                .catch(err => console.log(err));

                        }

                    })
                })

            })
            .catch(err => console.log(err));
        
        return () => {
            setTemplateName('');
            setGroupName([]);
            setTargetAudienceName([]);
        }

    },[props.campaignDetail.campaign_name])

    console.log(groupName);
    console.log(targetAudienceName);

    return (
        <div className={classes.campaignPreview}>

            {/* header  */}
            <div className={classes.header}>
                <p>
                    Campaign Detail
                </p>

                <Close
                    style={{
                        color: 'black',
                        fontSize: '25px',
                        cursor: 'pointer',
                        marginRight: '10px',
                        marginTop:'5px'
                    }}
                    onClick={props.showpreviewmodaloffHandler}
                />

                
            </div>

            {/* body */}
            <div className={classes.body}>
                
                {/* campaign name */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>Name</p>
                    <p className={classes.name__value}>{ props.campaignDetail.campaign_name }</p>
                </div>

                {/* campaign title */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>Title</p>
                    <p className={classes.name__value}>{ props.campaignDetail.campaign_title }</p>
                </div>

                {/* campaign start date */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>Start Date</p>
                    <p className={classes.name__value}>{ props.campaignDetail.start_date }</p>
                </div>

                {/* campaign end date */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>End Date</p>
                    <p className={classes.name__value}>{ props.campaignDetail.end_date }</p>
                </div>

                {/* campaign open count */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>Total Open</p>
                    <p className={classes.name__value}>{ props.campaignDetail.campaign_opened_count }</p>
                </div>

                {/* template name */}
                <div className={classes.campaign__name}>
                    <p className={classes.name__key}>Template Name</p>
                    <p className={classes.name__value}>{templateName}</p>
                </div>

                {/* group name */}
                <div className={classes.campaign__name}>
                    <div className={[classes.name__key, classes.groups__key].join(' ')}>
                        <p>Groups</p>
                    </div>

                    <div className={[classes.name__value, classes.groups__value].join(' ')}>
                        {
                            groupName.length > 0 &&
                            groupName.map((group, index) => (
                                <div key={index} className={classes.groupName}>
                                    <p>{ index+1}. </p>
                                    <p>{ group}</p>
                                </div>  
                            ))
                        }
                    </div>
                </div>

                {/* target Audience name */}
                
                <div className={classes.campaign__name}>
                    <div className={[classes.name__key, classes.groups__key].join(' ')}>
                        <p>Target Users</p>
                    </div>

                    <div className={[classes.name__value, classes.groups__value].join(' ')}>
                        {
                            targetAudienceName.length > 0 &&
                            targetAudienceName.map((user, index) => (
                                <div key={index} className={classes.groupName}>
                                    <p>{ index+1}. </p>
                                    <p>{ user}</p>
                                </div>  
                            ))
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CampaignPreview