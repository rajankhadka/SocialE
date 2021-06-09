import React,{useState} from 'react'
import classes from "./BarChart.module.css";

import { HorizontalBar } from "react-chartjs-2";

function BarChart(props) {

    const [data, setData] = useState({
        labels: ["facebook", "twitter", "instragram", "google","others"],
        datasets: [{
            data: [2, 5, 3, 4, 2,],
            backgroundColor: [
                "rgba(255,10,10,0.6)",
                "rgba(55,210,10,0.6)",
                "rgba(55,10,210,0.6)",
                "rgba(55,10,10,0.6)",
                "rgba(55,210,210,0.6)"
            ],
            minBarLength: 1,
        }],
    });

    return (
        <div className={classes.barchart}>
            <HorizontalBar
                data={data}
                options={{
                    maintainAspectRatio:false,
                    legend: {
                        display:false
                    },
                    title: {
                        display: true,
                        text:"Campaign Performance"
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 10
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}

export default BarChart
