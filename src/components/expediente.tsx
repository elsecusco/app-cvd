/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
// import { useSelector } from "react-redux";
import CvdService from "../services/CvdService";
import { DocumentoExpediente, Documento } from "../models/documentos";
import ModalDocumento from "./modalDocumento";
import { environment as env } from "./../environments/environment";
import { axiosDownloadFile, axiosFile } from "../services/http-common";
import "./cvd.css";

export default function Expediente() {
  const navigate = useNavigate();
  const urlDescarga = env.base_url + "DownloadFile?guid=";
  const params = useParams();
//   const expediente = useSelector(
//     (state: RootState) => state.expediente.documentoExpediente
//   );
  const [documentoExpediente, setDocumentoExpediente] =
    useState<DocumentoExpediente>({} as DocumentoExpediente);
  const [url, setUrl] = useState<any>();
  const [CVD, setCVD] = useState(params.id);
  const [listDocumentoExpediente, setListDocumentoExpediente] = useState<
    Documento[]
  >([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (CVD) {
      if (listDocumentoExpediente?.length == 0) {
        getDocumentoExpediente(CVD);
      }
      setListDocumentoExpediente(documentoExpediente?.Documentos);
    }
  });

  const getDocumentoExpediente = (id: string) => {
    CvdService.getDocumentoExpedienteCVD(id)
      .then((response: any) => {
        setDocumentoExpediente(response.data[0]);
      })
      .catch((e: Error) => {
        if (e.code === "ERR_BAD_REQUEST") navigate("/");
        setDocumentoExpediente({} as DocumentoExpediente);
        // console.log(e);
      });
  };

  const descargar = (id: any, nombre: string) => {
    axiosDownloadFile(urlDescarga + id, nombre);
  };

  const visualizar = (id: any) => {
    setModalShow(true);
    axiosFile(urlDescarga + id).then((response: any) => {
      //Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      setUrl(fileURL);
    });
  };

  function goHome() {
    navigate("/");
  }

  return (
    <div style={{ backgroundColor: "#dcdddf" }}>
      <div className="w-75 mx-auto d-flex justify-content-center align-items-center">
        <body>
          <div
            className="d-flex row justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div
              className="row col-12 justify-content-center"
              style={{ marginTop: "-100px" }}
            >
              <span className="d-flex justify-content-center style-span">
                Servicio de Verificación de Representaciones Impresas
              </span>
              <span className="d-flex justify-content-center style-span">
                Visor de Expedientes
              </span>
              <img
                onClick={goHome}
                className="d-flex col-md-2 col-lg-2 col-4 justify-content-center style-img"
                src="../src/assets/images/logo-else.png"
              ></img>

              <div
                className="row col-12 col-md-12 col-lg-12"
                style={{ paddingTop: "50px" }}
              >
                <span className="style-asunto">
                  Expediente:{" "}
                  {documentoExpediente?.DatosExpediente?.Asunto != null
                    ? documentoExpediente?.DatosExpediente?.Asunto
                    : "ASUNTO"}
                </span>

                <br />
                <hr className="style1" />
                <br />
                {listDocumentoExpediente != undefined ? (
                  listDocumentoExpediente
                    .filter((doc) => doc?.NombreArchivo != "")
                    .map((docExp: Documento, index: number) => (
                      <>
                        <div className="d-flex justify-content-around">
                          <div className="col-10" key={index}>
                            <span className="style-asunto-documento">
                              {docExp?.NombreArchivo}
                            </span>
                          </div>
                          <div className="d-flex justify-content-center col-2">
                            <div className="style-div-botones">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  visualizar(docExp?.Guid);
                                }}
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                            </div>
                            <div className="style-div-botones">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  descargar(
                                    docExp?.Guid,
                                    docExp?.NombreArchivo
                                  );
                                }}
                              >
                                <i className="bi bi-download"></i>
                              </button>
                            </div>
                            {url != null ? (
                              <ModalDocumento
                                url={url}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </>
                    ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </body>
      </div>
      <footer className="footer" style={{ backgroundColor: "#f7f7f7" }}>
        <span className="d-flex justify-content-center">Ⓒ 2023 - ELSE</span>
      </footer>
    </div>
  );
}
