import React from 'react'
import { ChromePicker, SliderPicker,SketchPicker } from 'react-color';
import classes from "./ColorPicker.module.css";

function ColorPicker(props) {
    return (
        <div className={classes.colorPicker}>
            <SketchPicker
                width={props.width}
                disableAlpha={props.disableAlpha}
                color={props.color}
                onChangeComplete={props.onChangeComplete}
                onChange={(color) => console.log("onchange--->", color.hex)}
                
            />
            {/* <input type="button" value="select" onClick={ () => console.log("clicked")}/> */}
        </div>
    )
}

export default ColorPicker
