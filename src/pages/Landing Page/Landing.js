import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import hero1 from "../../images/hero-image-01.jpg";
import hero2 from "../../images/hero-image-02.jpg";
import hero3 from "../../images/hero-image-03.jpg";

const heroImages = [hero1, hero2, hero3];
const rules = [
  "Strictly lost and found cases only",
  "No solicitation of business",
  "No bullying other members",
  "Avoid repeat posts or reposting",
];
const ruleDetail = [
  "Please report adoption cases on other platforms/groups",
  "Unless directly related to lost and found incidences",
  "This includes making comments that may make finders feel attacked or have done the wrong thing by contacting AVS or SPCA. Especially no other alternatives are available.",
  "Please post responsibly and avoid repeated posts. Also avoid reposting within group, as it may be removed. Please share group posts on your own wall or with other groups instead to reach more people.",
];

const Landing = () => {
  const ChevronLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-8 h-8"
    >
      <path
        fill-rule="evenodd"
        d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
        clip-rule="evenodd"
      />
    </svg>
  );

  const ChevronRight = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-8 h-8"
    >
      <path
        fill-rule="evenodd"
        d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
        clip-rule="evenodd"
      />
    </svg>
  );

  const { test } = useAppContext();

  const [hero, setHero] = useState(heroImages);
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    console.log("nextSlide");
    setCurrentImage((oldImage) => {
      const result = (oldImage + 1) % hero.length;
      return result;
    });
  };

  const prevSlide = () => {
    setCurrentImage((oldImage) => {
      const result = (oldImage - 1 + hero.length) % hero.length;
      return result;
    });
  };

  return (
    <>
      <div className=" w-full overflow-x-hidden  md:h-224 relative  ">
        {hero.map((image, index) => {
          return (
            <article>
              <img
                key={index}
                style={{
                  transform: `translateX(${100 * (index - currentImage)}% )`,
                }}
                className=" hidden md:block  duration-300 absolute next-slide top-0 w-full h-full"
                src={image}
              ></img>
            </article>
          );
        })}
        <div className="w-full h-fit p-10 bg-indigo-500">
          <h5 className="text-center text-white font-bold">Pet SOS</h5>
        </div>

        <button
          onClick={prevSlide}
          className="hidden md:block rounded-md absolute   left-0 top-0 bottom-0 ml-5 p-5 grid content-center my-auto h-20 bg-slate-400  "
        >
          {ChevronLeft}
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block rounded-md absolute right-0  top-0 bottom-0 mr-5 p-5 grid content-center my-auto mb-auto h-20 bg-slate-400 "
        >
          {ChevronRight}
        </button>
      </div>

      <div className="text-5xl  h-full  p-10   bg-slate-200">
        <h1>Community Rules </h1>
        <div className="mt-10      grid xs:grid-cols-1 md:grid-cols-4     gap-5     ">
          {rules.map((rule, index) => {
            return (
              <div
                key={index}
                className="       p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <h5 className="mb-5 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {rule}
                  </h5>
                </a>
                <p className="mb-3 text-xs  md:text-xl font-normal text-gray-500 dark:text-gray-400">
                  {ruleDetail[index]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Landing;
