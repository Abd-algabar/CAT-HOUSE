import React from "react";
import styles from "./login.module.css";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
// axios
import { axiosInstance } from "../../lib/axios";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const {updateAuthAfterLogin}=useAuth()
  const [loginData, setLoginData] = React.useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // console.log("login data:", loginData);
      if (!loginData.phone || !loginData.password) {
     
      toast.error("البريد الإلكتروني وكلمة المرور مطلوبان");
      return;
    }
      const response = await axiosInstance.post("/user/login", loginData);

      // console.log("login response:", response.data);

      // ✅ تحقق هل التوكن موجود (نجاح)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        updateAuthAfterLogin(response.data.user.name)
        toast.success("تم تسجيل الدخول بنجاح");
        navigate("/");
      } else {
        // setError();
        toast.error(response.data.message || "فشل تسجيل الدخول");
      }
    } catch (err) {
      // setError();
      toast.error(err.response?.data?.message || "حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.box}>
        <div className={styles.image}>
          <h3>كل قطة تستحق منزلاً دافئاً..</h3>
          <p> سجل دخولك الآن لتبدأ رحلتك في تبني صديق جديد </p>
        </div>
        <div className={styles.input}>
          <h2>تسجيل الدخول</h2>
          <TextField
            sx={{ direction: "rtl", width: "250px", mb: "12px" }}
            id="outlined-basic"
            label="رقم الهاتف"
            variant="outlined"
            color="success"
            value={loginData.phone}
            onChange={(e) =>
              setLoginData({ ...loginData, phone: e.target.value })
            }
          />

          <FormControl
            sx={{ m: 1, width: "250px", direction: "rtl" }}
            variant="outlined"
            color="success"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              كلمة السر
            </InputLabel>
            <OutlinedInput
              sx={{
                textAlign: "right",
              }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    // onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <p>
            لا تمتلك حساب ؟ قم ب .
            <Link to="/signup">
              <span> انشاء حساب </span>
            </Link>
          </p>

          <Button
            variant="contained"
            sx={{ bgcolor: "#509e2d", width: "250px" }}
            onClick={login}
            loading={loading}
          >
            تسجيل دخول
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
