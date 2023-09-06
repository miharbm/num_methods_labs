import {createReducer} from "@reduxjs/toolkit";
import {dataToChartSet, initialDataSet} from "../actions";

const initialState = {
    dataToChart: [],
    initialData: [],
}

const chart = createReducer(initialState, {
        [dataToChartSet]: (state, action) => {
                state.dataToChart = action.payload;
            },
        [initialDataSet]: (state, action) => {
                state.initialData = action.payload;
            },
    }, [],
    state => state
)


export default chart;