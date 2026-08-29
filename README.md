# GALA HIPPIE — 個人作品集

歐式文青風格的一頁式靜態網站。純 HTML / CSS / JavaScript，沒有套件、沒有建置步驟，
直接用瀏覽器打開 `index.html` 就能看。

```
GalaHippie/
├── index.html          ← 文字內容（自我介紹、報價、Email、IG 連結）都在這裡改
├── Assets/
│   ├── style.css       ← 樣式與色票
│   └── main.js         ← 播放器、文章／插畫排版、燈箱
├── Data/
│   ├── podcast.js      ← Podcast 單集清單
│   ├── articles.js     ← 文章清單
│   ├── instagram.js    ← IG 帳號資訊與最新貼文
│   ├── threads.js      ← Threads 帳號資訊與最新串文
│   ├── shop.js         ← 賣貨便商品
│   └── gallery.js      ← 插畫清單
├── Audio/              ← Podcast 的 mp3 放這裡
└── Images/             ← 大頭照與插畫圖檔放這裡
    ├── Instagram/      ← IG 大頭貼與貼文縮圖
    ├── Gallery/        ← 插畫圖檔
    └── Shop/           ← 賣貨便商品圖
```

## 六個區塊

| # | 區塊 | 內容從哪裡改 |
| --- | --- | --- |
| 01 | Portfolio | `index.html`：大頭照、名字、自我介紹、頻道介紹 |
| 02 | Podcast | `Data/podcast.js`（目前是 Firstory 最新五集） |
| 03 | Articles | `Data/articles.js`（六篇，含封面圖） |
| 04 | Illustration | `Data/gallery.js`（五張）、`Data/shop.js`（賣貨便商品） |
| 05 | Social | `Data/instagram.js`、`Data/threads.js`（帳號資訊＋貼文） |
| 06 | Rates | `index.html`：五個方案的文字與價格、聯絡我信箱 |

## 放大頭照

把照片命名成 `avatar.jpg` 放進 `Images/`。還沒放的時候會顯示粉色虛線的預留位置。
版面是正方形的拱門造型，所以放正方形的圖最剛好（目前放的是節目封面 1400×1400）。

## 新增一集 Podcast

1. 把 mp3 放進 `Audio/`，例如 `Audio/ep01.mp3`
2. 打開 `Data/podcast.js`，在 `[` 和 `]` 之間加一筆：

```js
const EPISODES = [
  {
    no: "EP.01",
    title: "歡迎光臨御宅文青相談所",
    date: "2026.07.27",
    summary: "開張第一集，聊聊為什麼想開一個給御宅族的相談所。",
    audio: "Audio/ep01.mp3",
  },
];
```

`title` 和 `audio` 必填，其餘可省略。最新的一集放最上面。
播放器會自己讀出長度，同時間只會有一集在播，換一集會自動停掉前一集。
路徑打錯時卡片會直接顯示「找不到音檔」，不會默默沒反應。

**目前的設定**：`audio` 欄位填的是 Firstory 的音檔網址，所以 repo 裡不用放 mp3，
上架新集數時到 RSS 複製新的 `<enclosure url="...">` 網址，加一筆在最上面即可：
<https://feed.firstory.me/rss/user/ckcldx33a5b9z09187w6uvs0x>

也可以改放本機 mp3（寫成 `Audio/ep01.mp3`），播放器兩種都吃。
自己放檔案的話建議 128kbps 單聲道，一小時約 30MB；
GitHub Pages 單一檔案上限 100MB，超過就要靠代管平台的網址。

## 新增一篇文章

打開 `Data/articles.js`：

```js
const ARTICLES = [
  {
    title: "當動畫改編遇上原作黨",
    url: "https://vocus.cc/article/xxxxx",
    source: "方格子",
    date: "2026.08.05",
    excerpt: "改編從來不是還原度的競賽。",
  },
];
```

`source` 寫「方格子」「電影神搜」「釀電影」「CCC 追漫台」「關鍵評論網」
會自動配到不同顏色的標籤，其他來源會用預設的淺粉色。
`image` 可以填原文的封面圖網址，也可以放本機圖檔（`Images/xxx.jpg`）；
沒填或圖片掛掉時，卡片會自動變成純文字版，不會出現破圖。
整張卡片可點，會在新分頁開啟原文。

區塊下方的兩個連結（方格子沙龍、方格子個人頁）寫在 `index.html` 的 `.articles-more` 裡。

紙本文章（皇冠雜誌 No.848）是獨立的一塊，寫在 `index.html` 的 `.print-feature`，
封面圖是 `Images/crown-848.jpg`。

## 更新 Instagram / Threads 區

IG 沒有可以直接抓貼文的公開介面，所以這一區是**快照**：圖片存在 `Images/Instagram/`，
資料寫在 `Data/instagram.js`，不會自動更新。想換成新貼文時：

1. 打開那篇貼文，右鍵存下封面圖，覆蓋 `Images/Instagram/post1.jpg`
   （或存成新檔名，再改 `image` 欄位）
2. 把貼文網址貼到 `url`，改 `date`
3. 影片類的把 `type` 寫成 `"reel"`，縮圖右上角會出現 ▶ 標記

粉絲數（`stats`）也是手動的，寫的是 2026.08.21 的數字。

Threads 在 `Data/threads.js`，同樣是手動快照：串文只放文字（`text`）、日期與主題標籤（`topic`），
大頭貼沿用 IG 那張。要換串文就把網址貼到 `url`、改 `date` 與 `text` 即可。

## 新增一張插畫

1. 把圖檔放進 `Images/`，例如 `Images/forest.jpg`
2. 打開 `Data/gallery.js`，把最下面被註解的範例打開來改：

```js
const GALLERY = [
  {
    src: "Images/forest.jpg",
    title: "夜行森林",
    year: "2026",
    note: "個人創作 ・ 數位繪圖",
    alt: "夜晚森林中一隻發光的鹿",
  },
];
```

`src` 和 `title` 必填。點圖可放大，左右鍵換圖、Esc 關閉。
**圖檔建議**：長邊 1600–2000px、JPG 或 WebP、單張 500KB 以內。

目前放的五張是從繪圖帳 @gala_oldsoul 抓下來的**縮圖佔位**（`Images/Gallery/art1–5.jpg`，
640px、IG 壓過的畫質），標題取自貼文內文。想換成原始高解析檔，直接覆蓋那五個檔案即可，
`Data/gallery.js` 不用動。

區塊下方的「嘎拉工作室 @gala_oldsoul」按鈕寫在 `index.html` 的 `.gallery-more` 裡。

## 賣貨便商品

插畫區最下面那五張商品卡在 `Data/shop.js`，商品圖存在 `Images/Shop/`。
賣貨便的商品沒有各自的網址（點商品是在同一頁開視窗），所以每張卡片都連到商店首頁：
<https://myship.7-11.com.tw/general/detail/GM2412209298310>
資料是 2026.08.22 抓的，之後商品換了要自己改 `name` / `price` / `spec` 與圖檔。

## 清單留空時

會顯示粉色虛線的預留位置與提示文字，方便先看排版。放入內容後就會自動消失。

## 為什麼資料是 `.js` 不是 `.json`

因為瀏覽器的安全限制，用 `file://` 直接雙擊開啟時無法讀取 `.json`（會被 CORS 擋下、畫面全空）。
用 `.js` 就沒這個問題，編輯方式幾乎一樣，還可以寫註解。

## 色票

全部集中在 `Assets/style.css` 最上面的 `:root`：

| 變數 | 色碼 | 用途 |
| --- | --- | --- |
| `--paper` | `#f8f5f2` | 背景 |
| `--card` | `#fffefd` | 卡片底色 |
| `--headline` | `#33272a` | 標題文字 |
| `--text` | `#594a4e` | 內文 |
| `--accent` | `#ff8ba7` | 主色：大標、價格、按鈕、連結 |
| `--soft` | `#ffc6c7` | 副色：外框、細線、標籤底 |
| `--mint` | `#c3f0ca` | 第三色：頻道標籤、播放中的單集、關鍵評論網標籤 |

`#ffc6c7` 與 `#c3f0ca` 在米白底上當文字會看不清楚，所以只用在外框、標籤底色，
以及燈箱那種深底的地方。要換配色改這幾行就好，整站會跟著變。

字型只用系統內建的襯線字（macOS 會落在 Songti／Georgia 一類），
沒有下載任何 webfont，所以離線也不會跑版。

## 手機版型

同一份檔案自動切換，沒有另外做手機版網站（RWD）。斷點在 `Assets/style.css` 最下面：

| 寬度 | 變化 |
| --- | --- |
| ≤ 860px | 大頭照與文字改上下排列、文章／報價／Threads 變單欄、賣貨便兩欄 |
| ≤ 640px | 頁首壓成一行（選單可左右滑，右緣有淡出提示）、字級與間距縮小、插畫變單欄、播放器縮圖 72px |
| ≤ 380px | 邊距再收窄、主標字級再降 |

`.section` 有 `scroll-margin-top`，所以點上方選單跳過去時，標題不會被固定頁首蓋住。
要調手機版只改那三個 `@media` 區塊，桌機版不受影響。

## 放到網路上

整個 `GalaHippie/` 資料夾丟上去就好，不需要 build：

- **Netlify / Vercel**：把資料夾拖進網頁的部署區
- **GitHub Pages**：推到 repo，Settings → Pages → 選 branch 的根目錄

本機要預覽帶音檔的版本時，用一般的靜態伺服器開（不要只用 `file://` 測拖曳進度條，
有些簡易伺服器不支援 Range 請求，進度條會拖不動）。

## 待辦

- [ ] 《藍色時期》那篇的封面圖：原站圖檔已失效，想放圖要自己補一張
- [ ] 插畫換成原始高解析檔（目前是 IG 縮圖佔位）
