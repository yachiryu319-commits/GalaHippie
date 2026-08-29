/* ─────────────────────────────────────────────────────────────
   賣貨便商品（7-11 賣貨便：御宅文青相談所GALA）
   ─────────────────────────────────────────────────────────────
   商店網址：https://myship.7-11.com.tw/general/detail/GM2412209298310

   賣貨便的商品沒有各自的網址（點商品是在同一頁開視窗），
   所以每張卡片的購買連結都指向商店首頁，進去再點該商品即可。

   要更新時：商品圖存進 Images/Shop/，改下面的 name / price / spec / image。
   資料是 2026.08.22 從商店頁抓的。
   ───────────────────────────────────────────────────────────── */

const SHOP = {
  name: "御宅文青相談所GALA",
  platform: "7-11 賣貨便",
  url: "https://myship.7-11.com.tw/general/detail/GM2412209298310",
};

const SHOP_ITEMS = [
  {
    name: "【VTUBER】ROF-MAO 靈魂交換同人本－ROF-MAO 別做了吧",
    price: 160,
    spec: "B5 ・ 20P",
    image: "Images/Shop/item1.jpg",
  },
  {
    name: "進擊的巨人 銀箔小卡",
    price: 50,
    spec: "92 × 56 mm",
    image: "Images/Shop/item2.jpg",
  },
  {
    name: "忍者亂太郎 全斷貼紙組",
    price: 100,
    spec: "9 × 13 cm ・ 不分售",
    image: "Images/Shop/item3.jpg",
  },
  {
    name: "彩虹社 VTuber｜ROF-MAO 星鑽圖鑑貼紙",
    price: 80,
    spec: "12 × 15 cm",
    image: "Images/Shop/item4.jpg",
  },
  {
    name: "VTuber 周邊｜刀也花生君＿刀P Christmas 雙面壓克力飯友",
    price: 120,
    spec: "5 × 5 cm",
    image: "Images/Shop/item5.jpg",
  },
];
