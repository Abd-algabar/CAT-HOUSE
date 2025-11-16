import React, { useEffect ,useState} from "react";
import styles from "./cats.module.css";
import CatBox from "../04-Cat Box/CatBox";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { CircularProgress } from '@mui/material';
const Cats = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    getLatestCats();
  }, [cats]);
  
  const getLatestCats = async () => {
    try {
      const response = await axiosInstance.get("/cat/latest");
      // console.log("latest cats:", response.data);
      setCats( response.data.cats);
      // console.log("cats:", cats);
    } catch (error) {
      // console.error("Error fetching latest cats:", error);
      toast.error("فشل في تحميل القطط")
      // res.status(500).json({
      //   success: false,
      //   message: "خطأ في جلب البيانات",
      // });
    }
  };
  return (
    <div className={styles.cats}>
      {cats.length==0?  <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding:"40px"
      
    }}>
      <CircularProgress size={60} sx={{color:"#509e2d"}} />
    </div>:<>
       <h1>القطط المتاحة للتبني</h1>
      <div className={styles.boxes}>
        {cats.map((c) => {
          // console.log(c)
          return <CatBox key={c._id} cat={c} />;
        })}
      </div>
      </>}
      {/* <h1>القطط المتاحة للتبني</h1>
      <div className={styles.boxes}>
        {cats.map((c) => {
          // console.log(c)
          return <CatBox key={c._id} cat={c} />;
        })}
      </div> */}
      
    </div>
  );
};

export default Cats;
