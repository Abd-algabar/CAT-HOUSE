import React, { useState } from "react";
import styles from "./catBox.module.css";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { formatDistance } from "date-fns";
import { ar } from "date-fns/locale";
import { convertUnit } from "../../pages/cat details/CatPage";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteCat } from "../../lib/Api";
import toast from "react-hot-toast";
const CatBox = ({ cat ,isOwner=false}) => {
  const date = new Date(cat.createdAt);
  const navigate = useNavigate();
   const [open, setOpen] = React.useState(false);
   const[loading,setloading]=useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteThisCat=async()=>{
      setloading(true)
    try {

      const data= await DeleteCat(cat._id);
      console.log(data)
      if (data.success) {
        setOpen(false)
        toast.success(data.message);
        setTimeout(() => {
        window.location.reload();
      }, 1000);

      }
    } catch (error) {
      setloading(false)
      setOpen(false)
      toast.error("حدث خطاء اثناء الحذف")
    }
  }
  // console.log(cat)
  return (
    <div className={styles.catBox}>
      <img src={cat.images[0]} alt="" width="100%" />
      <div className={styles.text}>
        <div className={styles.text1}>
          <p>
            {" "}
            النوع:<span> {cat.type}</span>
          </p>
          <p>
            {" "}
            الجنس:<span>{cat.gender}</span>
          </p>
        </div>
        <div className={styles.text1}>
          <p>
            العمر:
            <span>
              {" "}
              {cat.age} {convertUnit(cat.unit)}{" "}
            </span>
          </p>
          <p>
            العنوان: <span>{cat.city}</span>
          </p>
        </div>
        <div className={styles.text1}>
          <span style={{ fontSize: "12px" }}>
            من {formatDistance(date, new Date(), { locale: ar })}
          </span>

          <div
            className="flex"
            style={{ flexGrow: "1", width: "100%", gap: "10px",direction:"ltr" }}
          >
            <Button
              size="small"
              variant="contained"
              sx={{ bgcolor: "#509e2d", fontSize: "10px", maxHeight: "26px" }}
              onClick={() => {
                navigate(`/catDetails/${cat._id}`);
              }}
            >
              {" "}
              عرض التفاصيل
            </Button>
              {isOwner && <Button variant="contained" color="error" onClick={()=>setOpen(true)}>
              <DeleteIcon sx={{ fontSize: "14px" }} />
            </Button>}
            
          </div>
        </div>
      </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{direction:"rtl"}}
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف هذه القطة ؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            اضغط مولفق اذا كنت تريد حذف القطة  .
            لن تتمكن من استرجاع هذه القطة بعد حذفها
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>تراجع</Button>
          <Button loading={loading} color="error" onClick={deleteThisCat} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CatBox;
