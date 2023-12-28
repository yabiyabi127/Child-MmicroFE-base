import { API_PARSER } from "setup/application.properties";
import { ParserRequest } from "setup/setupAxios";

export const viewReport = (idRespon, onSuccess, onFailure) => {
  const APIjasper =
    API_PARSER + "/v1/report-respon/" + idRespon + "/responInhouse";
  ParserRequest.get(APIjasper, {
    responseType: "blob",
  })
    .then((response) => {
      if (response.data.size == 0) {
        onFailure("Tidak ada File Report Respon");
      } else {
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        const fileURL = URL.createObjectURL(file);
        onSuccess(fileURL);
      }
    })
    .catch((error) => {
      console.log(error);
      onFailure("Tidak ada File Report Respon");
    });
};
