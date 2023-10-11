import React, { useState, useContext, createContext } from "react";
import { DocumentoExpediente } from "./models/documentos";
import CVD from "./components/cvd";

const DocumentoExpedienteContext = createContext<DocumentoExpediente>({} as DocumentoExpediente);

export function useDocumentoExpedienteContext() {
  return useContext(DocumentoExpedienteContext);
}

export function DocumentoExpedienteProvider() {
  const [documentoExpediente, setDocumentoExpediente] = useState(
    {} as DocumentoExpediente
  );
  const values = {
    documentoExpediente,
    setDocumentoExpediente,
  };
  return 
    <DocumentoExpedienteContext.Provider value={values}>
      <CVD />
    </DocumentoExpedienteContext.Provider>
  
}
