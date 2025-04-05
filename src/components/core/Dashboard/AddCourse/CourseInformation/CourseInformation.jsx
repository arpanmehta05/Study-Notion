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
    setValue("courseRequirements", []);
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDescription", course.Description);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("category", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDescription !== course.Description ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags?.toString() !== course.tag?.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.category?._id !== course.category?._id ||
      currentValues.courseRequirements?.toString() !==
        course.instructions?.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDescription);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags?.toString() !== course.tag?.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.category?._id !== course.category?._id) {
          formData.append("Category", data.category);
        }
        if (
          currentValues.courseRequirements?.toString() !==
          course.instructions?.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage[0]);
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
    } else {
      try {
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDescription);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("Category", data.category);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        if (data.courseImage instanceof File) {
          formData.append("thumbnail", data.courseImage);
        } else if (data.courseImage instanceof FileList) {
          formData.append("thumbnail", data.courseImage[0]);
        } else if (Array.isArray(data.courseImage) && data.courseImage[0]) {
          formData.append("thumbnail", data.courseImage[0]);
        } else {
          toast.error("Invalid thumbnail format");
          return;
        }
  
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } catch (error) {
        console.error("Course creation error:", error);
        toast.error("Failed to create course");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-[#2C333F] bg-[#161D29] p-4"
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-[#f1f2ff]" htmlFor="courseTitle">
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
              <option key={idx} value={category._id}>
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
        <label className="text-sm text-[#f1f2ff]" htmlFor="courseBenefits">
          Benefits of this course <sup className="text-[#EF476F]">*</sup>
        </label>
        <textarea
          id="courseBenefits"
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
            type="button"
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
          type="submit"
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
}
