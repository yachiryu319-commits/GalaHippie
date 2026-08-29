/* ─────────────────────────────────────────────────────────────
   Instagram 區塊：帳號資訊 + 最新貼文
   ─────────────────────────────────────────────────────────────
   IG 沒有可以直接抓貼文的公開介面，所以這裡是「快照」寫法：
   圖片存在 Images/Instagram/，資料寫在下面，需要時手動更新。

   更新一篇貼文的做法：
     1. 打開貼文 → 右鍵存下封面圖 → 覆蓋 Images/Instagram/post1.jpg
        （或存成新檔名，再改下面的 image 欄位）
     2. 複製貼文網址貼到 url
     3. 改 date，影片類的把 type 寫成 "reel"

   最新的貼文放最上面。粉絲數是 2026.08.21 的數字，之後想更新改 stats 就好。
   ───────────────────────────────────────────────────────────── */

const INSTAGRAM = {
  name: "御宅文青相談所—嘎拉嬉皮Gala",
  handle: "@galahippie",
  url: "https://www.instagram.com/galahippie/",
  avatar: "Images/Instagram/avatar.jpg",
  stats: [
    { num: "3,245", label: "粉絲" },
    { num: "462", label: "追蹤中" },
  ],
  bio: [
    "#podcaster #播客",
    "動漫 ｜ 電影 ｜ 日劇 ｜ 歐美影集",
    "#BL 跟 #藝術 愛好者",
    "畫畫帳 👉 @gala_oldsoul",
  ],
};

const IG_POSTS = [
  {
    url: "https://www.instagram.com/galahippie/p/DcGQeQOD6-_/",
    image: "Images/Instagram/post1.jpg",
    date: "2026.08.16",
    type: "post",
  },
  {
    url: "https://www.instagram.com/galahippie/p/DbQOiU5nyKO/",
    image: "Images/Instagram/post2.jpg",
    date: "2026.07.26",
    type: "post",
  },
  {
    url: "https://www.instagram.com/galahippie/p/DasE_8rFdQW/",
    image: "Images/Instagram/post3.jpg",
    date: "2026.07.12",
    type: "post",
  },
  {
    url: "https://www.instagram.com/galahippie/p/DaaJvPVkwWT/",
    image: "Images/Instagram/post4.jpg",
    date: "2026.07.05",
    type: "post",
  },
  {
    url: "https://www.instagram.com/galahippie/reel/DZ2i-vuDE5H/",
    image: "Images/Instagram/post5.jpg",
    date: "2026.06.21",
    type: "reel",
  },
];
