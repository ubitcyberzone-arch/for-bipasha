import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.user = username;
    return res.redirect("/ALL SER.html");
  }
  res.redirect("/login.html?error=1");
});

function checkAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login.html");
}

app.get("/ALL SER.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ALL SER.html"));
});

app.get("/print.html", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "print.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
