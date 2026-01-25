# Document Verification Demo - Learning Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)](https://nextjs.org/)
[![Educational](https://img.shields.io/badge/Purpose-Educational-blue)](https://github.com)

**[繁體中文](README.md) | English | [မြန်မာဘာသာ](README.my.md)**

---

## ⚠️ LEGAL DISCLAIMER

**THIS IS A CODE LEARNING EXAMPLE ONLY**

This repository contains **sample code for educational purposes** demonstrating how to build a data verification flow using Next.js and Supabase.

### What This Is NOT

❌ NOT an official system of any government or organization  
❌ NOT suitable for production use  
❌ NOT affiliated with any real institution  
❌ NOT a functional verification service  
❌ NOT legal advice or certification

### What This IS

✅ Educational code example  
✅ Technical architecture demonstration  
✅ Open-source learning resource  
✅ Programming practice project

### Data Disclaimer

- All sample data is **fictional**
- All field names are **generic examples**
- All UI text is **for demonstration only**
- No real persons, documents, or institutions are represented

### Legal Notice

**NO WARRANTY**: This software is provided "AS IS" without warranty of any kind.

**NO LIABILITY**: Authors are not responsible for any use, misuse, or consequences.

**PROHIBITED USES**: Do not use for fraud, forgery, impersonation, or misleading the public.

**YOUR RESPONSIBILITY**: You assume full responsibility for any use of this code.

---

## 📚 Learning Objectives

This project teaches:

- Next.js 16 App Router & Server Components
- Supabase PostgreSQL integration
- Input validation & security patterns
- Custom CAPTCHA implementation
- Responsive design with Tailwind CSS
- Multi-language text processing

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.4 | React framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.1.18 | Styling |
| Supabase | 2.91.0 | Database |
| Vercel | - | Deployment |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Git
- Supabase account (free tier)

### Installation

```bash
# Clone repository
git clone https://github.com/gz-zhu/mgsf-verify.git
cd mgsf-verify

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Database Setup

Create a Supabase project and run this SQL:

```sql
-- Sample table for learning (NOT real data structure)
CREATE TABLE demo_documents (
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

CREATE INDEX idx_document_no ON demo_documents(document_no);
CREATE INDEX idx_uuid ON demo_documents(uuid);

-- Insert fictional test data
INSERT INTO demo_documents (
  document_no, issue_year, reference_no, holder_name,
  issue_date, parent_name_1, parent_name_2, category,
  remarks, uuid
) VALUES (
  '123456', '2024', 'REF-394', 'Sample Name',
  '2005-05-16', 'Sample Parent 1', 'Sample Parent 2',
  'EXAMPLE-1', 'Sample remarks',
  '615bdfc9-6773-42f4-9c34-6ae396615fde'
);
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/verify?uid=615bdfc9-6773-42f4-9c34-6ae396615fde`

---

## 📖 Learning Topics

### Security Patterns

- **Input Validation**: UUID and numeric format validation
- **CAPTCHA**: Custom pixel-based verification
- **SQL Injection Prevention**: Strict format checking
- **Error Handling**: Unified error pages

### Code Examples

**UUID Validation**
```typescript
const isUUID = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
```

**Document Number Validation**
```typescript
if (!/^\d+$/.test(id)) {
  redirect("/verify/not-found")
}
```

**Multi-language Number Conversion**
```typescript
function toMyanmarNumber(input: string): string {
  const map: Record<string, string> = {
    "0": "၀", "1": "၁", "2": "၂", "3": "၃", "4": "၄",
    "5": "၅", "6": "၆", "7": "၇", "8": "၈", "9": "၉",
  }
  return input.replace(/[0-9]/g, (d) => map[d])
}
```

---

## 🏗️ Project Structure

```
mgsf-verify/
├── app/
│   ├── verify/
│   │   ├── [id]/page.tsx      # Dynamic route example
│   │   ├── not-found/page.tsx # Error handling
│   │   └── page.tsx           # Entry page
│   ├── globals.css
│   └── layout.tsx
├── lib/
│   └── supabase.ts            # Database config
├── .env.local                 # Environment variables
└── package.json
```

---

## 🎓 Extended Learning

This codebase can be used to learn:

1. **Admin Panel Development**
   - CRUD operations
   - Form validation
   - User authentication

2. **Batch Data Processing**
   - CSV/Excel parsing
   - Bulk database operations
   - Transaction handling

3. **QR Code Generation**
   - qrcode library integration
   - Image processing
   - PDF generation

4. **Performance Optimization**
   - Caching strategies
   - Database indexing
   - Query optimization

---

## 🤝 Contributing

This is an educational project. Contributions welcome for:

- Bug fixes
- Documentation improvements
- Code quality enhancements
- Additional learning examples

### Forking Guidelines

If you fork this project:

1. **Change the project name** to avoid confusion
2. **Customize all content** (table names, fields, UI text)
3. **Add your own disclaimer** clarifying the relationship
4. **Comply with MIT License** terms
5. **Take full responsibility** for your version

**Do NOT**:
- Claim it as an official system
- Use for fraud or deception
- Mislead users about its purpose

---

## 📄 License

MIT License - Copyright (c) 2024 gz-zhu

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.**

See [LICENSE](LICENSE) file for full terms.

---

## ⚠️ FINAL REMINDER

### Permitted Use

✅ Learning programming  
✅ Studying system architecture  
✅ Academic research  
✅ Code reference

### Prohibited Use

❌ Official verification systems  
❌ Government/institutional use  
❌ Legally binding operations  
❌ Public deception  
❌ Fraud or forgery

### Seeking Official Services?

For real document verification, contact:
- Relevant government agencies
- Official certification bodies
- Authorized verification services

**This learning project cannot and does not provide actual verification.**

---

## 📞 Contact

- **Author**: gz-zhu
- **GitHub**: https://github.com/gz-zhu/mgsf-verify
- **Issues**: Report bugs or suggest improvements via GitHub Issues

**Not Provided**: Official verification, legal advice, commercial support

---

## 🙏 Acknowledgments

Thanks to:
- Next.js Team
- Supabase Team
- Tailwind CSS Team
- Vercel Platform
- Open Source Community

---

**Project Type**: Educational / Learning Example  
**Last Updated**: January 2024  
**Version**: 1.0.0  
**License**: MIT

<div align="center">

### Happy Learning! 📚

**Made for Education & Open Source**

⚠️ **EDUCATIONAL CODE EXAMPLE ONLY - NO OFFICIAL STATUS**

</div>