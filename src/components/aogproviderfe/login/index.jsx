import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Button from "components/UI/Button";
import Typography from "@mui/material/Typography";
import TextField from "components/UI/TextField";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { login } from "actions/login";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomCard = styled(Card)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("xl")]: {
    bottom: 200,
  },
  [theme.breakpoints.up("lg")]: {
    bottom: 150,
  },
  wordWrap: "break-word",
  borderRadius: ".375rem",
  backgroundColor: "#f7fafc",
  backgroundClip: "border-box",
  paddingBottom: 5,
}));

const CardFoot = styled("div")(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("xl")]: {
    bottom: 200,
  },
  [theme.breakpoints.up("lg")]: {
    bottom: 140,
  },
}));

const ContainBox = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "linear-gradient(87deg, #e7e7e7 0, #ffffff 100%)",
  [theme.breakpoints.up("lg")]: {
    height: "50vh",
  },
}));

const Separator = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "auto",
  right: 0,
  left: 0,
  bottom: 0,
  overflow: "hidden",
  width: "100%",
  height: " 150px",
  transform: "translateZ(0)",
  pointerEvents: "none",
}));

const SVG = styled("svg")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  pointerEvents: "none",
}));

const Polygon = styled("polygon")(({ theme }) => ({
  fill: "#172b4d",
}));

function AdminLogin() {
  const [showPassword, setPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const router = useRouter();

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Invalid Email")
      .required("Email Cannot be empty!"),
    password: yup
      .string()
      .trim()
      .required("Password cannot be empty!")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?#&^_()+-/])([a-zA-Z0-9@$!%*?#&^_()+-/]{8,})$/,
        "Password must be between 8 to 15 characters, must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, &, etc)."
      ),
  });

  const logins = useSelector((store) => store.loginReducer);

  React.useEffect(() => {
    if (
      logins.user_token !== "" &&
      (logins.user_type === "A" || logins.user_type === "SA")
    ) {
      router.push("/admin");
    } else if (logins.user_token !== "" && logins.user_type === "U") {
      router.push("/");
    }
  }, [logins]);

  return (
    <>
      <Box>
        <ContainBox
          sx={{
            py: { xs: 7, lg: 8 },
            pt: { lg: 9 },
          }}
        >
          <Grid container justifyContent={"center"}>
            <Grid item xs={11} md={8} lg={4} xl={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="#172b4d">
                  Welcome!
                </Typography>
                <Box sx={{ mt: 2, pb: 10, mx: { xs: 0, md: 2, lg: 3 } }}>
                  <Typography variant="body1" color="#172b4d" fontWeight={200}>
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mb: 20 }} />
          <Separator>
            <SVG
              x="0"
              y="0"
              viewBox="0 0 2560 100"
              preserveAspectRatio="none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Polygon points="2560 0 2560 100 0 100" />
            </SVG>
          </Separator>
        </ContainBox>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, action) => {
            dispatch(login(values.email, values.password));
            action.resetForm();
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ bgcolor: "#172b4d" }}>
                <Grid container justifyContent="center">
                  <Grid item xs={11} sm={8} md={6} lg={4} xl={4}>
                    <Box sx={{ mx: { lg: 3 } }}>
                      <CustomCard>
                        <Box sx={{ mt: 5, mb: 2, textAlign: "center" }}>
                          <Typography variant="body2" color="GrayText">
                            Sign In
                          </Typography>
                        </Box>
                        <CardContent>
                          <Box
                            sx={{ mx: { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 } }}
                          >
                            <Box sx={{ py: 2 }}>
                              <Paper>
                                <TextField
                                  placeholder="Email"
                                  fullWidth
                                  size="small"
                                  hiddenLabel
                                  variant="filled"
                                  color="login"
                                  name="email"
                                  value={formik.values.email}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.email && formik.errors.email
                                      ? true
                                      : false
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <EmailIcon
                                        color="action"
                                        sx={{ mr: 1 }}
                                      />
                                    ),
                                  }}
                                />
                              </Paper>
                            </Box>
                            <Typography variant="caption" color="error">
                              {formik.touched.email && formik.errors.email}
                            </Typography>
                            <Box sx={{ py: 2 }}>
                              <Paper>
                                <TextField
                                  placeholder="Password"
                                  fullWidth
                                  size="small"
                                  variant="filled"
                                  color="login"
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={formik.values.password}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.password &&
                                    formik.errors.password
                                      ? true
                                      : false
                                  }
                                  hiddenLabel
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOpenIcon sx={{ mr: 1 }} />
                                      </InputAdornment>
                                    ),
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          edge="end"
                                        >
                                          {showPassword ? (
                                            <VisibilityOffIcon />
                                          ) : (
                                            <VisibilityIcon />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Paper>
                            </Box>
                            <Typography variant="caption" color="error">
                              {formik.touched.password &&
                                formik.errors.password}
                            </Typography>
                            <Box sx={{ mb: 4 }}>
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Box>
                                  <Checkbox size="medium" />
                                </Box>
                                <Box sx={{ ml: 1 }}>
                                  <Typography variant="body2" color="#8898aa">
                                    Remember me
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box sx={{ my: 5, textAlign: "center" }}>
                              <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                                sx={{ borderRadius: 1 }}
                              >
                                Sign In
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </CustomCard>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container justifyContent={"center"}>
                  <Grid item xs={11} sm={8} md={6} lg={4} xl={4}>
                    <Box sx={{ mx: { lg: 3 } }}>
                      <CardFoot>
                        <Grid container justifyContent={"center"}>
                          <Grid item xs={6}>
                            <Link href="#" passHref={true}>
                              <Typography variant="caption" color="lightgray">
                                Forgot password?
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "end" }}>
                            <Link href="#" passHref={true}>
                              <Typography variant="caption" color="lightgray">
                                Create new account
                              </Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </CardFoot>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default AdminLogin;
