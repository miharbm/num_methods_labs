import React from 'react';
import Plot from 'react-plotly.js';
import {useSelector} from "react-redux";

const PlotlyChart = () =>  {
    const data1 = useSelector(state => state.chart.data1);
    const data2 = useSelector(state => state.chart.data2);
    const data4 = useSelector(state => state.chart.data4);
    const deviation = useSelector(state => state.chart.data3);


    const data = [
        {
            x: data1.map(point => point.x),
            y: data1.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'green'},
            name: "lagrange",

        },
        {
            x: data2.map(point => point.x),
            y: data2.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'blue', size: 3},
            name: "f(x)",

        },
        {
            x: data4.map(point => point.x),
            y: data4.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: 'purple'},
            name: "initial points",
        },
    ]

    const deviationGreen = deviation.filter(point => point.y < 1.0);
    const deviationRed = deviation.filter(point => point.y > 0.9999);

    const dataDeviation = [
        {
            x: deviationGreen.map(point => point.x),
            y: deviationGreen.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: '#2E8B57', size: 9},
            name: "normal deviation"
        },
        {
            x: deviationRed.map(point => point.x),
            y: deviationRed.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: '#c90f0f', size: 9},
            name: "bad deviation"
        },
    ]


    return (
        <>
            <Plot
                data={data}
                layout={ {
                    autosize: true,
                    legend: {
                        x: 1,
                        xanchor: 'right',
                        y: 1
                    },
                    font: {
                        size: 14,
                    },
                } }
                style={ {width: "100%", height: 700}}
            />
            <Plot
                data={dataDeviation}
                layout={ {
                    autosize: true,
                    legend: {
                        x: 1,
                        xanchor: 'right',
                        y: 1
                    },
                    font: {
                        size: 14,
                    },
                } }
                style={ {width: "100%", height: 700}}
            /></>
    );
}

export default PlotlyChart;