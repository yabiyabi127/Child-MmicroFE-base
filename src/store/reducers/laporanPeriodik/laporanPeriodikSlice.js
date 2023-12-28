import { createSlice } from "@reduxjs/toolkit";
import { dataDetailLaporan, DataLaporanPeriodik } from "./laporanPeriodikThunk";

const initialState = {
  loading: true,
  dataLaporanPeriodik: [],
  dataDetailLaporan: [],
  loadingDetail: true,
  rowLaporan: {},
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
    goDetailedView: (state, action) => {
      state.rowLaporan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(DataLaporanPeriodik.pending, (state, action) => {
      state.loading = true;
      state.dataLaporanPeriodik = initialState.dataLaporanPeriodik;
    });

    builder.addCase(DataLaporanPeriodik.rejected, (state, action) => {
      state.loading = false;
      state.dataLaporanPeriodik = [];
    });

    builder.addCase(DataLaporanPeriodik.fulfilled, (state, action) => {
      state.loading = false;
      state.dataLaporanPeriodik = action.payload.data;
      state.pagination = Object.assign(state.pagination, {
        total: action.payload.size,
      });
    });

    builder.addCase(dataDetailLaporan.pending, (state, action) => {
      state.dataDetailLaporan = {};
      state.loadingDetail = true;
    });

    builder.addCase(dataDetailLaporan.rejected, (state, action) => {
      state.dataDetailLaporan = {};
      state.loadingDetail = true;
    });

    builder.addCase(dataDetailLaporan.fulfilled, (state, action) => {
      state.dataDetailLaporan = action.payload;
      state.loadingDetail = false;
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
