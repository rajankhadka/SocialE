import React from 'react'
import classes from "./Campaign.module.css";

//importing components
import Header from '../../../components/Header/Header';
import SideBar from '../../../components/SideBar/SideBar';
import BodyTable from '../../../components/UI/BodyTable/BodyTable';
import LineChart from '../../../components/UI/Charts/LineChart/LineChart';
import BarChart from '../../../components/UI/Charts/BarChart/BarChart';
import DoughnutChart from '../../../components/UI/Charts/DoughnutChart/DoughnutChart';

function Campaign(props) {
    return (
        <div className={classes.campaign}>
            <Header />
            <div className={classes.campaign__body}>
                <SideBar />
                <div className={classes.campaign__body__content}>
                    <div className={classes.campaign__body__content__header}>
                        chart
                    </div>

                    <div className={classes.campaign__body__content__body}>
                        <div className={classes.campaign__body__content__body__left}>
                            <LineChart />
                        </div>

                        <div className={classes.campaign__body__content__body__right}>
                            <div className={classes.campaign__body__content__body__right__01}>
                                <BarChart />
                            </div>

                            <div className={classes.campaign__body__content__body__right__02}>
                                <div className={classes.campaign__body__content__body__right__02__left}>
                                    <p>Used OS</p>
                                    <DoughnutChart data="osdata"/>
                                </div>
                                
                                <div className={classes.campaign__body__content__body__right__02__right}>
                                    <p>Used Browser</p>
                                    <DoughnutChart data="browserdata"/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaign;
