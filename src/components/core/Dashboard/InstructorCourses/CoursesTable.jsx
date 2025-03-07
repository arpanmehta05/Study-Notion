import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/CourseDetailsApi";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { setCourse, setEditCourse } from "../../../../slice/courseSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { COURSE_STATUS } from "../../../../utils/constants";
import Confirmation from "../../../common/Confirmation";
// import { formatDate } from "../../../../services/formatDate"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confiirmationModal, setconfiirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setconfiirmationModal(null);
    setLoading(false);
  };
  return (
    <div>
      <Table className="rounded-xl border border-[#161D29] ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-[#161D29] px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Courses
            </Th>
            <Th className="flex-1 text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Duration
            </Th>
            <Th className="flex-1 text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Price
            </Th>
            <Th className="flex-1 text-left text-sm font-medium uppercase text-[#AFB2BF]">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-[#AFB2BF]">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-[#161d29] px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-[#f1f2ff]">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-[#838894]">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-[#2C333F] px-2 py-[2px] text-[12px] font-medium text-[#F37290]">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-[#E7C009]">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E7C009] text-[#2C333F]">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-[#AFB2BF]">
                  2hr 30min
                </Td>
                <Td className="text-sm font-medium text-[#AFB2BF]">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-[#AFB2BF]">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-[#05A77B]"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setconfiirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setconfiirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confiirmationModal && <Confirmation modalData={confiirmationModal} />}
    </div>
  );
}
