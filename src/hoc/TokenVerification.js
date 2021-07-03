import React,{useEffect, useState} from 'react'
import { signinApi } from '../api/signin/signin';

//react router dom
import { Redirect,useHistory} from "react-router-dom";

import Modal from '../components/Model/Model';
import { Close } from '@material-ui/icons';
function TokenVerification(props) {

    const tokenverificationHistory = useHistory();
    const [nointernet, setNointernet] = useState(false);

    const [modalShow, setModalShow] = useState(false);

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
                    return res.json();
                    setNointernet(false);
                }else{
                    setNointernet(false);
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                }
                
            })
            .catch(err => {
                console.log(err);
                setNointernet(true);
                setModalShow(true);
            });
    },[window.localStorage.getItem('token'),window.localStorage.getItem('user')])

    if(window.localStorage.getItem("token") === null){
        return <Redirect to="/login"/>
    }else if(nointernet){
        return ( modalShow && (
            <Modal>
                <div style={{display:'flex',width:'30%',backgroundColor:'white',height:'10vh',borderRadius:'10px',justifyContent:'space-between','alignItems':'center'}} >
                    <h3 style={{paddingLeft:'10px'}}>No Internet Connection</h3>
                    <Close style={{cursor:'pointer',paddingRight:'10px'}} onClick={()=> {
                        setModalShow(false);
                        setNointernet(false);
                    }} />
                </div>
            </Modal>
        ) )
    }
    else{
        return props.children
    }
}

export default TokenVerification;
