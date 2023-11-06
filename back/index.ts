import express, {json} from "express";
import cors from "cors";
import "express-async-errors"
import {stage0Route} from "./routes/routes";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
//app.use(json);
app.use('/stage0', stage0Route);

app.listen(3001, "0.0.0.0", () => {
    console.log("asdfqwer");
})
