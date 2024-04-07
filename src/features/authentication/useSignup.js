import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account successfully created");
    },
    onError: (error) => {
      console.error(error);
      // toast.error("Error signing up user. Please try again.");
    },
  });

  return { signup, isLoading };
}
