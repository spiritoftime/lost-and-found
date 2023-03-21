import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/appContext";
export default function useIsEditing() {
  const { pathname } = useLocation();
  const { report, setReport, authDetails } = useAppContext();
  useEffect(() => {
    setReport({
      uid: authDetails.uid,
      username: authDetails.username,
      reportType: "",
      petName: "",
      respondsTo: "",
      gender: "",
      category: "",
      lastSeen: "",
      contactNumber: "",
      microChipNumber: "",
      description: "",
      imageURL: "",
      isEditing: false,
    });
  }, []);

  return null;
}
