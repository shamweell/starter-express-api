import app from './config/app.js';
import { connectDB } from "./config/mongodb.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server listening on port ${process.env.PORT || "3000"}`);
    });
});
