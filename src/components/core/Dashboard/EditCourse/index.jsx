import React, { useEffect, useState } from "react";
import RenderSteps from "../AddCourse/RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsofCourse } from "../../../../services/operations/CourseDetailsApi";
import { setCourse, setEditCourse } from "../../../../slice/courseSlice";

export default function index() {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {courseId} = useParams();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const result = await getFullDetailsofCourse(courseId, token);
        if (Array.isArray(result) && result.length > 0) {
          dispatch(setCourse(result[0]));
          dispatch(setEditCourse(true));
        } else if (result) {
          dispatch(setCourse(result));
          dispatch(setEditCourse(true));
        } else {
          console.error("No course data found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, token, dispatch]);

  if(loading)
  {
    return(
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-[#f1f2ff]">Edit Course</h1>
      <div>
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-[#AFB2BF]">
            Course Not Found
          </p>
        )}
      </div>
    </div>
  );
}
