import styles from "./nav.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { Toaster, toast } from "react-hot-toast";

import { AddForm } from "../02-Hero/Hero";
const pages = [
  { p: "الصفحة الرئيسية", url: "/" },
  { p: "قطط للتبني", url: "/AdoptCats" },
  { p: "قطط للتزاوج", url: "/Mating" },
];
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const matches = useMediaQuery("(min-width: 700px)");
  const [page, setPage] = useState("/");
  const navigate = useNavigate();
  const handelLogin = () => {
    navigate("/login");
  };

  const handelSignUp = () => {
    navigate("/signup");
  };
  const handelPage = (url) => {
    setPage(url);
    navigate(url);
  };

  return (
    <div className={styles.main} style={{ direction: "rtl" }}>
      {showAddForm && <AddForm setShowAddForm={setShowAddForm}></AddForm>}
      <nav>
        {matches ? (
          <div className={styles.right}>
            <img src="/logo.png" alt="" width="90px" />
            <div className={styles.link}>
              {pages.map((p) => (
                <p
                  key={p.url}
                  onClick={() => {
                    handelPage(p.url);
                  }}
                  className={styles.linkp}
                  style={{ color: `${page == p.url ? "#509e2d" : ""}` }}
                >
                  {p.p}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <IconButton
            onClick={() => {
              setOpenMenu(true);
            }}
          >
            <MenuIcon sx={{ color: "#509e2d" }} />
          </IconButton>
        )}

        {!isAuthenticated && (
          <div className={styles.login}>
            <Button
              color="#509e2d"
              sx={{ color: "#509e2d" }}
              variant="outlined"
              onClick={() => {
                handelLogin();
              }}
            >
              تسجيل دخول
            </Button>
            <Button
              onClick={handelSignUp}
              sx={{ bgcolor: "#509e2d" }}
              variant="contained"
            >
              انشاء حساب
            </Button>
          </div>
        )}

        {isAuthenticated && (
          <div className={styles.left}>
            <Button
              onClick={() => {
                setShowAddForm(true);
              }}
              sx={{ bgcolor: "#509e2d" }}
              variant="contained"
            >
              اضافة قط
            </Button>
            <IconButton onClick={()=>{
              setPage("")
              navigate("/me")
            }}>
              <AccountCircleIcon   sx={{ color: "#509e2d" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                logout();
                toast.success("تم تسجيل الخروج بنجاح");
              }}
            >
              <LogoutIcon sx={{ color: "#509e2d" }} />
            </IconButton>

            
          </div>
        )}
      </nav>

      {true && (
        <div
          className={`${styles.menu} ${openMenu && styles.active}`}
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <div className={styles.list}>
            <CloseIcon sx={{ color: "white", mr: "30px" }} />
            <ul>
              {pages.map((p) => (
                <li
                  onClick={() => {
                    handelPage(p.url);
                  }}
                  key={p.p}
                >
                  {p.p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Nav;
