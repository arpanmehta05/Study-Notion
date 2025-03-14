import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/CourseDetailsApi";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import Upload from "../Upload";
import ChipInput from "./ChipInput";
import RequiremntFeild from "./RequiremntFeild";
import { setCourse, setStep } from "../../../../../slice/courseSlice";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function CourseInformation() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      setValue("CourseTitle", course.courseName);
      setValue("CourseShortDesc", course.Description);
      setValue("CoursePrice", course.price);
      setValue("CourseTags", course.tag);
      setValue("CourseBenefits", course.whatYouWillLearn);
      setValue("CourseCategory", course.category);
      setValue("CourseRequirements", course.instructions);
      setValue("CourseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.CourseTitle !== course.courseName ||
      currentValues.CourseShortDesc !== course.Description ||
      currentValues.CoursePrice !== course.price ||
      currentValues.CourseTags.toString() !== course.tag.toString() ||
      currentValues.CourseBenefits !== course.whatYouWillLearn ||
      currentValues.CourseCategory._id !== course.category._id ||
      (currentValues.CourseRequirements.toString() !==
        course.instructions.toString() &&
        currentValues.CourseImage !== course.thumbnail)
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.CourseTitle !== course.courseName) {
          formData.append("courseName", data.CourseTitle);
        }
        if (currentValues.CourseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.CourseShortDesc);
        }
        if (currentValues.CoursePrice !== course.price) {
          formData.append("price", data.CoursePrice);
        }
        if (currentValues.CourseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.CourseTags));
        }
        if (currentValues.CourseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.CourseBenefits);
        }
        if (currentValues.CourseCategory._id !== course.category._id) {
          formData.append("category", data.CourseCategory._id);
        }
        if (
          currentValues.CourseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.CourseRequirements)
          );
        }
        if (currentValues.CourseImage !== course.thumbnail) {
          formData.append("thumbnail", data.CourseImage[0]);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made");
      }
      return;
    }
    const formData = new FormData();
    formData.append("courseName", data.CourseTitle);
    formData.append("courseDescription", data.CourseShortDesc);
    formData.append("price", data.CoursePrice);
    formData.append("tag", JSON.stringify(data.CourseTags));
    formData.append("whatYouWillLearn", data.CourseBenefits);
    formData.append("category", data.CourseCategory._id);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.CourseRequirements));
    formData.append("thumbnail", data.CourseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-[#2C333F] bg-[#161D29] p-6"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f1f2ff]" htmlFor="CourseTitle">
          Course Title <sup className="text-[#EF476F]">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="text-[#EF476F] text-xs">This field is required</span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-[#f1f2ff]">
          Course Short Description <sup className="text-[#EF476F]">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDescription", { required: true })}
          className="form-style min-h-[130px] w-full resize-none"
        />
        {errors.courseShortDescription && (
          <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
            Course Description is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f1f2ff]" htmlFor="coursePrice">
          Course Price <sup className="text-[#EF476F]">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-[#6E727F]" />
        </div>
        {errors.coursePrice && (
          <span className="text-[#EF476F] ml-2 text-xs tracking-wide">
            This field is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f1f2ff]">
          Course Category <sup className="text-[#EF476F]">*</sup>
        </label>
        <select
          {...register("category", { required: true })}
          className="form-style w-full"
          id="category"
          defaultValue={""}
        >
          <option disabled value="">
            Choose a category
          </option>
          {!loading &&
            categories?.map((category, idx) => (
              <option key={idx} value={category.id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
            Course Category is required
          </span>
        )}
      </div>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f1f2ff]" htmlFor="courseBenifts">
          Benefits of this course <sup className="text-[#EF476F]">*</sup>
        </label>
        <textarea
          id="coursBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-none min-h-[130px]"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
            This field is required
          </span>
        )}
      </div>
      <RequiremntFeild
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-[#838894] py-[8px] px-[20px] font-semibold text-[#000814]"
            disabled={loading}
            onClick={() => dispatch(setStep(2))}
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
