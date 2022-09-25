import request from "./request.util";

const downloadFile = (url, filename = "") => {
  request
    .get(`${url}?fileName=${filename}`, { responseType: "blob" })
    .then((response) => {
      const blob = new Blob([response.data]);
      const tempLink = document.createElement("a");
      const href = window.URL.createObjectURL(blob);
      //filename
      const fileName = decodeURI(
        response.headers["content-disposition"].split("filename=")[1],
      );
      tempLink.href = href;
      tempLink.target = "_blank";
      tempLink.download = fileName;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(href);
    });
};

export default downloadFile;
