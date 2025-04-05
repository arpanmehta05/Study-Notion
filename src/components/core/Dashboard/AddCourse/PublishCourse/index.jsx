import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
  setStep,
  resetCourse,
  setEditCourse,
} from "../../../../../slice/courseSlice";
import { editCourseDetails } from "../../../../../services/operations/CourseDetailsApi";

export default function index() {
  const { register, handleSubmit,getValues, setValue } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourse = () => {
    dispatch(resetCourse());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourse();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourse();
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-6">
      <p className="text-2xl font-semibold text-[#f1f2ff]">Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">
          <lable htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkBox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-[#585D69] text-[#6E727F] focus:ring-2 focus:ring-[#f1f2ff]"
            />
            <span className="ml-2 text-[#6E727F]">
              Make this course as public
            </span>
          </lable>
        </div>
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-[8px] px-[20px] font-semibold text-[#000814]"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
}
