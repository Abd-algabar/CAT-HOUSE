import Cat from "../models/Cat.js";
import fs from "fs";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
export const AddCat = async (req, res) => {
  try {
    const { type, age, gender, city, status, description, unit } = req.body;
    if (!type || !age || !gender || !city || !status) {
      return res.status(400).send("All fields are required");
    }
    const images = [];
    for (const file of req.files) {
      const fileBuffer = fs.readFileSync(file.path);
      const result = await imagekit.upload({
        file: fileBuffer,
        fileName: file.originalname,
      });
      images.push(result.url);
      fs.unlinkSync(file.path); // حذف الصورة المؤقتة بعد الرفع
    }
    const user = req.user;
    const newCat = new Cat({
      type,
      age,
      mAge: convertToMonth(age, unit),
      unit,
      gender,
      city,
      status,
      description,
      images,
      owner: user.userId,
    });
    await newCat.save();

    return res.status(201).json({ success: true, cat: newCat });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const GetAllCats = async (req, res) => {
  try {
    const cats = await Cat.find();
    return res.status(200).json({ cats });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const GetCatById = async (req, res) => {
  try {
    const catId = req.params.id;
    const cat = await Cat.findById(catId)
  .populate('owner', 'name phone') // استبدل 'owner' باسم حقل المالك في موديل القط
  .exec();
    if (!cat) {
      return res.status(404).send("Cat not found");
    }
    return res.status(200).json({ cat });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const GetMatingCats = async (req, res) => {
  try {
    const cats = await Cat.find({ status: "mating" });
    if (cats.length === 0) {
      return res.status(404).send("No cats found");
    }
    return res.status(200).json({ cats });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const GetAdoptionCats = async (req, res) => {
  try {
    const cats = await Cat.find({ status: "adoption" });
    if (cats.length === 0) {
      return res.status(404).send("No cats found");
    }
    return res.status(200).json({ cats });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const SearchCatsByType = async (req, res) => {
  try {
    const type = req.query.type;
    const status=req.query.status;
    const cats = await Cat.find({ type: { $regex: type, $options: "i" },status:status });
    
      return res.status(200).json({
      success: true,
      count: cats.length,
      cats: cats
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const Filter = async (req, res) => {
  try {
    const { mAge, gender, type, city, lmAge, status } = req.query;
    let filter = {};
    // if (mAge && mAge !== "all") {
    //   filter.mAge = { $lte: Number(mAge) };
    //   filter.mAge = { $gte: Number(lmAge) };
    // }
    if (mAge && mAge !== "all" && lmAge && lmAge !== "all") {
      filter.mAge = { 
        $gte: Number(mAge), 
        $lte: Number(lmAge) 
      };
    }
    if (type && type !== "all") {
      filter.type = type;
    }
    if (gender && gender !== "all") {
      filter.gender = gender;
    }
    if (city && city !== "all") {
      filter.city = city;
    }
    if (status && status !== "all") {
      filter.status = status;
    }
    const cats = await Cat.find(filter);
    
       return res.status(200).json({
      success: true,
      count: cats.length,
      cats: cats
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

export const getLatestCats = async (req, res) => {
  try {
    const latestCats = await Cat.find({ status: "adoption" })
      .sort({ createdAt: -1 }) // ترتيب تنازلي حسب تاريخ الإنشاء
      .limit(6); // الحد الأقصى 6 قطط

    res.json({
      success: true,
      count: latestCats.length,
      cats: latestCats,
    });
  } catch (error) {
    console.error("Error fetching latest cats:", error);
    res.status(500).json({
      success: false,
      message: "خطأ في جلب البيانات",
    });
  }
};

export const getSomeCats = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const status = req.query.status || "adoption";
    const skip = (page - 1) * limit;

    // جلب القطط مع الترتيب من الأحدث إلى الأقدم
    const cats = await Cat.find({ status: status })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v -owner -mAge -description -status"); // استبعاد حقلي __v و owner

    // العدد الإجمالي للقطط المتاحة
    const totalCats = await Cat.countDocuments({ status: status });
    const totalPages = Math.ceil(totalCats / limit);

    // التحقق من وجود المزيد من الصفحات
    const hasMore = page < totalPages;

    res.json({
      success: true,
      data: {
        cats,
        pagination: {
          currentPage: page,
          totalPages,
          totalCats,
          hasMore,
          nextPage: hasMore ? page + 1 : null,
          limit,
        },
      },
      message: `تم تحميل ${cats.length} قطط`,
    });
  } catch (error) {
    console.error("Error fetching cats:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في السيرفر",
    });
  }
};


export const DeleteCat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    
    const cat = await Cat.findById(id);
    
   
    if (!cat) {
      return res.status(404).json({
        success: false,
        message: 'القط غير موجود'
      });
    }

    // التحقق من أن المستخدم هو مالك القط
    if (cat.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'غير مسموح لك بحذف هذا القط'
      });
    }

    // حذف القط
    await Cat.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'تم حذف القط بنجاح'
    });

  } catch (error) {
    console.error('Error deleting cat:', error);
    

  }
};
// funcution to convert age to months
const convertToMonth = (age, unit) => {
  if (unit === "D") {
    return age / 30;
  } else if (unit === "M") {
    return age;
  } else if (unit === "Y") {
    return age * 12;
  }
};
