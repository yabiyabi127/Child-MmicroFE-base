import { configureStore } from "@reduxjs/toolkit";
import AuthDataSlice from "./reducers/auth/authSlice";
import { reduxErrorHandling } from "./errorHandling";
import monitoringSlice from "./reducers/monitoring/monitoringSlice";
import laporanPeriodikSlice from "./reducers/laporanPeriodik/laporanPeriodikSlice";

export const store = configureStore({
  reducer: {
    auth: AuthDataSlice,
    monitoring: monitoringSlice,
    laporanPeriodik: laporanPeriodikSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([reduxErrorHandling]),
});

export default store;
