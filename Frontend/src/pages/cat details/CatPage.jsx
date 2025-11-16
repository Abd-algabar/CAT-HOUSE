import React, { useState } from "react";
import styles from "./CatPage.module.css";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useParams } from "react-router-dom";
import { getCatById } from "../../lib/Api";
import { useEffect } from "react";
import { formatDistance } from "date-fns";
import { ar } from "date-fns/locale";
import { useAuth } from "../../context/AuthContext";
import toast  from "react-hot-toast";
import { CircularProgress } from '@mui/material';
// Import Swiper styles

const CatPage = () => {
  const {isAuthenticated}=useAuth()
  const [mainImage, setMainImage] = useState(" ");
  const [cat, setCat] = useState({});
  const [owner, setOwner] = useState({});
  const [Dates, setDate] = useState(" ");
  const { id } = useParams();
  const getcatById = async (id) => {
    try {
      const cat = await getCatById(id);
      // console.log(cat);
      setCat(cat);
      setOwner(cat?.owner);
      setMainImage(cat?.images[0]);
      const date = new Date(cat?.createdAt);
      setDate(formatDistance(date, new Date(), { locale: ar }));
    } catch (error) {
      // console.error("Error fetching cat by ID:", error);
      toast.error("فشل في جلب البيانات")
    }
  };

  const whatsapp=()=>{
    if (isAuthenticated) {
       let whatsappUrl= `https://wa.me/963${owner.phone}`
        window.open(whatsappUrl, '_blank');
    }else{
      toast.error("يجب تسجيل الدخول للتواصل مع الناشر")
    }

  }

  useEffect(() => {
    getcatById(id);
  }, []);

  return (
    <>
    {Object.keys(cat).length === 0?
    
     <div style={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height:"100vh"
           
         }}>
           <CircularProgress size={60} sx={{color:"#509e2d"}} />
         </div>
    
   : <div className={styles.CatPage}>
      <div className={styles.image}>
        <img className={styles.mainImage} src={mainImage} alt="Cat" />

        <div className={styles.thumbnails}>
          {cat?.images?.length>1 && cat?.images?.map((img, index) => {
            return (
              <img
                src={img}
                alt=""
                key={index}
                style={{
                 
                  
                  border:
                    mainImage === img ? "3px solid #509e2d" : "2px solid #ddd",
                 
                }}
                // width={"120px"}
                onClick={() => setMainImage(img)}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.box}>
          <div className="flex-b">
            <div className="flex-b">
              <h4>الناشر:</h4>
              <p>{owner.name}</p>
            </div>
            <div className="flex-b">
              <h4>تاريخ النشر:</h4>
              <p>من {Dates}</p>
            </div>
          </div>

          <div className="flex-b">
            <div className="flex-b">
              <h4>النوع:</h4>
              <p>{cat.type}</p>
            </div>

            <div className="flex-b">
              <h4>العمر: </h4>
              <p>
                {" "}
                {cat.age} {convertUnit(cat.unit)}
              </p>
            </div>
          </div>

          <div className="flex-b">
            <div className="flex-b">
              <h4>الجنس:</h4>
              <p>{cat.gender}</p>
            </div>

            <div className="flex-b">
              <h4>العنوان:</h4>
              <p>{cat.city}</p>
            </div>
          </div>

          <div>
            <h4> الوصف:</h4>
            <p>{cat.description}</p>
          </div>
        </div>

        <Button
          sx={{ bgcolor: "#509e2d", mb: "20px" }}
          variant="contained"
          fullWidth
          onClick={whatsapp}
        >
          تواصل مع الناشر
          <WhatsAppIcon sx={{ mr: "10px" }} />
        </Button>
      </div>
    </div>}
    </>
   
  );
};

export default CatPage;

export const convertUnit = (unit) => {
  if (unit == "M") {
    return "شهور";
  } else if (unit === "Y") {
    return "سنوات";
  } else if (unit === "D") {
    return "أيام";
  }
  return " ";
};
