import React, { useState} from 'react'
import classes from "./TargetAudienceGroup.module.css";

//import components
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import BodyTable from '../../components/UI/BodyTable/BodyTable';
import TargetAudienceGroupComponent from "../../components/TargetAudienceGroup/TargetAudienceGroup";
import BodyTableGroup from '../../components/UI/BodyTable/BodyTableGroup/BodyTableGroup';

function TargetAudienceGroup(props) {
    const [showcreateGroup, setShowcreateGroup] = useState(false);

    const [createGroupClicked, setCreateGroupClicked] = useState(false);

    const createGroupClickedHandlerOFF = () => setCreateGroupClicked(false);
    const createGroupClickedHandlerON = () => setCreateGroupClicked(true);


     //trigger OFF the show create Group
    const showcreateGroupOFFhandler = () => {
        console.log("clicked!!!")
        setShowcreateGroup(false);
    }

    //trigger ON the show create Group
    const showcreateGroupONhandler = () => {
        setShowcreateGroup(true);
    }


    return (
        <div className={classes.homePage}>
            
            <Header />
            <div className={classes.homePage__body}>
                <SideBar />

                <div className={ classes.group__body}>
                    <BodyTable
                        header="Target Audience Groups" 
                        buttonName="Create Group"
                        title="Target Audience Groups"
                        showcreateGroupONhandler={showcreateGroupONhandler}
                    />

                    {
                        showcreateGroup
                            ?
                            <TargetAudienceGroupComponent
                                showGroupOFFhandler={showcreateGroupOFFhandler}
                                createGroupClickedHandlerON={createGroupClickedHandlerON}
                                
                            />
                            :
                                null
                    }
                    <BodyTableGroup title="Group"
                        createGroupClickedHandlerOFF={createGroupClickedHandlerOFF}
                        createGroupClicked={ createGroupClicked}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default TargetAudienceGroup;
