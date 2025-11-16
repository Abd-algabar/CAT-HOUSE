import React, { useState } from "react";
import styles from "./search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import { IconButton } from "@mui/material";
import { filterCat, searchCat } from "../../lib/Api";
const Search = ({ setCats, status }) => {
  const [filter, setFilter] = useState(false);
  const [searchType, setSearchType] = useState("");
  const search = async (type, status) => {
    try {
      const { cats, count } = await searchCat(type, status);
      // console.log(cats)
      if (count !== 0) {
        setCats(cats);
      } else {
        setCats([]);
      }
    } catch (error) {
      // console.log("error search",error)
    }
  };
  return (
    <div className={styles.search}>
      {filter && (
        <Filter
          setFilter={setFilter}
          setCats={setCats}
          status={status}
        ></Filter>
      )}
      <Button
        sx={{ bgcolor: "#509e2d", height: "48px" }}
        variant="contained"
        startIcon={<TuneIcon />}
        onClick={() => {
          setFilter(true);
        }}
      >
        فلاتر البحث
      </Button>
      <div className={styles.inSearch}>
        <input
          value={searchType}
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          placeholder="ابحث عن القط المناسب حسب النوع "
          type="text"
        />

        <IconButton
          aria-label="delete"
          onClick={() => search(searchType, status)}
        >
          <SearchIcon sx={{ color: "#509e2d" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Search;

// function Filter({ setFilter }) {
//   return (
//     <div className={styles.filterBg}>
//       <div className={styles.filterBox}>
//         <h3>فلاتر البحث</h3>

//         <div>
//           <label>النوع:</label>
//           <select>
//             <option defaultChecked value="all">
//               -- الكل --
//             </option>
//             <option value="shirazi">القط الشيرازي</option>
//             <option value="siamese">القط السيامي</option>
//             <option value="himalayan">القط الهيمالايا</option>
//             <option value="persian">القط الفارسي</option>
//             <option value="british">القط البريطاني قصير الشعر</option>
//             <option value="scottish">القط الاسكتلندي مطوي الأذن</option>
//             <option value="sphynx">القط سفينكس</option>
//             <option value="ragdoll">قط راغدول</option>
//             <option value="bengal">القط البنغالي</option>
//             <option value="mainecoon">القط مين كون</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="">الجنس:</label>
//           <select name="" id="">
//             <option value="">-- الكل --</option>
//             <option value="">ذكر</option>
//             <option value="">انثى</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="">العمر:</label>
//           <select name="" id="">
//             <option value="">-- الكل --</option>
//             <option value="">اصغر من 6 اشهر</option>
//             <option value=""> بين 6 اشهر و سنة</option>
//             <option value="">اكبر من سنة</option>
//           </select>
//         </div>

//         <div>
//           <label for="governorate">المحافظة:</label>
//           <select name="governorate" id="governorate">
//             <option value="">-- الكل --</option>
//             <option value="damascus">دمشق</option>
//             <option value="refdamascus"> ريف دمشق</option>
//             <option value="aleppo">حلب</option>
//             <option value="homs">حمص</option>
//             <option value="hama">حماة</option>
//             <option value="latakia">اللاذقية</option>
//             <option value="tartus">طرطوس</option>
//             <option value="daraa">درعا</option>
//             <option value="as-suweida">السويداء</option>
//             <option value="raqqa">الرقة</option>
//             <option value="deir-ez-zor">دير الزور</option>
//             <option value="al-hasakah">الحسكة</option>
//             <option value="idlib">إدلب</option>
//             <option value="quneitra">القنيطرة</option>
//           </select>
//         </div>

//         <Button
//           sx={{ bgcolor: "#509e2d", mt: "20px" }}
//           variant="contained"
//           endIcon={<SearchIcon />}
//           onClick={() => {
//             setFilter(false);
//           }}
//         >
//           بحث
//         </Button>
//       </div>
//     </div>
//   );
// }

function Filter({ setFilter, setCats, status }) {
  // State لإدارة جميع قيم الفلاتر
  const [filters, setFilters] = useState({
    type: "all",
    gender: "all",
    age: "all",
    governorate: "all",
  });
  const [loading,setloading]=useState(false)

  // دالة للتعامل مع تغيير الحقول
  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // دالة البحث
  const handleSearch = async (status) => {
    console.log("قيم الفلاتر:", filters);

    try {
      setloading(true)
      let mAge="all";
      let lmAge="all"
      if (filters.age == 1) {
         mAge = 0;
         lmAge = 6;
      } else if (filters.age == 2) {
         mAge = 7;
         lmAge = 12;
      } else if (filters.age == 3) {
         mAge = 13;
         lmAge = 500;
      }
      const { cats, count } = await filterCat(filters.type,mAge,lmAge,filters.gender,filters.governorate, status);
      // console.log(cats)
      if (count !== 0) {
        setCats(cats);
      } else {
        setCats([]);
      }
      setloading(false)
    } catch (error) {
      // console.log("error search",error)
      setloading(false)
    }

    setFilter(false); // إغلاق الفلتر
  };

  return (
    <div className={styles.filterBg}
     onClick={(e) => e.target === e.currentTarget && setFilter(false)}
    >
      <div className={styles.filterBox}>
        <h3>فلاتر البحث</h3>

        {/* حقل النوع */}
        <div>
          <label>النوع:</label>
          <select
            value={filters.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          >
            <option value="all">-- الكل --</option>
            <option value="القط الشيرازي">القط الشيرازي</option>
            <option value="القط السيامي">القط السيامي</option>
            <option value="القط الهيمالايا">القط الهيمالايا</option>
            <option value="القط الفارسي">القط الفارسي</option>
            <option value="البريطاني قصير الشعر">
              القط البريطاني قصير الشعر
            </option>
            <option value="القط الاسكتلندي مطوي الاذن">
              القط الاسكتلندي مطوي الأذن
            </option>
            <option value="القط سفينكس">القط سفينكس</option>
            <option value="قط راغدول">قط راغدول</option>
            <option value="القط البنغالي">القط البنغالي</option>
            <option value="القط مين كون">القط مين كون</option>
          </select>
        </div>

        {/* حقل الجنس */}
        <div>
          <label htmlFor="gender">الجنس:</label>
          <select
            name="gender"
            id="gender"
            value={filters.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <option value="all">-- الكل --</option>
            <option value="ذكر">ذكر</option>
            <option value="انثى">انثى</option>
          </select>
        </div>

        {/* حقل العمر */}
        <div>
          <label htmlFor="age">العمر:</label>
          <select
            name="age"
            id="age"
            value={filters.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
          >
            <option value="all">-- الكل --</option>
            <option value="1">اصغر من 6 اشهر</option>
            <option value="2">بين 6 اشهر و سنة</option>
            <option value="3">اكبر من سنة</option>
          </select>
        </div>

        {/* حقل المحافظة */}
        <div>
          <label htmlFor="governorate">المحافظة:</label>
          <select
            name="governorate"
            id="governorate"
            value={filters.governorate}
            onChange={(e) => handleInputChange("governorate", e.target.value)}
          >
            <option value="all">-- الكل --</option>
            <option value="دمشق">دمشق</option>
            <option value="ريف دمشق"> ريف دمشق</option>
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

        {/* أزرار البحث  */}
        <div className={styles.buttonsContainer}>
          <Button
            sx={{ bgcolor: "#509e2d", mt: "20px", mr: "10px" }}
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={() => handleSearch(status)}
            loading={loading}
          >
            بحث
          </Button>
        </div>
      </div>
    </div>
  );
}
