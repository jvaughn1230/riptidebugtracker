import React, { useState } from "react";
import { useRegisterMutation } from "../redux/authApi";

export const useSignup = () => {
  const [error, isError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
};
