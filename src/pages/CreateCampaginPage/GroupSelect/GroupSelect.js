import { Button, Checkbox, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core'
import React,{useState} from 'react'
import TokenVerification from '../../../hoc/TokenVerification';


function GroupSelect(props) {

    const [selectOpen, setSelectOpen] = useState(false);
    
    
    const handleClose = () => {
        setSelectOpen(false);
    };

    const handleOpen = () => {
        setSelectOpen(true)
    };

    
    return (
        <TokenVerification>
            <div>
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
        </TokenVerification>
    )
}

export default GroupSelect
