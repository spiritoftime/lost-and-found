import { useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const useDrop = (cb, schema, defaultValues, name) => {
  const {
    register,
    handleSubmit,
    setValue,
    unregister,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // change to accept a schema and default values
    defaultValues: defaultValues,
  });

  const onDrop = useCallback(cb, []);
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/avif": [".avif"],
      },
      noKeyboard: true,
    });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return {
    getInputProps,
    errors,
    getRootProps,
    register,
    handleSubmit,
    fileRejections,
    setValue,
  };
};

export default useDrop;
