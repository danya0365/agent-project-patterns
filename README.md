<div align="center">
  <img src="https://img.icons8.com/color/96/robot-2.png" alt="Logo" width="80" />
  <h1>@dan/agent-patterns</h1>
  <p><b>Standardize your AI-driven development with Clean Architecture Patterns</b></p>

  <p>
    <a href="https://www.npmjs.com/package/@dan/agent-patterns"><img src="https://img.shields.io/npm/v/@dan/agent-patterns.svg?style=flat-square" alt="NPM Version" /></a>
    <a href="https://github.com/danya0365/agent-project-patterns/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@dan/agent-patterns.svg?style=flat-square" alt="License" /></a>
    <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square" alt="Node Version" />
    <img src="https://img.shields.io/badge/PRs-welcome-blue.svg?style=flat-square" alt="PRs Welcome" />
  </p>
</div>

---

## 🌟 Overview (ความเป็นมา)

**The Problem:** AI Coding Agents (like Cursor, Claude, or ChatGPT) often generate messy, inconsistent code if not given clear architectural rules.
**The Solution:** `@dan/agent-patterns` provides a CLI to inject standardized **Clean Architecture** patterns directly into your project's AI context.

> [!TIP]
> This tool ensures your AI assistant always follows your established Repository-Presenter-View patterns.

---

## ✨ Features (จุดเด่น)

- 🏗️ **Clean Architecture Scout:** Scaffold standardized structures in seconds.
- 🤖 **AI-Native:** Designed specifically for IDEs like Cursor (`.cursor/rules`) and Claude (`.claude/patterns`).
- 🔄 **One-Click Sync:** Keep patterns across all your projects up-to-date with a single command.
- 🛠️ **Local-First:** Optimized for developers who want to manage their own local pattern library.
- 🇹🇭 **Bi-lingual Support:** Excellent documentation in both English and Thai.

---

## 🚀 Getting Started (การเริ่มต้นใช้งาน)

### Method 1: Local Development (Recommended)
Since this project is on your local machine, use `npm link` to make it available globally:

1. **In this directory:**
   ```bash
   cd /Users/marosdeeuma/agent-project-patterns
   npm link
   ```
2. **In your target project (e.g. `ai-content-creator-nextjs`):**
   ```bash
   cd /path/to/your/project
   agent-patterns init
   ```

### Method 2: Immediate Execution (npx)
Run without linking:
```bash
npx /Users/marosdeeuma/agent-project-patterns init
```

---

## 🛠️ CLI Reference (เจาะลึกการใช้งาน)

เพื่อให้คุณใช้งาน `@dan/agent-patterns` ได้อย่างเต็มประสิทธิภาพ นี่คือรายละเอียดเชิงลึกของทุกคำสั่งที่มีให้ใช้งานครับ:

### 1. `init` — Project Initialization 🏗️
ใช้สำหรับติดตั้ง Patterns ทั้งหมดเข้าสู่โปรเจคใหม่ของคุณ (Scaffold everything)

```bash
# แบบปกติ (Interactive Mode)
agent-patterns init

# แบบรวดเร็ว (Skip Prompts)
agent-patterns init -y
```

**รายละเอียดเพิ่มเติม:**
- ระบบจะถามว่าต้องการติดตั้งไว้ที่ไหน โดยมีตัวเลือกยอดนิยมเช่น `.cursor/rules/`, `.agent/`, หรือ `.claude/patterns`
- **Flag `-y, --yes`**: จะข้ามทุกคำถามและติดตั้งลงในโฟลเดอร์เริ่มต้น (`.agent/`) ทันที
- **Flag `-f, --force`**: ใช้สำหรับเขียนทับ (Overwrite) ไฟล์เดิมในโฟลเดอร์ปลายทาง
- **Flag `-d, --dest <dir>`**: กำหนดโฟลเดอร์ปลายทางเองโดยตรง (เช่น `agent-patterns init -d my-docs`)

---

### 2. `add [id]` — Add Specific Pattern ➕
ใช้สำหรับเลือกติดตั้งเฉพาะ Pattern ที่ต้องการ (Selective installation)

```bash
# เลือกจากรายการ (Interactive List)
agent-patterns add

# ระบุ ID ของ Pattern โดยตรง
agent-patterns add page
agent-patterns add repo
```

**รายละเอียดเพิ่มเติม:**
- หากไม่ระบุ `id` ตัวโปรแกรมจะแสดงรายการ Pattern ทั้งหมดที่มีให้คุณเลือก
- เหมาะสำหรับกรณีที่คุณมีโปรเจคอยู่แล้ว และต้องการเพิ่มเฉพาะความสามารถใหม่ๆ เข้าไป

---

### 3. `check` — Version Validation 🔍
ตรวจสอบความสดใหม่ของไฟล์ Patterns ในโปรเจคของคุณ เทียบกับต้นฉบับ (Local Master)

```bash
agent-patterns check
```

**รายละเอียดเพิ่มเติม:**
- ระบบจะสแกนหาโฟลเดอร์ Patterns ในโปรเจคของคุณอัตโนมัติ
- **สัญลักษณ์ที่ปรากฏ:**
  - `✓` : ไฟล์ตรงกับต้นฉบับ (Up to date)
  - `!` : ไฟล์ล้าสมัย มีการแก้ไขที่ต้นฉบับแล้ว (Outdated)
  - `○` : ยังไม่ได้ติดตั้ง Pattern นี้ (Not installed)

---

### 4. `update` — Synchronize Patterns 🔄
ซิงค์ข้อมูลใหม่ล่าสุดจากโฟลเดอร์ `patterns/` ในเครื่องคุณ เข้าสู่โปรเจคที่กำลังทำงานอยู่

```bash
agent-patterns update
```

**รายละเอียดเพิ่มเติม:**
- คำสั่งนี้จะทำการ **Overwrite** ไฟล์ที่ล้าสมัย (ที่ขึ้นเครื่องหมาย `!` ในตอนเช็ค) ให้กลายเป็นเวอร์ชันล่าสุดทันที
- **Tip:** เมื่อคุณแก้ไข "ทักษะ" ของ AI ที่โปรเจคต้นฉบับเสร็จแล้ว ให้มารันคำสั่งนี้ที่โปรเจคทำงานเพื่อให้ AI เก่งขึ้นตามต้นฉบับครับ

---

### 5. `list` — Registry Overview 📋
ดูรายการ Patterns ทั้งหมดที่ระบบรองรับในปัจจุบัน

```bash
agent-patterns list
```

**รายละเอียดเพิ่มเติม:**
- แสดงทั้ง ID, คำอธิบายสั้นๆ และ Tags ที่เกี่ยวข้อง
- ช่วยให้คุณรู้ว่ามี "ทักษะ" อะไรบ้างที่คุณสามารถ `add` เข้าไปในโปรเจคได้

---

## 📂 โครงสร้างที่สร้างให้ AI (Structure Injection)

เมื่อรันคำสั่ง `init` ตัวโปรแกรมจะสร้างโฟลเดอร์สำหรับ IDE (เช่น `.cursor/rules/`) ซึ่งจะมีโครงสร้างดังนี้:

```text
📁 .cursor/rules/[pattern-id]/
   ├── PATTERN.md         # AI instructions (หลักการและกฎที่ AI ต้องทำตาม)
   └── references/        # Deep-dive templates (ตัวอย่างโค้ดฉบับเต็ม)
```

**📌 หัวใจสำคัญ:** AI Agent จะอ่านไฟล์ `PATTERN.md` เพื่อเรียนรู้มาตรฐาน **Clean Architecture** ของคุณ ทำให้โค้ดที่มันเขียนออกมามีคุณภาพและสม่ำเสมอครับ!

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
3. ทดสอบเรียกใช้ด้วย `agent-patterns list`

---

## 🤝 Contributing

Contributions are welcome! If you have a pattern that could benefit others, please feel free to:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingPattern`)
3. Commit your Changes (`git commit -m 'Add some AmazingPattern'`)
4. Push to the Branch (`git push origin feature/AmazingPattern`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///Users/marosdeeuma/agent-project-patterns/LICENSE) file for details.

---

<p align="center">Made with ❤️ for the AI Generation</p>
