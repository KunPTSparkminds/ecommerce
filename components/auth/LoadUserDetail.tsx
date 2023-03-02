import { useRouter } from "next/router";
import React, { useEffect } from "react";
import commonApi from "../../apis/commonApi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  isLoggedIn,
  setCurrentUser,
  setIsLoggedIn,
} from "../../redux/slice/authSlice";

interface LoadUserDetailProps {}

const LoadUserDetail: React.FunctionComponent<LoadUserDetailProps> = (
  props
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(isLoggedIn);
  useEffect(() => {
    (async () => {
      const { body } = await commonApi({
        method: "GET",
        url: "api/user-detail",
      });
      if (body) {
        dispatch(setIsLoggedIn(true));
        dispatch(setCurrentUser(body));
        switch (body.role) {
          case "ADMIN":
            if (router.pathname.includes("/admin")) return;
            router.push("/admin");
            break;
          default:
            if (router.pathname.includes("/admin")) {
              router.push("/");
            }
            break;
        }
      }
    })();
  }, [isLogged]);
  return <></>;
};

export default LoadUserDetail;
