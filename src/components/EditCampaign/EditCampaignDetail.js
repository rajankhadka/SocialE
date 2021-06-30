import { Button, FormControl, Select, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React,{useContext,useEffect, useState} from 'react'
import { campaignApi } from '../../api/campaign/campaign';
import { template } from '../../api/template/template';
import { SpecificCampaignDetailContext } from '../../contextAPI/SpecificCampaignDetail/SpecificCampaignDetailContext';
import classes from './EditCampaignDetail.module.css'

function EditCampaignDetail(props) {

    const [specificCampaignDetail, setSpecificCampaign] = useContext(SpecificCampaignDetailContext);

    console.log(specificCampaignDetail);

    //campaign data
    const [campaignName, setCampaignName] = useState(specificCampaignDetail.campaign_name)
    const [campaignSubject, setCampaignSubject] = useState(specificCampaignDetail.campaign_title)
    const [startDate, setStartDate] = useState(specificCampaignDetail.start_date)
    const [endDate, setEndDate] = useState(specificCampaignDetail.end_date)
    const [templateName, setTemplateName] = useState(specificCampaignDetail.templateresource);
    const [allTemplateName, setAllTemplateName] = useState([]);

    useEffect(() => {

        fetch(template.resource_list, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${window.localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let newtemplateName = [];
                data.data.forEach(element => {
                    // console.log(element);
                    newtemplateName.push({
                        id: element.id,
                        template_name: element.template_name,
                        template_url: element.template_url
                    })
                });

                setAllTemplateName(newtemplateName);
            })
    }, [specificCampaignDetail.id]);

    const campaignEditDataSubmitHandler = (event) => {
        event.preventDefault();
        console.log("object");
        console.log(campaignApi.campaignupdate);
        fetch(campaignApi.campaignupdate, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: specificCampaignDetail.id,
                campaign_name: campaignName,
                campaign_title: campaignSubject,
                start_date: startDate,
                end_date: endDate,
                templateresource: templateName
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                props.campaignEditTriggerHanlderOFF();
            })
            .catch(err => console.log(err));

    }
    return (
        <div className={classes.campaignEdit}>
            <div className={classes.campaignEdit__header}
                
            >
                <Close
                    style={{ fontSize: '20',cursor:'pointer' }}
                    onClick={props.campaignEditTriggerHanlderOFF}
                />
            </div>

            <form
                className={classes.campaignEdit__form}
                onSubmit={campaignEditDataSubmitHandler}
            >
                <TextField
                    required
                    variant="standard"
                    name="Campaign Name"
                    label="Campaign Name"
                    value={campaignName}
                    onChange={(event)=> setCampaignName(event.target.value)}
                    className={classes.campaignEdit__input}
                />

                <TextField
                    required
                    variant="standard"
                    name="Campaign Subject"    
                    label="Campaign Subject"
                    value={campaignSubject}
                    onChange={(event)=> setCampaignSubject(event.target.value)}
                    className={classes.campaignEdit__input}
                />
                
    
                <label htmlFor="selectTemplate" id={classes.selectTemplate}>Select Template</label>
                <FormControl className={classes.campaignEdit__formcontrol}>
                    <Select
                        required
                        name="selectTemplate"
                        native
                        labelId="selectTemplate"
                        id="selectTemplate"
                        value={templateName}
                        onChange={(event)=> setTemplateName(event.target.value)}
                        
                    >
                        {/* <option value="" /> */}
                        {/* <option  value="create template">Create Template</option> */}
                        
                        {
                            allTemplateName.map(item => <option key={item.id} value={item.id}> {item.template_name} </option>)
                        }

                        
                    </Select>
                </FormControl>

                <label htmlFor="startDate" id={classes.startDate}>Start Date</label>

                <TextField
                    required
                    variant="standard"
                    type="date"
                    id="startDate"
                    name="startDate"
                    className={classes.campaignEdit__input}
                    value={startDate}
                    onChange={(event)=> setStartDate(event.target.value)}
                />

                <label htmlFor="endDate" id={classes.endDate}>End Date</label>
                <TextField
                    required
                    variant="standard"
                    type="date"
                    id="endDate"
                    name="endDate"
                    className={classes.campaignEdit__formcontrol}
                    value={endDate}
                    onChange={(event)=> setEndDate(event.target.value)}
                />

                <Button
                        type="submit"
                        variant="contained"
                        style={{ width: "250px" }}
                        
                    >
                    Edit Campaign
                </Button>
                
            </form>
        </div>
    )
}

export default EditCampaignDetail;
