const express = require("express")

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const cors = require("cors")
app.use(cors());

app.use(express.json());
const userRouter = require("./routes/auth.routes.js");
const postRouter = require("./routes/post.route.js");


mongoose.connect(process.env.URI).
then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT || 8000,()=>{
        if(Error) console.log(Error);

        console.log(" Running successfully at port ", process.env.PORT);
    });
})
.catch((Error)=>{
    console.log("error ", Error);
});

// app.use("/api/user",userRouter);

app.use(userRouter);
app.use(postRouter);

//create
