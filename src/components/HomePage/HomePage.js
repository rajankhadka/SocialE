import { Button, FormControl,  OutlinedInput } from '@material-ui/core'
import React,{useState} from 'react'
import "./HomePage.css";

import { fbStorage ,db} from "../../firebase";

import { connect } from "react-redux";
import { templatesendaction } from "../../redux/action/templateaction";

import { useHistory } from "react-router-dom";

function HomePage(props) {

    const homepageHistory = useHistory();

    const [selectedFile, setSelectedFile] = useState();
    // const [url, setUrl] = useState();
    const [templateName, setTemplateName] = useState("");


    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);

        
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const uploadTask = fbStorage.ref(`images/${selectedFile.name}`).put(selectedFile);

        uploadTask.on(
            "state_changed",
            snapshot => {
                // const progress = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
            },
            error => {
                console.log(error);
            },
            () => {
                fbStorage
                    .ref("images")
                    .child(selectedFile.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        

                        //database

                        const firebasedb = db.ref();
                        firebasedb.child(`detail/`).push(
                            {
                                name: templateName,
                                url,
                            },
                            err => {
                                console.log(err);
                            }
                        );

                        //action
                        props.templatesendaction(templateName);
                        
                        homepageHistory.push('/templatepage');
                        // window.localStorage.setItem(templateName,templateName)
                    })
            }
        );

        
	};
    

    return (
        <div className="homepage">
            HomePage
            <form encType="multipart/form-data" onSubmit={submitHandler}>
                <div>
                    <FormControl>
                        
                        <OutlinedInput
                            id="templateName"
                            type="text"
                            placeholder="Template Name"
                            style={{
                                height:"30px"
                            }}
                            value={templateName}
                            onChange={(event)=> setTemplateName(event.target.value)}
                        />
                    </FormControl>
                </div>

                <div>
                    <FormControl>
                        
                        <OutlinedInput
                            id="templateFile"
                            type="file"
                            placeholder="Template Name"
                            style={{
                                height:"35px"
                            }}
                            onChange={fileChangeHandler}
                        />
                    </FormControl>
                </div>

                <div>
                    <Button variant="contained" type="submit"> Submit </Button>
                </div>
            </form>

            {/* <img src={ url} alt="firebase-image" /> */}
        </div>
    )
}

const mapDistachToProps = dispatch => {
    return {
        templatesendaction: (templatename) => dispatch(templatesendaction(templatename)),
    }
}


export default connect(undefined,mapDistachToProps) (HomePage);
