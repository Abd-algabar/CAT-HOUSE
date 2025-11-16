import React from 'react'
import styles from "./AdoptCats.module.css"
import SearchIcon from '@mui/icons-material/Search';
import Search from '../../components/08-search/Search';
import CatBox from '../../components/04-Cat Box/CatBox';
import { Button } from '@mui/material';
import { useState,useEffect } from 'react';
import { getSomeCats,searchCat } from '../../lib/Api';
const AdoptCats = () => {
   const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCats();
  }, []);
  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await getSomeCats(page, 12, 'adoption');
      // setPage(response.data.pagination.currentPage)
      // console.log(response);
      if (page == 1) {
        setCats(response.data.cats);
      }else {
        setCats((prevCats) => [...prevCats, ...response.data.cats]);
      }
       
      setPage(response.data.pagination.nextPage);
      setHasMore(response.data.pagination.hasMore);
      
      // console.log("stat:",page,hasMore);
     
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في جلب البيانات');
      setLoading(false);
    }
  }

  
  return (
    <div className={styles.adopt} >
      <Search setCats={setCats} status="adoption" />

      <div className={styles.cats}>
        {cats.length !=0?  cats.map((c)=>{

          return < CatBox  key={c._id} cat={c} />
        }):
          "لايوجد قطط من هذا النوع"
        }
      </div>
      {hasMore?<Button
            variant="contained"
            sx={{ bgcolor: "#509e2d" }}
            onClick={() => {
            fetchCats()
            }}
            loading={loading}
          >
             عرض المزيد
          </Button> : <h3 style={{textAlign:"center"}}>لا يوجد المزيد من القطط</h3>}
    </div>
  )
}

export default AdoptCats
