import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useSelector} from "react-redux";

const Chart = () => {

    const data = useSelector(state => state.chart.dataToChart);


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
                <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );

};

export default Chart;