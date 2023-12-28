import { API_CARNET } from "setup/application.properties";
import { CarnetRequest } from "setup/setupAxios";

export const getDataMonitoring = (parameter) => {
  return CarnetRequest.get(
    `${API_CARNET}/carnet/monitoring-permohonan/`, 
    // `http://dev-inhouse-carnet-carnetservice.apps.drc-dev.customs.go.id/carnet/monitoring-permohonan/`,
    {
    params: {
      ...parameter,
    },
  });
};

export const postSimpanPersetujuan = (values) => {
  return CarnetRequest.post(
    `${API_CARNET}/carnet/update-data-pabean/`,
    // `http://dev-inhouse-carnet-carnetservice.apps.drc-dev.customs.go.id/carnet/update-data-pabean/`,
    values
  );
};
