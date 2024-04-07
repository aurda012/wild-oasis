import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ avatar, fullName, password }) =>
      updateCurrentUser({ avatar, fullName, password }),
    onSuccess: ({ user }) => {
      toast.success("Account successfully updated!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
}
