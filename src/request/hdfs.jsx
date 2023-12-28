import { API_HDFS } from "setup/application.properties";
import { HdfsRequest } from "setup/setupAxios";

export const viewFoto = (urlFoto, onSuccess, onFailure) => {
  HdfsRequest.get(`${API_HDFS}/v1/hdfs/download?path=${urlFoto}`, {
    responseType: "blob",
  })
    .then((response) => {
      const file = new Blob([response.data], { type: "jpg || jpeg || png" });
      const fileURL = URL.createObjectURL(file);
      onSuccess(fileURL);
    })
    .catch((error) => {
      console.log(error);
      if (typeof onFailure === "function") {
        onFailure("Foto yang Anda cari tidak tersedia!");
      }
    });
};

export const downloadPdf = (url, onSuccess, onFailure) => {
  HdfsRequest.get(`${API_HDFS}/v1/hdfs/download?path=${url}`, {
    responseType: "blob",
  })
    .then((response) => {
      const fileTemp = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(fileTemp);
      onSuccess(fileURL);
    })
    .catch((error) => {
      console.log(error);
      if (typeof onFailure === "function") {
        onFailure("Dokumen yang Anda cari tidak tersedia!");
      }
    });
};
