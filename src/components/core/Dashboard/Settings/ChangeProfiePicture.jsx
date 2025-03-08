import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ChangeProfiePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imagefile, setImagefile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagefile(file);
      previewFile(file);
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    if (!imagefile) {
      toast.error("Please select an image file before uploading.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("displayPicture", imagefile);
      dispatch(updateDisplayPicture(token, formData))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Upload error:", error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error in handleFileUpload:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imagefile) {
      previewFile(imagefile);
    }
  }, [imagefile]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-8 px-12 text-[#f1f2ff]">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />

          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                className="cursor-pointer rounded-md bg-[#2C333F] py-2 px-5 font-semibold text-[#C5C7D4]"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                disabled={loading}
              >
                {!loading && <FiUpload className="text-lg text-[#000814]" />}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
