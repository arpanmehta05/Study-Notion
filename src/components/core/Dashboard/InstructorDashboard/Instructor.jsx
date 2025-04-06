import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/CourseDetailsApi";
import { getInstructorData } from "../../../../services/operations/ProfileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const instructorApiData = await getInstructorData(token);
        const result = await fetchInstructorCourses(token);
        if (instructorApiData?.length) {
          setInstructorData(instructorApiData);
        }
        if (result) {
          setCourses(result);
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);


  // dummy data for testing

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const instructorApiData = await getInstructorData(token);
  //       const result = await fetchInstructorCourses(token);
  //       if (!instructorApiData?.length) {
  //         const dummyData = [
  //           {
  //             _id: "1",
  //             courseName: "React Course",
  //             totalStudentsEnrolled: 25,
  //             totalAmountGenerated: 12500
  //           },
  //           {
  //             _id: "2",
  //             courseName: "Node.js Basics",
  //             totalStudentsEnrolled: 15,
  //             totalAmountGenerated: 7500
  //           }
  //         ];
  //         setInstructorData(dummyData);
  //       } else {
  //         setInstructorData(instructorApiData);
  //       }
        
  //       if (result) {
  //         setCourses(result);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching instructor data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudent = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#f1f2ff]">
          Hi {user?.firstName}
        </h1>
        <p className="font-medium text-[#999DAA]">Let's Start something new</p>
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="flex h-[400px] lg:w-3/4">
              {instructorData && instructorData.length > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md p-6 bg-[#161D29]">
                  <p className="text-lg font-bold text-[#f1f2ff]">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-[#C5C7D4]">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex min-w-[250px] flex-col rounded-md bg-[#161D29] p-6 lg:w-1/4">
              <p className="text-lg font-bold text-[#f1f2ff]">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-[#999DAA]">Total Courses</p>
                  <p className="text-3xl font-semibold text-[#f1f2ff]">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#999DAA]">Total Students</p>
                  <p className="text-3xl font-semibold text-[#f1f2ff]">
                    {totalStudent}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-[#999DAA]">Total Income</p>
                  <p className="text-3xl font-semibold text-[#f1f2ff]">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 rounded-md bg-[#161D29] p-6">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-[#f1f2ff]">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-[#FFD60A]">View All</p>
              </Link>
            </div>
            <div>
              {courses.slice(0, 3).map((course) => {
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[201px] w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-[#C5C7D4]">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-[#838894]">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-[#838894]">|</p>
                      <p className="text-xs font-medium text-[#838894]">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-[161D29] p-6 py-20">
          <p className="text-center text-2xl font-bold text-[#f1f2ff]">
            You have not created any courses yet
          </p>
          <Link to={"/dashboard/add-course"}>
            <p className="mt-1 text-center text-lg font-semibold text-[#FFD60A]">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
