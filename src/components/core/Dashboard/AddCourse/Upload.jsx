import React from "react";
import "video-react/dist/video-react.css";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  return <div></div>;
}
