# Myanmar Education Certificate Verification System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)

> **⚠️ IMPORTANT DISCLAIMER**  
> This project is **FOR EDUCATIONAL AND LEARNING PURPOSES ONLY**. It should NOT be used for any official certification or formal certificate verification.  
> This system is NOT an official Myanmar Ministry of Education system. The developer assumes NO responsibility for any legal issues arising from misuse of this project.  
> For official certificate verification services, please contact the relevant departments of the Myanmar Ministry of Education.

---

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [System Architecture](#system-architecture)
5. [Local Deployment Guide (Beginner-Friendly)](#local-deployment-guide-beginner-friendly)
6. [Vercel Deployment Guide](#vercel-deployment-guide)
7. [Database Setup](#database-setup)
8. [Usage Guide](#usage-guide)
9. [Verification Flow Explained](#verification-flow-explained)
10. [FAQ](#faq)
11. [Next Version Update Plan](#next-version-update-plan)
12. [Optimization Recommendations](#optimization-recommendations)
13. [Contact](#contact)

---

## Project Overview

This is a certificate verification system built with **Next.js 16** and **Supabase**, designed specifically for Myanmar Ministry of Education certificate verification scenarios. The system uses a **dual-layer security mechanism** with QR code scanning and CAPTCHA verification to ensure the authenticity and security of certificate information.

### Core Features

- ✅ QR Code Scan Verification
- ✅ Red Pixel CAPTCHA Anti-Bot Protection
- ✅ Myanmar Language Localization (Myanmar Number Conversion)
- ✅ Responsive Design (Desktop/Mobile Adaptive)
- ✅ UUID Privacy Protection
- ✅ Unified Error Handling
- ✅ Logo Click to Return Home

---

## Features

### 🔐 Security Features

| Feature | Description |
|---------|-------------|
| **SQL Injection Prevention** | Strict UUID and certificate number format validation |
| **Brute Force Prevention** | Random CAPTCHA, different each visit |
| **Privacy Protection** | UUID cleared from URL immediately after query |
| **Unified Error Handling** | All errors redirect uniformly, no system info leakage |

### 🌍 Multi-Language Support

- Myanmar language interface and number display
- Traditional Chinese data support
- English data support

### 📱 Responsive Design

- Desktop: Wide-screen layout with clear table display
- Mobile: Horizontally scrollable tables for full content viewing
- Adaptive fonts and spacing

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.4 | React Framework (App Router) |
| **React** | 19.2.3 | Frontend Framework |
| **TypeScript** | 5.x | Type Safety |
| **Tailwind CSS** | 4.1.18 | Styling Framework |
| **Supabase** | 2.91.0 | Database (PostgreSQL) |
| **QRCode** | 1.5.4 | QR Code Generation |
| **Vercel** | - | Deployment Platform |

---

## System Architecture

### Page Structure

```
/verify                    → Verification Entry Page (CAPTCHA)
/verify/[id]              → Certificate Details Page
/verify/not-found         → Error Page
```

### Data Flow

```
┌─────────────────────────────────────────────────┐
│           Supabase Database                      │
│  Table: dme_certificates                         │
├─────────────────────────────────────────────────┤
│ uuid (Primary Key)       | certificate_no        │
│ 615bdfc9-6773-...        | 123456               │
│ student_name             | exam_year            │
│ မောင်လျှမ်းထက်ထွန်း       | ၂၀၂၄                 │
└─────────────────────────────────────────────────┘
         ↑                           ↑
         │ Query 1                   │ Query 2
         │ (via uuid)                │ (via certificate_no)
         │                           │
┌────────┴──────────┐      ┌─────────┴──────────┐
│   /verify         │      │  /verify/123456    │
│  (Entry Page)     │ ───→ │   (Details Page)   │
│  - Display CAPTCHA│Submit│  - Show Full Info  │
│  - Verify UUID    │      │  - Double Verify   │
└───────────────────┘      └────────────────────┘
         │ Error                     │ Error
         └──────────┬────────────────┘
                    ↓
         ┌──────────────────┐
         │ /verify/not-found│
         │   (Error Page)   │
         └──────────────────┘
```

---

## Local Deployment Guide (Beginner-Friendly)

### Prerequisites

Before starting, ensure you have installed the following software:

1. **Node.js** (Recommended 18.x or higher)
   - Download: https://nodejs.org/
   - After installation, run `node -v` in terminal to verify

2. **Git**
   - Download: https://git-scm.com/
   - After installation, run `git --version` to verify

3. **Code Editor** (Recommended)
   - VS Code: https://code.visualstudio.com/

---

### Step 1: Clone the Project

Open your terminal (Windows users can use PowerShell or CMD) and run:

```bash
# Clone the project locally
git clone https://github.com/gz-zhu/mgsf-verify.git

# Navigate to project directory
cd mgsf-verify
```

---

### Step 2: Install Dependencies

In the project directory, run:

```bash
npm install
```

This will automatically install all required packages (may take a few minutes).

---

### Step 3: Create a Supabase Project

1. **Visit Supabase**  
   Go to https://supabase.com/ and sign up/login

2. **Create New Project**  
   - Click "New Project"
   - Enter project name: `mgsf-verify-db`
   - Set database password (**remember this password**)
   - Choose region (select closest to you)
   - Click "Create new project"

3. **Wait for project creation** (about 2 minutes)

---

### Step 4: Setup Database

1. **Open SQL Editor**  
   In Supabase dashboard, click **SQL Editor** in the left menu

2. **Execute Table Creation SQL**  
   Copy the following SQL and click **Run**:

```sql
-- Create certificate table
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

-- Create indexes
CREATE INDEX idx_certificate_no ON dme_certificates(certificate_no);
CREATE INDEX idx_uuid ON dme_certificates(uuid);
```

3. **Insert Test Data**  
   Continue in SQL Editor:

```sql
-- Insert Myanmar language test data
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

-- Insert Traditional Chinese test data
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

### Step 5: Get Supabase Credentials

1. **Open Project Settings**  
   Click ⚙️ **Settings** → **API** in the left menu

2. **Copy the following information**:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (a long string of characters)

---

### Step 6: Configure Environment Variables

1. **Create `.env.local` file in project root**  
   (In VS Code, right-click in file explorer → New File)

2. **Add the following content** (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Example**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

### Step 7: Run the Project

In terminal, run:

```bash
npm run dev
```

Upon success, you'll see:

```
✓ Ready in 2.3s
○ Local:   http://localhost:3000
```

---

### Step 8: Test Verification

1. **Open browser** and visit:  
   `http://localhost:3000/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde`

2. **Expected result**:
   - See red pixel image showing: `123456`
   - Enter in input box: `123456`
   - Click Submit
   - Redirect to certificate details page showing student information

3. **Test error case**:
   - Visit: `http://localhost:3000/verify`
   - Enter any 6 digits (e.g., `999999`)
   - Click Submit
   - Should redirect to error page

---

## Vercel Deployment Guide

### Step 1: Prepare Vercel Account

1. Visit https://vercel.com/
2. Login with your GitHub account

---

### Step 2: Push Code to GitHub

If you haven't pushed to GitHub yet:

```bash
# Initialize Git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/mgsf-verify.git

# Push
git push -u origin main
```

---

### Step 3: Import Project in Vercel

1. **Click "New Project"**
2. **Import Git Repository**  
   Select your `mgsf-verify` repository
3. **Configure Environment Variables**  
   Click "Environment Variables" and add:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_public_key
NEXT_PUBLIC_SITE_URL = https://your-project-name.vercel.app
```

4. **Click Deploy**

5. **Wait for deployment to complete** (about 2 minutes)

---

### Step 4: Test Production Version

After successful deployment, visit:

```
https://your-project-name.vercel.app/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde
```

You should see the same result as local!

---

## Database Setup

### Table Structure

| Column Name | Type | Description |
|-------------|------|-------------|
| `idx` | SERIAL | Auto-increment primary key |
| `certificate_no` | VARCHAR(50) | Certificate number (unique) |
| `exam_year` | VARCHAR(20) | Examination year |
| `seat_no` | VARCHAR(50) | Seat number |
| `student_name` | VARCHAR(200) | Student name |
| `dob` | VARCHAR(50) | Date of birth |
| `father_name` | VARCHAR(200) | Father's name |
| `mother_name` | VARCHAR(200) | Mother's name |
| `compilation` | VARCHAR(50) | Subject compilation |
| `distinctions` | TEXT | Distinction subjects |
| `status` | VARCHAR(20) | Status (active/inactive) |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `uuid` | UUID | Unique identifier (for QR code) |

### Adding New Certificates

Execute in Supabase SQL Editor:

```sql
INSERT INTO dme_certificates (
  certificate_no, exam_year, seat_no, student_name, dob,
  father_name, mother_name, compilation, distinctions
) VALUES (
  'certificate_number',
  'year',
  'seat_number',
  'student_name',
  'date_of_birth',
  'father_name',
  'mother_name',
  'STEAMS-1',
  'distinction_subjects'
);
```

**Note**: `uuid` is auto-generated, no need to fill manually.

---

## Usage Guide

### Scenario 1: QR Code Scan

1. User scans QR code on certificate
2. Visit verification page with `uid` parameter
3. System displays corresponding certificate number (red pixel image)
4. User manually enters certificate number
5. View complete certificate information

### Scenario 2: Manual Verification

1. User directly visits `/verify`
2. See random 6-digit CAPTCHA
3. Enter CAPTCHA digits
4. If certificate exists, show details; otherwise redirect to error page

---

## Verification Flow Explained

### 🔐 Security Mechanisms

#### 1. UUID Format Validation
```typescript
const isUUID = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
```

#### 2. Certificate Number Format Validation
```typescript
if (!/^\d+$/.test(id)) {
  redirect("/verify/not-found")
}
```

#### 3. One-Time Decision Lock
```typescript
const hasResolved = useRef(false)  // Prevent duplicate decisions
const hasFetched = useRef(false)   // Prevent duplicate queries
```

### 🔄 Complete Verification Flow

```
User Scans QR Code
    ↓
/verify?uid=615bdfc9-...
    ↓
Validate UUID Format
    ↓
Query Database (via UUID)
    ↓
Display Certificate Number (CAPTCHA)
    ↓
User Enters Certificate Number
    ↓
Query Database (via Certificate Number)
    ↓
Display Certificate Details / Error Page
```

---

## FAQ

### Q1: Why can't I see data when running locally?
**A**: Check the following:
1. Is `.env.local` configured correctly?
2. Did you insert test data into Supabase database?
3. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct

### Q2: Errors after deploying to Vercel?
**A**: Confirm Vercel environment variables are set correctly, especially `NEXT_PUBLIC_SITE_URL` should be your Vercel domain.

### Q3: How to modify CAPTCHA style?
**A**: Edit the `renderCodeToDataUrl` function in `app/verify/page.tsx`, adjust `fillStyle` color.

### Q4: How to add more language support?
**A**: Add number mappings for other languages in the `toMyanmarNumber` function.

### Q5: Table not fully displayed on mobile?
**A**: Fixed! Tables now scroll horizontally. Make sure you're using the latest version.

### Q6: How to generate QR codes?
**A**: Currently manual generation required. Next version will include admin dashboard with auto-generated QR codes.

---

## Next Version Update Plan

### 🚀 v2.0 Planned Features

#### 1. **Admin Dashboard** (Priority: High)
- ✨ Visual add/edit certificates
- ✨ Bulk import from Excel/CSV
- ✨ Auto-generate and download QR codes
- ✨ Data statistics dashboard

#### 2. **QR Code Management** (Priority: High)
- ✨ One-click generate QR codes for all certificates
- ✨ Batch download QR code images
- ✨ Customizable QR code styles and sizes
- ✨ Batch printing support

#### 3. **Data Import/Export** (Priority: Medium)
- ✨ Bulk import certificate data from Excel
- ✨ CSV format export
- ✨ Batch PDF certificate generation

#### 4. **Enhanced Security** (Priority: Medium)
- ✨ Admin login system (username/password)
- ✨ Access log recording
- ✨ IP rate limiting to prevent brute force
- ✨ Enhanced CAPTCHA (graphic CAPTCHA)

#### 5. **Multi-Language Interface** (Priority: Low)
- ✨ Traditional Chinese interface
- ✨ English interface
- ✨ Language switching functionality

#### 6. **API Interface** (Priority: Low)
- ✨ RESTful API for third-party integration
- ✨ API key management
- ✨ API documentation (Swagger)

---

## Optimization Recommendations

### 🎯 Performance Optimization

1. **Add Redis Caching**  
   Reduce database queries, improve response speed

2. **Image Optimization**  
   Use Next.js Image component to optimize logo loading

3. **Code Splitting**  
   Load components on-demand, reduce initial bundle size

### 🔒 Security Optimization

1. **Add Rate Limiting**  
   Prevent brute force attacks and API abuse

2. **Data Encryption**  
   Encrypt sensitive information in storage

3. **Audit Logs**  
   Record all query operations

### 🎨 UI/UX Optimization

1. **Loading Animations**  
   Add skeleton screens and loading animations

2. **Error Message Optimization**  
   More user-friendly error messages

3. **Accessibility Optimization**  
   Support keyboard navigation and screen readers

---

## Project Structure

```
mgsf-verify/
├── app/
│   ├── verify/
│   │   ├── [id]/
│   │   │   └── page.tsx          # Certificate Details Page
│   │   ├── not-found/
│   │   │   └── page.tsx          # Error Page
│   │   └── page.tsx              # Verification Entry Page
│   ├── globals.css               # Global Styles
│   └── layout.tsx                # Root Layout
├── lib/
│   └── supabase.ts               # Supabase Client Config
├── public/
│   └── logo-ct-dark.png          # Logo Image
├── .env.local                    # Environment Variables (Local)
├── package.json                  # Project Dependencies
├── tsconfig.json                 # TypeScript Config
├── tailwind.config.ts            # Tailwind CSS Config
└── README.md                     # This File
```

---

## Technical Documentation

### Myanmar Number Conversion

```typescript
function toMyanmarNumber(input: string): string {
  const map: Record<string, string> = {
    "0": "၀", "1": "၁", "2": "၂", "3": "၃", "4": "၄",
    "5": "၅", "6": "၆", "7": "၇", "8": "၈", "9": "၉",
  }
  return input.replace(/[0-9]/g, (d) => map[d])
}
```

### CAPTCHA Generation

Uses 5x7 pixel matrix to generate red number graphics, preventing automated bot recognition.

---

## Contributing

As this project is currently for educational purposes only, external contributions are not accepted.

For custom features, please fork this project and modify as needed.

---

## Contact

### For Technical Support or Custom Features

- **Author**: gz-zhu
- **GitHub**: https://github.com/gz-zhu/mgsf-verify
- **Email**: Please contact via GitHub Issues

### For Professional Engineering Services

This project can serve as a reference template, but for:
- Enterprise-level feature development
- System integration services
- Security audits and optimization
- Large-scale deployment support

**Please contact professional software development teams or full-stack engineers**.

---

## License

MIT License

Copyright (c) 2024 gz-zhu

This project is licensed under the MIT License, but please note:

⚠️ **This project is FOR EDUCATIONAL AND LEARNING PURPOSES ONLY**  
⚠️ **NOT to be used for any official certification or formal certificate verification**  
⚠️ **The developer assumes NO responsibility for any legal issues arising from misuse**

---

## Acknowledgments

- Next.js Team
- Supabase Team
- Tailwind CSS Team
- Vercel Platform

---

**Last Updated**: January 2024  
**Version**: v1.0.0  
**Next Version**: v2.0.0 (Planned)