import React from 'react'
import classes from "./Header.module.css";

//material UI
import { Avatar } from '@material-ui/core';
import {  } from '@material-ui/icons';
import HeaderTooltip from '../HeaderTooltip/HeaderTooltip';

//redux
import { connect } from "react-redux";
import { openTooltip } from "../../redux/actions/showToolTipAction";

function Header(props) {
    return (
        <div className={classes.header__header}>
            <div className={classes.header__header__left}>
                <div className={classes.header__header__logo}>
                    <img src="https://www.clipartmax.com/png/middle/321-3216628_connectdevelop-icon-fa-fa-connectdevelop.png"
                        alt="Logo"
                    />
                </div>

                <div className={classes.header__header__title}>
                    <h1>SocialE</h1>
                </div>
            </div>

            <div className={classes.header__header__right} onClick={()=> props.openTooltipAction()}>
                
                <Avatar
                    alt="Remy Sharp"
                    src=""
                    className={classes.header__header__right__avatar}
                    style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor : !props.showtooltipReducers.border ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.5)"
                    }}
                />
                <HeaderTooltip />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        showtooltipReducers : state.showtooltipReducers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openTooltipAction : () => dispatch(openTooltip()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
