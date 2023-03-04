import React from "react";
import { Form } from "react-router-dom";
import FormLabel from "../../components/FormLabel";
import RoundButton from "../../components/RoundButton";
import SquareFormInput from "../../components/SquareFormInput";
import retriever from "../../images/golden-retriever.jfif";
import google from "../../images/google__icon.png";
import OrDivider from "./OrDivider";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { YupLoginSchema } from "./YupLoginSchema";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAppContext } from "../../context/appContext";
import { getDatabase, ref, set } from "firebase/database";
const Login = () => {
  const db = getDatabase();
  const { setAuthDetails } = useAppContext();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setAuthDetails({
          userUID: user.uid,
          profileUrl: user.photoURL,
          name: user.displayName,
        });
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          profileUrl: user.photoURL,
        });
      })
      .catch((error) => {
        console.log("failed to login", error);
      });
  };
  const loginWithEmailAndPassword = () => {};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex max-w-[600px]">
        <div className="flex flex-col gap-4 pr-4">
          <h2 className="font-bold text-lg">
            Join us in trying to reunite lost pets with their loving families
            today!
          </h2>
          <RoundButton
            onClick={signInWithGoogle}
            borderColorClass="border-[#343A40]"
          >
            <img className="w-[21px] h-[21px]" src={google} alt="" />
            Sign in with Google
          </RoundButton>
          <OrDivider />
          <form
            onSubmit={loginWithEmailAndPassword}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor={"email"} label="Email" />
              <SquareFormInput id="email" type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor={"password"} label="password" />
              <SquareFormInput id="password" type="password" />
            </div>
            <RoundButton bgColorClass="bg-[#FCC419]">Login</RoundButton>
          </form>
          <div className="mx-auto flex gap-2">
            <p>New User?</p>
            <a
              href="signup"
              className="cursor-pointer text-rose-500 decoration rose-500 underline underline-offset-4 font-medium"
            >
              Sign Up Now!
            </a>
          </div>
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
