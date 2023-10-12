/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import "./cvd.css";
import CvdService from "../services/CvdService";
import { useEffect, useState } from "react";
import { DocumentoExpediente, Documento } from "../models/documentos";
import ModalDocumento from "./modalDocumento";
import { axiosDownloadFile, axiosFile } from "../http-common";

export default function Expediente() {
  const params = useParams();
  const [documentoExpediente, setDocumentoExpediente] =
    useState<DocumentoExpediente>({} as DocumentoExpediente);
  const [url, setUrl] = useState<any>();
  const [CVD, setCVD] = useState(params.id);
  const [listDocumentoExpediente, setListDocumentoExpediente] = useState<
    Documento[]
  >([]);
  const [modalShow, setModalShow] = useState(false);
  const getDocumentoExpediente = (id: string) => {
    CvdService.getDocumentoExpedienteCVD(id)
      .then((response: any) => {
        setDocumentoExpediente(response.data[0]);
      })
      .catch((e: Error) => {
        setDocumentoExpediente({} as DocumentoExpediente);
        console.log(e);
      });
  };
  const descargar = (id: any, nombre: string) => {
    axiosDownloadFile(
      "http://localhost:9302/mgd/DownloadFile?guid=" + id,
      nombre
    );
  };
  const visualizar = (id: any) => {
    setModalShow(true);
    axiosFile("http://localhost:9302/mgd/DownloadFile?guid=" + id).then(
      (response: any) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        setUrl(fileURL);
      }
    );
  };
  useEffect(() => {
    if (CVD) {
      if (listDocumentoExpediente?.length == 0) {
        getDocumentoExpediente(CVD);
      }
      setListDocumentoExpediente(documentoExpediente?.Documentos);
    }
  });

  return (
    <div>
      <div
        className="w-75 mx-auto d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#dcdddf" }}
      >
        <body>
          <div
            className="d-flex row justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div
              className="row col-12 justify-content-center"
              style={{ marginTop: "-250px" }}
            >
              <span className="d-flex justify-content-center style-span">
                Servicio de Verificación de Representaciones Impresas
              </span>
              <span className="d-flex justify-content-center style-span">
                Visor de Expedientes
              </span>
              <img
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
                    .map((docExp: Documento) => (
                      <>
                        <div className="d-flex justify-content-around">
                          <div className="col-10">
                            <span className="style-asunto-documento">
                              {docExp?.NombreArchivo}
                            </span>
                          </div>
                          <div className="d-flex justify-content-center col-2">
                            <button
                              type="button"
                              className="btn  btn-secondary p3 ml-5"
                              onClick={() => {
                                visualizar(docExp?.Guid);
                              }}
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              type="button"
                              className="btn  btn-success p3 ml-5"
                              onClick={() => {
                                descargar(docExp?.Guid, docExp?.NombreArchivo);
                              }}
                            >
                              <i className="bi bi-download"></i>
                            </button>
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
