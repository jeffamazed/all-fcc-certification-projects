require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Models
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Must provide username."],
    trim: true,
  },
});
const User = mongoose.model("User", UserSchema);
const ExerciseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Must provide user id."],
  },
  username: {
    type: String,
    required: [true, "Must provide username."],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: [true, "Must provide duration."],
  },
  description: {
    type: String,
    required: [true, "Must provide description."],
    trim: true,
  },
});
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// Custom Error Class
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const asyncWrapper = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// get /api/users
app.get(
  "/api/users",
  asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
  }),
);

// post /api/users
app.post(
  "/api/users",
  asyncWrapper(async (req, res) => {
    const { username, _id } = await User.create(req.body);
    res.status(200).json({ username, _id });
  }),
);

// post /api/users/:id/exercises
app.post(
  "/api/users/:id/exercises",
  asyncWrapper(async (req, res) => {
    const userId = req.params.id;
    const { description, duration, date } = req.body;

    const user = await User.findById(userId);
    if (!user) throw new APIError("User not found.", 404);

    const newExercise = await Exercise.create({
      userId,
      username: user.username,
      date,
      duration,
      description,
    });
    res.status(201).json({
      _id: userId,
      username: user.username,
      date: new Date(date).toDateString(),
      duration: Number(duration),
      description,
    });
  }),
);

// get /api/users/:id/logs
app.get(
  "/api/users/:id/logs",
  asyncWrapper(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) throw new APIError("User not found.", 404);

    const { from, to, limit } = req.query;

    // for filtering on id, form and to
    const filter = { userId };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    // build chaining
    let query = Exercise.find(filter);

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const exerciseLogs = await query;
    const formattedLogs = exerciseLogs.map(
      ({ description, duration, date }) => {
        return { description, duration, date: new Date(date).toDateString() };
      },
    );

    res.status(200).json({
      username: user.username,
      count: formattedLogs.length,
      _id: user._id,
      log: formattedLogs,
    });
  }),
);

// catch all error
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
    return res.status(400).json({ message });
  }

  if (err.name === "CastError") {
    const message = "error";
    return res
      .status(400)
      .json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error." });
});

async function start() {
  try {
    const PORT = process.env.PORT || 3000;
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
