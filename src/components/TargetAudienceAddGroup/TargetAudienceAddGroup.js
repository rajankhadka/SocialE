import { Check, Close,Add } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { targetAudienceApi } from '../../api/targetAudience/targetAudience';
import classes from './TargetAudienceAddGroup.module.css';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

function TargetAudienceAddGroup(props) {

    console.log('object', props.groupData);

    //input value
    const [inputValue, setInputValue] = useState('');

    //group's target audience name
    const [targetAudienceName, setTargetAudienceName] = useState([]);

    //fetching all target audience name of that group
    useEffect(() => {
        fetch(targetAudienceApi.targetuserget, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                group_id: props.groupData.id
            })
        })
            .then(res => res.json())
            .then(respGroup => {
                // console.log(respGroup);              
                let data = respGroup.payload.map(group => {
                    return {
                        id: group.id,
                        email: group.email,
                        click: true
                    }
                });

                setTargetAudienceName([...data]);
            })
            .catch(err => console.log(err));
    }, [props.groupData.id]);

    // console.log(targetAudienceName);

    const [errormsg, setErrormsg] = useState(false);
    const [successmsg, setSuccessmsg] = useState(false);
    const [error, setError] = useState('');

    const savedDataHandler = (event) => {
        let flag = false;
        if (event.key === 'Enter') {
            if (validator.isEmail(inputValue)) {

                for (let i = 0; i < targetAudienceName.length; i++){
                    if (targetAudienceName[i].email === inputValue) {
                        flag = true;
                    }
                }

                if (!flag) {
                    fetch(targetAudienceApi.targetusercreate, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Token ${window.localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "group_id": props.groupData.id,
                            "email": [inputValue]
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status) {
                                setTargetAudienceName(prevState => {
                                    return [...prevState, { id: uuidv4(), email: inputValue, click: true }]
                                });
                                setSuccessmsg(true);
                                setErrormsg(false);
                                setInputValue('');
                                setError('');
                            } else {
                                setSuccessmsg(false);
                                setErrormsg(true);
                                setError('Can\'t saved!!!');
                            }
                            
                        })
                        .catch(err => console.log(err));


                } else {
                    setSuccessmsg(false);
                    setErrormsg(true);
                    setError('must be unique!!!')
                }
                
            }else{
                setSuccessmsg(false);
                setErrormsg(true);
                setError('Invalid Email')
            }
        }
        
    }

    return (
        <div className={classes.addtargetAudience}>
            <div className ={classes.header}>
                <div className={classes.header__left}>
                    <p>Add Target Audience</p>
                </div>

                <div className={classes.header__right}>
                    <Close
                        onClick={props.showAddTargetAudienceOFFHandler}
                        style={{
                            fontSize: '20px',
                            cursor:'pointer',
                        }}
                    />
                </div>
            </div>

            {/* body */}

            <div className={classes.body}>
                
                <div className={classes.groupName}>
                    <p>{props.groupData.group_name}
                        <span
                            style={{
                                fontSize:'0.7em'
                            }}
                        > (Group Name)</span>
                    </p>
                </div>
                
                <div className={classes.body__content}>
                    {
                        errormsg &&
                        <p
                            style={{
                                color: 'red'
                            }}
                        >
                            {error}
                        </p>
                    }

                    {
                        successmsg &&
                        <p
                            style={{
                                color: 'green'
                            }}
                        >
                            Successfully Added
                        </p>
                    }

                    <input
                        className={classes.input}
                        value={inputValue}
                        placeholder="Add Email"
                        onChange={(event) => {
                            setInputValue(event.target.value);
                            setErrormsg(false);
                            setSuccessmsg(false);
                        }}
                        onKeyPress={savedDataHandler}
                    />

                    <div className={classes.body__audienceName}>
                        {
                            targetAudienceName.length > 0 &&
                            targetAudienceName.map((audience, index) => (
                                <div className={classes.audienceName} key={index}>
                                    <p className={classes.index}>{index + 1}. </p>
                                    <p className={classes.email}>{audience.email}</p>
                                    {
                                        audience.click
                                            ?
                                            <div className={classes.add}>
                                                <Check
                                                    style={{
                                                        color: "green",
                                                        marginTop:'10'
                                                    }}
                                                    //disabling the check button
                                                    // onClick={() => {
                                                    //     setTargetAudienceName(targetAudienceName.map(targetaudience => {
                                                    //         if (audience.id === targetaudience.id) {
                                                    //             return {
                                                    //                 ...targetaudience,
                                                    //                 click:false
                                                    //             }
                                                    //         } else {
                                                    //             return {
                                                    //                 ...targetaudience,
                                                    //             }
                                                    //         }
                                                    //     }))
                                                    // }}
                                                        
                                                />
                                            </div>
                                            :
                                            <div className={classes.add}>
                                                <Add
                                                    style={{
                                                        color: "black",
                                                        marginTop: '10',
                                                    }}
                                                    onClick={() => {
                                                        setTargetAudienceName(targetAudienceName.map(targetaudience => {
                                                            if (audience.id === targetaudience.id) {
                                                                return {
                                                                    ...targetaudience,
                                                                    click:true
                                                                }
                                                            }else {
                                                                return {
                                                                    ...targetaudience,
                                                                }
                                                            }
                                                        }))
                                                    }}
                                                        
                                                />
                                            </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TargetAudienceAddGroup
