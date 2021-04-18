import { Button, FormControl,  OutlinedInput } from '@material-ui/core'
import React,{useState,useRef} from 'react'
import classes from  "./UploadTemplate.module.css";

// import { fbStorage ,db} from "./firebase";


function UploadTemplate(props) {
    const [selectedFile, setSelectedFile] = useState();
    // const [url, setUrl] = useState();
    const [templateName, setTemplateName] = useState("");
    const [errmsg, setErrmsg] = useState("");
    const [disableButton, setDisableButton] = useState(true);

    //targeting file field
    const filefield = useRef(null);

    const fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        if(event.target.files[0].name.split(".")[1] === "html"){
            console.log("File upload started");
            setSelectedFile(event.target.files[0]);
            setErrmsg("");
            setDisableButton(false);
        } else {
            setErrmsg("File must be html");
            console.log("Error filename");
            setSelectedFile("");
        }
        // console.log(event.target);
        // event.target.value = null;
        
        
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        if (selectedFile.name) {
            
        
            const formdata = new FormData();
            formdata.append("template", selectedFile);
            formdata.append("name", templateName);
            formdata.append("description", "description");
            fetch("http://127.0.0.1:8000/template/upload/", {
                method: "POST",
                headers: {
                    // "Content-Type": "application/json",
                    "Authorization": `Token ${window.localStorage.getItem('token')}`
                },
                body: formdata
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setDisableButton(true);
                    setSelectedFile();
                    setTemplateName("");
                    setErrmsg("");
                    filefield.current.children[0].value = null;
                })
                .catch(err => console.log(err));
        } else {
            setDisableButton(true);
        }
	};
    

    return (
        <div className={classes.uploadTemplate}>
            <h2>Upload HTML file</h2>
            { errmsg.length > 0 && <p style={{ color: "red" }}> {errmsg} </p>}
            <form encType="multipart/form-data" onSubmit={submitHandler}>
                <div>
                    <FormControl>
                        
                        <OutlinedInput
                            required={true}
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
                            ref={filefield}
                            required={true}
                            id="templateFile"
                            type="file"
                            style={{
                                height:"35px"
                            }}
                            onChange={fileChangeHandler}
                        />
                    </FormControl>
                </div>

                <div>
                    <Button
                        variant="contained"
                        disabled={disableButton}
                        type="submit"> Submit </Button>
                </div>
            </form>   
        </div>
    )
}



export default UploadTemplate;
