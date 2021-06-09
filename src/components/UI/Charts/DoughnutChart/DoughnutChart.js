import React,{useState} from 'react'
import { Doughnut } from "react-chartjs-2";

import classes from  "./DoughnutChart.module.css";

function DoughnutChart(props) {

    const [osdata, setOSData] = useState({
        labels: ["window", "mac", "linux"],
        datasets: [{
            data: [5, 1, 3],
            backgroundColor: [
                "rgba(255,10,10,0.6)",
                "rgba(55,210,10,0.6)",
                "rgba(55,10,210,0.6)",
            ]
        }],
    });

    const [browserdata, setBrowserdata] = useState({
        labels: ["chrome", "safari", "mozilla", "others"],
        datasets: [{
            data: [3, 1, 2,5],
            backgroundColor: [
                "rgba(255,10,10,0.6)",
                "rgba(55,210,10,0.6)",
                "rgba(55,10,210,0.6)",
                "rgba(55,10,10,0.6)",
            ]
        }],
    });

    return (
        <div className={classes.doughnut}>
            <div className={classes.doughnut__left}>
                <Doughnut
                    data={props.data === "osdata" ? osdata : browserdata}
                    options={{
                        legend: {
                            position:"bottom"
                        },
                        // title: {
                        //     display: true,
                        //     text:"Used OS"
                        // }
                    }}
                />
            </div>

            
        </div>
    )
}

export default DoughnutChart;