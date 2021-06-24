import React,{} from 'react'
import classes from "./CreateGroup.module.css";

function CreateGroup(props) {

    console.log("object", props.groupType);

    let showHeader = null;

    //showing header only for create group
    if (!props.groupType) {
        showHeader = (
            <div className={classes.createCampaignBody__right__header}>
                <div
                    className={classes.createCampaignBody__right__available}
                    onClick={props.setUploadFieldActiveInputHandler}
                    style={{
                        backgroundColor: !props.uploadFieldActive ? "#2bae66" : "#EDEDED",
                        color: !props.uploadFieldActive ? "#EDEDED" : "#2bae66"
                    }}
                >
                    Input
                </div>

                <div
                    className={classes.createCampaignBody__right__add}
                    onClick={props.setUploadFieldActiveUploadHandler}
                    style={{
                        backgroundColor: props.uploadFieldActive ? "#2bae66" : "#EDEDED",
                        color: props.uploadFieldActive ? "#EDEDED" : "#2bae66"
                    }}
                >
                    Upload
                </div>
            </div>
        )
    }

    //showing body only for create and preview group
    let showBody = null;

    if (props.groupType === 'Preview Group' || !props.groupType) {
        showBody = (
            <div className={classes.CreateGroup__body}>
                
                {

                    !props.uploadFieldActive
                        ?
                        <>
                            
                            <label htmlFor="audienceInput">Email Ids : </label>
                            <textarea
                                // disabled={true}
                                className={classes.textarea}
                                disabled={props.groupType === 'Preview Group' && true}
                                id="audienceInput"
                                style={{
                                    resize: "none",
                                    borderColor: "rgba(0,0,0,0.2)",
                                    borderRadius: "5px",
                                    height: "20vh",
                                    paddingLeft: "10px",
                                    paddingTop: "10px",
                                    boxSizing: "border-box",
                                }}
                                onChange={props.targetAudienceUseremailhandler}
                                value={props.targetAudienceUserEmailValue}
                            />
                        </>
                        :
                        <>
                            {
                                props.targetAudienceUserUpload.error.length > 0
                                    
                                    ?
                                    <p
                                        style={{
                                            color: "red",
                                            marginLeft: "-35vh",
                                            marginBottom: "10px",
                                            marginTop:"5px"
                                        }}
                                    >
                                        {props.targetAudienceUserUpload.error}
                                    </p>
                                    :
                                    null
                            }
                            <label htmlFor="audienceupload">File Upload <br/>(only CSV file)</label>
                            <input
                                type="file"
                                onChange={props.targetAudienceUserUploadHandler}
                            />

                        </>
                }
            </div>
        );
    }

    return (
        <div className={classes.createGroup}>
            {
                showHeader
            }

            {/* //body part */}
            {
                showBody
            }
            
        </div>
    )
}

export default CreateGroup
