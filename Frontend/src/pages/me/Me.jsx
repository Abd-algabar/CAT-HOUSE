import React, { useEffect, useState } from 'react'
import styles from "./me.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CatBox from '../../components/04-Cat Box/CatBox';
import { me } from '../../lib/Api';

const Me = () => {
    const[cats,setCats]=useState([]);
    const[user,setUser]=useState({
        name:"",
        phone:""
    })
    const [count,setCount]=useState(0);
    useEffect(()=>{
        getMe()
    },[])

    const getMe=async()=>{
        const data= await me();
        // console.log("1  ",data)
        if (data.success==true) {
            setCats(data.cats.myCats)
            setUser(data.user)
            // console.log(data.user)
            setCount(data.cats.count)
        }

    }
  return (
    <div className={styles.me}>

      <div className={styles.head}>
            <AccountCircleIcon sx={{color:"#509e2d",fontSize:"80px"}}/>
        <h1>حسابي</h1>
      </div>
      <div className={styles.info}>
            <p>الاسم:<span>{user.name}</span></p>
            <p> الرقم:<span>{user.phone}</span></p>
            <p>عدد القطط:<span>{count}</span></p>
      </div>
      <div className={styles.cats}>
       {cats.length !=0?  cats.map((c)=>{

          return < CatBox  key={c._id} cat={c} isOwner={true} />
        }):
          "لا يوجد قطط لديك"
        }
      </div>
    </div>
  )
}

export default Me
