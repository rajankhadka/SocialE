import React,{useEffect,useState} from "react";
import classes from "./UserProfilePage.module.css"

//importing components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";

//redux
import { connect } from "react-redux";
import TokenVerification from "../../hoc/TokenVerification";
import { Avatar } from "@material-ui/core";
import { userapi } from "../../api/userapi/user";
import UserProfileComponent from "../../components/UserProfileComponent/UserProfileComponent";

const UserProfilePage = props => {
    
    const [userProfile, setUserProfile] = useState(null);
    //trigger the update api
    const [updatetrigger,setUpdateTrigger] = useState(false);


    //username
    const [username, setUsername] = useState({
        edit:false,
        value:'',
        error:false,
        errormsg:'',
    });

    //firstname
    const [firstname, setFirstname] = useState({
        edit:false,
        value:'',
        error:false,
    });

    //lastname
    const [lastname, setLastname] = useState({
        edit:false,
        value:'',
        error:false,
    });

    //email
    const [email, setEmail] = useState({
        edit:false,
        value:'',
        error:false,
        errormsg:'',
    })

    //phonenumber
    const [phonenumber, setPhonenumber] = useState({
        edit:false,
        value:'',
        error:false,
        errormsg:'',
    })

    //fetching all information about user profile
    useEffect(()=>{
        console.log("it is called")
        fetch(userapi.individualuserprofile,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(userdata => {
                setUserProfile({...userdata});

                //setting the initial value of 
                // username
                setUsername(prevState => {
                    return {
                        ...prevState,
                        value:userdata.username
                    }
                });

                //firstname
                setFirstname(prevState => {
                    return {
                        ...prevState,
                        value:userdata.first_name
                    }
                })

                //lastname
                setLastname(prevState => {
                    return {
                        ...prevState,
                        value:userdata.last_name
                    }
                })

                //email
                setEmail(prevState => {
                    return {
                        ...prevState,
                        value:userdata.email
                    }
                })

                //phonenumber
                setPhonenumber(prevState => {
                    return {
                        ...prevState,
                        value:userdata.phonenumber
                    }
                })
            })
            .catch(err => console.log(err));
        return ()=>{
            console.log("cleanup")
            setUserProfile(null);
            setUpdateTrigger(false);
            setUsername({
                edit:false,
                value:'',
                error:false,
                errormsg:'',
            })
            setEmail({
                edit:false,
                value:'',
                error:false,
                errormsg:'',
            })
            setPhonenumber({
                edit:false,
                value:'',
                error:false,
                errormsg:'',
            })
            setLastname({
                edit:false,
                value:'',
                error:false,
            })
            setFirstname({
                edit:false,
                value:'',
                error:false,
            })
        }
    },[updatetrigger]);

    //all handler
    //edit button is ON
    // username
    const editButtonTriggerUsernameHandler = () =>{
        setUsername(prevState => {
            return {
                ...prevState,
                edit:true
            }
        })
    }

    //firstname
    const editButtonTriggerFirstnameHandler = () =>{
        setFirstname(prevState => {
            return {
                ...prevState,
                edit:true
            }
        })
    }

    //lastname
    const editButtonTriggerLastnameHandler = () =>{
        setLastname(prevState => {
            return {
                ...prevState,
                edit:true
            }
        })
    }

    //email
    const editButtonTriggerEmailHandler = () =>{
        setEmail(prevState => {
            return {
                ...prevState,
                edit:true
            }
        })
    }

    //phonenumber
    const editButtonTriggerPhonenumberHandler = () =>{
        setPhonenumber(prevState => {
            return {
                ...prevState,
                edit:true
            }
        })
    }


    //when close button is pressed
    //when edit button is closed
    //username
    const closeButtonUsernameHandler = () =>{
        setUsername(prevState => {
            return {
                ...prevState,
                value:userProfile.username,
                edit:false,
                error:false,
            }
        });
    }

    //firstname
    const closeButtonFirstnameHandler = () =>{
        setFirstname(prevState => {
            return {
                ...prevState,
                value:userProfile.first_name,
                edit:false,
                error:false,
            }
        });
    }

    //lastname
    const closeButtonLastnameHandler = () =>{
        setLastname(prevState => {
            return {
                ...prevState,
                value:userProfile.last_name,
                edit:false,
                error:false,
            }
        });
    }

    //email
    const closeButtonEmailHandler = () =>{
        setEmail(prevState => {
            return {
                ...prevState,
                value:userProfile.email,
                edit:false,
                error:false,
            }
        });
    }

    //phonenumber
    const closeButtonPhonenumberHandler = () =>{
        setPhonenumber(prevState => {
            return {
                ...prevState,
                value:userProfile.phonenumber,
                edit:false,
                error:false,
            }
        });
    }

    //before sending data to server
    //when check button is pressed
    //username
    const editButtonClosUsernameHandler = () =>{
        setUsername(prevState => {
            return {
                ...prevState,
                edit:false
            }
        });
        updateuserprofile();
    }

    //firstname
    const editButtonCloseFirstnameHandler = () =>{
        setFirstname(prevState => {
            return {
                ...prevState,
                edit:false
            }
        })
        updateuserprofile();
    }

    //lastname
    const editButtonCloseLastnameHandler = () =>{
        setLastname(prevState => {
            return {
                ...prevState,
                edit:false
            }
        });
        updateuserprofile();
    }
    
    //email
    const editButtonCloseEmailHandler = () =>{
        setEmail(prevState => {
            return {
                ...prevState,
                edit:false
            }
        });
        updateuserprofile();
    }

    //phoneNumber
    const editButtonClosePhonenumberHandler = () =>{
        setPhonenumber(prevState => {
            return {
                ...prevState,
                edit:false
            }
        })
        updateuserprofile();
    }

    // onchange handler
    //input value saved
    //username
    const usernameonChangeHandler = (event) =>{
        setUsername(prevState => {
            return {
                ...prevState,
                value:event.target.value
            }
        })
    }

    //firstname
    const firstnameonChangeHandler = (event) =>{
        setFirstname(prevState => {
            return {
                ...prevState,
                value:event.target.value
            }
        })
    }

    //lastname
    const lastnameonChangeHandler = (event) =>{
        setLastname(prevState => {
            return {
                ...prevState,
                value:event.target.value
            }
        })
    }

    //email
    const emailonChangeHandler = (event) =>{
        setEmail(prevState => {
            return {
                ...prevState,
                value:event.target.value
            }
        })
    }

    //phonenumber
    const phonenumberonChangeHandler = (event) =>{
        setPhonenumber(prevState => {
            return {
                ...prevState,
                value:event.target.value
            }
        })
    }

    //handler that send data to server
    const updateprofile = () =>{
        const data = {
            username:username.value,
            first_name:firstname.value,
            last_name:lastname.value,
            phonenumber:phonenumber.value,
            email:email.value
        }

        setUpdateTrigger(prevState => !prevState);
        return data;
    }

    const updateuserprofile =() => {
        
        fetch(userapi.individualuserprofileupdate,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            },
            body:JSON.stringify({
                ...updateprofile()
            })
        })
            .then(res => {
                if(res.status !== 200){
                    setStatus(res.status)
                }
                return res.json()
            })
            .then(result => {
                
                if(status !== 200){
                    if(result.username){
                        if(typeof result.username === 'object'){
                            setUsername(prevState =>{
                                return {
                                    ...prevState,
                                    error:true,
                                    edit:true,
                                    errormsg:result.username[0]
                                }
                            })
                        }else{
                            setUsername(prevState =>{
                                return {
                                    ...prevState,
                                    error:false,
                                    edit:false,
                                }
                            })
                        }
                    }

                    if(result.email){
                        if(typeof result.email === 'object'){
                            setEmail(prevState =>{
                                return {
                                    ...prevState,
                                    error:true,
                                    edit:true,
                                    errormsg:result.email[0]
                                }
                            })
                        }else{
                            setEmail(prevState =>{
                                return {
                                    ...prevState,
                                    error:false,
                                    edit:false,
                                }
                            })
                        }
                    }

                    if(result.phonenumber){
                        if(typeof result.phonenumber === 'object'){
                            setPhonenumber(prevState =>{
                                return {
                                    ...prevState,
                                    error:true,
                                    edit:true,
                                    errormsg:result.phonenumber[0]
                                }
                            })
                        }else{
                            setPhonenumber(prevState =>{
                                return {
                                    ...prevState,
                                    error:false,
                                    edit:false,
                                }
                            })
                        }
                    }
                }else{
                    setUpdateTrigger(prevState => !prevState);
                }
                
            })
            .catch(err => console.log(err));
    }

    const [status, setStatus] = useState(200);
    return(
        <TokenVerification>
            <div className={classes.userProfilePage}  >
                <Header />
                <div className={classes.userProfilePage__body}>
                    <SideBar />

                    {/* user profile */}
                    <div className={classes.userprofile}>

                        <Avatar className={classes.userprofile__pic} alt="profile picture" src="" />                        
                        <div className={classes.userprofile__content}>
                            {
                                userProfile &&
                                <>
                                    {/* username  */}
                                    
                                    <UserProfileComponent 
                                        titleName = "username"
                                        titleClassName = {classes.username} 
                                        titleSpanClassName = {classes.userprofilespan}
                                        title={userProfile.username}
                                        titleState = {username}

                                        //edit icon like that stuff
                                        titleIconClassName = {classes.userProfile__username__edit__icon}

                                        //handler
                                        editButtonTriggerUsernameHandler = {editButtonTriggerUsernameHandler}
                                        
                                        //edit part
                                        editpartdivclassNameouter = {classes.userprofile__username__div__outer}
                                        editpartdivclassName = {classes.userprofile__username__div}
                                        editpartinputclassName = {classes.userprofile__username__input}
                                        editparticonClassName = {classes.userprofile__username__icon}
                                        usernameonChangeHandler = {usernameonChangeHandler}

                                        //edit part handler
                                        editButtonClosUsernameHandler={editButtonClosUsernameHandler}
                                        closeButtonUsernameHandler={closeButtonUsernameHandler}
                                    />
                                    
                                    {/* firstname */}

                                    <UserProfileComponent 

                                        titleName = "firstname"
                                        titleClassName={classes.firstname}
                                        titleSpanClassName={classes.userprofilespan}
                                        title={userProfile.first_name}
                                        titleState = {firstname}

                                        //edit icon like that stuff
                                        titleIconClassName = {classes.userProfile__username__edit__icon}

                                        //edit part
                                        editpartdivclassName = {classes.userprofile__firstname__div}
                                        editpartinputclassName = {classes.userprofile__username__input}
                                        editparticonClassName = {classes.userprofile__username__icon}

                                        //handler
                                        editButtonTriggerFirstnameHandler = {editButtonTriggerFirstnameHandler}
                                        firstnameonChangeHandler = {firstnameonChangeHandler}

                                        //edit part handler
                                        editButtonCloseFirstnameHandler={editButtonCloseFirstnameHandler}
                                        closeButtonFirstnameHandler={closeButtonFirstnameHandler}
                                    />
                                    

                                    {/* lastName */}
                                    
                                    <UserProfileComponent 

                                        titleName = "lastname"
                                        titleClassName={classes.firstname}
                                        titleSpanClassName={classes.userprofilespan}
                                        title={userProfile.last_name}
                                        titleState = {lastname}

                                        //edit icon like that stuff
                                        titleIconClassName = {classes.userProfile__username__edit__icon}

                                        //edit part
                                        editpartdivclassName = {classes.userprofile__firstname__div}
                                        editpartinputclassName = {classes.userprofile__username__input}
                                        editparticonClassName = {classes.userprofile__username__icon}

                                        //handler
                                        editButtonTriggerLastnameHandler = {editButtonTriggerLastnameHandler}
                                        lastnameonChangeHandler = {lastnameonChangeHandler}

                                        //edit part handler
                                        editButtonCloseLastnameHandler={editButtonCloseLastnameHandler}
                                        closeButtonLastnameHandler={closeButtonLastnameHandler}
                                    />
                                    
                                    {/* email */}
                                    <UserProfileComponent 

                                        titleName = "email"
                                        titleClassName={classes.firstname}
                                        titleSpanClassName={classes.userprofilespan}
                                        title={userProfile.email}
                                        titleState = {email}

                                        //edit icon like that stuff
                                        titleIconClassName = {classes.userProfile__username__edit__icon}

                                        //edit part
                                        editpartdivclassName = {classes.userprofile__firstname__div}
                                        editpartinputclassName = {classes.userprofile__username__input}
                                        editparticonClassName = {classes.userprofile__username__icon}

                                        //handler
                                        editButtonTriggerEmailHandler = {editButtonTriggerEmailHandler}
                                        emailonChangeHandler = {emailonChangeHandler}

                                        //edit part handler
                                        editButtonCloseEmailHandler={editButtonCloseEmailHandler}
                                        closeButtonEmailHandler={closeButtonEmailHandler}
                                    />
                                    
                                    {/* phonenumber */}
                                    <UserProfileComponent 

                                        titleName = "phonenumber"
                                        titleClassName={classes.firstname}
                                        titleSpanClassName={classes.userprofilespan}
                                        title={userProfile.phonenumber}
                                        titleState = {phonenumber}

                                        //edit icon like that stuff
                                        titleIconClassName = {classes.userProfile__username__edit__icon}

                                        //edit part
                                        editpartdivclassName = {classes.userprofile__firstname__div}
                                        editpartinputclassName = {classes.userprofile__username__input}
                                        editparticonClassName = {classes.userprofile__username__icon}

                                        //handler
                                        editButtonTriggerPhonenumberHandler = {editButtonTriggerPhonenumberHandler}
                                        phonenumberonChangeHandler = {phonenumberonChangeHandler}

                                        //edit part handler
                                        editButtonClosePhonenumberHandler={editButtonClosePhonenumberHandler}
                                        closeButtonPhonenumberHandler={closeButtonPhonenumberHandler}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </TokenVerification>
    );
}

const mapStateToProps = state => {
   
}

const mapDispatchToProps = dispatch => {
    
}

export default connect(undefined,undefined) (UserProfilePage);