import React from "react";
import styles from "./footer.module.css";
import Container from "@mui/material/Container";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

import useMediaQuery from "@mui/material/useMediaQuery";

const Footer = () => {
      const matches = useMediaQuery("(min-width: 700px)");

  return (
    <div className={styles.footer}>
      <Container
        sx={{
          display: matches?"flex":"block",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.right}>
          <img src="/logow.png" alt="" width="100px" />

          <div>
            <p>
              <span>رسالتنا:</span>
              جعل التبني أسهل، وأكثر أمانًا، وأكثر إنسانية
            </p>
            <p>
              <span>رؤيتنا:</span>
              عالمٌ تختفي فيه معاناة القطط الضالة، لأن كل قطة وجدت بيتًا يحبها
            </p>
          </div>
        </div>

        <div className={styles.left}>
          <p>تواصل معنا:</p>
          <div className={styles.icon}>
        <FacebookIcon sx={{color:"white"}} />
        <InstagramIcon sx={{color:"white"}} />
        <EmailIcon sx={{color:"white"}} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
