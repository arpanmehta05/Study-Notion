import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  setFile,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setValue(name, file);
      if (setFile) {
        setFile(file);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    onClick: viewData ? true : false,
    noKeyboard: viewData ? true : false,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: !viewData && !editData });
  }, [register, name, viewData, editData]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#f1f2ff]" htmlFor={name}>
        {label} {!viewData && <sup className="text-[#EF476F]">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-[#585D69]`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="w-full h-auto rounded-md"
              />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-[#6E727F] underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} className="hidden" />
            <div
              className="grid aspect-square w-14 place-items-center rounded-full bg-[#171717] cursor-pointer"
            >
              <FiUploadCloud className="text-[#FFD60A] text-2xl" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-[#999DAA]">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span
                className="font-semibold text-[#FFD60A] cursor-pointer"
                onClick={open}
              >
                Browse
              </span>{" "}
              a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-[#999DAA]">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
          {label} is required
        </span>
      )}
    </div>
  );
}
