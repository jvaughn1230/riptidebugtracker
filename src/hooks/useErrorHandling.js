import { useState } from "react";
import { toast } from "react-toastify";

const useErrorHandling = () => {
  const [errMsg, setErrMsg] = useState("");

  const handleErrors = (err, customErrMsg) => {
    if (!err.response) {
      setErrMsg("No Server Response");
      toast.error("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Please fill in required fields");
      toast.error("Please fill in all required fields");
    } else {
      setErrMsg("Failed to add Project");
      toast.error(customErrMsg);
    }
  };

  return { errMsg, handleErrors, setErrMsg };
};

export default useErrorHandling;
