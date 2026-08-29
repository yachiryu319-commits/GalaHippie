/* ─────────────────────────────────────────────────────────────
   Podcast 單集清單 — 御宅文青相談所
   https://galahippie.firstory.io
   ─────────────────────────────────────────────────────────────
   欄位說明：
     no       集數標籤，例如 "EP130"（可省略）
     title    單集標題（必填）
     date     發布日期（可省略）
     summary  一兩句摘要（可省略）
     image    單集封面圖，標題左邊那張（可省略，沒有就不顯示）
     audio    音檔位置（必填）。兩種寫法都可以：
              ・平台網址：從 RSS 複製 <enclosure url="..."> 的網址
                https://feed.firstory.me/rss/user/ckcldx33a5b9z09187w6uvs0x
              ・本機檔案：把 mp3 放進 Audio/，寫成 "Audio/ep01.mp3"

   下面五筆是從 Firstory RSS 抓的最新五集（2026.08.21 更新）。
   出新集數時，把新的一筆加在最上面即可。
   ───────────────────────────────────────────────────────────── */

const EPISODES = [
  {
    no: "EP130",
    title: "戰鬥陀螺Ｘ到底在紅什麼？童年回坑卻發現一陀難求 Ft. 夜貓主廚＆二廚",
    date: "2026.08.13",
    summary: "為什麼連市長議長都搶著辦戰鬥陀螺比賽？黃牛全亞洲掃貨、現在一陀難求，和夜貓主廚＆二廚一起回坑聊個明白。",
    image: "https://image.firstory-cdn.me/Image/ckcldx33a5b9z09187w6uvs0x/DNvstsy2skI9p7X5fx_hL.jpg",
    audio: "https://m.cdn.firstory.me/track/ckcldx33a5b9z09187w6uvs0x/cmslibkph21fy01z61ox53vi8/https%3A%2F%2Ffile.cdn.firstory.me%2FRecord%2Fckcldx33a5b9z09187w6uvs0x%2Fcmslibkph21fz01z67wducieb.mp3?v=1786956170450",
  },
  {
    no: "EP129",
    title: "比八點檔還戲劇化的少女樂團番｜MyGO!!!!! & Ave Mujica",
    date: "2026.07.02",
    summary: "說好了要一起組一輩子樂團！聊梗圖紅遍半邊天的 MyGO!!!!! 與 Ave Mujica，兩個樂團之間的愛恨情仇。",
    image: "https://image.firstory-cdn.me/Image/ckcldx33a5b9z09187w6uvs0x/52K9LQmm5kcfoT44S1UZ-.jpg",
    audio: "https://m.cdn.firstory.me/track/ckcldx33a5b9z09187w6uvs0x/cmqyf7w0h05ca01x43v25ak6k/https%3A%2F%2Ffile.cdn.firstory.me%2FRecord%2Fckcldx33a5b9z09187w6uvs0x%2Fcmqyf7w0h05cb01x49nvy1y76.mp3?v=1786205025785",
  },
  {
    no: "EP128",
    title: "從銀座媽媽桑到國民占星師，是心靈導師或是江湖騙子？細木數子的爭議人生｜地獄占星師",
    date: "2026.06.17",
    summary: "細木數子是昭和期間的傳奇人物，無論你喜不喜歡他，他的身影都佔據了日本大眾的視線。",
    image: "https://image.firstory-cdn.me/Image/ckcldx33a5b9z09187w6uvs0x/-hO7X2uJqh_k7D8VrEYke.jpg",
    audio: "https://m.cdn.firstory.me/track/ckcldx33a5b9z09187w6uvs0x/cmq9ql4dx009i01rp3loc63mg/https%3A%2F%2Ffile.cdn.firstory.me%2FRecord%2Fckcldx33a5b9z09187w6uvs0x%2Fcmq9ql4dx009j01rp4o5t7z6q.mp3?v=1784820636085",
  },
  {
    no: "EP127",
    title: "前往全世界前三大派對：泰國帕岸島滿月派對！【嘎拉的奇妙冒險】",
    date: "2026.05.03",
    summary: "台灣女生在偏僻小島上的狂歡派對、和當地人打泰拳的經歷，同場加映泰國 BL 穿越喜劇《我是暹羅最美的少爺》。",
    image: "https://image.firstory-cdn.me/Image/ckcldx33a5b9z09187w6uvs0x/qDgBUqV699K4YMSJNqeqd.jpg",
    audio: "https://m.cdn.firstory.me/track/ckcldx33a5b9z09187w6uvs0x/cmonrktqj0dir01xra9sv4hhm/https%3A%2F%2Ffile.cdn.firstory.me%2FRecord%2Fckcldx33a5b9z09187w6uvs0x%2Fcmonrktqj0dis01xrdwpx54y1.mp3?v=1780283457792",
  },
  {
    no: "EP126",
    title: "全台最野性、藝術含金量最高的展覽｜草率季第一手現場報導【創作者怎麼說1】",
    date: "2026.04.06",
    summary: "訪問兩位第一次參加草率季的平面設計師 Shawn＆Zii，聊篩選、擺攤與準備期，帶回草率季的第一手消息。",
    image: "https://image.firstory-cdn.me/Image/ckcldx33a5b9z09187w6uvs0x/2P3Nw_R__l8Ln3T3LbrPF.jpg",
    audio: "https://m.cdn.firstory.me/track/ckcldx33a5b9z09187w6uvs0x/cmnkfrl5r043f01wb4x8kd5ys/https%3A%2F%2Ffile.cdn.firstory.me%2FRecord%2Fckcldx33a5b9z09187w6uvs0x%2Fcmnkfrl5r043g01wb41zvgpvm.mp3?v=1782801033392",
  },
];
