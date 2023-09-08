import {createReducer} from "@reduxjs/toolkit";
import {dataToChartSet, deviationSet, initialDataSet} from "../actions";

const initialState = {
    dataToChart: [],
    initialData: [],
    deviation: []
}

const chart = createReducer(initialState, {
        [dataToChartSet]: (state, action) => {
                state.dataToChart = action.payload;
            },
        [initialDataSet]: (state, action) => {
                state.initialData = action.payload;
            },
        [deviationSet]: (state, action) => {
            state.deviation  = action.payload;
        }
    }, [],
    state => state
)


export default chart;