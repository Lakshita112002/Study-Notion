import express from "express";
import { connect, model, Schema } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

try {
  connect(process.env.MONGODB_URI)
    .then(console.log("DB Connected"))
    .catch((err) => console.log("Error in url: ", err));
} catch (error) {
  console.log("DB not Connected");
}

const userSchema = Schema(
  {
    Username: { type: String },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { versionKey: false },
  { strict: false }
);

const FacultySchema = Schema(
  {
    Username: { type: String },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { versionKey: false },
  { strict: false }
);

const CourseSchema = Schema(
  {
    CourseName: { type: String, required: true },
    CourseImg: { type: String },
    CourseDesc: { type: String },
    CourseVideo: { type: String },
    FacultyID: { type: String, required: true },
  },
  { versionKey: false },
  { strict: false }
);

const EnrolledCourseschema = Schema(
  {
    courseID: { type: String },
    userID: { type: String, required: true },
  },
  { versionKey: false },
  { strict: false }
);

const User = model("Users", userSchema);
const Faculty = model("Faculty", FacultySchema);
const Course = model("Courses", CourseSchema);
const EnrolledCourse = model("EnrolledCourses", EnrolledCourseschema);

app.post("/auth/login", (req, res) => {
  try {
    const { Email, Password } = req.body;
    User.findOne({ $and: [{ Email }, { Password }] })
      .then((item) => {
        if (item !== null) {
          res.send({
            message: "Login Successfully",
            data: item,
            success: true,
          });
        } else {
          res.send({
            message: "Username or Password Incorrect",
            data: item,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.send({ message: "Username or Password Incorrect", success: false });
      });
  } catch {
    res.send({ message: "Customer Login Failed", success: false });
  }
});

app.post("/auth/faculty/login", (req, res) => {
  try {
    const { Email, Password } = req.body;
    Faculty.findOne({ $and: [{ Email }, { Password }] })
      .then((item) => {
        if (item !== null) {
          res.send({
            message: "Login Successfully",
            data: item,
            success: true,
          });
        } else {
          res.send({
            message: "Username or Password Incorrect",
            data: item,
            success: false,
          });
        }
      })
      .catch((err) => {
        res.send({ message: "Username or Password Incorrect", success: false });
      });
  } catch {
    res.send({ message: "Customer Login Failed", success: false });
  }
});

const isEmailAlreadyInUse = async (email) => {
  const existingUser = await User.findOne({ Email: email });
  return !!existingUser;
};

app.post("/auth/register", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;

    const emailInUse = await isEmailAlreadyInUse(Email);
    if (emailInUse) {
      return res.send({ message: "Email already in use", success: false });
    }

    const users = new User({
      Username,
      Email,
      Password,
    });

    users
      .save()
      .then((item) => {
        res.send({ message: "User Registered", data: item, success: true });
      })
      .catch((err) => {
        res.send({ message: "Try Again", success: false });
      });
  } catch {
    res.send({ message: "Register Failed", success: false });
  }
});

const isEmailAlreadyInUseF = async (email) => {
  const existingUser = await Faculty.findOne({ Email: email });
  return !!existingUser;
};

app.post("/auth/faculty/register", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;

    const emailInUse = await isEmailAlreadyInUseF(Email);
    if (emailInUse) {
      return res.send({ message: "Email already in use", success: false });
    }

    const users = new Faculty({
      Username,
      Email,
      Password,
    });

    users
      .save()
      .then((item) => {
        res.send({ message: "Faculty Registered", data: item, success: true });
      })
      .catch((err) => {
        res.send({ message: "Try Again", success: false });
      });
  } catch {
    res.send({ message: "Register Failed", success: false });
  }
});

const isCourseAlreadyInUse = async (CourseName) => {
  const existingUser = await Course.findOne({ CourseName });
  return !!existingUser;
};

app.post("/auth/faculty/addCourse", async (req, res) => {
  try {
    const { CourseName, CourseImg, CourseDesc, CourseVideo,FacultyID } = req.body;

    const courseInUse = await isCourseAlreadyInUse(CourseName);
    if (courseInUse) {
      return res.send({ message: "Course already added", success: false });
    }
    const addCourse = new Course({
      CourseName,
      CourseImg,
      CourseDesc,
      CourseVideo,
      FacultyID
    });
    addCourse
      .save()
      .then((item) => {
        res.send({ message: "Course Added", data: item, success: true });
      })
      .catch((err) => {
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    res.send({ message: "Course Can't Added", success: false });
  }
});

const isEnrolledCourseAlreadyInUse = async (id, userID) => {
  const existingUser = await EnrolledCourse.findOne({
    courseID: id,
    userID: userID,
  });
  return !!existingUser;
};

app.post("/auth/AddEnrolledCourse", async (req, res) => {
  try {
    const { id, userID } = req.body;

    const courseInUse = await isEnrolledCourseAlreadyInUse(id, userID);
    if (courseInUse) {
      return res.send({ message: "Course already Enrolled", success: true });
    }

    const addCourse = new EnrolledCourse({
      courseID: id,
      userID: userID,
    });

    addCourse
      .save()
      .then((item) => {
        res.send({ message: "Course Enrolled", data: item, success: true });
      })
      .catch((err) => {
        res.send({ message: "Please Try Again", success: false });
      });
  } catch (err) {
    res.send({ message: "Course Can't Added", success: false });
  }
});

app.get("/auth/getAllCourse", (req, res) => {
  try {
    Course.find({})
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    Course.findOne({ _id: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/faculty/getAllCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    Course.find({ FacultyID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.get("/auth/getEnrolledCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    EnrolledCourse.find({ userID: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Course");
      });
  } catch {
    res.send("db error");
  }
});

app.delete("/auth/faculty/DeleteCourse/:id", (req, res) => {
  try {
    const { id } = req.params;
    Course.deleteOne({ _id: id })
      .then((item) => {
        res.send({ data: item });
      })
      .catch((err) => {
        res.send("Can't Find Delete");
      });
  } catch {
    res.send("db error");
  }
});

app.listen(PORT, function () {
  console.log(`Backend is running on Port: ${PORT}`);
});
