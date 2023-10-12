/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useEffect, useState } from "react";

export default function ModalDocumento(props: any) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [url, setUrl] = useState<any>();

  useEffect(() => {
    setUrl(props.url);
  });
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div
            style={{
              height: "750px",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {url != null ? (
              <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
            ) : (
              <></>
            )}
          </div>
        </Worker>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
