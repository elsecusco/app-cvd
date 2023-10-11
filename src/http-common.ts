import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9302/mgd/",
  headers: {
    "Content-type": "application/json"
  }
});