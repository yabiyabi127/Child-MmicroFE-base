import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataLaporanPeriodik, getdetailLaporan } from "./laporanPeriodikRequest";
import { convertObjectToApiParams } from "utils/datatable/handleDatatable";

export const DataLaporanPeriodik = createAsyncThunk(
  "carnet/dataLaporanPeriodik",
  async (val, { rejectWithValue, getState }) => {
    try {
      const { laporanPeriodik, auth, } = getState();
      const { pagination, filter } = laporanPeriodik;
      const { kodeKantor } = auth;
      const page = pagination.current - 1;
      const size = pagination.pageSize;

      const params = {
        page,
        size,
        filter,
      };
      const parameter = convertObjectToApiParams(params);
      const response = await getDataLaporanPeriodik(parameter);
      const { data, status } = response;
      if (status === 200) {
        return data;
      }
    } catch (e) {
      const error = e;
      if (error.response) {
        const res = error.response;
        return rejectWithValue({
          status: res.status,
          data: res.data,
          message: res.data?.message || "Something went wrong",
        });
      } else {
        return rejectWithValue({
          message: error.message,
          status: error.request.status,
        });
      }
    }
  }
);

export const dataDetailLaporan = createAsyncThunk(
  "carnet/dataDetailLaporan",
  async (val, { rejectWithValue }) => {
    const idLaporan = val;
    try {
      if (!idLaporan) {
        return rejectWithValue({
          status: 400,
          message: "idLaporan is required",
        });
      }
      const response = await getdetailLaporan(idLaporan);
      const { data, status } = response;
      if (status === 200) {
        return data.data
      }
    } catch (e) {
      const error = e;
      if (error.response) {
        const res = error.response;
        return rejectWithValue({
          status: res.status,
          data: res.data,
          message: res.data?.message || "Something went wrong",
          idLaporan,
        });
      } else {
        return rejectWithValue({
          message: error.message,
          status: error.request.status,
        });
      }
    }
  }
);
