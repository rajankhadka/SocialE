import React,{useState,useEffect} from 'react';
import Model from '../../Model/Model';
import classes from "./ShowGroup.module.css";
import { Close, Delete, Edit, Visibility } from '@material-ui/icons';
import TargetAudienceGroup from '../TargetAudienceGroup';
import { targetAudienceApi } from '../../../api/targetAudience/targetAudience';

function ShowGroup(props) {

    const [allGroup, setAllGroup] = useState([]);
    //show create group model for edit and preview

    // preview group 

    const [showCreateGroupPreview, setShowCreateGroupPreview] = useState(false);
    const [groupPreviewData, setGroupPreviewData] = useState({});

    //trigger on the show group preview
    const showGroupONPreviewHandler = () => {
        
        setShowCreateGroupPreview(true);
    }

    //trigger off the show group preview
    const showGroupOFFPreviewhandler = () => {
        
        setShowCreateGroupPreview(false);
    }

    //edit group
    const [showCreateGroupEdit, setShowCreateGroupEdit] = useState(false);
    const [groupEditData, setGroupEditData] = useState({});

    //trigger on the show group preview
    const showGroupONEditHandler = () => {
        
        setShowCreateGroupEdit(true);
    }

    //trigger off the show group preview
    const showGroupOFFEdithandler = () => {
        
        setShowCreateGroupEdit(false);
    }

    const [deleteGroup, setDeleteGroup] = useState(false);

    useEffect(() => {
        console.log("[Show Group]");
        fetch(targetAudienceApi.targetusergroupget, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(allGroup => {
                console.log(allGroup);
                setAllGroup(allGroup);
            })
            .catch(err => console.log(err));
    }, [deleteGroup])
    
    

    let showAllGroup = <h1>Loading...</h1>;
    if (allGroup.length > 0) {
        showAllGroup = allGroup.map(group => (
            <div className={classes.shrowGroup__body__row} key ={group.id}>
                <div className={classes.shrowGroup__body__name}>
                    <p>{group.group_name}<sub>{`(${group.department}) (${group.organization})`}</sub></p>
                </div>

                <div className={classes.shrowGroup__body__preview}
                    onClick={() => {
                        showGroupONPreviewHandler();
                        setGroupPreviewData(group);
                        
                        showGroupOFFEdithandler();
                    }}
                >
                    <Visibility
                        style={{
                            fontSize: 20,
                            color:"green"
                        }}
                    />
                </div>

                <div className={classes.shrowGroup__body__edit}
                    onClick={() => {
                        
                        showGroupONEditHandler();
                        setGroupEditData(group);
                        showGroupOFFPreviewhandler();
                    }}
                >
                    <Edit
                        style={{
                            fontSize: 20,
                            color:"blue"
                        }}
                    />
                </div>

                <div className={classes.shrowGroup__body__delete}
                    onClick={() => console.log("delete")}
                >
                    <Delete
                        onClick={()=> setDeleteGroup(true)}
                        style={{
                            fontSize: 20,
                            color:"red"
                        }}
                    />
                </div>
            </div>
        ))
    }


    return (
        <Model>
            <div className={classes.targetAudienceGroup__content}>

                {/* header */}
                <div className={classes.createCampaignBody__right__header}>
                    <div
                        className={classes.createCampaignBody__right__add}
                        onClick={() => {}}
                        style={{
                            marginLeft:"10px"
                        }}
                    >
                        Available Groups
                    </div>

                    <Close
                        style={{
                            marginRight: "10px",
                            cursor:"pointer"
                        }}
                        onClick={props.showOFFAllGroupHandler}
                    />

                </div>

                {/* body */}
                <div className={classes.shrowGroup__body}>
                    {showAllGroup}
                </div>
            </div>

            

            {/* for preview group information */}
            {
                showCreateGroupPreview && 
                <TargetAudienceGroup
                    preview = "Preview Group"
                    showGroupOFFhandler={showGroupOFFPreviewhandler}
                    groupData = {groupPreviewData}
                />
            }

            {/* for edit group information */}
            {
                showCreateGroupEdit &&
                <TargetAudienceGroup
                    // preview="Edit Group"
                    edit = "Edit Group"
                    showGroupOFFhandler={showGroupOFFEdithandler}
                    groupData = {groupEditData}
                />
            }
        </Model>
    )
}

export default ShowGroup