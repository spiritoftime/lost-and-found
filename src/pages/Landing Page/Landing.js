import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import hero1 from "../../images/hero-image-01.jpg";
import hero2 from "../../images/hero-image-02.jpg";
import hero3 from "../../images/hero-image-03.jpg";


const heroImages=[hero1,hero2,hero3]
const rules = ["Strictly lost and found cases only", "No solicitation of funds for any cases", "No bullying other members", "Avoid repeat posts or reposting"]

 
const Landing = () => {


  const ChevronLeft= <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
<path fill-rule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
</svg>

const ChevronRight= <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
<path fill-rule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clip-rule="evenodd" />
</svg>

  const { test } = useAppContext();

  const [hero,setHero] = useState(heroImages)
  const [currentImage,setCurrentImage] = useState(0)
 

 
  const nextSlide = ()=>{
    console.log("nextSlide")
    setCurrentImage((oldImage)=>{
      const result = (oldImage+1) % hero.length
      return result
    })

  }

  const prevSlide = ()=>{
    setCurrentImage((oldImage)=>{
      const result = (oldImage-1 +hero.length) % hero.length
      return result
    })

  }
   
  return <div className=" w-full  h-fit    overflow-x-hidden " >
    
    <div className=" w-full h-224 relative  " >

    {hero.map((image,index)=>{
      return <article>
      <img key={index} style={{transform:`translateX(${100*(index-currentImage)}% )`}} className=" duration-300 absolute next-slide top-0 w-full h-full" src={image}></img>
      </article>
    })}
 
    
   
      
    
 
    <button onClick={prevSlide} className="rounded-md absolute   left-0 top-0 bottom-0 ml-5 p-5 grid content-center my-auto h-20 bg-slate-400  " >
      {ChevronLeft}
    </button>
    <button onClick={nextSlide} className="rounded-md absolute right-0  top-0 bottom-0 mr-5 p-5 grid content-center my-auto mb-auto h-20 bg-slate-400 "  >
      {ChevronRight}
    </button>  
    </div>
    <div>
    <div className="text-5xl p-10 bg-slate-200">

      <h1>Community Rules </h1>
      <div className="mt-10 flex flex-row flex-wrap gap-20 justify-center ">
      {rules.map((rule,index)=>{
        return (
        <div key={index} className="mb-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <svg className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
        <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{rule}</p>
         
    </div>)
      })}
    </div>
      
    </div>
    
    </div>
    
    
    </div>
};

export default Landing;
