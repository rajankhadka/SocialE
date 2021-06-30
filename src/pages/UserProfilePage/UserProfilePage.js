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

const UserProfilePage = props => {
    
    const [userProfile, setUserProfile] = useState(null);

    //fetching all information about user profile
    useEffect(()=>{
        fetch(userapi.individualuserprofile,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(userdata => {
                setUserProfile({...userdata})
            })
            .catch(err => console.log(err));
    },[])
    
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
                                    <h1 className={classes.username}>{userProfile.username}<span>( username )</span></h1>
                                    <p className={classes.firstname}>{userProfile.first_name} <span>( firstname )</span> </p>
                                    <p className={classes.lastname}>{userProfile.last_name} <span>( lastname )</span></p>
                                    <p className={classes.email}>{userProfile.email} <span>( email )</span></p>
                                    <p className={classes.phonenumber}>{userProfile.phonenumber}<span span>( phonenumber )</span></p>
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