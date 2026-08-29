/* ─────────────────────────────────────────────────────────────
   文章清單
   ─────────────────────────────────────────────────────────────
   在下面的 [ ] 之間照格式加一筆，存檔後重新整理瀏覽器。
   點整張卡片會在新分頁開啟原文。

   欄位說明：
     title    文章標題（必填）
     url      原文網址（必填）
     source   來源。寫「方格子」「電影神搜」「釀電影」「CCC 追漫台」
              「關鍵評論網」會自動配色，其他來源用預設的淺粉色
     date     發布日期（可省略）
     excerpt  一兩句摘要（可省略）
     image    封面圖網址（可省略，沒有就只顯示文字）

   最新的文章放最上面。
   ───────────────────────────────────────────────────────────── */

const ARTICLES = [
  {
    title: "絕命毒師｜人在囧途不得不犯險，人生如化學不得不改變",
    url: "https://vocus.cc/article/62d8f0b6fd89780001d64e19",
    source: "方格子",
    date: "2022.07.28",
    excerpt: "身體的病變揭開序幕，化學老師沃爾特決定在所剩不多的時間裡放手一搏。",
    image: "https://images.vocus.cc/2782cbb8-7d1c-4273-8be4-1d72a52bca90.jpg",
  },
  {
    title: "藝術與我們的距離：破除迷思，從《藍色時期》來看藝術家的腦內世界",
    url: "https://news.agentm.tw/201817/",
    source: "電影神搜",
    date: "2021.12.17",
    excerpt: "一位藝術家的養成需要花多少時間？《藍色時期》把這段過程攤在觀眾面前。",
    // 原文的封面圖已從電影神搜的伺服器上移除（連結 404），
    // 想放圖的話把圖檔存進 Images/，改成 image: "Images/blue-period.jpg"
  },
  {
    title: "閱讀筆記｜狂氣的終焉，變格派推理大師江戶川亂步《人間椅子》中的異色狂想",
    url: "https://vocus.cc/article/6184230afd89780001daec00",
    source: "方格子",
    date: "2021.11.05",
    excerpt: "江戶川亂步的短篇小說集，一瞬間就把讀者帶進一個「不正常」的狂想世界。",
    image: "https://images.vocus.cc/9ae80453-541b-47cc-815b-3f64d1cdb39b.jpg",
  },
  {
    title: "她們的故事｜《使女無懼：瑪格麗特愛特伍》向殘酷世界發起溫柔革命",
    url: "https://vocus.cc/article/610a4f31fd89780001855972",
    source: "方格子",
    date: "2021.08.17",
    excerpt: "愛特伍蒐集世界各地受壓迫卻無法發聲的女性故事，寫進《使女的故事》裡。",
    image: "https://images.vocus.cc/f7f20549-538b-4bae-852e-3904c8c4fec7.jpg",
  },
  {
    title: "《王冠》：童話故事的夢醒、夢碎",
    url: "https://filmaholic.tw/series/60e4145cfd897800011adbe3/",
    source: "釀電影",
    date: "2021.07.06",
    excerpt: "半自傳影集裡的王室婚姻，童話故事翻頁之後是夢醒，還是夢碎。",
    image: "https://filmaholic.tw/wp-content/uploads/2021/07/9ab5e6cc-4a74-4236-a2d6-807dcd773fb0.jpg",
  },
  {
    title: "黑道萌得起來嗎？BL 中的黑道之戀",
    url: "https://www.creative-comic.tw/tw/special_topics/250",
    source: "CCC 追漫台",
    excerpt: "BL 常見的黑道題材，萌點深度大解析。",
    image: "https://www.creative-comic.tw/fs/special_topics/a6e71bf5-82a1-4fb2-8be0-5c13aa64c30f.jpg",
  },
];
