import { toast } from "react-toastify";

type Props = {
  message: string;
  type: "info" | "success" | "warning" | "error" | "default";
};

export const Toast = (props: Props) => {
  return toast(props.message, {
    hideProgressBar: true,
    autoClose: 1000,
    type: props.type,
  });
};
