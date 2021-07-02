import { Check, Close, Edit } from '@material-ui/icons';
import React from 'react'
import classes from "./UserProfileComponent.module.css";


function UserProfileComponent(props) {
    return (

        <>

            {/* main part */}
            <h1 
                className={props.titleClassName}
                style={{
                    display: props.titleState.edit ? "none" : "block"
                }}
            >
                {/* username like that stuff */}
                {props.title}
                <span 
                    className={props.titleSpanClassName}
                >
                    ( {props.titleName} )
                </span>

                {
                    !props.titleState.edit &&
                    <Edit 
                        className={props.titleIconClassName}
                        onClick={()=>{
                            if(props.titleName === 'username'){
                                props.editButtonTriggerUsernameHandler()
                            }else if(props.titleName === "firstname"){
                                props.editButtonTriggerFirstnameHandler()
                            }else if(props.titleName === "lastname"){
                                props.editButtonTriggerLastnameHandler()
                            }else if(props.titleName === "email"){
                                props.editButtonTriggerEmailHandler();
                            }else if(props.titleName === "phonenumber"){
                                props.editButtonTriggerPhonenumberHandler()
                            }
                        }}
                    />
                }                
            </h1>

            {/* edit part */}

            <div className={props.editpartdivclassNameouter}>

                <div className={props.editpartdivclassName}>
                    { props.titleState.edit && 
                        <input placeholder={props.titleName}  
                            className={props.editpartinputclassName}
                            value={props.titleState.value}
                            onChange={event => {
                                if(props.titleName === 'username'){
                                    props.usernameonChangeHandler(event)
                                }else if(props.titleName === "firstname"){
                                    props.firstnameonChangeHandler(event)   
                                }else if(props.titleName === "lastname"){
                                    props.lastnameonChangeHandler(event)
                                }else if(props.titleName === "email"){
                                    props.emailonChangeHandler(event)
                                }else if(props.titleName === "phonenumber"){
                                    props.phonenumberonChangeHandler(event)
                                }
                            }}
                        />
                    }
                    {
                        props.titleState.edit &&
                        <>
                            <Check 
                                className={props.editparticonClassName}
                                //write the logic to sendthat to server
                                onClick={()=>{
                                    if(props.titleName === 'username'){
                                        props.editButtonClosUsernameHandler()
                                    }else if(props.titleName === "firstname"){
                                        props.editButtonCloseFirstnameHandler()
                                    }else if(props.titleName === "lastname"){
                                        props.editButtonCloseLastnameHandler()
                                    }else if(props.titleName === "email"){
                                        props.editButtonCloseEmailHandler()
                                    }else if(props.titleName === "phonenumber"){
                                        props.editButtonClosePhonenumberHandler()
                                    }
                                }}
                            />

                            <Close 
                                className={props.editparticonClassName}
                                onClick={()=>{
                                    if(props.titleName === 'username'){
                                        props.closeButtonUsernameHandler();
                                    }else if(props.titleName === "firstname"){
                                        props.closeButtonFirstnameHandler()
                                    }else if(props.titleName === "lastname"){
                                        props.closeButtonLastnameHandler();
                                    }else if(props.titleName === "email"){
                                        props.closeButtonEmailHandler()
                                    }else if(props.titleName === "phonenumber"){
                                        props.closeButtonPhonenumberHandler()
                                    }
                                }}
                            />
                        </>
                    }
                </div>

                {
                    (props.titleState.error && props.titleState.edit ) &&
                    <div style={{color:'red'}}>
                        field must be unique
                    </div>
                }
            </div>
        </>
    )
}

export default UserProfileComponent
