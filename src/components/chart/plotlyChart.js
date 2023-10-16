import React from 'react';
import Plot from 'react-plotly.js';
import {useSelector} from "react-redux";

const PlotlyChart = () =>  {
    const {data : data1, name: name1} = useSelector(state => state.chart.data1);
    const {data: data2, name: name2} = useSelector(state => state.chart.data2);
    const {data: data4, name: name4} = useSelector(state => state.chart.data4);
    const {data: deviation, name: nameDeviation} = useSelector(state => state.chart.data3);

    // console.log("data1: ", data1)
    // console.log("data2: ", data2)
    // console.log("data4: ", data4)
    const data = [
        {
            x: data1.map(point => point.x),
            y: data1.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: '#16a34a'},
            name: name1,

        },
        {
            x: data2.map(point => point.x),
            y: data2.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: '#2563eb', size: 3},
            name: name2,

        },
        {
            x: data4.map(point => point.x),
            y: data4.map(point => point.y),
            type: 'scatter',
            mode: 'markers',
            marker: {color: '#6b21a8'},
            name: name4,
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
                        y: 1.1,
                    },
                    font: {
                        size: 14,
                    },
                                    } }
                style={ {width: "100%", height: 700}}
                config={{toImageButtonOptions: {
                        format: 'svg', // one of png, svg, jpeg, webp
                        filename: 'custom_image',
                        height: 500,
                        width: 700,
                        scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
                    }}}

            />
            <Plot
                data={dataDeviation}
                layout={ {
                    autosize: true,
                    legend: {
                        x: 1,
                        xanchor: 'right',
                        y: 1.07,
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