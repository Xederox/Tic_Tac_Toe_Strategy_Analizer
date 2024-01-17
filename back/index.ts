import express from "express";
import cors from "cors";
import "express-async-errors"
import {solvedRoute} from "./routes/solvedRoute";
import {monteRoute} from "./routes/monteRoute";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
//app.use(json);
app.use('/solved', solvedRoute);
app.use('/monte', monteRoute);

app.listen(3001, "0.0.0.0", () => {
    console.log("asdfqwer");
})
