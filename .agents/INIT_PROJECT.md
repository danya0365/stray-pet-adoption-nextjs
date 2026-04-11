# Stray Pet Adoption - Initial Project Context

**คำอธิบาย:** ไฟล์นี้คือ "สัญญาการทำงาน" ระหว่าง Developer และ AI Assistant เพื่อควบคุมโครงสร้างและทิศทางของโปรเจค Stray Pet Adoption ให้เป็นไปตามมาตรฐานสูงสุด

---

## 📌 Context
- **Project Name:** `Stray Pet Adoption`
- **Description:** แพลตฟอร์มโพสต์หาบ้านใหม่ให้สัตว์เลี้ยงจรจัด เพื่อให้มีชีวิตที่อยู่รอดปลอดภัย ผ่านหน้าเว็บที่สวยงามและน่าเชื่อถือสไตล์ iOS 26

---

## 🛠️ Technology Stack & Constraints
- **Framework:** Next.js 14+ (App Router)
- **Database & Auth:** Supabase (SSR/Server Client)
- **Language:** TypeScript (Strict Mode)
- **Styling:** TailwindCSS + Custom CSS ที่ [index.css](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/public/styles/index.css)
- **State Management:** Zustand (Store ที่ `src/presentation/stores/`)
- **Animation:** `framer-motion` (เน้น Liquid Glass feel)
- **Fonts:** `Noto Sans Thai` (จาก next/font/google)
- **Design System:** iOS 26 Liquid Glass (Glassmorphism, Vibrant Gradients)

---

## 🚨 กฎเหล็ก (Core Rules)
1. **Architecture:** SOLID & Clean Architecture อย่างเคร่งครัด
   - `/app` - Routing & View Pages
   - `/src/domain` - Types, Entities & Result Pattern
   - `/src/application` - Repository Interfaces
   - `/src/infrastructure` - Implementation (Supabase)
   - `/src/presentation` - Components, Store, Hooks, Presenters
2. **Page Creation:** ทุกครั้งที่สร้างหน้าใหม่ ต้องทำตาม [CREATE_PAGE_PATTERN.md](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/.agents/skills/create-page/references/CREATE_PAGE_PATTERN.md) เสมอ
3. **Feature Requirements:** ยึดความต้องการจากไฟล์ [FEATURE.md](file:///Users/marosdeeuma/stray-pet-adoption-nextjs/FEATURE.md) เท่านั้น
4. **No Assumption:** ห้ามคิดฟีเจอร์เองโดยไม่ผ่านการอนุมัติ และห้ามนำ Business Logic ไว้ใน UI Component

---

## 🚀 แผนการทำงาน (Current Status: Step 4)

### Step 1: Database & System Design [COMPLETED]
- ออกแบบ Schema สำหรับ Pet, Adoption Application
- ออกแบบ Interface/Type พื้นฐาน

### Step 2: Core Layout & Navigation Setup [COMPLETED]
- จัดทำ MainLayout, HeroHeader, Mobile Bottom Nav สไตล์ iOS 26

### Step 3: Reusable UI Components [COMPLETED]
- สร้างพื้นฐาน UI สไตล์ Glassmorphism (GlassCard, Button, Badge)

### Step 4: Core Features Implementation [IN PROGRESS]
- [x] หน้าแสดงรายการสัตว์ (Home Page)
- [ ] ระบบกรองข้อมูลสัตว์ขั้นสูง
- [ ] หน้ารายละเอียดสัตว์แต่ละตัว (Upcoming)
- [ ] ฟอร์มสมัครรับเลี้ยง (Upcoming)

---

> [!IMPORTANT]
> **สำหรับ AI:** ทุกครั้งที่เริ่มบทสนทนาใหม่ หรือเริ่ม Task ใหม่ ให้กลับมาอ่านไฟล์นี้และ FEATURE.md ก่อนเสมอ เพื่อไม่ให้หลงทางจากมหาคัมภีร์ iOS 26
