import React from 'react';
import {Bubble} from "react-chartjs-2";

function BarChart(props)  {
    return (
        <Bubble data={props.data} options={props.options}/>
    );
};

export default BarChart;