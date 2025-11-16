import React from "react";
import styles from "../Adopt cats/AdoptCats.module.css";
import { useState, useEffect } from "react";
import Search from "../../components/08-search/Search";
import CatBox from "../../components/04-Cat Box/CatBox";
import { getSomeCats } from "../../lib/Api";
import { Button } from "@mui/material";
const CatsForMating = () => {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCats();
  }, []);
  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await getSomeCats(page, 12, "mating");
      // setPage(response.data.pagination.currentPage)
      console.log(response);
      if (page == 1) {
        setCats(response.data.cats);
      } else {
        setCats((prevCats) => [...prevCats, ...response.data.cats]);
      }

      setPage(response.data.pagination.nextPage);
      setHasMore(response.data.pagination.hasMore);

      // console.log("stat:",page,hasMore);

      setLoading(false);
    } catch (err) {
      setError("حدث خطأ في جلب البيانات");
      setLoading(false);
    }
  };
  return (
    <div className={styles.adopt}>
      <Search setCats={setCats} status="mating" />

      <div className={styles.cats}>
        {cats.length !=0?  cats.map((c)=>{

          return < CatBox  key={c._id} cat={c} />
        }):
          "لايوجد قطط من هذا النوع"
        }
      </div>
      {hasMore ? (
        <Button
          variant="contained"
          sx={{ bgcolor: "#509e2d" }}
          onClick={() => {
            fetchCats();
          }}
          loading={loading}
        >
          عرض المزيد
        </Button>
      ) : (
        <h3 style={{ textAlign: "center" }}>لا يوجد المزيد من القطط</h3>
      )}
    </div>
  );
};

export default CatsForMating;
