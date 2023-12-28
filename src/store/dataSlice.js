import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    nama:"jono",
    alamat:"bogor kota"
}


export const dataSlice = createSlice({
  name:'MasterDataSLice',
  initialState,
  reducers:{
        ubahNama1:(state)=>{
            state.nama="bambang"
            state.alamat="jakarta"
        },
        ubahNama2:(state)=>{
            state.nama="imron"
            state.alamat="surabaya"
        }
  }
})

export const {ubahNama1,ubahNama2} = dataSlice.actions
export default dataSlice.reducer
