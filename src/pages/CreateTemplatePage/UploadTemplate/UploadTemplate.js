import { Button, FormControl,  OutlinedInput } from '@material-ui/core'
import React,{useState} from 'react'
import classes from  "./UploadTemplate.module.css";

import { fbStorage ,db} from "./firebase";


function UploadTemplate(props) {
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
                        firebasedb.child(`template/`).push(
                            {
                                name: templateName,
                                url,
                            },
                            err => {
                                console.log(err);
                            }
                        );   
                    })
            }
        ); 
	};
    

    return (
        <div className={classes.uploadTemplate}>
            <h2>Upload HTML file</h2>
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
        </div>
    )
}



export default UploadTemplate;
