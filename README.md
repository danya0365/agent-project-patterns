# @dan/project-patterns

CLI tool สำหรับ scaffold Clean Architecture patterns เข้าโปรเจค Next.js

## ติดตั้ง

```bash
# ใช้แบบ global (แนะนำ)
npm install -g @dan/project-patterns

# หรือใช้แบบ npx (ไม่ต้องติดตั้ง)
npx @dan/project-patterns init
```

## การใช้งาน

### `init` — Copy ทุก pattern เข้าโปรเจค

```bash
cd my-nextjs-project

# Interactive (ถามว่าจะเก็บไว้ที่ไหน)
project-patterns init

# เก็บใน .cursor/rules/ (default)
project-patterns init -y

# กำหนด destination เอง
project-patterns init -d .claude
project-patterns init -d docs/patterns

# Overwrite ไฟล์ที่มีอยู่แล้ว
project-patterns init --force
```

### `add` — Copy pattern เฉพาะอัน

```bash
# Interactive (เลือก pattern)
project-patterns add

# ระบุ pattern ID โดยตรง
project-patterns add page
project-patterns add repo
```

### `check` — เช็คว่า patterns up-to-date ไหม

```bash
project-patterns check
```

ตัวอย่าง output:
```
📁 .cursor/rules/
   ✓ CREATE_PAGE_PATTERN.md  up to date
   ! CREATE_REPO_PATTERN.md  outdated
```

### `update` — อัปเดต patterns ที่ล้าสมัย

```bash
project-patterns update
```

### `list` — ดู patterns ทั้งหมดที่มี

```bash
project-patterns list
```

---

## Workflow ที่แนะนำ

### 1. สร้างโปรเจคใหม่

```bash
npx create-next-app my-app
cd my-app
project-patterns init -y   # → .agent/CREATE_PAGE_PATTERN.md
                            # → .agent/CREATE_REPO_PATTERN.md
```

`.agent/` จะถูกอ่านโดย AI agent context ✨

### 2. เมื่อ update pattern ใน package

```bash
# แก้ไขไฟล์ใน patterns/
# แล้ว bump version
npm version patch

# อัปเดตทุกโปรเจค
cd ~/projects/my-app && project-patterns update
cd ~/projects/other-app && project-patterns update
```

---

## เพิ่ม pattern ใหม่

แก้ไข `src/registry.js`:

```js
export const PATTERNS = [
  // ... existing
  {
    id: 'api-route',
    name: 'CREATE_API_ROUTE_PATTERN.md',
    description: 'Next.js API Route pattern with auth + validation',
    file: 'CREATE_API_ROUTE_PATTERN.md',
    tags: ['api', 'route', 'auth'],
  },
];
```

แล้วเพิ่มไฟล์ `patterns/CREATE_API_ROUTE_PATTERN.md` — เสร็จเลย

---

## Patterns ที่มี

| ID | ไฟล์ | คำอธิบาย |
|----|------|----------|
| `page` | CREATE_PAGE_PATTERN.md | Clean Architecture page (Repository → Presenter → View) |
| `repo` | CREATE_REPO_PATTERN.md | Repository pattern (Interface → Mock → Supabase → API) |
