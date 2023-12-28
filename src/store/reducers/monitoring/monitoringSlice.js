import { createSlice } from "@reduxjs/toolkit";
import {
  dataMonitoring,
} from "./monitoringThunk";

const initialState = {
  loading: true,
  dataMonitoring: [],
  pagination: {
    pageSize: 10,
    current: 1,
    total: 0,
  },
  filter: {},
};

export const dataSlice = createSlice({
  name: "CarnetDataSlice",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    saveFilterProps: (state, action) => {
      state.filter = Object.assign(state.filter, action.payload);
      state.pagination = Object.assign(state.pagination, { current: 1 });
    },
    deleteFilter: (state, action) => {
      const propertyName = action.payload.propertyName;
      if (typeof state.filter[propertyName] !== "undefined") {
        delete state.filter[propertyName];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dataMonitoring.pending, (state, action) => {
      state.loading = true;
      state.dataMonitoring = initialState.dataMonitoring;
    });

    builder.addCase(dataMonitoring.rejected, (state, action) => {
      state.loading = false;
      state.dataMonitoring = [];
    });

    builder.addCase(dataMonitoring.fulfilled, (state, action) => {
      state.loading = false;
      state.dataMonitoring = action.payload.data;
      state.pagination = Object.assign(state.pagination, {
        total: action.payload.total,
      });
    });
  },
});
export const {
  setPagination,
  saveFilterProps,
  deleteFilter,
  goDetailedView,
  displayModal,
  hideModal,
} = dataSlice.actions;
export default dataSlice.reducer;
