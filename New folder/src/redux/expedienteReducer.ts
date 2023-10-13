// Part 1
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentoExpediente } from "../models/documentos";

// Part 2
export interface ExpedienteInitialState {
  documentoExpediente: DocumentoExpediente;
  captcha: string;
}
const initialState: ExpedienteInitialState = {
  documentoExpediente: {} as DocumentoExpediente,
  captcha: "",
};

// Part 3
export const expedienteSlice = createSlice({
  name: "expediente",
  initialState,
  reducers: {
    updateCaptcha: (state, action: PayloadAction<string>) => {
      state.captcha = action.payload;
    },
    updateExpediente: (state, action: PayloadAction<DocumentoExpediente>) => {
        state.documentoExpediente = action.payload
    }
  },
});

// Part 4
export const { updateCaptcha, updateExpediente } = expedienteSlice.actions;
export default expedienteSlice.reducer
