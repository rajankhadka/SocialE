import React,{useState} from 'react'
import classes from "./LineChart.module.css";

import { Line } from "react-chartjs-2";

function LineChart(props) {

    const [data, setData] = useState({
        labels: ["Mar 01", "Mar 02", "Mar 03", "Mar 04", "Mar 05"],
        datasets: [{
            data: [5, 1, 7, 3, 5],
            backgroundColor: "rgba(255,255,255,0.1)",
            borderColor:"red"
        }]
    });

    return (
        <div className={classes.line}>
            <Line 
                data={data}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                       display:false
                    },
                    elements: {
                        point: {
                            borderWidth:5
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChart;
