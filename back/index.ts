import express from "express";
import cors from "cors";
import "express-async-errors"

const app = express();

app.use(cors({
    origin: "https://localhost:3000",
}));

app.listen(3001, "0.0.0.0", () => {
    console.log("asdfqwer");
})
