/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, useParams } from "react-router-dom";
import "./cvd.css";
import { DocumentoExpediente } from "../models/documentos";
import CvdService from "../services/CvdService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CVD() {
  const params = useParams();
  const navigate = useNavigate();
  const notify = () => toast("Wow so easy!");

  const [documentoExpediente, setDocumentoExpediente] =
    useState<DocumentoExpediente>({} as DocumentoExpediente);
  const [CVD, setCVD] = useState('');
  const [guid] = useState(params.id);
  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false);

  const getDocumentoExpediente = (id: string, tipo: string) => {
    if (tipo === "cvd") {
      CvdService.getDocumentoExpedienteCVD(id)
        .then((response: any) => {
          setDocumentoExpediente(response.data[0]);
        })
        .catch((e: Error) => {
          setDocumentoExpediente({} as DocumentoExpediente);
          console.log(e);
        });
    } else if (tipo === "guid") {
      CvdService.getDocumentoExpedienteGUID(id)
        .then((response: any) => {
          setCVD(response.data[0].DatosExpediente.Cvd);
        })
        .catch((e: Error) => {
          setCVD("");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    if (CVD) getDocumentoExpediente(CVD, "cvd");
    if (guid) getDocumentoExpediente(guid, "guid");
  }, [CVD, guid]);

  function onChange(value: unknown) {
    setIsCaptchaSuccess(true);
    console.log("captcha value: ", value);
  }
  function goExpediente() {
    if (documentoExpediente.Documentos != undefined)
      navigate("/verExpedientePorCVD/" + CVD);
    else notify;
  }
  return (
    <div>
      <body>
        <div
          className="d-flex row justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div
            className="row col-12 justify-content-center"
            style={{ marginTop: "-350px" }}
          >
            <span className="d-flex justify-content-center style-span">
              Servicio de Verificación de Representaciones Impresas
            </span>
            <span className="d-flex justify-content-center style-span">
              Visor de Expedientes
            </span>
            <img
              className="d-flex col-md-2 col-lg-1 col-4 justify-content-center style-img"
              src="../src/assets/images/logo-else.png"
            ></img>
            <div className="d-flex justify-content-center">
              <div className="row col-5">
                <div className="row col-12 align-items-center ">
                  <span
                    className="d-flex col-md-2 col-12 justify-content-center"
                    style={{ textAlign: "left" }}
                  >
                    CVD :
                  </span>
                  <div className="d-flex col-md-8 col-12  p-3 justify-content-center">
                    <input
                      className="text-center form-control border-dark"
                      placeholder="Ingrese CVD"
                      value={CVD}
                      onChange={(e) => setCVD(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey="6LdpqfoUAAAAAOCF_ijqkWBh_7q3lzYiT2ElveTZ"
                    onChange={onChange}
                  />
                </div>
                <div className="d-flex justify-content-center p-3 w-100">
                  <button
                    style={{ maxWidth: "200px", backgroundColor: "#01478c" }}
                    className="form-control text-white w-100"
                    disabled={!isCaptchaSuccessful}
                    onClick={goExpediente}
                  >
                    Buscar
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <footer className="footer" style={{ backgroundColor: "#f7f7f7" }}>
        <span className="d-flex justify-content-center">Ⓒ 2023 - ELSE</span>
      </footer>
    </div>
  );
}
