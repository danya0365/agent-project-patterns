# 🤖 @dan/agent-skills

เครื่องมือ CLI สำหรับจัดการและติดตั้ง **AI Agent Patterns & Skills** เข้าสู่โปรเจค Next.js ของคุณ เพื่อให้ AI (เช่น Cursor, Claude, หรือ ChatGPT) เข้าใจมาตรฐานโค้ด (Clean Architecture) และช่วยเขียนโค้ดได้แม่นยำยิ่งขึ้น ✨

---

## 🚀 การติดตั้งและใช้งาน (Local Development)

เนื่องจากโปรเจคนี้อยู่ในเครื่องของคุณ คุณสามารถเรียกใช้งานในโปรเจคอื่นๆ ได้ 2 วิธี:

### วิธีที่ 1: ใช้ `npm link` (แนะนำ)
วิธีนี้จะทำให้คุณพิมพ์คำสั่ง `agent-skills` ได้จากทุกที่ในเครื่อง:
1. เข้าไปที่โฟลเดอร์โปรเจคนี้:
   ```bash
   cd /Users/marosdeeuma/agent-project-patterns
   npm link
   ```
2. ไปยังโปรเจคที่คุณต้องการใช้งาน (เช่น `ai-content-creator-nextjs`):
   ```bash
   cd /Users/marosdeeuma/ai-content-creator-nextjs
   agent-skills init
   ```

### วิธีที่ 2: ใช้ `npx` (ไม่ต้องติดตั้งเข้าระบบ)
เหมาะสำหรับการเรียกใช้งานแบบครั้งเดียว:
```bash
npx /Users/marosdeeuma/agent-project-patterns init
```

---

## 🛠️ คำสั่งการใช้งาน (Commands)

### 1. `init` — ติดตั้ง Patterns ทั้งหมด
คัดลอกไฟล์มาตรฐาน (Pages, Repositories, etc.) เข้าสู่โปรเจคของคุณ
```bash
# แบบปกติ (จะมีถามว่าจะเก็บไว้โฟลเดอร์ไหน)
agent-skills init

# แบบข้ามคำถาม (ติดตั้งลง .cursor/rules/ ทันที)
agent-skills init -y

# กำหนดโฟลเดอร์ปลายทางเอง
agent-skills init -d .agent
```

### 2. `add [id]` — เพิ่มบาง Pattern
เลือกติดตั้งเฉพาะอย่างที่คุณต้องการ
```bash
# เลือกจากรายการ (Interactive)
agent-skills add

# ระบุ ID โดยตรง
agent-skills add page
agent-skills add repo
```

### 3. `check` — ตรวจสอบเวอร์ชัน
เช็คว่าไฟล์ในโปรเจคของคุณล้าสมัยกว่าตัวต้นฉบับในเครื่องหรือไม่
```bash
agent-skills check
```

### 4. `update` — อัปเดตไฟล์ให้เป็นปัจจุบัน
```bash
agent-skills update
```

---

## 📂 โครงสร้างที่สร้างให้ AI

เมื่อรันคำสั่ง `init` ตัวโปรแกรมจะสร้างโฟลเดอร์ปลายทาง (เช่น `.cursor/rules/`) ซึ่งด้านในจะมี:

- `SKILL.md`: ไฟล์หลักที่ AI Agent จะอ่านเพื่อเรียนรู้วิธีการเขียนโค้ด (Rules & Patterns)
- `references/`: ไฟล์ตัวอย่างหรือคู่มือฉบับเต็มที่ AI สามารถเข้าไปอ่านเพิ่มเติมได้

**เหตุผลที่ต้องมีสิ่งนี้:** 
ช่วยให้ AI ไม่เขียนโค้ดมั่วซั่ว และทำตามมาตรฐาน **Clean Architecture** ที่คุณกำหนดไว้เสมอ!

---

## 🔄 การอัปเดตและซิงค์ Patterns (Sync & Update)

หากมีการแก้ไขไฟล์ในโฟลเดอร์ `patterns/` ของโปรเจคต้นฉบับ คุณสามารถอัปเดตโปรเจคอื่นๆ ได้ง่ายๆ ดังนี้:

### 1. ตรวจสอบเวอร์ชัน
เข้าไปที่โปรเจคที่ติดตั้ง Patterns ไว้แล้วรันคำสั่ง:
```bash
agent-skills check
```
*ระบบจะเปรียบเทียบเนื้อหาไฟล์ในโปรเจคกับต้นฉบับ หากไม่ตรงกันจะขึ้นเครื่องหมาย `!` (Outdated)*

### 2. ทำการอัปเดต
รันคำสั่งเพื่อคัดลอกไฟล์ใหม่จากต้นฉบับมาเขียนทับไฟล์เดิม:
```bash
agent-skills update
```

---

## 📝 รายการ Patterns ที่มีจำหน่าย (Registry)

| ID | ชื่อไฟล์ | คำอธิบาย |
|----|----------|----------|
| `page` | `CREATE_PAGE_PATTERN.md` | โครงสร้าง Page (Repository → Presenter → View) |
| `repo` | `CREATE_REPO_PATTERN.md` | โครงสร้าง Data Layer (Interface → Implementation) |

---

## 💡 สำหรับนักพัฒนา (How to add new pattern)

1. เพิ่มไฟล์ Markdown ของคุณในโฟลเดอร์ `patterns/`
2. ลงทะเบียนไฟล์นั้นใน `src/registry.js`
3. ทดสอบเรียกใช้ด้วย `agent-skills list`
