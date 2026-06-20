---
name: nextjs-saas-starter
description: >
  ใช้ repo `saas-starter` (Next.js 16 + Turso/Drizzle + Clean Architecture) เป็นจุดเริ่ม
  ของ SaaS ใหม่ — มี auth + 2FA, security/audit, multi-tenant (shop/branch + 3 roles),
  billing เติมวัน, notification (in-app + LINE), maps/geo, theme พร้อมใช้ ไม่ต้องเขียนใหม่.
  ใช้เมื่อจะเริ่มผลิตภัณฑ์ SaaS ใหม่ หรือจะเพิ่มฟีเจอร์โดเมนแรกโดยลอกจากฟีเจอร์ตัวอย่าง `items`.
version: "1.0"
metadata:
  author: dan
  stack: next.js 16, typescript, turso/libsql, drizzle, tailwind v4
  pattern: saas-starter
---

## เมื่อไหร่ใช้ skill นี้

เมื่อจะ **เริ่ม SaaS ตัวใหม่** และไม่อยากเขียน auth / 2FA / billing / security / multi-tenant ใหม่ทุกครั้ง
— ให้ fork repo **`saas-starter`** (โครงตั้งต้นที่ถอด business domain ออกแล้ว เหลือแกนที่ reuse ได้)
แล้วต่อยอดโดเมนของตัวเองบนนั้น

> สัมพันธ์กับ skill อื่น:
> - [`nextjs-clean-arch-drizzle`](../nextjs-clean-arch-drizzle/SKILL.md) = **กฎ/แพทเทิร์น** ของ 4 layer (ต้องรู้ก่อน)
> - **skill นี้** = วิธีใช้ **repo สำเร็จรูป** ที่ทำตามแพทเทิร์นนั้นแล้ว + ฟีเจอร์ตัวอย่างให้ลอก
> - [`nextjs-semantic-theme`](../nextjs-semantic-theme/SKILL.md) + [`nextjs-versioning`](../nextjs-versioning/SKILL.md) มาพร้อมใน starter แล้ว

## มีอะไรใน starter (แกนที่ reuse ได้)

- **Auth** — custom session (bcrypt + httpOnly cookie), login, reset/change password, password policy + HIBP, LINE OTP (optional)
- **2FA (TOTP)** — RFC 6238, QR enroll, recovery codes (download/copy + save gate), บังคับ admin, peer reset + break-glass CLI
- **Security** — audit log, จัดการ session/อุปกรณ์, brute-force lockout, velocity guard, security headers/CSP, impersonation (read-only)
- **Multi-tenant** — role `platform_admin` / `shop_owner` / `branch_staff`, ทุก query scope ด้วย `shopId`, มี `branch` sub-tenant
- **Billing** — subscription เติมวัน (prepaid-day), อัปสลิป PromptPay, verify มือ (`IPaymentVerifier`), auto-suspend
- **Notification** — in-app + LINE OA push (`IMessagePusher` swap ได้) · **Maps/Geo** — MapLibre + OSM
- **Tooling** — Clean Architecture บังคับด้วย dependency-cruiser + ESLint + CI, test (node:test + in-memory libSQL), Playwright e2e

> ตัว tenant ชื่อ **`shop`** (มี `branch` เป็น sub-unit, `customer` เป็นคำกลางๆ) — เปลี่ยนชื่อให้ตรงผลิตภัณฑ์ได้ แค่ระวังให้ครบทุก layer

## เริ่มโปรเจคใหม่จาก starter

```bash
git clone <saas-starter remote> my-new-saas && cd my-new-saas
rm -rf .git && git init                 # เริ่ม history ใหม่
cp .env.example .env.local              # local file DB ไม่ต้องมี secret
npm install && npm run db:push && npm run db:seed && npm run dev
```

จากนั้น (ไม่บังคับ) ตั้งชื่อแบรนด์/โดเมนของตัวเอง แล้ว **เพิ่มฟีเจอร์โดเมนแรก** โดยลอกจาก `items`

## 🚨 กฎเหล็ก (อย่าให้ architecture gate แตก)

- **ทุก query ที่อ่าน/เขียนข้อมูล tenant ต้อง scope ด้วย `shopId`** (กันข้อมูลข้ามผู้เช่า)
- **business logic อยู่ใน Use Case** เท่านั้น — ไม่เขียน logic/Drizzle ตรงใน Server Action หรือ component
- **Repository = interface ก่อน** (`I[Entity]Repository` ใน `application/`) แล้ว implement Drizzle ใน `infrastructure/`
- ทุก Drizzle repo + secret service ขึ้นต้น `import "server-only"`
- component **ห้าม** import DI container/repo ตรงๆ · UI ใช้ **semantic token** เท่านั้น (ห้าม hardcode สี)
- ทุกครั้งหลังเพิ่มฟีเจอร์: `npm run lint:all && npm test` ต้องเขียว (depcruise + tsc + test)

## เพิ่มฟีเจอร์โดเมนใหม่ = ลอก `items`

ฟีเจอร์ `items` คือ CRUD ตัวอย่างที่ไหลครบ 4 layer — ใช้เป็นแม่แบบ คัดลอกแล้ว rename

อ่านขั้นตอนละเอียดใน [`references/ADD_A_FEATURE.md`](references/ADD_A_FEATURE.md) — ครอบคลุม:
schema → entity → `I*Repository` → `Drizzle*Repository` → use cases → server actions → components → route →
ลงทะเบียน DI container → เพิ่ม nav → migration → integration test → verify

> ไฟล์อ้างอิงในตัว repo เอง (canonical example) — เปิดดูคู่กัน:
> `src/infrastructure/db/schema/items.ts`, `src/application/use-cases/item/`,
> `src/presentation/actions/item-actions.ts`, `app/(shop)/shop/items/page.tsx`
