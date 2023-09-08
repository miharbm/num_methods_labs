import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import {useSelector} from "react-redux";

const Chart = () => {

    const data2 = useSelector(state => state.chart.dataToChart);
    const data1 = useSelector(state => state.chart.initialData);


    return (
        <ResponsiveContainer width={"100%"} height={700}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name=""  />
                <YAxis type="number" dataKey="y" name=""  />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend/>
                <Scatter name="Interpolated" data={data2} fill="#82ca9d" />
                <Scatter name="Initial data" data={data1} fill="#8884d8"/>

            </ScatterChart>
        </ResponsiveContainer>
    );

};

export default Chart;