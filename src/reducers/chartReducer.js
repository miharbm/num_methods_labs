import {createReducer} from "@reduxjs/toolkit";
import {dataToChartSet} from "../actions";

const initialState = {
    dataToChart: [],
}

const chart = createReducer(initialState, {
        [dataToChartSet]: (state, action) => {
                console.log("action.payload: ",action.payload)
                state.dataToChart = action.payload;
            },
    }, [],
    state => state
)


export default chart;