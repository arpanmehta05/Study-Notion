import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Course_Card from "./Course_Card";

export default function CourseSlider({ course }) {
  return (
    <>
      {course?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {course.map((courses, i) => {
            <SwiperSlide key={i}>
              <Course_Card course={courses} Height={"h-[250px]"} />
            </SwiperSlide>;
          })}
        </Swiper>
      ) : (
        <p className="text-xl text-[#f1f2ff]">No Course Found</p>
      )}
    </>
  );
}
