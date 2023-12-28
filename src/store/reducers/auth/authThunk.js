import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { PublicRequest } from "setup/setupAxios";
import { API_AMWS, API_AUTHWS } from "setup/application.properties";
import { updateToken } from "./authRequest";

export const fetchKeycloak = createAsyncThunk(
  "auth/fetchKeycloak",
  async (val, { rejectWithValue }) => {
    try {
      const refreshToken = val;
      const response = await updateToken(refreshToken);
      const { data, status } = response;
      if (status === 200) {
        const accessKeycloak = jwtDecode(data.item.access_token);
        const { nip } = accessKeycloak;
        if (!nip) {
          return rejectWithValue(
            "Data yang diterima tidak memiliki nip, silahkan hubungi admin."
          );
        }
        console.log(`data`, data);
        return { ...data, accessKeycloak };
      }
    } catch (e) {
      const error = e;
      if (error.request) {
        throw new Error("0");
      } else if (error.response) {
        return rejectWithValue(
          "Gagal mengotentifikasi, silahkan coba lagi, atau lakukan login ulang."
        );
      } else {
        return rejectWithValue(
          "Gagal mengotentifikasi, silahkan coba lagi, atau lakukan login ulang."
        );
      }
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (val, { rejectWithValue }) => {
    try {
      const nip = val;
      const path = `/v1/pegawai/get-by-nip/${nip}`;
      const responseProfile = await axios.get(API_AMWS + path);
      const { data: dataProfile, status: statusProfile } = responseProfile;
      if (statusProfile === 200) {
        const { kdKantor, kdUnitOrganisasiInduk, nmPegawai, urlFoto, nip } =
          dataProfile.item;
        let roleArray = [];
        const resourceUrl = `${API_AMWS}/v1/user-detail/adv-list-dx?skip=0&take=100&filter=%5B%22idUser%22%2C%22%3D%22%2C%22${nip}%22%5D`;
        const responseResource = await axios.get(resourceUrl);
        const {
          data: dataResource,
          status: statusResource,
          config: configResource,
        } = responseResource;
        if (statusResource === 200) {
          const { url } = configResource;
          const items = dataResource.items || [];
          const idUsers = items.map((np) => {
            return np.idUser;
          });

          if (!idUsers.includes(nip) && url.includes(nip)) {
            roleArray = undefined;
          } else {
            for (const rl of items) {
              const { namaRole, idRole } = rl.td_role;
              roleArray.push({
                namaRole,
                idRole,
                idUser: rl.idUser,
              });
            }
          }
          const dataFetchMenu = {
            kodeKantor: kdKantor,
            kodeUnitOrganisasiInduk: kdUnitOrganisasiInduk,
            namaPegawai: nmPegawai,
            urlFoto: urlFoto,
            roles: roleArray,
            nip,
          };
          return dataFetchMenu;
        }
      }
    } catch (e) {
      if (e.request) {
        throw new Error("0");
      }

      const message =
        e.response.data.message ||
        "Terjadi Kesalahan Saat Meminta Data. " + e.message;
      return rejectWithValue(message);
    }
  }
);
