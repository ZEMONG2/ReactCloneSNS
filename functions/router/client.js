const firebaseApp = require("../config/firebaseModule");

const express = require("express");
const cors = require("cors");
const { credential } = require("../config/firebaseModule");

const Fauth = firebaseApp.auth();
const Fdatabase = firebaseApp.database();

const router = express.Router();

router.use(cors());
router.options("*", cors);

router.post("/user/new", (req, res, next) => {
  const { email, password, nickname } = req.body;
  Fauth.createUser({
    email,
    password,
    displayName: nickname,
  })
    .then((credential) => {
      const { uid } = credential;

      // 유저 프로필 데이터베이스를 만들어서 데이터베이스에 저장하기.
      Promise.all([
        Fdatabase.ref(`users/${uid}/profile/`).set({
          email,
          nickname,
          timestamp: Date.now(),
        }),
        Fdatabase.ref(`statics/nicknames/${uid}`).set(nickname),
      ])
        .then(() => {
          res.status(200).json({
            msg: "유저가 만들어 졌습니다.",
          });
          console.log(uid);
        })
        .catch((err) => {
          res.status(400).json({
            err,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/feed/new", (req, res, next) => {
  const { feed, profile, timestamp, followers } = req.body;
  const { uid: uuid } = profile;

  Fdatabase.ref("feed")
    .push({
      feed,
      profile,
      timestamp,
    })
    .then((snapshot) => {
      const fid = snapshot.key; // 무작위의 키가 만들어진 후에 그 키를 반환합니다.
      Promise.all([
        Fdatabase.ref(`/users/${uuid}/feed`).push({ fid }),
        followers.forEach((item) => {
          const { uid } = item;
          Fdatabase.ref(`/users/${uid}/feed`).push({ fid });
        }),
      ])
        .then(() => {
          res.status(200).json({
            msg: "피드가 올라갔습니다.",
          });
        })
        .catch((err) => {
          res.status(400).json({
            err,
          });
        }); // 유저가 본인의 글을 가져올때 필요합니다.
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/profile/nickname", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`users/${uid}/profile/nickname`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          nickname: snapshot.val(),
        });
      } else {
        res.status(200).json({
          nickname: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/profile/image", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`users/${uid}/profile/image`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          image: snapshot.val(),
        });
      } else {
        res.status(200).json({
          image: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/profile/quote", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref(`users/${uid}/profile/quote`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({
          quote: snapshot.val(),
        });
      } else {
        res.status(200).json({
          quote: undefined,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/user/feed", (req, res, next) => {
  const { uid } = req.body;
  Fdatabase.ref("feed")
    .orderByChild("profile/uid")
    .equalTo(uid)
    .once("value", (snapshot) => {
      //피드가 존재
      if (snapshot.exists()) {
        const value = snapshot.val(); //내가 쓴 글
        const feedlength = Object.keys(value).length;

        res.status(200).json({
          feed: Object.values(value),
          msg: `피드가 ${feedlength}개 존재합니다`,
        });
      } else {
        //피드가 존재하지 않을때
        res.status(200).json({
          feed: [],
          msg: "피드가 존재하지 않습니다",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/friends/recommand", (req, res, next) => {
  const { uid, following } = req.body;

  const reformFollowing = following.map((item) => item.uid);

  Fdatabase.ref("users")
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const userValue = Object.values(val);
        const objectToArr = Object.keys(val).map((item, idx) => {
          return {
            uid: item,
            data: userValue[idx],
          };
        });

        const exceptMe = objectToArr.filter((i) => i.uid !== uid);

        //친구 팔로우 및 팔로잉 작업할때 변경해야함.
        const exceptMyNode = exceptMe.filter(
          (i) => reformFollowing.indexOf(i.uid) === -1
        );

        res.status(200).json({
          friends: exceptMyNode,
          msg: "추천친구를 불러왔습니다",
        });
      } else {
        res.status(200).json({
          friends: [],
          msg: "유저가 없습니다",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/friend/follow", (req, res, next) => {
  const { fuid, uid } = req.body;

  Promise.all([
    Fdatabase.ref(`users/${uid}/following`).push({ uid: fuid }),
    Fdatabase.ref(`users/${fuid}/follower`).push({ uid }),
  ])
    .then(() => {
      res.status(200).json({
        msg: "팔로우 성공",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/friend/unfollow", (req, res, next) => {
  const { fuid, uid } = req.body;

  Promise.all([
    Fdatabase.ref(`users/${uid}/following`)
      .orderByChild("uid")
      .equalTo(fuid)
      .once("value", (snapshot) => {
        snapshot.ref.child(Object.keys(snapshot.val())[0]).remove();
      }),
    Fdatabase.ref(`users/${fuid}/follower`)
      .orderByChild("uid")
      .equalTo(uid)
      .once("value", (snapshot) => {
        snapshot.ref.child(Object.keys(snapshot.val())[0]).remove();
      }),
  ])
    .then(() => {
      res.status(200).json({
        msg: "팔로우 성공",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
});

router.post("/feed/detail", (req, res, next) => {
  const { fid } = req.body;

  Fdatabase.ref(`feed/${fid}`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        res.status(200).json({ data: snapshot.val() });
      } else {
        res.status(400).json({
          msg: "데이터가 없습니다",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

router.get("/helloworld", (req, res, next) => {
  res.json({
    msg: "Helloworld",
  });
});

module.exports = router;
