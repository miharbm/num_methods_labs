import {createReducer} from "@reduxjs/toolkit";
import {data1Set, data2Set, data3Set, data4Set} from "../actions";

const initialState = {
    // dataToChart: [],
    // initialData: [],
    // deviation: []
    data1: {data: [], name: ""},
    data2: {data: [], name: ""},
    data3: {data: [], name: ""},
    data4: {data: [], name: ""},
}

const chart = createReducer(initialState, {
        [data1Set]: (state, action) => {
                state.data1 = action.payload;
            },
        [data2Set]: (state, action) => {
                state.data2 = action.payload;
            },
        [data3Set]: (state, action) => {
            state.data3  = action.payload;
        },
        [data4Set]: (state, action) => {
            state.data4  = action.payload;
        },
    }, [],
    state => state
)


export default chart;