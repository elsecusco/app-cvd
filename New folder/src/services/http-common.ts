/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { environment as env } from "../environments/environment";

export default axios.create({
  baseURL: env.base_url,
  headers: {
    "Content-type": "application/json",
  },
});

export function axiosDownloadFile(url: any, name: string) {
  return axios({
    url,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const href = window.URL.createObjectURL(response.data);

      const anchorElement = document.createElement("a");

      anchorElement.href = href;
      anchorElement.download = name;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    })
    // .catch((error) => {
    //   console.log("error: ", error);
    // });
}

export function axiosFile(url: any) {
  return axios({
    url,
    method: "GET",
    responseType: "blob", //Force to receive data in a Blob Format
  });
}
