import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { fetchInstructorCourses } from "../../../services/operations/CourseDetailsApi";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-[#f1f2ff]">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
