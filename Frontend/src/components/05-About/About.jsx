import React from 'react'
import styles from "./About.module.css"
const About = () => {
  return (
    <div className={styles.About}>
      <div className={styles.text}>
        <h2>من نحن ...</h2>
        <p>نحن ، المنصة الأولى والوحيدة في سوريا  لربط محبي القطط ببعضهم البعض، بهدف تسهيل عملية التبني وضمان حياة
أفضل للقطط الضالة أو تلك التي تحتاج إلى رعاية .
نؤمن بأن كل قطة تستحق بيتًا دافئًا وأسرةً تحبها، لذلك أنشأنا هذا الموقع ليكون الجسر بين المربين الراغبين في إيجاد منازل آمنة
لقططهم، والأشخاص الباحثين عن رفيق  يملأ حياتهم بالفرح</p>
      </div>
      <div className={styles.image}>
            <img src="/about.jpg" alt="" width={"400px"} />
      </div>
    </div>
  )
}

export default About
