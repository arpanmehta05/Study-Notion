import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/ApiConnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Error from "./Error";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

export default function Catalog() {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogePageData, setCatalogePageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [invalidCategory, setInvalidCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        if (!response?.data?.data || response.data.data.length === 0) {
          console.error("No categories found");
          setInvalidCategory(true);
          return;
        }
        const filteredCategories = response.data.data.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );
        if (filteredCategories.length > 0) {
          setCategoryId(filteredCategories[0]._id);
        } else {
          console.error("No matching category found for:", catalogName);
          setInvalidCategory(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setInvalidCategory(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setIsLoading(true);
        const res = await getCatalogaPageData(categoryId);
        setCatalogePageData(res);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);
  if (invalidCategory) {
    return <Error />;
  }
  if (isLoading || !catalogePageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!catalogePageData.success) {
    return <Error />;
  }

  return (
    <>
      <div className="box-content bg-[#161D29] px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-[#838894]">
            {`Home / Catalog / `}
            <span className="text-[#FFE83D]">
              {catalogePageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-[#f1f2ff]">
            {catalogePageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-[#999DAA]">
            {catalogePageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-[#f1f2ff] lg:text-4xl">
          Courses to get you started
        </div>
        <div className="my-4 flex border-b border-b-[#424854] text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-[#FFE83D] text-[#FFE83D]"
                : "text-[#C5C7D4]"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            course={catalogePageData?.data?.selectedCategory?.course}
          />
        </div>
      </div>

      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-2xl font-bold text-[#f1f2ff] lg:text-4xl">
          Top Courses in {catalogePageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            course={catalogePageData?.data?.differentCategory?.course}
          />
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold text-[#f1f2ff] lg:text-4xl">
          Frequently Bought
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogePageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
