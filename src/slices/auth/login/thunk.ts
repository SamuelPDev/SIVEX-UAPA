//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";

// Import our mock auth service
import { mockAuthService } from "../../../services/mockAuthService";

export const loginUser = (user: any, history: any) => async (dispatch: any) => {
  try {
    let response;
    let data;

    // Check if we're using our mock localStorage auth
    if (
      process.env.REACT_APP_DEFAULTAUTH === "mock" ||
      process.env.REACT_APP_DEFAULTAUTH === "fake" ||
      !process.env.REACT_APP_DEFAULTAUTH
    ) {
      // Use our localStorage mock service
      try {
        response = await mockAuthService.login({
          email: user.email,
          password: user.password,
        });

        if (response.success) {
          data = response.user;
          localStorage.setItem("authUser", JSON.stringify(data));
          dispatch(loginSuccess(data));
          history("/dashboard");
        }
      } catch (error: any) {
        dispatch(apiError({ data: error.message || "Invalid credentials" }));
      }
      return;
    }

    // Original logic for other auth methods
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.loginUser(user.email, user.password);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = postJwtLogin({
        email: user.email,
        password: user.password,
      });
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = postFakeLogin({
        email: user.email,
        password: user.password,
      });
    }

    data = await response;

    if (data) {
      localStorage.setItem("authUser", JSON.stringify(data));
      if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        var finallogin: any = JSON.stringify(data);
        finallogin = JSON.parse(finallogin);
        data = finallogin.data;
        if (
          finallogin.status === "success" ||
          (finallogin.username && finallogin.password)
        ) {
          dispatch(loginSuccess(data));
          history("/dashboard");
        } else {
          history("/login");
          dispatch(apiError(finallogin));
        }
      } else {
        dispatch(loginSuccess(data));
        history("/dashboard");
      }
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    // Clear our localStorage data
    mockAuthService.logout();
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      let fireBaseBackend = getFirebaseBackend();
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin =
  (type: any, history: any) => async (dispatch: any) => {
    try {
      let response;

      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const fireBaseBackend = getFirebaseBackend();
        response = fireBaseBackend.socialLoginUser(type);
      }

      const socialdata = await response;
      if (socialdata) {
        localStorage.setItem("authUser", JSON.stringify(socialdata));
        dispatch(loginSuccess(socialdata));
        history("/dashboard");
      }
    } catch (error) {
      dispatch(apiError(error));
    }
  };

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
