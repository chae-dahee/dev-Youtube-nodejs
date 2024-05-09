//express 모듈 세팅
const express = require("express");
const router = express.Router();
router.use(express.json());

let db = new Map();
var id = 1;

router
  .route("/")
  //채널 전체 조회
  .get((req, res) => {
    var { userId } = req.body;
    //json arr
    let channels = [];
    if (db.size && userId) {
      db.forEach((val, key) => {
        if (val.userId === userId) channels.push(val);
      });
      channels.length ? res.status(200).json(channels) : notFoundChannel();
    } else {
      notFoundChannel();
    }
  })
  //채널 개별 생성
  .post((req, res) => {
    if (req.body.channelTitle) {
      let channel = req.body;
      db.set(id++, channel);

      res.status(201).json({
        message: `${db.get(id - 1).channelTitle} 채널을 응원합니다!`,
      });
    } else {
      res.status(404).json({
        message: "요청 값을 제대로 보내주세요.",
      });
    }
  });

router
  .route("/:id")
  //채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = db.get(id);

    if (channel) {
      res.status(200).json(db.get(id));
    } else {
      notFoundChannel();
    }
  })
  //채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = db.get(id);
    let oldTitle = channel.channelTitle;

    if (channel) {
      let newTitle = req.body.channelTitle;
      channel.channelTitle = newTitle;
      db.set(id, channel);

      res.status(200).json({
        message: `채널명이 정상적으로 수정되었습니다. 기존 ${oldTitle} -> ${newTitle}`,
      });
    } else {
      notFoundChannel();
    }
  })
  //채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = db.get(id);

    if (channel) {
      db.delete(id);
      res.status(200).json({
        message: `${channel.channelTitle}이 정상적으로 삭제되었습니다.`,
      });
    } else {
      notFoundChannel();
    }
  });

function notFoundChannel() {
  res.status(404).json({
    message: "채널 정보를 찾을 수 없습니다.",
  });
}

module.exports = router;
