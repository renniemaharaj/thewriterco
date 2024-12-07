import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../app/api/auth/authApiSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  logOut,
  selectCurrentToken,
  setAccessToken,
} from "../app/api/auth/authSlice";
import { Outlet } from "react-router-dom";
import Block from "./Block";

const PersistLogin = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const [refreshToken, { isLoading }] = useRefreshTokenMutation();
  const [refreshAttempted, setRefreshAttempted] = useState<boolean>(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const { accessToken } = await refreshToken(undefined).unwrap();
        if (!accessToken) {
          dispatch(logOut());
        } else {
          dispatch(setAccessToken(accessToken));
        }
      } catch (error) {
        console.log("Refresh token failed:", error);
        dispatch(logOut());
      } finally {
        setRefreshAttempted(true);
      }
    };

    if (!token && !refreshAttempted) {
      verifyRefreshToken();
    } else {
      setRefreshAttempted(true);
    }
  }, [token, refreshAttempted, dispatch, refreshToken]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`token: ${token}`);
  }, [isLoading, token]);

  if (isLoading || !refreshAttempted) return <Block />;

  return <Outlet />;
};

export default PersistLogin;
