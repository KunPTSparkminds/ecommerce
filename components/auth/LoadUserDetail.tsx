import * as React from "react";
import { ApiHelper } from "../../apis/apiHelper";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  selectCurrentUser,
  setCurrentUser,
  setIsLoggedIn,
} from "../../redux/slice/authSlice";

interface LoadUserDetailProps {}

const LoadUserDetail: React.FunctionComponent<LoadUserDetailProps> = (
  props
) => {
  const dispatch = useAppDispatch();
  const t = useAppSelector(selectCurrentUser);
  const getUserDetail = () => {
    ApiHelper({
      method: "GET",
      url: "http://localhost:8081/api/user-detail",
    }).then((res) => {
      if (Object.keys(res).length > 0) {
        dispatch(setIsLoggedIn(true));
        dispatch(setCurrentUser(res));
      }
    });
  };

  React.useEffect(() => {
    getUserDetail();
  }, []);
  return <></>;
};

export default LoadUserDetail;
