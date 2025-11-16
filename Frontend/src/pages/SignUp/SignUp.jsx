import React from "react";
import styles from "./sign.module.css";

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
import toast,{Toaster} from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [signUpData, setSignUpData] = React.useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
   const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("login data:", signUpData);
      if (!signUpData.phone || !signUpData.password || !signUpData.name || !signUpData.confirmPassword) {
        setError("كل الحقول مطلوبة");
        toast.error("   كل الحقول مطلوبة");
        return;
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        setError("الرجاء إدخال نفس كلمة المرور في الحقلين")
        toast.error("الرجاء إدخال نفس كلمة المرور في الحقلين")
        return;
      }
      const response = await axiosInstance.post("/user/register", signUpData);

      console.log("signup response:", response.data);
      if (response.data?.status === true) {
        toast.success(response.data.message)
        navigate("/login");
      }
    } catch (err) {
      
      toast.error(err.response?.data || "حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
      
   
  };
  return (
    <div className={styles.sign}>
      <div className={styles.input}>
        <h2> انشاء حساب جديد </h2>

        <TextField
          sx={{ direction: "rtl", width: "250px", mb: "12px" }}
          id="outlined-basic"
          label=" الاسم "
          variant="outlined"
          color="success"
          value={signUpData.name}
          onChange={(e) =>
            setSignUpData({ ...signUpData, name: e.target.value })
          }
        />

        <TextField
          sx={{ direction: "rtl", width: "250px", mb: "12px" }}
          id="outlined-basic"
          label=" رقم الهاتف (يجب أن يكون مرتبط بواتساب) "
          variant="outlined"
          color="success"
          value={signUpData.phone}
          onChange={(e) =>
            setSignUpData({...signUpData,phone:e.target.value})
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
            value={signUpData.password}
            onChange={(e)=>{
              setSignUpData({...signUpData,password:e.target.value})
            }}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
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

        <FormControl
          sx={{ m: 1, width: "250px", direction: "rtl" }}
          variant="outlined"
          color="success"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            تأكيد كلمة السر
          </InputLabel>
          <OutlinedInput
            sx={{
              textAlign: "right",
            }}
            value={signUpData.confirmPassword}
            onChange={(e)=>{
              setSignUpData({...signUpData,confirmPassword:e.target.value})
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
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
          هل تملك حساب ؟ قم ب.
          <Link to="/login">
            <span> تسجيل الدخول </span>
          </Link>
        </p>

        <Button variant="contained" sx={{ bgcolor: "#509e2d", width: "250px" }}
        onClick={signUp}
        loading={loading}
        >
          انشاء حساب
        </Button>
      </div>
      <Toaster/>
    </div>
  );
};

export default SignUp;
