import React,{useEffect} from 'react'
import { signinApi } from '../api/signin/signin';

//react router dom
import { Redirect} from "react-router-dom";

function TokenVerification(props) {

    // const tokenverificationHistory = useHistory();

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
                // return res.json()
                if(res.status === 200){
                    return res.json()
                }else{
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                }
                
            })
            .catch(err => console.log(err));
    },[window.localStorage.getItem('token'),window.localStorage.getItem('user')])

    if(window.localStorage.getItem("token") === null){
        return <Redirect to="/login"/>
    }else{
        return props.children
    }
}

export default TokenVerification
