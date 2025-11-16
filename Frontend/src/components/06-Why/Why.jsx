import React from "react";
import styles from "./Why.module.css";
const Why = () => {
  return (
    <div className={styles.why}>
      <h2>لماذا نقوم بذالك؟</h2>

      <div className={styles.t1}>

        

        <div className="text">
          <div className={styles.roll}>
            <h4>1-لإنقاذ حياة القطط</h4>
            <p>
              كثير من القطط تُترك في الشوارع أو الملاجئ دون رعاية كافية. نريد
              تقليل هذه المعاناة بتشجيع التبني بدل الشراء
            </p>
          </div>
          <div>
            <h4>2-لنشر الوعي حول التبني المسؤول</h4>
            <p>
              ليس التبني مجرد إحضار قطة إلى المنزل، بل هو التزام بالرعاية طوال
              حياتها. نقدم النصائح والموارد لضمان نجاح كل عملية تبني
            </p>
          </div>
        </div>

<div className={styles.image}>
          <img src="/wq.jpg" alt="" width="340px" />
        </div>
      </div>

      <div className={styles.t2}>
        <div className={styles.image}>
          <img src="/w2.jpg" alt="" width="340px" />
        </div>
        <div className="text">
          <div className={styles.roll}>
            <h4>3- لبناء مجتمع محبي القط</h4>
            <p>نريد أن يكون الموقع مكانًا يجمع الناس حول قضية إنسان ية، عبر مشاركة التجارب والدعم المتبادل </p>
          </div>
          <div>
            <h4>4- لتسهيل العملية على الجميع</h4>
            <p>بعيدًا عن التعقيدات، نوفر أداة بسيطة وآمنة للتواصل بين المربين والمتبنين، مع الحفاظ على خصوصية الجميع</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
