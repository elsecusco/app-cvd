import http from "./http-common";
import { DocumentoExpediente } from "../models/documentos";

const getDocumentoExpedienteCVD = (id: string) => {
  return http.get<DocumentoExpediente>(`/BuscarPorCVD?cvd=${id}`);
};
const getDocumentoExpedienteGUID = (id: string) => {
  return http.get<DocumentoExpediente>(`/BuscarPorGuid?guid=${id}`);
};
const getDescargarDocumentoGUID = (id: string) => {
  return http.get(`/DownloadFile?guid=${id}`);
};
const CvdService = {
  getDocumentoExpedienteCVD,
  getDocumentoExpedienteGUID,
  getDescargarDocumentoGUID,
};

export default CvdService;
