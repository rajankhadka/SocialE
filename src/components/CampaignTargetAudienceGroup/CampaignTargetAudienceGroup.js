import classes from './CampaignTargetAudienceGroup.module.css'
import React, { useState,useRef, useEffect} from 'react'
import { Add, Check, Close } from '@material-ui/icons'
import { targetAudienceApi } from '../../api/targetAudience/targetAudience';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { campaignApi } from '../../api/campaign/campaign';

function CampaignTargetAudienceGroup(props) {

    // console.log(props.campaignDetail);
    // if (props.campaignDetail) {
        // console.log('props', (props.campaignDetail.target_users_mail_list));
    // }
    const [addTargetAudience, setAddTargetAudience] = useState([]);
    const [usernameValue, setUsernameValue] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    

    //view and edit group active classes
    //if false ---> view group
    //else ----> edit group
    const [vieweditToggle, setVieweditToggle] = useState(false);

    const viewref = useRef(null);
    const editref = useRef(null);

    //view part
    //group name
    const [targetAudienceGroup, setTargetAudienceGroup] = useState(null);
    

    //edit part 
    const [targetAudienceGroupEdit, setTargetAudienceGroupEdit] = useState([]);

    //target audience name
    const [targetAudienceName, setTargetAudienceName] = useState(null);
    
    //edit part
    const [activeUserNameSaved, setActiveUserNameSaved] = useState([]);
    const [targetAudienceNameEdit, setTargetAudienceNameEdit] = useState([]);
    
    //target user mail
    const [targetusermail, setTargetusermail] = useState(null);


    useEffect(() => {
        //user mail list saved 
        if (props.campaignDetail.target_users_mail_list.length > 0) {
            
            fetch(campaignApi.campaignretrieve,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":`Token ${window.localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    id:props.campaignDetail.id
                })
            })
                .then(res => res.json())
                .then(usermailList => {
                    
                    //saving user mail list
                    const mailList = [];
                    usermailList.mail_list.forEach(mailListItem => {
                        mailList.push({...mailListItem,click:true})
                    });
                    setTargetusermail(mailList);
                })
                .catch(err => console.log(err));
        } else {
            setTargetusermail([]);
        }
        

        fetch(targetAudienceApi.targetusergroupget, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {

                //edit group part

                
                // console.log(data);
                

                let activeGroup = data.filter(item => props.campaignDetail.targetusergroup.includes(item.id));
                let notactiveGroup = data.filter(item => !props.campaignDetail.targetusergroup.includes(item.id));
                
                // console.log(activeGroup);
                activeGroup = activeGroup.map(group => {
                    return {
                        ...group,
                        click: true
                    }
                });

                notactiveGroup = notactiveGroup.map(group => {
                    return {
                        ...group,
                        click: false
                    }
                });

                //saving all group name that is presented in specific campaign only
                setTargetAudienceGroupEdit(activeGroup);
            

                //saving all group name
                // setTargetAudienceGroupEdit(activeGroup.concat(notactiveGroup));

                //fetching all audience name avaliable in group that is present in campaign

            })
            .catch(err => console.log(err));
        return () => {
            setTargetAudienceGroupEdit([]);
            setTargetAudienceGroup(null);
            setTargetAudienceName(null);
            setTargetusermail(null);
        }
    }, [props.campaignDetail.campaign_name]);


    // group name trigger
    const [trigger, setTrigger] = useState(false);


    //call every time when group selected or deselected
    useEffect(() => {
        console.log("object");
        console.log(targetusermail)
        // let newTargetUser = [];
        // targetAudienceGroupEdit.forEach(group => {
        //     if (group.click) {
        //         fetch(targetAudienceApi.targetuserget, {
        //             method: 'POST',
        //             headers: {
        //                 'Authorization': `Token ${window.localStorage.getItem('token')}`,
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 group_id: group.id
        //             })
        //         })
        //             .then(res => res.json())
        //             .then(targetdata => {
                        
        //                 if (targetdata.payload.length > 0) {
        //                     targetdata.payload.forEach(targetAudience => {
        //                         newTargetUser.push({ email: targetAudience.email, click: true, id: uuidv4() })
        //                     })
        //                 }
        //                 setActiveUserNameSaved(newTargetUser.concat(targetusermail.concat(addTargetAudience)));
        //                 setTargetAudienceNameEdit(newTargetUser.concat(targetusermail.concat(addTargetAudience)));
        //             })
        //             .catch(err => console.log(err));
        //     }
        // })

    }, [trigger]);

    //all selected username only
    const [userNameTrigger, setUserNameTrigger] = useState(false);
    
    //save only active username
    useEffect(() => {
        console.log("user mail list trigger");

        //saving selected data only in server
        if(targetusermail){
            const allselectedusermailList = targetusermail.filter(usermail => usermail.click);
            console.log(allselectedusermailList);
            fetch(campaignApi.addUsermailList,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Token ${window.localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    campaign_id:props.campaignDetail.id,
                    emails:allselectedusermailList
                })
            })
                .then(res => res.json())
                .then(savedUserMail => console.log(savedUserMail))
                .catch(err => console.log(err));
        }       
        
       
    }, [userNameTrigger])

    let targetUserNameDisplay = null;
    
    if (targetusermail) {
        // let joinTargetUserEmail = targetAudienceName.concat(targetusermail);
        // console.log(joinTargetUserEmail)

        if (targetusermail.length > 0) {
            targetUserNameDisplay = targetusermail.map((email, index) => (
                <div className={classes.groupName} key={index}>
                    <p>{index+1}. </p>
                    <p>{email.email}</p>
                </div>
            ))
        }
    }

    //selecting the avalaible group only
    let targetUserGroupNameEdit = null;
    if (targetAudienceGroupEdit.length > 0) {

        targetUserGroupNameEdit = targetAudienceGroupEdit.map((group, index) => (
            <div className={classes.groupName} key={index}>
                <p>{index+1}. </p>
                <p className={classes.groupname__p}>{group.group_name}</p>

                {/* disabling check and add option in group of edit part */}
                {/* {
                   group.click
                        ?

                        <p className={classes.createCampaignBody__right__availableGroup__add}>
                            <Check
                                style={{ color: "green" }}
                                onClick={() => {
                                    setTrigger(!trigger);
                                    setTargetAudienceGroupEdit(targetAudienceGroupEdit.map(targetGroup => {
                                        if (targetGroup.id === group.id) {
                                            return {
                                                ...targetGroup,
                                                click: false
                                            }
                                        } else {
                                            return {
                                                ...targetGroup,
                                            }
                                        }
                                    }))
                                }}
                            />
                        </p>
                        :

                        <p className={classes.createCampaignBody__right__availableGroup__add}>
                            <Add
                                style={{ color: "black" }}
                                onClick={() => {
                                    setTrigger(!trigger);
                                    setTargetAudienceGroupEdit(targetAudienceGroupEdit.map(targetGroup => {
                                        if (targetGroup.id === group.id) {
                                            return {
                                                ...targetGroup,
                                                click: true
                                            }
                                        } else {
                                            return {
                                                ...targetGroup,
                                            }
                                        }
                                    }))
                                }}
                            />
                        </p> 
                } */}
            </div>
        ))
    }


    //edit part target audience group name only
    let targetAudienceUserNameEdit = null;
    if (targetusermail) {
        targetAudienceUserNameEdit = targetusermail.map((user, index) => (
            <div className={classes.groupName} key={index}>
                <p>{index + 1}. </p>
                <p className={classes.groupname__p}>{user.email}</p>
                {
                   user.click
                        ?

                        <p className={classes.createCampaignBody__right__availableGroup__add}>
                            <Check
                                style={{ color: "green" }}
                                onClick={() => {
                                    // console.log(user);
                                    setUserNameTrigger(!userNameTrigger)
                                    setTargetusermail(targetusermail.map(targetUser => {
                                        if (user.id === targetUser.id) {
                                            return {
                                                ...targetUser,
                                                click: false
                                            }
                                        } else {
                                            return {
                                                ...targetUser,
                                            }
                                        }
                                    }))
                                }}
                            />
                        </p>
                        :

                        <p className={classes.createCampaignBody__right__availableGroup__add}>
                            <Add
                                style={{ color: "black" }}
                                onClick={() => {
                                    setUserNameTrigger(!userNameTrigger)
                                    setTargetusermail(targetusermail.map(targetUser => {
                                        if (user.id === targetUser.id) {
                                            return {
                                                ...targetUser,
                                                click: true
                                            }
                                        } else {
                                            return {
                                                ...targetUser,
                                            }
                                        }
                                    }))
                                }}
                            />
                        </p> 
                }
            </div>
            
        ))
    }

    // console.log(props.campaignDetail);
    // console.log(targetAudienceGroup);
    // console.log(targetAudienceName);
    // console.log(targetusermail);
    // console.log(targetAudienceGroupAll);
    // console.log(targetAudienceGroupEdit);

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
                
                {/* view / edit group */}
                {
                    vieweditToggle
                        ?

                        // edit group 
                        <div className={classes.body__content__view}>
                            
                            {/* group name */}
                            <div className={[classes.body__left__group,classes.boder__right].join(' ')}>
                                <p>Groups</p>
                                {
                                    targetUserGroupNameEdit
                                }
                            </div>
                            
                            <div className={[classes.body__left__group,classes.margin__left].join(' ')}>
                                <p>Target Users</p>

                                {
                                    errorEmail &&
                                    <p className={classes.errorEmail}>Invalid Email Id</p>
                                }

                                <input
                                    className={classes.input}
                                    type='text'
                                    placeholder='Add Email...'
                                    value={usernameValue}
                                    onChange={(event) => {
                                        setErrorEmail(false);
                                        setUsernameValue(event.target.value);
                                    }}

                                    onKeyPress={(event) => {
                                        if (event.key === 'Enter') {
                                            if (validator.isEmail(usernameValue)) {
                                                setErrorEmail(false);
                                                //check the unique email
                                                const found =targetusermail.find(mail => mail.email.toLowerCase() === usernameValue.toLocaleLowerCase())
                                                if(!found){
                                                    setTargetusermail(prevState => [...prevState,{email:usernameValue.toLocaleLowerCase(),id:uuidv4(),click:true,targetusergroup:null}]);
                                                    setUsernameValue(''); 
                                                    setErrorEmail(false);
                                                    setUserNameTrigger(!userNameTrigger)
                                                }else{
                                                    setErrorEmail(true)
                                                }
                                                
                                            } else {
                                                setErrorEmail(true);
                                            }
                                            
                                        }
                                    }}
                                />
                                <div className={classes.contentbody__only}>
                                    {
                                        targetAudienceUserNameEdit
                                    }
                                </div>
                                
                            </div>

                        </div>
                        :

                        // view group 
                        <div className={classes.body__content__view}>
                            {/* group name  */}
                            <div className={[classes.body__left__group,classes.boder__right].join(' ')}>
                                <p>Groups</p>
                                {
                                    targetAudienceGroupEdit &&
                                    targetAudienceGroupEdit.map((group, index) => (
                                        <div className={classes.groupName} key={index}>
                                            <p>{index+1}. </p>
                                            <p>{group.group_name}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* user name */}
                            <div className={[classes.body__left__group,classes.margin__left].join(' ')}>
                                <p>Target Users</p>
                                <div className={classes.contentbody__only}>
                                    {
                                        targetUserNameDisplay
                                    }
                                </div>
                                
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CampaignTargetAudienceGroup;