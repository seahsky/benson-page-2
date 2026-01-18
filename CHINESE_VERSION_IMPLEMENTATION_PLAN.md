# 中文版本網站更新 - 實施計畫
# Chinese Version Website Update - Implementation Plan

**文件版本 / Document Version:** 1.0
**建立日期 / Created:** 2026-01-18
**基於 / Based on:** 5 份變更需求文件

---

## 目錄 / Table of Contents

1. [執行摘要 / Executive Summary](#1-執行摘要--executive-summary)
2. [變更概覽 / Change Overview](#2-變更概覽--change-overview)
3. [詳細實施計畫 / Detailed Implementation Plan](#3-詳細實施計畫--detailed-implementation-plan)
4. [技術實施細節 / Technical Implementation Details](#4-技術實施細節--technical-implementation-details)
5. [檔案變更清單 / File Change List](#5-檔案變更清單--file-change-list)
6. [測試計畫 / Testing Plan](#6-測試計畫--testing-plan)
7. [風險與依賴 / Risks and Dependencies](#7-風險與依賴--risks-and-dependencies)

---

## 1. 執行摘要 / Executive Summary

本計畫涵蓋對 Benson Wong 職涯教練網站中文版的全面更新，包含 5 個主要頁面區域的內容與功能變更。主要變更包括：

- **品牌更新**: ICF ACC → ICF PCC 認證升級
- **標題更新**: "澳洲職涯 & 工作申請教練" → "澳洲 & 國際職涯教練"
- **結構重組**: 新增多個 section，重新組織內容架構
- **內容擴充**: 新增3個客戶案例（共9個），新增FAQ section
- **UI/UX 改進**: Logo顏色調整、按鈕文案統一、社群連結更新

**預估工作量 / Estimated Effort:**
- 內容更新: ~8 小時
- 新增元件: ~12 小時
- UI 調整: ~4 小時
- 測試驗證: ~4 小時
- **總計: ~28 小時**

---

## 2. 變更概覽 / Change Overview

### 2.1 文件 1: 首頁 (Hero Section)

| 項目 | 變更類型 | 優先級 |
|------|---------|-------|
| Logo 顏色改為紫底 | UI | 高 |
| 導航列新增 "澳洲 & 國際職涯教練" 標示 | 新增 | 高 |
| 預設語言改為中文 | 功能 | 高 |
| "預約諮詢" → "預約・諮詢" | 文案 | 中 |
| ICF ACC → ICF PCC | 內容 | 高 |
| 聯絡方式順序調整 (LINE優先, 拿掉"推薦") | UI | 中 |
| 社群連結更新 (Facebook, Threads) | 內容 | 高 |
| 移除 "了解更多" 按鈕 | UI | 中 |
| 歡迎文案完全重寫 | 內容 | 高 |
| 新增統計數據展示區 (300+客戶, 500+時數, 200+面試) | 新增 | 高 |
| 三大核心價值內容更新 | 內容 | 高 |

### 2.2 文件 2: 選擇 Benson 的理由 (Why Benson)

| 項目 | 變更類型 | 優先級 |
|------|---------|-------|
| 新增 "我的故事" section + 形象照 | 新增 | 高 |
| "專業經驗" 改為第二個 section，標題改為 "專業經驗及核心專長領域" | 重組 | 高 |
| 新增四個 badge: 15+年澳洲職場經驗, 300+客戶, 500+引導時數, 面試人選200+ | 新增 | 高 |
| 移除原本下方四個框框 | 刪除 | 中 |
| 專業認證 section 更新 (ICF PCC + 使用官方logo) | 內容/UI | 高 |
| RPCDP 說明更新 | 內容 | 高 |
| 學術資格調整為 2x3 格式 | UI | 中 |
| 新增 "懂語言，更懂文化" section | 新增 | 高 |
| 統一使用 "預約・諮詢" 按鈕 | UI | 中 |

### 2.3 文件 3: 服務方案 (Services & Pricing)

| 項目 | 變更類型 | 優先級 |
|------|---------|-------|
| 合併原有兩個 section 為 "服務方案" | 重組 | 高 |
| 新增頂部 Tony Robbins 引言 | 新增 | 中 |
| 新增 "方案比較表" section (取代現有定價) | 新增 | 高 |
| 價格方案更新 (啟航/行動/戰略計畫) | 內容 | 高 |
| 新增成效統計圖表 (83%, 100%, 93%, 94%) | 新增 | 中 |
| 新增 "晤談主題靈感" section (6大主題表格) | 新增 | 高 |
| 新增 Oprah 引言 (靠近"冒牌者症候群"主題) | 新增 | 低 |

### 2.4 文件 4: 顧客收穫與推薦 (Testimonials)

| 項目 | 變更類型 | 優先級 |
|------|---------|-------|
| 主標改為 "除了理想工作，您還將獲得什麼？" | 內容 | 高 |
| 四大核心轉變內容更新 | 內容 | 高 |
| 移除 "準備好獲得這些核心收穫了嗎？" 及副標 | 刪除 | 中 |
| 案例數量: 6 → 9 (新增3個) | 內容 | 高 |
| 案例標題全面更新 | 內容 | 高 |
| 案例內容全面更新 (背景/成果/Quote) | 內容 | 高 |
| 星星符號統一顏色但保持同款式 | UI | 低 |
| 調整卡片尺寸確保內容完整顯示 | UI | 中 |

### 2.5 文件 5: 常見問題 (FAQ & Footer)

| 項目 | 變更類型 | 優先級 |
|------|---------|-------|
| 新增完整 FAQ section (6個問題) | 新增 | 高 |
| 移除 "額外學習機會" section | 刪除 | 高 |
| 標題改為 "準備好迎接更好、更強大的自己了嗎？" | 內容 | 中 |
| 移除副標 | 刪除 | 低 |
| 移除四個聯絡方式卡片 | 刪除 | 中 |
| 移除紫色底部區域 | 刪除 | 中 |
| 保留2-4選項作為紫底黃按鈕 | UI | 中 |
| Footer 簡化為 "©2026 by Benson Wong ICF PCC & CICA RPCDP" | 內容 | 高 |

---

## 3. 詳細實施計畫 / Detailed Implementation Plan

### Phase 1: 基礎設定與內容更新 (Foundation & Content Updates)

#### 1.1 `src/data/content.ts` 內容更新

**優先處理項目:**

```typescript
// 1. 更新 credentials
credentials: [
  "國際教練聯盟認證教練 ICF PCC",  // ACC → PCC
  "澳洲職涯產業協會註冊專業職涯發展師 CICA RPCDP",
  "15+ 年澳洲職場經驗",
]

// 2. 更新 hero.subtitle
subtitle: "澳洲 & 國際職涯教練"  // 原: "澳洲職涯 & 工作申請教練"

// 3. 更新 hero.description (完全重寫)
description: `標題：讓您的專業價值，在澳洲及國際職場裡大放異彩

澳洲、國際與外商的職涯路，您不需要獨自摸索！結合15年澳洲實戰經驗、專業教練技術、以及擔任招募官及內部教練的獨特視角，我將協助您掌握「西方職場的遊戲規則」，跨越文化隔閡、精準定位，不只開啟職涯，更要持續精彩！

無論是釐清優勢、面試攻防，助您自信拿下理想 job offer；或是規劃5到10年的職涯藍圖，具體建構實現路徑。從今天開始，讓我陪您更加認識自己，將焦慮轉化為行動！`

// 4. 更新 CTA buttons
cta: {
  primary: "預約・諮詢",  // 原: "預約諮詢"
  secondary: "", // 移除 "了解更多"
}

// 5. 更新社群連結
channels: [
  {
    name: "line",
    label: "LINE",
    value: "ktuin0918",
    link: "https://line.me/ti/p/f2z0Vc5Hm_",
    icon: "MessageSquare",
  },
  {
    name: "whatsapp",
    label: "WhatsApp",
    value: "+852 9702 0812",
    link: "https://wa.me/85297020812",
    icon: "MessageCircle",
  },
  {
    name: "threads",
    label: "Threads",
    value: "@benson.pcc.coach",
    link: "https://www.threads.com/@benson.pcc.coach",  // 新連結
    icon: "AtSign",
  },
  {
    name: "facebook",
    label: "Facebook",
    value: "@benson.pcc.coach",
    link: "https://www.facebook.com/benson.pcc.coach",  // 新連結
    icon: "Facebook",
  },
]
```

#### 1.2 新增資料結構

```typescript
// 新增統計數據 interface
interface HeroStats {
  clients: string;
  coachingHours: string;
  interviewees: string;
}

// 新增 "我的故事" section
interface MyStory {
  title: string;
  content: string;
  imagePath: string;
}

// 新增 FAQ section
interface FAQ {
  question: string;
  answer: string;
}

// 新增服務方案比較表
interface ServicePlan {
  name: string;
  sessions: number;
  suggestedDuration: string;
  contractDuration: string;
  targetAudience: string;
  price: number;
  features: string[];
  upgradeInfo: string;
}

// 新增晤談主題靈感
interface SessionTopic {
  category: string;
  description: string;
  topics: string[];
}
```

### Phase 2: 元件開發 (Component Development)

#### 2.1 新增元件清單

| 元件名稱 | 路徑 | 用途 |
|---------|------|------|
| `HeroStats` | `src/pages/executive-wisdom/components/HeroStats.tsx` | 首頁統計數據展示 |
| `MyStory` | `src/pages/executive-wisdom/components/MyStory.tsx` | "我的故事" section |
| `FAQSection` | `src/pages/executive-wisdom/components/FAQSection.tsx` | 常見問題摺疊面板 |
| `ServiceComparison` | `src/pages/executive-wisdom/components/ServiceComparison.tsx` | 方案比較表 |
| `SessionTopicsGrid` | `src/pages/executive-wisdom/components/SessionTopicsGrid.tsx` | 晤談主題靈感 |
| `SuccessMetricsVisual` | `src/pages/executive-wisdom/components/SuccessMetricsVisual.tsx` | 成效統計視覺化 |

#### 2.2 `HeroStats` 元件設計

```tsx
// 展示 300+, 500+, 200+ 統計數據
// 參考設計: 黃底 badge 風格

interface HeroStatsProps {
  stats: {
    clients: string;      // "300+"
    hours: string;        // "500+"
    interviewees: string; // "200+"
  };
  language: Language;
}

// 視覺: 三個並排的黃底 badge，帶動畫效果
```

#### 2.3 `MyStory` 元件設計

```tsx
// "我的故事" section
// 標題: 從留學生到澳洲公職的20年旅程
// 包含形象照 (需確認圖片路徑)

interface MyStoryProps {
  title: string;
  content: string;
  imageSrc: string;
  language: Language;
}

// 佈局: 左文右圖或上文下圖 (響應式)
```

#### 2.4 `FAQSection` 元件設計

```tsx
// 6 個 FAQ 問題
// 使用 Accordion/Collapsible 元件

interface FAQItem {
  question: string;
  answer: string; // 支援多段落
}

interface FAQSectionProps {
  items: FAQItem[];
  language: Language;
}

// 功能: 可展開/收合，支援 HTML 格式答案
```

#### 2.5 `ServiceComparison` 元件設計

```tsx
// 三個方案比較表: 啟航計畫, 行動計畫, 戰略計畫
// 包含所有規格比較

interface ServicePlan {
  name: string;           // 啟航計畫 / 行動計畫 / 戰略計畫
  sessions: number;       // 1 / 5 / 10
  suggestedDuration: string;
  contractDuration: string;
  targetAudience: string;
  price: number;          // AUD
  features: string[];
  upgradeInfo: string;
}

// 表格下方加註:
// * 從第一次晤談當天算起
// ** 價格如有變動，以官網最新公告為準
```

### Phase 3: 現有元件修改 (Existing Component Modifications)

#### 3.1 `TopNavigation.tsx` 修改

```tsx
// 1. Logo 旁新增 "澳洲 & 國際職涯教練"
<span className="text-sm text-neutral-600 ml-2 hidden sm:inline">
  澳洲 & 國際職涯教練
</span>

// 2. 預設語言改為中文
const [language, setLanguage] = useState<Language>("zh"); // 原: "en"

// 3. Logo 背景改為紫色 (需要 CSS 調整或圖片替換)
```

#### 3.2 `HeroSection.tsx` 修改

```tsx
// 1. 移除 "了解更多" 按鈕
// 2. 新增 HeroStats 元件 (在歡迎文與三大核心之間)
// 3. 更新三大核心價值內容:

const coreBenefits = [
  {
    title: "重塑自信與價值",
    description: "克服亞洲文化「謙卑」的束縛。協助您看見自己的優勢與實力，並用西方僱主聽得懂的語言自信展現"
  },
  {
    title: "精準定位職涯",
    description: "拒絕無效的「亂槍打鳥」。結合個人優勢、職涯目標以及市場現況，為您鎖定高勝率的職缺及職涯選項，精準出擊"
  },
  {
    title: "專業陪伴與支持",
    description: "職涯路上的最佳戰友。在關鍵時刻提供策略觀點與心理建設，引導您在未知中做出最踏實、無悔的選擇"
  }
];

// 4. 在三大核心價值上方加標題: "教練服務的三大核心價值"
```

#### 3.3 `ProfessionalAuthority.tsx` 修改

```tsx
// 1. 重組為三個明確的 sections:
//    - Section 1: 我的故事 (新增)
//    - Section 2: 專業經驗及核心專長領域
//    - Section 3: 專業認證與資格

// 2. 新增四個 badge 統計:
const experienceBadges = [
  "15+ 年澳洲職場經驗",
  "300+ 客戶",
  "500+ 引導時數",
  "面試人選200+"
];

// 3. 更新專業經驗內文 (三段)
// 4. 更新核心專長領域清單 (9項)
// 5. 更新 ICF PCC 說明
// 6. 更新 RPCDP 說明
// 7. 更新學術資格文案 (6項, 2x3格式)
// 8. 新增 "懂語言，更懂文化" section
// 9. 統一使用 "預約・諮詢" 按鈕
```

#### 3.4 `CoreBenefits.tsx` 修改

```tsx
// 1. 更新主標題: "除了理想工作，您還將獲得什麼？"
// 2. 更新副標: "每一段引導旅程都是獨無二的。除了實現職涯目標，我的客戶最常回饋這四大核心轉變："
// 3. 更新四大收穫內容 (全部更新)
// 4. 移除 "準備好獲得這些核心收穫了嗎？" 及其副標
// 5. 統一按鈕為 "預約・諮詢"
```

#### 3.5 `ServiceShowcase.tsx` + `PricingSection.tsx` 合併

```tsx
// 1. 合併為單一 "服務方案" section
// 2. 頂部新增 Tony Robbins 引言
// 3. 引入 ServiceComparison 元件
// 4. 引入 SuccessMetricsVisual 元件
// 5. 引入 SessionTopicsGrid 元件
// 6. 靠近 "冒牌者症候群" 主題處新增 Oprah 引言
```

#### 3.6 `OrbitNetworkTestimonials.tsx` 修改

```tsx
// 1. 新增 heading: "成功案例及客戶推薦"
// 2. 案例數量從 6 → 9
// 3. 全面更新所有案例內容:
//    - 標題更新
//    - 背景更新
//    - 成果更新
//    - Quote 更新/新增

// 新增案例:
// - Gary: 從銀行合約制工程師到公務員
// - Henry: 一次履歷修改加上兩次面試急救
// - Iris: 打破限制性思維與克服冒牌者症候群

// 4. 調整卡片尺寸確保內容完整顯示
// 5. 星星符號統一使用但顏色區分
```

#### 3.7 `CommunityConnection.tsx` 修改

```tsx
// 1. 移除四個聯絡方式卡片
// 2. 移除紫色底部區域
// 3. 標題改為: "準備好迎接更好、更強大的自己了嗎？"
// 4. 移除副標
// 5. 保留並突出 "預約・諮詢" 按鈕 (紫底黃字)
// 6. Footer 簡化為: "©2026 by Benson Wong ICF PCC & CICA RPCDP"
```

#### 3.8 `ContactButtonMenu.tsx` 修改

```tsx
// 1. 調整聯絡方式順序: LINE → WhatsApp → Threads → Facebook
// 2. 移除 "推薦" 標籤
// 3. 統一按鈕文案為 "預約・諮詢"
```

### Phase 4: 頁面結構調整 (Page Structure Adjustment)

#### 4.1 `index.tsx` Section 重新排序

```tsx
// 新的 section 順序:
<div className="min-h-screen bg-background">
  <TopNavigation />

  {/* 1. Hero Section (首頁) */}
  <section id="home">
    <HeroSection />     {/* 包含新歡迎文 */}
    <HeroStats />       {/* 新增: 300+, 500+, 200+ */}
    <CoreValues />      {/* 三大核心價值 (更新內容) */}
  </section>

  {/* 2. Why Benson (選擇Benson的理由) */}
  <section id="why-benson">
    <MyStory />         {/* 新增: 我的故事 */}
    <ProfessionalExperience />  {/* 專業經驗及核心專長 */}
    <Certifications />  {/* 專業認證與資格 */}
    <LanguageCulture /> {/* 新增: 懂語言，更懂文化 */}
  </section>

  {/* 3. Services (服務方案) - 合併原兩個 section */}
  <section id="services">
    <ServiceComparison />    {/* 方案比較表 */}
    <SuccessMetricsVisual /> {/* 成效統計 */}
    <SessionTopicsGrid />    {/* 晤談主題靈感 */}
  </section>

  {/* 4. Benefits & Success Stories (顧客收穫與推薦) */}
  <section id="success-stories">
    <CustomerBenefits />     {/* 四大核心轉變 */}
    <SuccessStories />       {/* 9個成功案例 */}
  </section>

  {/* 5. FAQ (常見問題) - 新增 */}
  <section id="faq">
    <FAQSection />
  </section>

  {/* 6. Footer */}
  <CommunityConnection />    {/* 簡化版 */}
</div>
```

---

## 4. 技術實施細節 / Technical Implementation Details

### 4.1 顏色規範 (來自文件 1 表格)

```css
/* Logo 背景漸層 */
--gradient-top: #702082;     /* 深紫色 */
--gradient-bottom: #1F256E;  /* 藍紫色 */

/* 燈泡元素 */
--bulb-glow: #FFE74C;        /* 外光暈黃 */
--bulb-inner: #FFF4A3;       /* 內部亮黃 */
--bulb-elements: #2B0A3D;    /* 內部深紫色元素 */
```

### 4.2 新增圖片資源

| 圖片 | 用途 | 預期路徑 |
|------|------|---------|
| Benson 形象照 | 我的故事 section | `/public/images/benson-profile.jpg` |
| ICF PCC 官方 Logo | 認證展示 | `/public/images/icf-pcc-logo.png` |
| 紫底 Logo | 導航列 & Hero | `/public/images/benson-logo-purple.png` |

### 4.3 響應式設計考量

```tsx
// 方案比較表響應式
// Desktop: 3 columns
// Tablet: 2 columns + 1 (scroll)
// Mobile: Vertical cards

// 晤談主題表格響應式
// Desktop: 3x2 grid
// Tablet: 2x3 grid
// Mobile: 1 column accordion

// 成功案例卡片
// Desktop: Orbit network (保持)
// Tablet/Mobile: Grid/Carousel (需重新設計)
```

### 4.4 動畫與過渡效果

```tsx
// FAQ Accordion 動畫
const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: "auto", opacity: 1 }
};

// 統計數字計數動畫
const useCountUp = (end: number, duration: number) => {
  // 實作數字滾動效果
};
```

---

## 5. 檔案變更清單 / File Change List

### 5.1 修改的檔案

| 檔案路徑 | 變更類型 | 變更內容 |
|---------|---------|---------|
| `src/data/content.ts` | 重大修改 | 所有中文內容更新、新增資料結構 |
| `src/pages/executive-wisdom/index.tsx` | 修改 | Section 重新排序、引入新元件 |
| `src/pages/executive-wisdom/components/TopNavigation.tsx` | 修改 | 預設語言、Logo 標示 |
| `src/pages/executive-wisdom/components/HeroSection.tsx` | 重大修改 | 內容更新、移除按鈕、結構調整 |
| `src/pages/executive-wisdom/components/ProfessionalAuthority.tsx` | 重大修改 | 三 section 重組 |
| `src/pages/executive-wisdom/components/CoreBenefits.tsx` | 修改 | 內容更新 |
| `src/pages/executive-wisdom/components/ServiceShowcase.tsx` | 重大修改 | 與 Pricing 合併 |
| `src/pages/executive-wisdom/components/PricingSection.tsx` | 重大修改 | 改為 ServiceComparison |
| `src/pages/executive-wisdom/components/OrbitNetworkTestimonials.tsx` | 重大修改 | 9 案例、內容全面更新 |
| `src/pages/executive-wisdom/components/CommunityConnection.tsx` | 修改 | 簡化結構、更新 Footer |
| `src/components/ContactButtonMenu.tsx` | 修改 | 順序調整、移除推薦標籤 |

### 5.2 新增的檔案

| 檔案路徑 | 用途 |
|---------|------|
| `src/pages/executive-wisdom/components/HeroStats.tsx` | 統計數據展示 |
| `src/pages/executive-wisdom/components/MyStory.tsx` | 我的故事 section |
| `src/pages/executive-wisdom/components/FAQSection.tsx` | 常見問題 |
| `src/pages/executive-wisdom/components/ServiceComparison.tsx` | 方案比較表 |
| `src/pages/executive-wisdom/components/SessionTopicsGrid.tsx` | 晤談主題 |
| `src/pages/executive-wisdom/components/SuccessMetricsVisual.tsx` | 成效統計視覺化 |
| `src/pages/executive-wisdom/components/LanguageCulture.tsx` | 懂語言更懂文化 section |

### 5.3 刪除的元件/功能

| 項目 | 原位置 | 替代方案 |
|------|-------|---------|
| "了解更多" 按鈕 | HeroSection | 移除 |
| "推薦" 標籤 | ContactButtonMenu | 移除 |
| 底部四個框框 | ProfessionalAuthority | 移除 |
| "額外學習機會" section | AdditionalOfferings | 移除 (僅中文版) |
| 四個聯絡方式卡片 | CommunityConnection | 移除 |
| 紫色底部區域 | CommunityConnection | 移除 |

---

## 6. 測試計畫 / Testing Plan

### 6.1 功能測試

| 測試項目 | 預期結果 | 優先級 |
|---------|---------|-------|
| 語言切換 EN/ZH | 所有內容正確切換 | 高 |
| 預設語言為中文 | 首次載入顯示中文 | 高 |
| "預約・諮詢" 按鈕 | 正確開啟聯絡選單 | 高 |
| 社群連結 | 正確開啟新視窗 | 高 |
| FAQ 展開/收合 | 動畫流暢、內容完整 | 中 |
| 案例卡片展開 | 9 個案例都能正確展開 | 高 |

### 6.2 響應式測試

| 裝置/斷點 | 測試項目 |
|----------|---------|
| Desktop (1280px+) | 全功能、Orbit 動畫 |
| Tablet (768-1279px) | 表格響應、卡片排列 |
| Mobile (< 768px) | 導航、卡片堆疊、觸控 |

### 6.3 內容驗證

| 項目 | 驗證方法 |
|------|---------|
| ICF PCC (非 ACC) | 文字搜尋確認 |
| 所有新連結 | 手動點擊測試 |
| 中文字體顯示 | 視覺檢查 |
| 引言正確 | 與原文件對照 |

---

## 7. 風險與依賴 / Risks and Dependencies

### 7.1 依賴項目

| 依賴 | 來源 | 風險等級 |
|------|------|---------|
| Benson 形象照 | 待客戶提供 | 中 |
| ICF PCC 官方 Logo | 待確認使用權限 | 低 |
| 紫底 Logo 設計稿 | 待設計 | 中 |

### 7.2 潛在風險

| 風險 | 影響 | 緩解措施 |
|------|------|---------|
| Orbit 動畫 9 個卡片效能 | 效能下降 | 懶加載、減少動畫 |
| 響應式表格複雜度 | 開發時間增加 | 優先 Desktop，漸進優化 |
| 大量內容更新遺漏 | 上線後發現錯誤 | 多輪內容校對 |

### 7.3 開放問題

1. **形象照規格**: 需要確認圖片尺寸、格式、背景要求
2. **Logo 製作**: 是否由開發處理或另外設計
3. **英文版同步**: 是否需要同步更新英文版內容
4. **SEO 考量**: 頁面結構變更是否影響 SEO

---

## 附錄 A: 完整中文內容對照表

### A.1 首頁歡迎文 (完整版)

**標題:** 讓您的專業價值，在澳洲及國際職場裡大放異彩

**內文:**
澳洲、國際與外商的職涯路，您不需要獨自摸索！結合15年澳洲實戰經驗、專業教練技術、以及擔任招募官及內部教練的獨特視角，我將協助您掌握「西方職場的遊戲規則」，跨越文化隔閡、精準定位，不只開啟職涯，更要持續精彩！

無論是釐清優勢、面試攻防，助您自信拿下理想 job offer；或是規劃5到10年的職涯藍圖，具體建構實現路徑。從今天開始，讓我陪您更加認識自己，將焦慮轉化為行動！

### A.2 三大核心價值 (完整版)

**1. 重塑自信與價值**
克服亞洲文化「謙卑」的束縛。協助您看見自己的優勢與實力，並用西方僱主聽得懂的語言自信展現

**2. 精準定位職涯**
拒絕無效的「亂槍打鳥」。結合個人優勢、職涯目標以及市場現況，為您鎖定高勝率的職缺及職涯選項，精準出擊

**3. 專業陪伴與支持**
職涯路上的最佳戰友。在關鍵時刻提供策略觀點與心理建設，引導您在未知中做出最踏實、無悔的選擇

### A.3 我的故事 (完整版)

**標題:** 從留學生到澳洲公職的20年旅程

2004年，我帶著行李來到澳洲留學。畢業後我經歷過本地教育機構、旅行社及銀行的磨練，然後在2011年突破重圍，通過競爭激烈的畢業生計畫進入澳洲聯邦政府部門，並在其後15年的時間裡多次升轉職，遇到並解決許多職涯挑戰。

這段旅程讓我明白：要在澳洲及國際職場立足，不只需要專業，更要懂得西方職場的遊戲規則。我希望能成為那個「當年我最希望能遇到的導師」，陪您少走冤枉路，更快的在澳洲及國際職場裡實現您的理想與價值！

---

*本文件將隨專案進展持續更新*
