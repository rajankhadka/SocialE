import classes from './CampaignTargetAudienceGroup.module.css'
import React, { useState,useRef, useEffect} from 'react'
import { Close } from '@material-ui/icons'
import { targetAudienceApi } from '../../api/targetAudience/targetAudience';

function CampaignTargetAudienceGroup(props) {
    // console.log('props', props);

    //view and edit group active classes
    //if false ---> view group
    //else ----> edit group
    const [vieweditToggle, setVieweditToggle] = useState(false);

    const viewref = useRef(null);
    const editref = useRef(null);

    //group name
    const [targetAudienceGroup, setTargetAudienceGroup] = useState(null);

    //target audience name
    const [targetAudienceName, setTargetAudienceName] = useState(null);
    
    //target user mail
    const [targetusermail, setTargetusermail] = useState(null);

    useEffect(() => {
        // console.log(props.campaignDetail.target_users_mail_list.length);
        // console.log(props.campaignDetail.target_users_mail_list);
        let mail = [];
        if (props.campaignDetail.target_users_mail_list.length > 0) {
            
            props.campaignDetail.target_users_mail_list.split(',').forEach(m => {
                mail.push(m.slice(1, (m.length - 1)))
            });
            setTargetusermail(mail);
        } else {
            setTargetusermail([]);
        }
        // console.log(mail);
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
                            setTargetAudienceGroup(prevState => {
                                if (prevState) {
                                    return [...prevState, group];
                                } else {
                                    return [group];
                                }
                            })

                            //target audience name
                            fetch(targetAudienceApi.targetuserget, {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Token ${window.localStorage.getItem('token')}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: groupid
                                })
                            })
                                .then(res => res.json())
                                .then(targetdata => {
                                    if (targetdata.payload.length > 0) {
                                       targetdata.payload.forEach(targetAudience => {
                                            setTargetAudienceName(prevState => {
                                                if (prevState) {
                                                    return [...prevState,targetAudience.email];
                                                } else {
                                                    return [targetAudience.email];
                                                }
                                            })

                                        }) 
                                    } else {
                                        setTargetAudienceName(prevState => {
                                            if (prevState) {
                                                return [...prevState];
                                            } else {
                                                return [];
                                            }
                                        })
                                    }
                                    
                                    
                                });
                        }
                    })
                });
            })
            .catch(err => console.log(err));
    },[props.campaignDetail.campaign_name])

    // console.log(targetAudienceGroup);
    // console.log(targetAudienceName);
    // console.log(targetusermail);

    let targetUserNameDisplay = null;
    
    if (targetAudienceName && targetusermail) {
        let joinTargetUserEmail = targetAudienceName.concat(targetusermail);
        // console.log(joinTargetUserEmail)

        if (joinTargetUserEmail.length > 0) {
            targetUserNameDisplay = joinTargetUserEmail.map((email, index) => (
                <div className={classes.groupName} key={index}>
                    <p>{index+1}. </p>
                    <p>{email}</p>
                </div>
            ))
        }
    }

    return (
        <div className={classes.campaignTargetAudienceGroup}>
            <div className={classes.header}>
                <Close
                    style={{
                        fontSize: '20px',
                        cursor: 'pointer',
                        marginRight:'10px',
                    }}
                    onClick={props.showgroupmodaloffHandler}
                />
            </div>

            <div className={classes.body}>
                <div className={classes.body__header}>
                    <div
                        id='view'
                        ref={viewref}
                        className={[classes.body__header__view].join(' ')}
                        onClick={() => {
                            if(viewref.current.id === 'view') setVieweditToggle(false);
                        }}
                        style={{
                            backgroundColor: !vieweditToggle && '#2bae66'
                        }}
                    >
                        <p>View Group</p>
                    </div>

                    <div
                        id='edit'
                        ref={editref}
                        className={classes.body__header__edit}
                        onClick={() => {
                            if(editref.current.id === 'edit') setVieweditToggle(true);
                        }}
                        style={{
                            backgroundColor: vieweditToggle && '#2bae66'
                        }}
                    >
                        <p>Edit Group</p>
                    </div>
                </div>
                
                {/* view group */}
                {
                    vieweditToggle
                        ? <p>Edit Group</p>
                        :
                        <div className={classes.body__content__view}>
                            {/* group name  */}
                            <div className={classes.body__left__group}>
                                <p>Groups</p>
                                {
                                    targetAudienceGroup &&
                                    targetAudienceGroup.map((group, index) => (
                                        <div className={classes.groupName} key={index}>
                                            <p>{index+1}. </p>
                                            <p>{group.group_name}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* user name */}
                            <div className={classes.body__left__group}>
                                <p>Target Users</p>
                                {
                                    targetUserNameDisplay
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CampaignTargetAudienceGroup;