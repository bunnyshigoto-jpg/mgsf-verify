# 文件驗證系統 - 技術學習示例（Document Verification Demo - Academic Learning Project）

**語言 / Language / ဘာသာစကား**  
[繁體中文](README.md) | [English](README.en.md) | [မြန်မာဘာသာ](README.my.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

---

## ⚠️ 重要聲明 - CRITICAL DISCLAIMER

### 本專案性質說明

**這是一個純粹的技術學習專案（Academic Learning Project）**

本專案是為程式設計教學、軟體工程學習、系統架構研究而建立的範例程式碼（Sample Code），
展示如何使用 Next.js + Supabase 實作具有驗證機制的資料查詢系統。

### 本專案「不是」什麼

❌ **不是任何國家、地區、組織的官方系統**  
❌ **不具備任何法律效力或認證功能**  
❌ **不代表、不模仿、不影射任何真實存在的驗證平台**  
❌ **不可用於任何正式、官方、具法律約束力的場景**  
❌ **不提供真實證書驗證服務**  
❌ **不與任何政府機構、教育機構有關聯**

### 本專案「僅是」什麼

✅ **純粹的程式碼學習範例（Code Example for Learning）**  
✅ **技術架構示範（Technical Architecture Demonstration）**  
✅ **開源教學專案（Open Source Educational Project）**  
✅ **軟體工程練習（Software Engineering Practice）**

### 資料說明

本專案中所有資料、欄位名稱、介面文字均為：
- **虛構的示例資料（Fictional Sample Data）**
- **教學用途的假設情境（Hypothetical Scenario for Teaching）**
- **不代表任何真實個人、機構或文件**

雖然介面使用緬甸語作為展示範例（僅因該語言具備特殊字符系統，適合展示多語言處理技術），
但這**不代表**本系統與緬甸任何機構有關，也**不應被解讀為**任何形式的官方系統。

### 法律免責聲明

1. **使用責任**：任何人使用、修改、部署本程式碼所產生的一切後果，由使用者自行承擔
2. **無保證聲明**：本專案不保證程式碼的安全性、可靠性、適用性
3. **禁止濫用**：嚴禁將本專案用於詐欺、偽造、誤導公眾或其他違法用途
4. **無關聯聲明**：本專案與任何政府、教育機構、認證機構無任何形式的合作、授權或關聯

### 如需官方服務

如您需要真實的證書驗證服務，請：
- 直接聯繫相關政府教育部門
- 訪問官方認證網站
- 諮詢合法的驗證機構

**本專案無法、也不應被用於任何實際驗證用途**

---

## 📚 目錄

1. [學習目標](#學習目標)
2. [技術功能展示](#技術功能展示)
3. [技術棧](#技術棧)
4. [系統架構說明](#系統架構說明)
5. [本地開發環境設置](#本地開發環境設置)
6. [Vercel 部署練習](#vercel-部署練習)
7. [資料庫結構設計](#資料庫結構設計)
8. [程式碼學習重點](#程式碼學習重點)
9. [驗證流程實作解析](#驗證流程實作解析)
10. [常見技術問題](#常見技術問題)
11. [擴展學習方向](#擴展學習方向)
12. [最佳實踐建議](#最佳實踐建議)

---

## 學習目標

這個範例專案旨在幫助開發者學習以下技術概念：

### 核心學習內容

| 技術領域 | 學習要點 |
|---------|---------|
| **全端開發** | Next.js 16 App Router、React Server Components |
| **資料庫操作** | Supabase PostgreSQL、SQL 查詢、索引設計 |
| **安全機制** | 輸入驗證、CAPTCHA 實作、UUID 應用 |
| **使用者體驗** | 響應式設計、錯誤處理、狀態管理 |
| **國際化** | 多語言數字轉換、字符集處理 |

### 適合對象

- 正在學習 Next.js 的開發者
- 想了解全端應用架構的學生
- 研究安全驗證機制的工程師
- 探索多語言系統實作的程式設計師

---

## 技術功能展示

### 🔐 安全機制範例

本專案展示以下安全技術實作：

| 功能 | 技術實作 | 學習重點 |
|------|----------|---------|
| **SQL 注入防護** | UUID/證書號格式驗證 | 正則表達式應用 |
| **防機器人** | 自訂 CAPTCHA 圖形生成 | Canvas API、像素點陣 |
| **隱私保護** | URL 參數清理 | 前端路由控制 |
| **錯誤處理** | 統一錯誤頁面重定向 | Next.js redirect() |

### 🌍 多語言技術展示

展示如何處理非拉丁字符系統：

- 緬甸語數字轉換演算法
- Unicode 字符處理
- 多語言資料存儲

### 📱 響應式設計範例

- Tailwind CSS 響應式工具類
- 移動端表格橫向滾動
- 自適應佈局實作

---

## 技術棧

| 技術 | 版本 | 用途說明 |
|------|------|----------|
| **Next.js** | 16.1.4 | React 框架（展示 App Router 用法） |
| **React** | 19.2.3 | 前端框架（展示 Server Components） |
| **TypeScript** | 5.x | 類型安全（展示型別定義） |
| **Tailwind CSS** | 4.1.18 | 樣式框架（展示工具類應用） |
| **Supabase** | 2.91.0 | PostgreSQL（展示雲端資料庫整合） |
| **QRCode** | 1.5.4 | 二維碼生成（展示第三方套件整合） |
| **Vercel** | - | 部署平台（展示 CI/CD 流程） |

---

## 系統架構說明

### 路由結構（僅供學習參考）

```
/verify                    → 入口頁（展示 CAPTCHA 實作）
/verify/[id]              → 動態路由（展示參數處理）
/verify/not-found         → 錯誤處理（展示重定向機制）
```

### 資料流程示意（學習用流程圖）

```
┌─────────────────────────────────────────────────┐
│         模擬資料庫（僅供學習）                      │
│  表名：demo_documents (示例表名)                  │
├─────────────────────────────────────────────────┤
│ uuid (示例主鍵)          | document_no (示例)     │
│ 615bdfc9-6773-...        | 123456                │
│ holder_name (虛構)       | issue_year (虛構)      │
│ ဥပမာအမည်                 | ၂၀၂၄                  │
└─────────────────────────────────────────────────┘
         ↑                           ↑
         │ 查詢 1                     │ 查詢 2
         │ (學習 UUID 查詢)            │ (學習文件號查詢)
         │                           │
┌────────┴──────────┐      ┌─────────┴──────────┐
│   /verify         │      │  /verify/123456    │
│  (示例入口)        │ ───→ │   (示例詳情頁)      │
│  - CAPTCHA 展示   │Submit│  - 資料顯示範例     │
│  - UUID 驗證範例  │      │  - 雙重驗證示範     │
└───────────────────┘      └────────────────────┘
         │ 錯誤情境                  │ 錯誤情境
         └──────────┬────────────────┘
                    ↓
         ┌──────────────────┐
         │ /verify/not-found│
         │  (錯誤處理示範)   │
         └──────────────────┘
```

**說明**：此流程圖僅展示程式邏輯，不代表真實系統運作

---

## 本地開發環境設置

### 前置需求（學習環境準備）

開始學習本專案前，請先安裝以下工具：

1. **Node.js**（建議 18.x 或更高）
   - 官網：https://nodejs.org/
   - 驗證安裝：`node -v`

2. **Git**
   - 官網：https://git-scm.com/
   - 驗證安裝：`git --version`

3. **程式碼編輯器**（建議）
   - VS Code：https://code.visualstudio.com/

---

### 步驟 1：下載專案程式碼

```bash
# 克隆學習專案
git clone https://github.com/gz-zhu/mgsf-verify.git

# 進入專案資料夾
cd mgsf-verify
```

---

### 步驟 2：安裝相依套件

```bash
npm install
```

---

### 步驟 3：建立練習用資料庫

1. **註冊 Supabase 帳號**  
   https://supabase.com/（免費學習用）

2. **建立新專案**  
   - 專案名稱：`learning-cert-verify`（或任意名稱）
   - 設定資料庫密碼
   - 選擇區域

3. **等待專案建立完成**

---

### 步驟 4：建立示例資料表

在 Supabase SQL Editor 執行以下 SQL：

```sql
-- 建立示例資料表（僅供學習）
-- 注意：這不是真實的文件資料表
CREATE TABLE IF NOT EXISTS demo_documents (
  idx SERIAL PRIMARY KEY,
  document_no VARCHAR(50) UNIQUE NOT NULL,
  issue_year VARCHAR(20),
  reference_no VARCHAR(50),
  holder_name VARCHAR(200),
  issue_date VARCHAR(50),
  parent_name_1 VARCHAR(200),
  parent_name_2 VARCHAR(200),
  category VARCHAR(50),
  remarks TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  uuid UUID DEFAULT gen_random_uuid() UNIQUE
);

-- 建立索引（學習索引優化）
CREATE INDEX idx_document_no ON demo_documents(document_no);
CREATE INDEX idx_uuid ON demo_documents(uuid);
```

插入虛構測試資料：

```sql
-- 插入虛構的緬甸語示例資料（純屬虛構，僅供程式測試）
INSERT INTO demo_documents (
  document_no, issue_year, reference_no, holder_name, issue_date,
  parent_name_1, parent_name_2, category, remarks,
  status, uuid
) VALUES (
  '123456',
  '၂၀၂၄',
  'REF-၃၉၄',
  'ဥပမာအမည်',  -- 虛構姓名
  '၁၆-၅-၂၀ဝ၅',
  'ဥပမာမိဘ-၁',  -- 虛構資料
  'ဥပမာမိဘ-၂',  -- 虛構資料
  'EXAMPLE-1',
  'ဥပမာမှတ်ချက်၊',
  'active',
  '615bdfc9-6773-42f4-9c34-6ae396615fde'
);

-- 插入虛構的繁體中文示例資料（純屬虛構，僅供程式測試）
INSERT INTO demo_documents (
  document_no, issue_year, reference_no, holder_name, issue_date,
  parent_name_1, parent_name_2, category, remarks,
  status, uuid
) VALUES (
  '234567',
  '2024年',
  '參考編號 485',
  '範例姓名',  -- 虛構姓名
  '2005年8月12日',
  '範例資料-1',  -- 虛構資料
  '範例資料-2',  -- 虛構資料
  'EXAMPLE-2',
  '範例備註',
  'active',
  'a1b2c3d4-5678-90ab-cdef-123456789abc'
);
```

**重要提醒**：這些資料完全虛構，不對應任何真實人物或證書

---

### 步驟 5：設定環境變數

在專案根目錄建立 `.env.local`：

```env
# Supabase 連線設定（從 Project Settings → API 取得）
NEXT_PUBLIC_SUPABASE_URL=https://你的專案ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_anon_public_key

# 本地開發網址
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### 步驟 6：啟動開發伺服器

```bash
npm run dev
```

成功後瀏覽器開啟：`http://localhost:3000`

---

### 步驟 7：測試程式功能

**測試情境 1：UUID 查詢流程**

訪問：
```
http://localhost:3000/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde
```

預期結果：
- 看到紅色像素 CAPTCHA 顯示 `123456`
- 輸入 `123456` 後提交
- 顯示虛構的示例資料

**測試情境 2：錯誤處理**

訪問：
```
http://localhost:3000/verify
```

- 輸入不存在的文件號（如 `999999`）
- 應跳轉到錯誤頁面

---

## Vercel 部署練習

### 步驟 1：準備 Vercel 帳號

1. 訪問 https://vercel.com/
2. 使用 GitHub 登入

---

### 步驟 2：推送到 GitHub

```bash
# 初始化 Git
git init

# 提交程式碼
git add .
git commit -m "Learning project initial commit"

# 推送到 GitHub
git remote add origin https://github.com/你的帳號/你的repo名稱.git
git push -u origin main
```

---

### 步驟 3：在 Vercel 部署

1. 點擊 "New Project"
2. 匯入你的 GitHub repository
3. 設定環境變數：

```
NEXT_PUBLIC_SUPABASE_URL = https://你的專案ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = 你的_anon_key
NEXT_PUBLIC_SITE_URL = https://你的專案名.vercel.app
```

4. 點擊 "Deploy"

---

### 步驟 4：驗證部署

訪問：
```
https://你的專案名.vercel.app/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde
```

---

## 資料庫結構設計

以下為本學習專案使用的資料表設計範例：

### 示例欄位說明

| 欄位名 | 資料型別 | 用途說明 |
|--------|----------|---------|
| `idx` | SERIAL | 自增主鍵（學習主鍵設計） |
| `document_no` | VARCHAR(50) | 示例文件號（學習唯一約束） |
| `issue_year` | VARCHAR(20) | 示例年份（學習資料儲存） |
| `reference_no` | VARCHAR(50) | 示例參考號 |
| `holder_name` | VARCHAR(200) | 虛構姓名（學習字符集處理） |
| `issue_date` | VARCHAR(50) | 示例日期 |
| `parent_name_1` | VARCHAR(200) | 虛構資料 |
| `parent_name_2` | VARCHAR(200) | 虛構資料 |
| `category` | VARCHAR(50) | 示例分類 |
| `remarks` | TEXT | 示例文字欄位 |
| `status` | VARCHAR(20) | 狀態欄位（學習列舉設計） |
| `created_at` | TIMESTAMPTZ | 時間戳記（學習時區處理） |
| `uuid` | UUID | 通用唯一識別碼（學習 UUID 應用） |

**學習重點**：
- PRIMARY KEY 與 UNIQUE 約束的差異
- VARCHAR vs TEXT 的使用時機
- 索引對查詢效能的影響
- UUID 作為外部識別碼的優勢

---

## 程式碼學習重點

### 🔐 安全驗證實作

#### UUID 格式驗證

```typescript
// 學習正則表達式應用
const isUUID = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
```

**學習要點**：
- 正則表達式的構成
- 輸入驗證的重要性
- 防止 SQL 注入的方法

#### 文件號格式驗證

```typescript
// 學習數字格式驗證
if (!/^\d+$/.test(id)) {
  redirect("/verify/not-found")
}
```

#### 防止重複查詢

```typescript
// 學習 React useRef 應用
const hasResolved = useRef(false)
const hasFetched = useRef(false)
```

---

### 🌍 多語言處理

#### 緬甸數字轉換演算法

```typescript
// 學習字符映射技術
function toMyanmarNumber(input: string): string {
  const map: Record<string, string> = {
    "0": "၀", "1": "၁", "2": "၂", "3": "၃", "4": "၄",
    "5": "၅", "6": "၆", "7": "၇", "8": "၈", "9": "၉",
  }
  return input.replace(/[0-9]/g, (d) => map[d])
}
```

**學習要點**：
- Record 型別的使用
- String.replace() 的進階用法
- Unicode 字符處理

---

### 🎨 CAPTCHA 生成技術

使用 Canvas API 生成像素點陣圖形：

```typescript
// 學習 Canvas 繪圖
function renderCodeToDataUrl(code: string): string {
  // ... 5x7 像素點陣邏輯
}
```

**學習要點**：
- Canvas API 基礎
- 像素點陣演算法
- Base64 編碼

---

## 驗證流程實作解析

### 完整流程圖（技術學習用）

```
使用者掃描 QR Code（模擬情境）
    ↓
/verify?uid=615bdfc9-...（帶參數的 URL）
    ↓
伺服器端驗證 UUID 格式（正則表達式）
    ↓
查詢資料庫（Supabase Client）
    ↓
產生 CAPTCHA（Canvas API）
    ↓
使用者輸入文件號（前端表單）
    ↓
再次查詢資料庫（雙重驗證）
    ↓
顯示資料 or 錯誤頁（條件渲染）
```

### 學習重點

1. **Server Components vs Client Components**
   - 何時使用 'use client'
   - 伺服器端邏輯的優勢

2. **資料獲取策略**
   - async/await 模式
   - 錯誤處理最佳實踐

3. **路由與重定向**
   - Next.js redirect()
   - 動態路由參數

---

## 常見技術問題

### Q1：為什麼要使用 UUID 而不是數字 ID？

**A**：UUID 的優勢：
- 無法透過遞增猜測
- 全域唯一
- 適合分散式系統
- 增加安全性

### Q2：CAPTCHA 為何使用像素點陣而非常見的扭曲文字？

**A**：學習目的：
- 展示自訂驗證機制
- 避免依賴第三方服務
- 理解驗證碼原理
- 練習 Canvas API

### Q3：為何不使用 localStorage？

**A**：本專案展示無狀態驗證：
- 伺服器端驗證更安全
- 避免客戶端資料竄改
- 符合現代安全最佳實踐

### Q4：表格在手機上如何處理？

**A**：響應式設計技巧：
```css
/* 學習 Tailwind 響應式 */
<div className="overflow-x-auto">
  <table className="min-w-full">
```

### Q5：如何產生 QR Code？

**A**：在實際專案中需要：
1. 使用 `qrcode` 套件
2. 將 URL + UUID 編碼成 QR Code
3. 本專案未實作此功能（可作為練習）

---

## 擴展學習方向

### 🚀 進階功能練習建議

以下為基於本專案的延伸學習方向：

#### 1. **管理後台開發**
**學習目標**：
- 實作 CRUD 操作
- 學習表單驗證
- 練習使用者權限管理

**技術重點**：
- React Hook Form
- Zod 驗證庫
- Next.js API Routes

#### 2. **批次資料處理**
**學習目標**：
- CSV/Excel 檔案解析
- 批次插入資料庫
- 錯誤處理與回滾

**技術重點**：
- PapaParse
- SheetJS
- Transaction 處理

#### 3. **QR Code 產生系統**
**學習目標**：
- 批次產生 QR Code
- 圖片處理與下載
- PDF 生成

**技術重點**：
- qrcode 套件
- jsPDF
- Canvas 操作

#### 4. **增強安全機制**
**學習目標**：
- 實作 Rate Limiting
- 加入 JWT 驗證
- 日誌記錄系統

**技術重點**：
- Redis
- JWT
- Winston Logger

#### 5. **效能優化**
**學習目標**：
- 快取策略
- 查詢優化
- 圖片最佳化

**技術重點**：
- React Query
- 資料庫索引
- Next.js Image

---

## 最佳實踐建議

### 🎯 程式碼品質

1. **TypeScript 型別定義**
   ```typescript
   // 定義清楚的介面
   interface Certificate {
     certificate_no: string
     student_name: string
     // ...
   }
   ```

2. **錯誤處理**
   ```typescript
   // 使用 try-catch
   try {
     const data = await fetchData()
   } catch (error) {
     console.error('Error:', error)
     redirect('/error')
   }
   ```

3. **程式碼分割**
   - 將邏輯拆分成小函式
   - 使用自訂 Hooks
   - 元件模組化

### 🔒 安全考量

1. **輸入驗證**
   - 永遠在伺服器端驗證
   - 使用白名單而非黑名單
   - 限制輸入長度

2. **資料庫安全**
   - 使用參數化查詢
   - 限制查詢權限
   - 定期備份

3. **環境變數**
   - 敏感資訊不要提交到 Git
   - 使用 `.env.local`
   - 在 Vercel 設定環境變數

### 🎨 使用者體驗

1. **載入狀態**
   ```typescript
   // 顯示載入指示器
   if (loading) return <Spinner />
   ```

2. **錯誤訊息**
   - 提供清楚的錯誤說明
   - 避免暴露技術細節
   - 給予解決建議

3. **無障礙設計**
   - 使用語意化 HTML
   - 提供 alt 文字
   - 鍵盤導航支援

---

## 專案結構說明

```
mgsf-verify/（學習專案）
├── app/
│   ├── verify/
│   │   ├── [id]/
│   │   │   └── page.tsx          # 動態路由範例
│   │   ├── not-found/
│   │   │   └── page.tsx          # 錯誤處理範例
│   │   └── page.tsx              # 入口頁範例
│   ├── globals.css               # 全域樣式
│   └── layout.tsx                # Layout 範例
├── lib/
│   └── supabase.ts               # Supabase 設定範例
├── public/
│   └── logo-ct-dark.png          # 靜態資源範例
├── .env.local.example            # 環境變數範例
├── package.json                  # 相依套件列表
├── tsconfig.json                 # TypeScript 設定
├── tailwind.config.ts            # Tailwind 設定
└── README.md                     # 本文件
```

---

## 學習資源

### 官方文件

- **Next.js**：https://nextjs.org/docs
- **React**：https://react.dev/
- **Supabase**：https://supabase.com/docs
- **Tailwind CSS**：https://tailwindcss.com/docs

### 推薦教程

- Next.js 完整教程
- TypeScript 深入淺出
- PostgreSQL 資料庫設計
- Web 安全最佳實踐

---

## 貢獻說明

### 本專案定位

這是一個**教學用範例專案**，主要目的是：
- 提供學習參考
- 展示技術實作
- 分享程式碼範例

### 貢獻方式

歡迎以下形式的貢獻：
- 回報程式錯誤（Bug Reports）
- 提出改進建議（Feature Requests）
- 文件改善（Documentation）
- 程式碼優化（Code Improvements）

請透過 GitHub Issues 或 Pull Requests 參與

### Fork 與客製化

如果您想基於本專案開發自己的應用：

1. **Fork 本專案**到您的 GitHub 帳號
2. **修改專案名稱**，避免與本學習專案混淆
3. **客製化所有內容**，包括：
   - 資料表結構
   - 欄位名稱
   - 介面文字
   - 驗證邏輯
4. **添加明確聲明**，說明您的專案與本學習範例的關係
5. **遵守 MIT 授權條款**

**重要提醒**：
- 請勿將您的客製化版本宣稱為官方系統
- 請勿用於詐欺或誤導用途
- 請為您的應用負完全責任

---

## 聯繫方式

### 技術討論與問題回報

- **作者**：gz-zhu
- **GitHub**：https://github.com/gz-zhu/mgsf-verify
- **Issues**：https://github.com/gz-zhu/mgsf-verify/issues

### 學習交流

歡迎透過 GitHub Issues 討論：
- 技術實作問題
- 程式碼改進建議
- 學習心得分享
- Bug 回報

### 不提供的服務

❌ 官方證書驗證服務  
❌ 法律諮詢或認證  
❌ 商業化支援  
❌ 客製化開發（商業）

---

## 許可證

MIT License

Copyright (c) 2024 gz-zhu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## ⚠️ 最終提醒

### 本專案的唯一用途

✅ **程式設計教學**  
✅ **技術架構學習**  
✅ **開源程式碼參考**  
✅ **軟體工程練習**

### 本專案絕不可用於

❌ **任何形式的官方驗證**  
❌ **政府或教育機構系統**  
❌ **具法律效力的文件查詢**  
❌ **誤導公眾的用途**  
❌ **詐欺或偽造行為**

### 責任聲明

1. **開發者責任**：本專案作者僅提供程式碼範例，不對任何使用後果負責
2. **使用者責任**：任何人使用、修改、部署本程式碼，需自行承擔全部責任
3. **無擔保聲明**：本程式碼按「現狀」提供，不提供任何形式的保證
4. **法律遵循**：使用者需確保其使用方式符合當地法律法規

### 如需真實驗證服務

如您需要真實的文件驗證服務，請：

🏛️ **聯繫相關政府教育部門**  
🌐 **訪問官方認證網站**  
📞 **諮詢合法的驗證機構**  
✉️ **直接向文件頒發單位查詢**

**本學習專案無法提供任何實際驗證功能**

---

## 致謝

感謝以下開源專案與平台：

- **Next.js 團隊** - 提供優秀的 React 框架
- **Supabase 團隊** - 提供便捷的後端服務
- **Tailwind CSS 團隊** - 提供高效的樣式框架
- **Vercel 平台** - 提供免費的部署服務
- **開源社群** - 提供無數的學習資源

感謝所有為開源生態貢獻的開發者！

---

## 版本紀錄

### v1.0.0（2024年1月）
- ✅ 初始版本發布
- ✅ 基本驗證流程實作
- ✅ CAPTCHA 機制
- ✅ 響應式設計
- ✅ 多語言數字轉換
- ✅ 完整文件說明

### 未來學習方向（非承諾功能）

以下僅為可能的學習延伸方向，**不代表實際開發計劃**：

- 管理後台範例
- 批次資料處理示範
- QR Code 生成教學
- 進階安全機制展示
- 效能優化範例
- 測試案例撰寫

---

## 專案標籤

`#學習專案` `#技術示範` `#Next.js教學` `#全端開發` `#開源教育`  
`#Learning-Project` `#Technical-Demo` `#Educational` `#Open-Source`

---

**專案性質**：Academic Learning Project / 學術學習專案  
**專案目的**：Technical Education / 技術教育  
**最後更新**：2024年1月  
**版本**：v1.0.0  
**授權**：MIT License  
**定位**：Document Verification System - Technical Demonstration & Learning Example

---

## 📖 閱讀其他語言版本

- [繁體中文版本](README.md)（本文件）
- [English Version](README.en.md)
- [မြန်မာဘာသာ](README.my.md)

---

**⚠️ 重要：本專案僅為程式設計教學範例，不具任何官方性質或法律效力**

**⚠️ Important: This is a coding tutorial example only, with no official status or legal validity**

**⚠️ အရေးကြီးသော်: ဤသည်မှာ ပရိုဂရမ်ရေးသားခြင်း သင်ခန်းစာ ဥပမာသာဖြစ်ပြီး တရားဝင် သို့မဟုတ် ဥပဒေရေးရာ တရားဝင်မှု မရှိပါ**

---

<div align="center">

### 學習愉快！Happy Learning! သင်ယူမှု ပျော်ရွှင်ပါစေ！

Made with ❤️ for Education & Open Source

</div>"# dme-verify" 
"# dme-verify" 
