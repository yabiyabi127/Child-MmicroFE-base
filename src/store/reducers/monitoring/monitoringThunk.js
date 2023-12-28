import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataMonitoring, postSimpanPersetujuan } from "./monitoringRequest";

export const dataMonitoring = createAsyncThunk(
  "carnet/dataMonitoring",
  async (val, { rejectWithValue, getState }) => {
    try {
      const { monitoring, auth } = getState();
      const { pagination, filter } = monitoring;
      const { kodeKantor } = auth;
      const page = pagination.current - 1;
      const limit = pagination.pageSize;

      const params = {
        kodeKantor,
        page,
        limit,
        ...filter,
      };
      const response = await getDataMonitoring(params);
      const { data, status } = response;
      if (status === 200) {
        return data
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

export const simpanPersetujuan = createAsyncThunk(
  "carnet/simpanPersetujuan",
  async (val, { rejectWithValue }) => {
    try {
      const response = await postSimpanPersetujuan(val);

      const { data, status } = response;
      if (status === 200) {
        return data;
      } else {
        return rejectWithValue({
          message: data?.message || "Something went wrong",
          status: status,
        });
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