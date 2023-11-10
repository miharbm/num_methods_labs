import {createAction} from "@reduxjs/toolkit";

export const data1Set = createAction("DATA_TO_CHART_SET");
export const data2Set = createAction("INITIAL_DATA_SET");
export const data3Set = createAction("DEVIATION_SET");
export const data4Set = createAction("INITIAL_POINTS_SET");
export const clearData = createAction("CLEAR_DATA");