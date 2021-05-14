import classes from './GroupSelect.module.css';
import { Button, Checkbox, FormControl, Input, ListItemText, MenuItem, Select } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import { Close } from '@material-ui/icons';

function GroupSelect(props) {

    const [selectOpen, setSelectOpen] = useState(false);
    
    
    const handleClose = () => {
        setSelectOpen(false);
    };

    const handleOpen = () => {
        setSelectOpen(true)
    };

    
    return (
        <div>
            {/* <div className={classes.selectedGroupEdit}
                style={{
                    width: "40vh",
                    height: "10vh",
                    backgroundColor:"silver"
                }}
            >
                <p>Hello <Close style={{ fontSize: "15px" }} /> </p>
                <p>Hello this is my name <Close style={{ fontSize: "15px" }} /> </p>
                <p>Hello <Close style={{ fontSize: "15px" }} /> </p>
                <p>Hello <Close style={{fontSize:"15px"}}/> </p>
            </div> */}
            <FormControl>

                <Button id="openMenu" onClick={handleOpen} variant="text"
                    style={{
                        marginTop: "-30px",
                        fontStyle: "normal",
                        textTransform: "capitalize",
                        fontSize: "15px",
                        // width:"40vh"
                    }}
                >
                    Choose Group
                </Button>
                <Select
                    multiple
                    value={props.selected}
                    onChange={props.selectedhandleChange}
                    // input={<Input id="select-multiple-checkbox" />}
                    style={{ display: "none" }}
                    open={selectOpen}
                    onClose={handleClose}
                    MenuProps={{
                        anchorEl: document.getElementById("openMenu"),
                        style: { marginTop: 10 }
                    }}
                >
                    {props.groupData.map((group, index) => (
                        <MenuItem key={group.id} value={group.id}>
                            <Checkbox checked={props.selected.indexOf(group.id) > -1} />
                            <ListItemText primary={group.group_name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
        </div>
    )
}

export default GroupSelect
