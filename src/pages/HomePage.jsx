import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Highlight from "../components/core/HomePage/Highlight";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

export default function HomePage() {
  return (
    <div>
      {/* section 1 */}

      <div className="relative mx-auto flex w-[90%] max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <div className="group mt-16 p-1 mx-auto rounded-full bg-[#161D29] font-bold text-[#999DAA] w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
          <Link to="/signup">
            <div className="flex flex-row  items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-[#000814]">
              <p>Become an Instructor </p>
              <FaArrowRight />
            </div>
          </Link>
        </div>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <Highlight text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[65%] text-center text-lg font-bold text-[#838894]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-[#118AB2] w-[80%]">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src="/banner.mp4" type="video/mp4" />
          </video>
        </div>

        {/* code section 1*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <Highlight text={"coding potential"} /> with our online courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/login",
              active: false,
            }}
            codeColor={"text-[#FFE83D]"}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n<a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>
        {/* code section 2*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <Highlight text={"coding in seconds"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/login",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
        <ExploreMore />
      </div>

      {/* section 2 */}

      <div className="bg-[#F9F9F9] text-[#2C333F]">
        <div className="homepage_bg h-[333px]">
          <div className="w-[90%] max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[200px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
        <div className="mx-auto w-[90%] max-w-maxContent flex flex-col items-center justify-between gap-5">
          <div className="flex flex-row mb-10 ml-[100px] mt-[95px] gap-5">
            <div className="text-[36px] font-bold lg:w-[45%] ">
              Get the skills you need for a
              <Highlight text={"job that is in demand."} />
            </div>
            <div className="flex flex-col gap-10 items-start w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>
      {/* section 3 */}
      <div className="w-[90%] mx-auto max-w-maxContent flex-col flex items-center justify-between gap-5 text-white bg-[#000814]">
        <InstructorSection />
        <h2 className="text-center text-[36px] font-semibold mt-10">
          Review from other Learners
        </h2>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
