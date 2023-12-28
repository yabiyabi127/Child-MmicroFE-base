import { createSlice } from "@reduxjs/toolkit";
import { fetchKeycloak, fetchUserProfile } from "./authThunk";

const initialState = {
  loading: true,
  user: undefined,
  accessKeycloak: undefined,
  keycloakItem: undefined,
  menuName: undefined,
  pathName: undefined,
  pathValue: undefined,
  accessToken: undefined,
  kodeKantor: undefined,
  kodeUnitOrganisasiInduk: undefined,
  namaPegawai: undefined,
  nip: undefined,
  urlFoto: undefined,
  roles: [],
  isError: false,
  errorMessage: "Kesalahan tidak dikenali, mohon coba lagi",
};

export const dataSlice = createSlice({
  name: "AuthDataSlice",
  initialState,
  reducers: {
    saveMenuName: (state, action) => {
      state.menuName = action.payload.menuName;
      state.pathName = action.payload.pathName;
      state.pathValue = action.payload.pathValue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchKeycloak.pending, (state, action) => {
      state.loading = true;
      state.accessKeycloak = undefined;
      state.keycloakItem = undefined;
      state.accessToken = undefined;
      state.isError = false;
      state.errorMessage = "";
    });

    builder.addCase(fetchKeycloak.rejected, (state, action) => {
      state.loading = false;
      state.accessKeycloak = undefined;
      state.keycloakItem = undefined;
      state.accessToken = undefined;
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(fetchKeycloak.fulfilled, (state, action) => {
      state.loading = true;
      state.keycloakItem = action.payload.item;
      state.accessKeycloak = action.payload.accessKeycloak;
      state.accessToken = action.payload.item.access_token;
      state.isError = false;
      state.errorMessage = "";
    });

    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.loading = true;
      state.kodeKantor = undefined;
      state.kodeUnitOrganisasiInduk = undefined;
      state.namaPegawai = undefined;
      state.kodeUnitOrganisasiInduk = undefined;
      state.urlFoto = undefined;
      state.roles = [];
      state.isError = false;
      state.errorMessage = "";
    });

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.kodeKantor = undefined;
      state.kodeUnitOrganisasiInduk = undefined;
      state.namaPegawai = undefined;
      state.kodeUnitOrganisasiInduk = undefined;
      state.urlFoto = undefined;
      state.roles = [];
      state.isError = true;
      state.errorMessage = action.error.message;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.kodeKantor = action.payload.kodeKantor;
      state.kodeUnitOrganisasiInduk = action.payload.kodeUnitOrganisasiInduk;
      state.namaPegawai = action.payload.namaPegawai;
      state.nip = action.payload.nip;
      state.kodeUnitOrganisasiInduk = action.payload.kodeUnitOrganisasiInduk;
      state.urlFoto = action.payload.kodeUnitOrganisasiInduk;
      state.roles = action.payload.roles;
      state.isError = false;
      state.errorMessage = "";
    });
  },
});

export const { saveMenuName } = dataSlice.actions;
export default dataSlice.reducer;
