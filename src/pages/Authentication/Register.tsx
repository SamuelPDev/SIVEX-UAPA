import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  apiError,
  registerUser,
  resetRegisterFlag,
} from "slices/auth/register/thunk";

const Register = () => {
  document.title = "Register | Sivex";

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Please Enter Email"),
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Please Enter Username"),
      password: Yup.string()
        .required("Please Enter Password")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
        ),
    }),
    onSubmit: (values) => {
      dispatch(apiError());
      dispatch(registerUser(values));
    },
  });

  const selectRegister = createSelector(
    (state: any) => state.Account,
    (account) => ({
      success: account?.success || false,
      error: account?.registrationError || null,
      loading: account?.loading || false,
    })
  );

  const { error, success, loading } = useSelector(selectRegister);

  useEffect(() => {
    dispatch(apiError());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimer(3);

      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (success || error) {
      const resetTimer = setTimeout(() => {
        dispatch(resetRegisterFlag());
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <ParticlesAuth>
      <React.Fragment>
        <div className="col-xxl-6 mx-auto">
          <div className="card mb-0 border-0 shadow-none mb-0">
            <div className="card-body p-sm-5 m-lg-4">
              <div className="text-center mt-2">
                <h5 className="fs-3xl">Create your free account</h5>
              </div>
              <div className="p-2 mt-5">
                {success && (
                  <Alert variant="success">
                    <strong>Registration successful!</strong> Redirecting to
                    login page in {timer} seconds...
                  </Alert>
                )}
                {error && !success && (
                  <Alert variant="danger">
                    <strong>Registration failed:</strong> {error}
                  </Alert>
                )}

                <Form
                  className="needs-validation"
                  action="#"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="useremail">
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      id="useremail"
                      placeholder="Enter email address"
                      name="email"
                      className="form-control"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      isInvalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{validation.errors.email}</div>
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      placeholder="Enter username"
                      name="username"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ""}
                      isInvalid={
                        validation.touched.username &&
                        validation.errors.username
                          ? true
                          : false
                      }
                    />
                    {validation.touched.username &&
                    validation.errors.username ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{validation.errors.username}</div>
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="password-input">
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="position-relative auth-pass-inputgroup">
                      <Form.Control
                        onPaste={(e) => e.preventDefault()}
                        placeholder="Enter password"
                        id="password-input"
                        type={!passwordShow ? "password" : "text"}
                        name="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        isInvalid={
                          validation.touched.password &&
                          validation.errors.password
                            ? true
                            : false
                        }
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                        type="button"
                        id="password-addon"
                        onClick={() => setPasswordShow(!passwordShow)}
                      >
                        <i className="ri-eye-fill align-middle"></i>
                      </Button>
                      {validation.touched.password &&
                      validation.errors.password ? (
                        <Form.Control.Feedback type="invalid">
                          <div>{validation.errors.password}</div>
                        </Form.Control.Feedback>
                      ) : null}
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <p className="mb-0 fs-xs text-muted fst-italic">
                      By registering you agree to the Sivex{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0 text-primary text-decoration-underline fst-normal fw-medium"
                        style={{ border: "none", background: "none" }}
                        onClick={() => console.log("Terms clicked")}
                      >
                        Terms of Use
                      </button>
                    </p>
                  </Form.Group>

                  <div
                    id="password-contain"
                    className="p-3 bg-light mb-2 rounded"
                  >
                    <h5 className="fs-sm">Password must contain:</h5>
                    <p id="pass-length" className="invalid fs-xs mb-2">
                      Minimum <b>8 characters</b>
                    </p>
                    <p id="pass-lower" className="invalid fs-xs mb-2">
                      At <b>lowercase</b> letter (a-z)
                    </p>
                    <p id="pass-upper" className="invalid fs-xs mb-2">
                      At least <b>uppercase</b> letter (A-Z)
                    </p>
                    <p id="pass-number" className="invalid fs-xs mb-0">
                      A least <b>number</b> (0-9)
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && (
                        <Spinner
                          size="sm"
                          animation="border"
                          className="me-2"
                        />
                      )}
                      Sign Up
                    </Button>
                  </div>
                </Form>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Signin
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </ParticlesAuth>
  );
};
export default Register;
