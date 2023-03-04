import React from "react";
import retriever from "../../images/golden-retriever.jfif";
import google from "../../images/google__icon.png";
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex max-w-[600px]">
        <div className="flex flex-col gap-4 pr-4">
          <h2 className="font-bold text-lg">
            Join us in trying to reunite lost pets with their loving families
            today!
          </h2>
          <button className="flex items-center justify-center gap-2 rounded-[30px] border-2 px-2 py-2 border-[#343A40]">
            <img className="w-[21px] h-[21px]" src={google} alt="" />
            Sign in with Google
          </button>
          <div className="flex gap-2 text-[#868E96] items-center">
            <div className="w-6/12 border-b-2 border-[#868E96]" />
            <p>OR</p>
            <div className="w-6/12 border-b-2 border-[#868E96]" />
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-black">
                Email
              </label>
              <input
                className=" w-full border-black border-2"
                type="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-black">
                Password
              </label>
              <input
                className="w-full border-black border-2"
                type="email"
                id="password"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-[30px] border-2 px-2 py-2 bg-[#FCC419]">
              Sign up now!
            </button>
          </form>
        </div>
        <img
          alt="happy golden retriever"
          className="aspect-square"
          src={retriever}
        />
      </div>
    </div>
  );
};

export default Login;
