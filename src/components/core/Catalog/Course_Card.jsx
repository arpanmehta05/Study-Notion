import React, { useEffect, useState } from "react";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";

export default function Course_Card({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnai"
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-[#f1f2ff]">{course?.courseName}</p>
            <p className="text-sm text-[#C5C7D4]">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#FFF970]">{avgReviewCount || 0}</span>
              <RatingStars ReviewCount={avgReviewCount} />
              <span className="text-[#6E727F]">
                {course?.ratingAndReviews?.length}Ratings{" "}
              </span>
              <p className="text-xl text-[#f1f2ff]">Rs. {course?.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
