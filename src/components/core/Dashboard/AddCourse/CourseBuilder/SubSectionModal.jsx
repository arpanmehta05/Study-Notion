import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { RxCross2 } from "react-icons/rx";
import { setCourse } from "../../../../../slice/courseSlice";
import { toast } from "react-hot-toast";
import Upload from "../Upload";
import {
  createSubSection,
  updatesubSection,
} from "../../../../../services/operations/CourseDetailsApi";

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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoChanged, setVideoChanged] = useState(false);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.lectureTitle !== modalData.title ||
      currentValue.lectureDescription !== modalData.description ||
      selectedVideo
    ) {
      return true;
    }
    return false;
  };

  const handleVideoSelect = (file) => {
    setSelectedVideo(file);
    setVideoChanged(true);
  };

  const handleEditSubsection = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("title", getValues("lectureTitle"));
    formData.append("description", getValues("lectureDescription"));
    if (selectedVideo) {
      formData.append("video", selectedVideo);
    }
    const result = await updatesubSection(formData, token);
    
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) => 
        section._id === modalData.sectionId ? result : section
      );
      
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;
    
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
      } else {
        handleEditSubsection();
      }
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("sectionId", modalData);
      formData.append("title", data.lectureTitle);
      formData.append("description", data.lectureDescription);
      formData.append("video", data.lectureVideo);
      setLoading(true);
      const result = await createSubSection(formData, token);
      if (result) {
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        );
        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
      }
    } catch (error) {
      console.error("Error creating subsection:", error);
      toast.error("Failed to create subsection");
    } finally {
      setModalData(null);
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-[#6E727F] bg-[#161D29]">
        <div className="flex items-center justify-between rounded-t-lg bg-[#2C333F] p-5">
          <p className="text-xl font-semibold text-[#f1f2ff]">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-[#f1f2ff]" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
            setFile={handleVideoSelect}
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-[#f1f2ff]" htmlFor="lectureTitle">
              Lecture Title {!view && <sup className="text-[#EF476F]">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Entre Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="form-style w-full"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
                Lecture Title is required
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="lectureDescription"
              className="text-sm text-[#f1f2ff]"
            >
              Lecture Description{" "}
              {!view && <sup className="text-[#EF476F]">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDescription"
              placeholder="Enter Lecture Description"
              {...register("lectureDescription", { required: true })}
              className="form-style resize-none min-h-[130px] w-full"
            />
            {errors.lectureDescription && (
              <span className="ml-2 text-xs tracking-wide text-[#EF476F]">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                disabled={loading}
                text={loading ? "loading.." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}