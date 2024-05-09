//express 모듈 세팅
const express = require("express");
const app = express();
app.listen(7777);

//user모듈 미들웨어 생성
const userRouter = require("./routes/users");
const channelRouter = require("./routes/channels");

//모듈 사용
app.use("/", userRouter);
app.use("/channels", channelRouter); //공통된 url 빼내기
