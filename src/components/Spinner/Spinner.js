import React from 'react'
import classes from './Spinner.module.css';

function Spinner(props) {
    return (
        <div className={[classes.loader,props.className].join(' ')}>

            
        </div>
    )
}

export default Spinner;
