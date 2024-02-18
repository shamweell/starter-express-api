import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/mongodb.js";
import user from "./routes/user.js";
import property from "./routes/property.js";
import document from "./routes/document.js";
import admin from "./routes/admin.js";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
app.use(cors());

app.use("/users", user);
app.use("/properties", property);
app.use("/documents", document);
app.use("/admin", admin);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(resolve(__dirname, 'uploads')));

app.get("/", (req, res) => res.send("App is running"));

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || "3000"}`);
    });
});
