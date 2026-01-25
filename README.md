# 緬甸教育部證書驗證系統

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

> **⚠️ 重要聲明**  
> 本專案**僅供學習和技術研究使用**，不得用於任何官方認證或正式證書驗證用途。  
> 本系統並非緬甸教育部官方系統，任何因濫用本專案而產生的法律問題，開發者概不負責。  
> 如需官方證書驗證服務，請聯繫緬甸教育部相關部門。

---

## 📚 目錄

1. [專案簡介](#專案簡介)
2. [功能特性](#功能特性)
3. [技術棧](#技術棧)
4. [系統架構](#系統架構)
5. [本地部署指南（小白版）](#本地部署指南小白版)
6. [Vercel 部署指南](#vercel-部署指南)
7. [數據庫設置](#數據庫設置)
8. [使用教程](#使用教程)
9. [驗證流程詳解](#驗證流程詳解)
10. [常見問題 FAQ](#常見問題-faq)
11. [下一版本更新計劃](#下一版本更新計劃)
12. [優化建議](#優化建議)
13. [聯繫方式](#聯繫方式)

---

## 專案簡介

這是一個基於 **Next.js 16** 和 **Supabase** 的證書驗證系統，專為緬甸教育部證書驗證場景設計。系統通過 **二維碼掃描 + CAPTCHA 驗證** 的雙重機制，確保證書資訊的真實性和安全性。

### 核心功能

- ✅ 二維碼掃描驗證
- ✅ 紅色像素圖 CAPTCHA 防機器人
- ✅ 緬甸語本地化（緬甸數字轉換）
- ✅ 響應式設計（桌面/手機自適應）
- ✅ UUID 隱私保護
- ✅ 統一錯誤處理
- ✅ Logo 點擊返回首頁

---

## 功能特性

### 🔐 安全特性

| 特性 | 說明 |
|------|------|
| **防 SQL 注入** | 嚴格的 UUID 和證書號格式驗證 |
| **防暴力破解** | 隨機 CAPTCHA，每次訪問不同 |
| **隱私保護** | UUID 查詢後立即清除 URL 參數 |
| **統一錯誤處理** | 所有錯誤統一跳轉，不洩露系統資訊 |

### 🌍 多語言支持

- 緬甸語界面和數字顯示
- 支持繁體中文數據
- 支持英語數據

### 📱 響應式設計

- 桌面端：寬屏佈局，表格清晰展示
- 移動端：可橫向滾動查看完整表格內容
- 自適應字體和間距

---

## 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.1.4 | React 框架（App Router） |
| **React** | 19.2.3 | 前端框架 |
| **TypeScript** | 5.x | 類型安全 |
| **Tailwind CSS** | 4.1.18 | 樣式框架 |
| **Supabase** | 2.91.0 | 數據庫（PostgreSQL） |
| **QRCode** | 1.5.4 | 二維碼生成 |
| **Vercel** | - | 部署平台 |

---

## 系統架構

### 頁面結構

```
/verify                    → 驗證入口頁（CAPTCHA）
/verify/[id]              → 證書詳情頁
/verify/not-found         → 錯誤提示頁
```

### 數據流轉

```
┌─────────────────────────────────────────────────┐
│           Supabase 數據庫                        │
│  表名：dme_certificates                          │
├─────────────────────────────────────────────────┤
│ uuid (主鍵)              | certificate_no        │
│ 615bdfc9-6773-...        | 123456               │
│ student_name             | exam_year            │
│ မောင်လျှမ်းထက်ထွန်း       | ၂၀၂၄                 │
└─────────────────────────────────────────────────┘
         ↑                           ↑
         │ 查詢 1                     │ 查詢 2
         │ (通過 uuid)                │ (通過 certificate_no)
         │                           │
┌────────┴──────────┐      ┌─────────┴──────────┐
│   /verify         │      │  /verify/123456    │
│  (入口頁)          │ ───→ │   (詳情頁)          │
│  - 顯示 CAPTCHA   │Submit│  - 顯示完整信息     │
│  - 驗證 UUID      │      │  - 雙重驗證         │
└───────────────────┘      └────────────────────┘
         │ 錯誤                      │ 錯誤
         └──────────┬────────────────┘
                    ↓
         ┌──────────────────┐
         │ /verify/not-found│
         │    (錯誤頁)       │
         └──────────────────┘
```

---

## 本地部署指南（小白版）

### 前置準備

在開始之前，請確保你的電腦已安裝以下軟體：

1. **Node.js**（建議 18.x 或更高版本）
   - 下載地址：https://nodejs.org/
   - 安裝後，打開終端輸入 `node -v` 檢查是否安裝成功

2. **Git**
   - 下載地址：https://git-scm.com/
   - 安裝後，輸入 `git --version` 檢查

3. **代碼編輯器**（推薦）
   - VS Code：https://code.visualstudio.com/

---

### 步驟 1：克隆專案

打開終端（Windows 用戶可以用 PowerShell 或 CMD），執行以下命令：

```bash
# 克隆專案到本地
git clone https://github.com/gz-zhu/mgsf-verify.git

# 進入專案目錄
cd mgsf-verify
```

---

### 步驟 2：安裝依賴

在專案目錄中執行：

```bash
npm install
```

這會自動安裝所有需要的套件（可能需要幾分鐘）。

---

### 步驟 3：創建 Supabase 項目

1. **訪問 Supabase**  
   打開 https://supabase.com/ 並註冊/登入

2. **創建新項目**  
   - 點擊 "New Project"
   - 輸入項目名稱：`mgsf-verify-db`
   - 設置數據庫密碼（**請記住這個密碼**）
   - 選擇區域（建議選擇離你最近的）
   - 點擊 "Create new project"

3. **等待項目創建完成**（約 2 分鐘）

---

### 步驟 4：設置數據庫

1. **打開 SQL Editor**  
   在 Supabase 控制台左側菜單，點擊 **SQL Editor**

2. **執行建表 SQL**  
   複製以下 SQL 並點擊 **Run**：

```sql
-- 創建證書表
CREATE TABLE IF NOT EXISTS dme_certificates (
  idx SERIAL PRIMARY KEY,
  certificate_no VARCHAR(50) UNIQUE NOT NULL,
  exam_year VARCHAR(20),
  seat_no VARCHAR(50),
  student_name VARCHAR(200),
  dob VARCHAR(50),
  father_name VARCHAR(200),
  mother_name VARCHAR(200),
  compilation VARCHAR(50),
  distinctions TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uuid UUID DEFAULT gen_random_uuid() UNIQUE
);

-- 創建索引
CREATE INDEX idx_certificate_no ON dme_certificates(certificate_no);
CREATE INDEX idx_uuid ON dme_certificates(uuid);
```

3. **插入測試數據**  
   繼續在 SQL Editor 執行：

```sql
-- 插入緬甸語測試數據
INSERT INTO dme_certificates (
  certificate_no, exam_year, seat_no, student_name, dob,
  father_name, mother_name, compilation, distinctions,
  status, uuid
) VALUES (
  '123456',
  '၂၀၂၄',
  'တထဝ ၃၉၄',
  'မောင်လျှမ်းထက်ထွန်း',
  '၁၆-၅-၂၀ဝ၅',
  'ဦးထွန်းလွင်',
  'ဒေါ်လေးလေးနွယ်',
  'STEAMS-2',
  'ဘောဂဗေဒ၊',
  'active',
  '615bdfc9-6773-42f4-9c34-6ae396615fde'
);

-- 插入繁體中文測試數據
INSERT INTO dme_certificates (
  certificate_no, exam_year, seat_no, student_name, dob,
  father_name, mother_name, compilation, distinctions,
  status, uuid
) VALUES (
  '234567',
  '2024年',
  '座位 485',
  '陳美玲',
  '2005年8月12日',
  '陳志明',
  '林淑芬',
  'STAMS-1',
  '地理、歷史',
  'active',
  'a1b2c3d4-5678-90ab-cdef-123456789abc'
);
```

---

### 步驟 5：獲取 Supabase 憑證

1. **打開 Project Settings**  
   在左側菜單點擊 ⚙️ **Settings** → **API**

2. **複製以下信息**：
   - **Project URL**（例如：`https://xxxxx.supabase.co`）
   - **anon public key**（一長串字符）

---

### 步驟 6：配置環境變量

1. **在專案根目錄創建 `.env.local` 文件**  
   （如果使用 VS Code，直接在左側文件列表右鍵 → New File）

2. **填入以下內容**（替換成你的實際值）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://你的項目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon_public_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**範例**：
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### 步驟 7：運行專案

在終端執行：

```bash
npm run dev
```

成功後會看到：

```
✓ Ready in 2.3s
○ Local:   http://localhost:3000
```

---

### 步驟 8：測試驗證

1. **打開瀏覽器**，訪問：  
   `http://localhost:3000/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde`

2. **預期結果**：
   - 看到紅色像素圖顯示：`123456`
   - 在輸入框輸入：`123456`
   - 點擊 Submit
   - 跳轉到證書詳情頁，顯示學生信息

3. **測試錯誤情況**：
   - 訪問：`http://localhost:3000/verify`
   - 輸入任意 6 位數（例如 `999999`）
   - 點擊 Submit
   - 應該跳轉到錯誤頁

---

## Vercel 部署指南

### 步驟 1：準備 Vercel 賬號

1. 訪問 https://vercel.com/
2. 使用 GitHub 賬號登入

---

### 步驟 2：推送代碼到 GitHub

如果你還沒有推送到 GitHub：

```bash
# 初始化 Git（如果還沒初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加遠程倉庫（替換成你的倉庫地址）
git remote add origin https://github.com/你的用戶名/mgsf-verify.git

# 推送
git push -u origin main
```

---

### 步驟 3：在 Vercel 導入項目

1. **點擊 "New Project"**
2. **導入 Git 倉庫**  
   選擇你的 `mgsf-verify` 倉庫
3. **配置環境變量**  
   點擊 "Environment Variables"，添加：

```
NEXT_PUBLIC_SUPABASE_URL = https://你的項目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的anon_public_key
NEXT_PUBLIC_SITE_URL = https://你的項目名.vercel.app
```

4. **點擊 Deploy**

5. **等待部署完成**（約 2 分鐘）

---

### 步驟 4：測試線上版本

部署成功後，訪問：

```
https://你的項目名.vercel.app/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde
```

應該看到和本地一樣的效果！

---

## 數據庫設置

### 表結構說明

| 欄位名 | 類型 | 說明 |
|--------|------|------|
| `idx` | SERIAL | 自增主鍵 |
| `certificate_no` | VARCHAR(50) | 證書號（唯一） |
| `exam_year` | VARCHAR(20) | 考試年份 |
| `seat_no` | VARCHAR(50) | 座位號 |
| `student_name` | VARCHAR(200) | 學生姓名 |
| `dob` | VARCHAR(50) | 出生日期 |
| `father_name` | VARCHAR(200) | 父親姓名 |
| `mother_name` | VARCHAR(200) | 母親姓名 |
| `compilation` | VARCHAR(50) | 科目組合 |
| `distinctions` | TEXT | 優異科目 |
| `status` | VARCHAR(20) | 狀態（active/inactive） |
| `created_at` | TIMESTAMPTZ | 創建時間 |
| `uuid` | UUID | 唯一標識符（用於二維碼） |

### 添加新證書

在 Supabase SQL Editor 執行：

```sql
INSERT INTO dme_certificates (
  certificate_no, exam_year, seat_no, student_name, dob,
  father_name, mother_name, compilation, distinctions
) VALUES (
  '證書號',
  '年份',
  '座位號',
  '學生姓名',
  '出生日期',
  '父親姓名',
  '母親姓名',
  'STEAMS-1',
  '優異科目'
);
```

**注意**：`uuid` 會自動生成，不需要手動填寫。

---

## 使用教程

### 場景 1：通過二維碼掃描

1. 用戶掃描證書上的二維碼
2. 訪問帶有 `uid` 參數的驗證頁面
3. 系統顯示對應的證書號（紅色像素圖）
4. 用戶手動輸入證書號
5. 查看完整證書信息

### 場景 2：手動驗證

1. 用戶直接訪問 `/verify`
2. 看到隨機 6 位數 CAPTCHA
3. 輸入 CAPTCHA 數字
4. 如果證書存在，顯示詳情；否則跳轉錯誤頁

---

## 驗證流程詳解

### 🔐 安全機制

#### 1. UUID 格式驗證
```typescript
const isUUID = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
```

#### 2. 證書號格式驗證
```typescript
if (!/^\d+$/.test(id)) {
  redirect("/verify/not-found")
}
```

#### 3. 一次性決策鎖
```typescript
const hasResolved = useRef(false)  // 防止重複決策
const hasFetched = useRef(false)   // 防止重複查詢
```

### 🔄 完整驗證流程

```
用戶掃碼
    ↓
/verify?uid=615bdfc9-...
    ↓
驗證 UUID 格式
    ↓
查詢數據庫（通過 UUID）
    ↓
顯示證書號（CAPTCHA）
    ↓
用戶輸入證書號
    ↓
查詢數據庫（通過證書號）
    ↓
顯示證書詳情 / 錯誤頁
```

---

## 常見問題 FAQ

### Q1：為什麼本地運行看不到數據？
**A**：檢查以下幾點：
1. `.env.local` 文件是否正確配置
2. Supabase 數據庫是否有插入測試數據
3. 確認 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 是否正確

### Q2：部署到 Vercel 後報錯？
**A**：確認 Vercel 環境變量是否正確設置，特別是 `NEXT_PUBLIC_SITE_URL` 要改成你的 Vercel 域名。

### Q3：如何修改 CAPTCHA 樣式？
**A**：編輯 `app/verify/page.tsx` 中的 `renderCodeToDataUrl` 函數，調整 `fillStyle` 顏色。

### Q4：如何添加更多語言支持？
**A**：在 `toMyanmarNumber` 函數中添加其他語言的數字映射。

### Q5：表格在手機上顯示不全？
**A**：已修復！現在表格可以橫向滾動。確保你使用的是最新版本的代碼。

### Q6：如何生成二維碼？
**A**：目前需要手動生成。下一版本會添加管理後台自動生成二維碼功能。

---

## 下一版本更新計劃

### 🚀 v2.0 計劃功能

#### 1. **管理後台**（優先級：高）
- ✨ 可視化添加/編輯證書
- ✨ 批量導入 Excel/CSV
- ✨ 自動生成二維碼並下載
- ✨ 數據統計儀表板

#### 2. **二維碼管理**（優先級：高）
- ✨ 一鍵生成所有證書的二維碼
- ✨ 批量下載二維碼圖片
- ✨ 可自定義二維碼樣式和尺寸
- ✨ 支持批量打印

#### 3. **數據導入/導出**（優先級：中）
- ✨ Excel 批量導入證書數據
- ✨ CSV 格式導出
- ✨ PDF 批量生成證書

#### 4. **增強安全性**（優先級：中）
- ✨ 管理員登入系統（帳號密碼）
- ✨ 訪問日誌記錄
- ✨ IP 限流防止暴力破解
- ✨ 驗證碼增強（圖形驗證碼）

#### 5. **多語言界面**（優先級：低）
- ✨ 繁體中文界面
- ✨ 英語界面
- ✨ 語言切換功能

#### 6. **API 接口**（優先級：低）
- ✨ RESTful API 供第三方調用
- ✨ API 金鑰管理
- ✨ 接口文檔（Swagger）

---

## 優化建議

### 🎯 性能優化

1. **添加 Redis 緩存**  
   減少數據庫查詢次數，提升響應速度

2. **圖片優化**  
   使用 Next.js Image 組件優化 Logo 加載

3. **代碼分割**  
   按需加載組件，減小初始加載體積

### 🔒 安全優化

1. **添加 Rate Limiting**  
   防止暴力破解和 API 濫用

2. **數據加密**  
   敏感信息加密存儲

3. **審計日誌**  
   記錄所有查詢操作

### 🎨 UI/UX 優化

1. **加載動畫**  
   添加骨架屏和加載動畫

2. **錯誤提示優化**  
   更友好的錯誤提示文案

3. **無障礙優化**  
   支持鍵盤導航和屏幕閱讀器

---

## 專案結構

```
mgsf-verify/
├── app/
│   ├── verify/
│   │   ├── [id]/
│   │   │   └── page.tsx          # 證書詳情頁
│   │   ├── not-found/
│   │   │   └── page.tsx          # 錯誤頁
│   │   └── page.tsx              # 驗證入口頁
│   ├── globals.css               # 全局樣式
│   └── layout.tsx                # 根佈局
├── lib/
│   └── supabase.ts               # Supabase 客戶端配置
├── public/
│   └── logo-ct-dark.png          # Logo 圖片
├── .env.local                    # 環境變量（本地）
├── package.json                  # 專案依賴
├── tsconfig.json                 # TypeScript 配置
├── tailwind.config.ts            # Tailwind CSS 配置
└── README.md                     # 本文件
```

---

## 技術文檔

### 緬甸數字轉換

```typescript
function toMyanmarNumber(input: string): string {
  const map: Record<string, string> = {
    "0": "၀", "1": "၁", "2": "၂", "3": "၃", "4": "၄",
    "5": "၅", "6": "၆", "7": "၇", "8": "၈", "9": "၉",
  }
  return input.replace(/[0-9]/g, (d) => map[d])
}
```

### CAPTCHA 生成

使用 5x7 像素點陣生成紅色數字圖形，防止機器人自動識別。

---

## 貢獻指南

由於本專案目前僅供學習使用，暫不接受外部貢獻。

如需自定義功能，請 Fork 本專案後自行修改。

---

## 聯繫方式

### 如需技術支持或功能定制

- **作者**：gz-zhu
- **GitHub**：https://github.com/gz-zhu/mgsf-verify
- **Email**：請通過 GitHub Issues 聯繫

### 如需專業工程師服務

本專案可作為參考模板，但如需：
- 企業級功能開發
- 系統集成服務
- 安全審計和優化
- 大規模部署支持

**請聯繫專業的軟體開發團隊或全棧工程師**。

---

## 許可證

MIT License

Copyright (c) 2024 gz-zhu

本專案採用 MIT 許可證，但請注意：

⚠️ **本專案僅供學習和技術研究**  
⚠️ **不得用於任何官方認證或正式證書驗證**  
⚠️ **任何因濫用而產生的法律問題，開發者概不負責**

---

## 致謝

- Next.js 團隊
- Supabase 團隊
- Tailwind CSS 團隊
- Vercel 平台

---

**最後更新**：2024年1月  
**版本**：v1.0.0  
**下一版本**：v2.0.0（計劃中）