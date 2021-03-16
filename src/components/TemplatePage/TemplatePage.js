import { Button, TextField } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import "./TemplatePage.css";

import { connect } from "react-redux";
import { db } from "../../firebase";

function TemplatePage(props) {
    console.log("templatename", props.templateNameReducers);
    // console.log("localStorage",window.localStorage.getItem)

    const [templateName, setTemplateName] = useState('');
    const [url, setUrl] = useState("");

    useEffect(() => {
        const firebasedb = db.ref();
        firebasedb.child('detail')
            .on("value", snapshot => {
                // console.log(snapshot.val())
                // console.log(Object.keys(snapshot.val()));
                Object.keys(snapshot.val()).map(key => {
                    
                    // console.log(snapshot.val()[key].name === "rajan khadka")
                    if (snapshot.val()[key].name === props.templateNameReducers) {
                        setUrl(snapshot.val()[key].url);
                        setTemplateName(snapshot.val()[key].name);
                    }
                    return null;
                })
            })
    }, [])

    return (
        <div className="templatepage">
            <div className="templatepage__header">
                <div className="templatepage__header__left">
                    <div className="templatepage__header__left__logo">
                        <img src={url} alt="mega bank"/>
                    </div>
                </div>

                <div className="templatepage__header__right">
                    <div className="templatepage__header__right__nav">
                        <p>Home</p>
                        <p>About</p>
                        <p>FAQ</p>
                        <p>LOGIN</p>
                    </div>
                </div>
            </div>


            <div className="templatepage__body">
                <div className="templatepage__body__left">
                    <img src={url} alt="mega bank"/>
                </div>

                <div className="templatepage__body__right">
                    <div className="templatepage__body__right__content">
                        <div className="div">
                            <h3>{ templateName}</h3>
                        </div>
                        <div>
                            <TextField label="Email" type="text" variant="outlined" style={{width:"500px"}} />
                        </div>
                        
                        <div>
                            <TextField label="Password" type="password" variant="outlined" style={{width:"500px"}} />
                        </div>
                        
                        <div>
                            <Button variant="contained" color="primary" style={{width:"500px"}}> Login </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        templateNameReducers: state.templateReducers.templatename
    }
}

export default  connect(mapStateToProps,undefined)(TemplatePage);
