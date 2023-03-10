import React from "react";
import FormLabel from "../../components/FormLabel";
import RoundButton from "../../components/RoundButton";
import SquareFormInput from "../../components/SquareFormInput";
import retriever from "../../images/golden-retriever.jfif";
import google from "../../images/google__icon.png";
import OrDivider from "./OrDivider";
import { useForm } from "react-hook-form";
import { YupAuthSchema } from "./YupAuthSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAppContext } from "../../context/appContext";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(YupAuthSchema) });
  const db = getDatabase();
  const { setAuthDetails } = useAppContext();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setAuthDetails({
          uid: user.uid,
          profileUrl: user.photoURL,
          username: user.displayName,
        });
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          profileUrl: user.photoURL,
        });
        navigate("/profile");
      })
      .catch((error) => {
        console.log("failed to login", error);
      });
  };

  const SignUpWithEmailAndPassword = (e) => {
    createUserWithEmailAndPassword(auth, e.email, e.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setAuthDetails({
          uid: user.uid,
          username: user.email,
        });
        set(ref(db, "users/" + user.uid), {
          username: user.email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
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
            noValidate
            onSubmit={handleSubmit(SignUpWithEmailAndPassword)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor={"email"} label="Email" />
              <SquareFormInput
                register={register}
                errors={errors}
                id="email"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor={"password"} label="Password" />
              <SquareFormInput
                register={register}
                errors={errors}
                id="password"
                type="password"
              />
            </div>
            <RoundButton type="submit" bgColorClass="bg-indigo-600">
              Sign Up
            </RoundButton>
          </form>
          <div className="mx-auto flex gap-2">
            <p>Existing User?</p>
            <a
              href="login"
              className="cursor-pointer text-rose-500 decoration rose-500 underline underline-offset-4 font-medium"
            >
              Login Now!
            </a>
          </div>
        </div>
        <img
          alt="happy golden retriever"
          className=" object-cover"
          src={retriever}
        />
      </div>
    </div>
  );
};

export default Register;
