import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSection, updateSection } from "../../../../../services/operations/CourseDetailsApi";
import { setCourse } from "../../../../../slice/courseSlice";

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false);
  };

  return <div></div>;
}
