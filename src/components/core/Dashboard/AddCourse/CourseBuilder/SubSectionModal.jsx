import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { RxCross2 } from "react-icons/rx";
import { setCourse } from "../../../../../slice/courseSlice";
import { toast } from "react-hot-toast";
import Upload from "../Upload";

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const idFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.lectureTitle !== modalData.title ||
      currentValue.lectureDescription !== modalData.description ||
      currentValue.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  const handleEditSubsection = async () => {
    const currentValue = getValues();
    const formData = new FormData();
    formData.append("title", "123");
    console.log("formData", formData);
  }
  return <div></div>;
}
