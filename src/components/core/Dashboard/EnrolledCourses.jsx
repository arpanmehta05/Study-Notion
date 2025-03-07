import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../../../services/operations/ProfileAPI";
import ProgressBar from "@ramonak/react-progress-bar";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolled = async () => {
    try {
      const res = await getEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEnrolled();
  }, []);
  return (
    <>
      <div className="text-3xl text-[#C5C7D4]">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-[#f1f2ff]">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-[#f1f2ff]">
          <div className="flex rounded-t-lgbg-[#585D69]">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border border-[#2C333F] ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?.id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-[#838894]">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
