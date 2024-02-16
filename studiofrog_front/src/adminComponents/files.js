import "../css/files.css";
import React from "react";
import { useParams } from "react-router-dom";
const Files = () => {
  const { id } = useParams();
  const extension = id.split(".").pop();
  return (
    <div className="files">
      {extension === "pdf" ? (
        <embed src={`/contactFiles/${id}`} type="application/pdf" />
      ) : (
        <img src={`/contactFiles/${id}`} alt="" />
      )}
    </div>
  );
};

export default Files;
