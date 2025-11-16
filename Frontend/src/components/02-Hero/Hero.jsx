import React from "react";
import styles from "./hero.module.css";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CloudUpload } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { axiosInstance } from "../../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { set } from "date-fns";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const matches = useMediaQuery("(min-width: 700px)");
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = React.useState(false);
  return (
    <div className={styles.hero}>
      {showAddForm && <AddForm setShowAddForm={setShowAddForm}></AddForm>}
      <div className={styles.right}>
        <img src="/hero.png" alt="cat" width="450px" />
        {matches && <span className={styles.board}></span>}
      </div>

      <div className={styles.left}>
        <h1>مرحباً...</h1>
        <h2>كل قطة تستحق فرصة ثانية</h2>
        <p>
          في منصتنا، نوصل بين محبي الحيوانات الأليفة والقطط التي تبحث عن عائلةٍ
          جديدة. سواء كنت تبحث عن رفيق لملء منزلك بالمرح، أو تريد إنقاذ حياة قطٍ
          محتاج — أنت في المكان الصحيح!
        </p>

        <div className={styles.btn}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#509e2d" }}
            onClick={() => {
              isAuthenticated?
              setShowAddForm(true):toast.error("يجب تسجيل الدخول لاضافة قط")

            }}
          >
            اعرض قططًا للتبني
          </Button>
          <Button
            onClick={() => {
              navigate("AdoptCats");
            }}
            variant="contained"
            sx={{ bgcolor: "#509e2d" }}
          >
            تبنى قطاً
          </Button>
        </div>
      </div>
      <Toaster />

    </div>
  );
};
export default Hero;




export const AddForm = ({ setShowAddForm }) => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    type: "",
    age: "",
    gender: "ذكر",
    city: "دمشق",
    status: "adoption",
    description: "",
    unit: "D",
    images: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    return () => formData.images.forEach((img) => URL.revokeObjectURL(img));
  }, [formData.images]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length==0) {
      setError("يرجى اختيار صورة واحدة على الأقل");
      return;
    }
    else if (files.length > 3) {
      setError("يمكنك رفع 3 صور كحد أقصى");
    } else {
      setError("");
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };
  const validateForm =()=>{
    let error= false;

    if (!formData.type.trim()) {
      toast.error("يرجى إدخال نوع القط");
      error= true;
    }
    if (formData.age<=0) {
      toast.error("يرجى إدخال عمر صحيح للقط");
      error= true;
    }
    if (formData.images.length===0) {
      toast.error("يرجى رفع صورة واحدة على الأقل للقط");
      error= true;
    }
    return !error
  }
  const handleSubmit = async (e) => {
    console.log(formData);
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);  
      return 
    }
    try {
      e.preventDefault();
      if (!isAuthenticated) {
        toast.error("يرجى تسجيل الدخول أولاً");
        return;
      }

      const submitData = new FormData();
      // إضافة الحقول النصية
      submitData.append("type", formData.type);
      submitData.append("age", formData.age);
      submitData.append("gender", formData.gender);
      submitData.append("city", formData.city);
      submitData.append("status", formData.status);
      submitData.append("description", formData.description);
      submitData.append("unit", formData.unit);

      // إضافة الصور
      formData.images.forEach((image, index) => {
        submitData.append("images", image); // يجب أن يكون الاسم متوافق مع السيرفر
      });
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/cat/add", submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setLoading(false)
        setShowAddForm(false);
        toast.success("تم إضافة القط بنجاح");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إضافة القط");
      setLoading(false);
    }
  };
  return (
    <div
      className={styles.addFormBg}
      onClick={(e) => e.target === e.currentTarget && setShowAddForm(false)}
    >
      <div className={styles.addFormBox}>
        <IconButton sx={{ mr: "100%" }} onClick={() => setShowAddForm(false)}>
          <CloseIcon />
        </IconButton>

        <h3>اضف قطاً</h3>

        {/* النوع */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="cat-type">النوع:</label>
          <input
            list="cat-types"
            id="cat-type"
            name="type"
            placeholder="اختر أو اكتب نوع القط"
            value={formData.type}
            onChange={handleChange}
          />
          <datalist id="cat-types">
            <option value="القط الشيرازي" />
            <option value="القط السيامي" />
            <option value="القط الهيمالايا" />
            <option value="القط الفارسي" />
            <option value="القط البريطاني قصير الشعر" />
            <option value="القط الاسكتلندي مطوي الأذن" />
            <option value="القط سفينكس" />
            <option value="قط راغدول" />
            <option value="القط البنغالي" />
            <option value="القط مين كون" />
          </datalist>
        </div>

        {/* العمر */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="cat-age">العمر:</label>
          <div style={{ gap: "10px", display: "flex", alignItems: "center" }}>
            <input
              style={{ maxWidth: "100px" }}
              type="number"
              min={1}
              id="cat-age"
              name="age"
              placeholder="اكتب العمر"
              value={formData.age}
              onChange={handleChange}
            />
            <select
              name="unit"
              id="age-unit"
              value={formData.ageUnit}
              onChange={handleChange}
            >
              <option value="D">أيام</option>
              <option value="M">شهور</option>
              <option value="Y">سنوات</option>
            </select>
          </div>
        </div>

        {/* الجنس */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="cat-gender">الجنس:</label>
          <select
            id="cat-gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{ minWidth: "168px" }}
          >
            <option value="ذكر">ذكر</option>
            <option value="انثى">أنثى</option>
          </select>
        </div>

        {/* المحافظة */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="governorate">المحافظة:</label>
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            style={{ minWidth: "168px" }}
          >
            <option value="دمشق">دمشق</option>
            <option value="ريف دمشق">ريف دمشق</option>
            <option value="حلب">حلب</option>
            <option value="حمص">حمص</option>
            <option value="حماة">حماة</option>
            <option value="اللاذقية">اللاذقية</option>
            <option value="طرطوس">طرطوس</option>
            <option value="درعا">درعا</option>
            <option value="السويداء">السويداء</option>
            <option value="الرقة">الرقة</option>
            <option value="دير الزور">دير الزور</option>
            <option value="الحسكة">الحسكة</option>
            <option value="ادلب">إدلب</option>
            <option value="القنيطرة">القنيطرة</option>
          </select>
        </div>

        {/* العملية */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label>العملية:</label>
          <div>
            <input
              type="radio"
              id="mating"
              name="status"
              value="mating"
              checked={formData.status === "mating"}
              onChange={handleChange}
            />
            <label htmlFor="mate">تزاوج</label>
          </div>

          <div>
            <input
              type="radio"
              id="adoption"
              name="status"
              value="adoption"
              checked={formData.status === "adoption"}
              onChange={handleChange}
            />
            <label htmlFor="adopt">تبنّي</label>
          </div>
        </div>

        {/* الوصف */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label htmlFor="des">الوصف:</label>
          <textarea
            name="description"
            id="des"
            cols="21"
            rows="4"
            placeholder="اكتب وصفاً للقط..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* الصور */}
        <div style={{ padding: "16px" }}>
          <label
            htmlFor="cat-images"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            صور القط (بحد أقصى 3):
          </label>

          <Button
            variant="contained"
            component="label"
            fullWidth
            endIcon={<CloudUpload />}
            sx={{ textTransform: "none", bgcolor: "#8c8c8c" }}
          >
            <span style={{ margin: "0px 10px" }}> رفع الصور </span>

            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {formData.images.map((image, index) => (
              <div
                key={index}
                style={{
                  width: "70px",
                  height: "70px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`صورة ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="contained"
          sx={{ bgcolor: "#509e2d", mb: "30px" }}
          fullWidth
          onClick={handleSubmit}
          loading={loading}
        >
          نشر
        </Button>
      </div>
    </div>
  );
};
