import React, { useEffect, useState } from "react";
import { Card, Col, Button, Form, Alert, Spinner } from "react-bootstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";

import { createSelector } from "reselect";
import { loginUser, resetLoginFlag } from "slices/auth/login/thunk";

const Signin = (props: any) => {
  const dispatch: any = useDispatch();
  const selectAccountAndLogin = createSelector(
    (state: any) => state.Account,
    (state: any) => state.Login,
    (account, login) => ({
      user: account.user,
      error: login.error,
      loading: login.loading,
      errorMsg: login.errorMsg,
    })
  );

  const { user, error, loading, errorMsg } = useSelector(selectAccountAndLogin);

  const [userLogin, setUserLogin] = useState<any>({});
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  useEffect(() => {
    if (user && user) {
      const updatedUserData =
        process.env.REACT_APP_DEFAULTAUTH === "firebase"
          ? user.multiFactor.user.email
          : user.email;
      const updatedUserPassword =
        process.env.REACT_APP_DEFAULTAUTH === "firebase" ? "" : user.password;
      setUserLogin({
        email: updatedUserData,
        password: updatedUserPassword,
      });
    }
  }, [user]);

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "admin@themesbrand.com" || "",
      password: userLogin.password || "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

//   const signIn = (type: any) => {
//     dispatch(socialLogin(type, props.router.navigate));
//   };

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(resetLoginFlag());
      }, 3000);
    }
  }, [dispatch, errorMsg]);

  document.title = "Login | Sivex";

  return (
    <ParticlesAuth>
      <React.Fragment>
        <Col xxl="6" className="mx-auto">
          <Card className="mb-0 border-0 shadow-none mb-0">
            <Card.Body className="p-sm-5 m-lg-4">
              <div className="p-2 mt-5">
                {error && error ? (
                  <Alert variant="danger"> {error} </Alert>
                ) : null}

                <Form
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        name="email"
                        className="form-control password-input"
                        placeholder="Enter username"
                        required
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email || ""}
                        isInvalid={
                          validation.touched.email && validation.errors.email
                            ? true
                            : false
                        }
                      />
                    </div>
                    {validation.touched.email && validation.errors.email ? (
                      <Form.Control.Feedback type="invalid">
                        {validation.errors.email}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <div className="float-end">
                      <Link to="/forgot-password" className="text-muted">
                        Forgot password?
                      </Link>
                    </div>
                    <Form.Label>
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="position-relative auth-pass-inputgroup mb-3">
                      <Form.Control
                        type={passwordShow ? "text" : "password"}
                        className="form-control pe-5 password-input"
                        placeholder="Enter password"
                        required
                        name="password"
                        value={validation.values.password || ""}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        isInvalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <Form.Control.Feedback type="invalid">
                          {validation.errors.password}
                        </Form.Control.Feedback>
                      ) : null}
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                        type="button"
                        id="password-addon"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        <i className="ri-eye-fill align-middle"></i>
                      </Button>
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formRememberMe">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      id="auth-remember-check"
                    />
                  </Form.Group>

                  <div className="mt-4">
                    <Button
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <Spinner size="sm" />} Sign In
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-5">
                  <p className="mb-0">
                    Don't have an account ?
                    <Link
                      to="/register"
                      className="fw-semibold text-secondary text-decoration-underline"
                    >
                      {" "}
                      SignUp
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </React.Fragment>
    </ParticlesAuth>
  );
};

export default withRouter(Signin);
