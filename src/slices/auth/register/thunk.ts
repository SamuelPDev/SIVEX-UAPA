//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeRegister,
  postJwtRegister,
} from "../../../helpers/fakebackend_helper";

import {
  registerUserSuccessful,
  registerUserFailed,
  registerUserPending,
  resetRegisterFlagChange,
  apiErrorChange,
} from "./reducer";

import { mockAuthService } from "../../../services/mockAuthService";

const fireBaseBackend = getFirebaseBackend();

export const registerUser = (user: any) => async (dispatch: any) => {
  try {
    let response;

    if (
      process.env.REACT_APP_DEFAULTAUTH === "mock" ||
      process.env.REACT_APP_DEFAULTAUTH === "fake" ||
      !process.env.REACT_APP_DEFAULTAUTH
    ) {
      dispatch(registerUserPending());

      try {
        response = await mockAuthService.register({
          email: user.email,
          username: user.username,
          password: user.password,
        });

        if (response.success) {
          dispatch(
            registerUserSuccessful({
              user: {
                email: user.email,
                username: user.username,
              },
              message: "success",
            })
          );
        }
      } catch (error: any) {
        dispatch(
          registerUserFailed({
            message: error.message || "Registration failed",
          })
        );
      }
      return;
    }

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = fireBaseBackend.registerUser(user.email, user.password);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = postJwtRegister("/post-jwt-register", user);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = postFakeRegister(user);
      const data: any = await response;
      if (data.message === "success") {
        dispatch(registerUserSuccessful(data));
      } else {
        dispatch(registerUserFailed(data));
      }
    }
  } catch (error) {
    dispatch(registerUserFailed(error));
  }
};

export const resetRegisterFlag = () => {
  try {
    const response = resetRegisterFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};

export const apiError = () => {
  try {
    const response = apiErrorChange("");
    return response;
  } catch (error) {
    return error;
  }
};
