<div align="center">
  <img src="https://img.icons8.com/color/96/robot-2.png" alt="Logo" width="80" />
  <h1>@dan/agent-patterns</h1>
  <p><b>Standardize your AI-driven development with the Agent Skills standard</b></p>

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
**The Solution:** `@dan/agent-patterns` provides a CLI to inject standardized **Agent Skills** directly into your project.

> [!TIP]
> This tool follows the **Industry Standard** for Agent Skills, making it 100% compatible with desktop managers like [chrlsio/agent-skills](https://github.com/chrlsio/agent-skills).

---

## ✨ Features (จุดเด่น)

- 🏗️ **Standard Compliant:** Follows the open standard (`.agents/skills/` + `SKILL.md`).
- 🤖 **Universal Support:** Works with Antigravity, Windsurf, Cursor, Claude Code, and more.
- 🔄 **One-Click Sync:** Keep skills across all your projects up-to-date with a single command.
- 🛠️ **Local-First:** Optimized for developers who want to manage their own local skill library.
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

ใช้สำหรับติดตั้ง Skills ทั้งหมดเข้าสู่โปรเจคใหม่ของคุณ (Scaffold everything)

```bash
# แบบปกติ (Interactive Mode)
agent-patterns init

# แบบรวดเร็ว (Skip Prompts)
agent-patterns init -y
```

**รายละเอียดเพิ่มเติม:**

- ระบบจะใช้โฟลเดอร์มาตรฐาน **`.agents/skills/`** เป็นค่าเริ่มต้น (Recommended)
- **Flag `-y, --yes`**: จะข้ามทุกคำถามและติดตั้งลงในโฟลเดอร์เริ่มต้นทันที
- **Flag `-f, --force`**: ใช้สำหรับเขียนทับ (Overwrite) ไฟล์เดิมในโฟลเดอร์ปลายทาง
- **Flag `-d, --dest <dir>`**: กำหนดโฟลเดอร์ปลายทางเองโดยตรง (เช่น `agent-patterns init -d .antigravity`)

---

### 2. `add [id]` — Add Specific Skill ➕

ใช้สำหรับเลือกติดตั้งเฉพาะ Skill ที่ต้องการ (Selective installation)

```bash
# เลือกจากรายการ (Interactive List)
agent-patterns add

# ระบุ ID ของ Skill โดยตรง
agent-patterns add page
agent-patterns add repo
```

**รายละเอียดเพิ่มเติม:**

- หากไม่ระบุ `id` ตัวโปรแกรมจะแสดงรายการ Skill ทั้งหมดที่มีให้คุณเลือก
- เหมาะสำหรับกรณีที่คุณมีโปรเจคอยู่แล้ว และต้องการเพิ่มเฉพาะความสามารถใหม่ๆ เข้าไป

---

### 3. `check` — Version Validation 🔍

ตรวจสอบความสดใหม่ของไฟล์ Skills ในโปรเจคของคุณ เทียบกับต้นฉบับ (Local Master)

```bash
agent-patterns check
```

**รายละเอียดเพิ่มเติม:**

- ระบบจะสแกนหาโฟลเดอร์มาตรฐานในโปรเจคของคุณอัตโนมัติ
- **สัญลักษณ์ที่ปรากฏ:**
  - `✓` : ไฟล์ตรงกับต้นฉบับ (Up to date)
  - `!` : ไฟล์ล้าสมัย มีการแก้ไขที่ต้นฉบับแล้ว (Outdated)
  - `○` : ยังไม่ได้ติดตั้ง Skill นี้ (Not installed)

---

### 4. `update` — Synchronize Skills 🔄

ซิงค์ข้อมูลใหม่ล่าสุดจากโฟลเดอร์ `skills/` ในเครื่องคุณ เข้าสู่โปรเจคที่กำลังทำงานอยู่

```bash
agent-patterns update
```

**รายละเอียดเพิ่มเติม:**

- คำสั่งนี้จะทำการ **Overwrite** ไฟล์ที่ล้าสมัยให้กลายเป็นเวอร์ชันล่าสุดทันที
- เมื่อคุณแก้ไข "ทักษะ" ที่โปรเจคต้นฉบับเสร็จแล้ว รันคำสั่งนี้เพื่อให้ AI ทุกตัวเก่งขึ้นพร้อมกันครับ

---

### 5. `list` — Registry Overview 📋

ดูรายการ Skills ทั้งหมดที่ระบบรองรับในปัจจุบัน

```bash
agent-patterns list
```

---

## 📂 โครงสร้างมาตรฐาน (Industry Standard)

เมื่อคุณรันคำสั่ง `init` ระบบจะสร้างโครงสร้างตามมาตรฐานสากล ซึ่ง AI Agent ส่วนใหญ่ (รวมถึงเครื่องมือจัดการอย่าง `chrlsio/agent-skills`) จะหาเจอทันที:

```text
📁 .agents/skills/
   📁 nextjs-create-page/
      ├── SKILL.md           # AI instructions (YAML + Instructions)
      └── references/        # Deep-dive templates & examples
   📁 nextjs-create-repo/
      ├── SKILL.md
      └── references/
   📁 nextjs-init-project/
      ├── SKILL.md
      └── references/
   📁 nextjs-theme-css/
      ├── SKILL.md
      └── references/
   📁 nextjs-multi-theme/
      ├── SKILL.md
      └── references/
```

**📌 หัวใจสำคัญ:** AI Agent จะอ่านไฟล์ `SKILL.md` เพื่อเรียนรู้มาตรฐาน **Clean Architecture** ของคุณ

---

## 📝 รายการ Skills ที่มีจำหน่าย (Registry)

### Next.js Stack

| ID                    | คำอธิบาย                                      |
| --------------------- | --------------------------------------------- |
| `nextjs-init-project` | เริ่มต้นโปรเจค Next.js ใหม่                   |
| `nextjs-create-page`  | สร้าง Page (Repository → Presenter → View)    |
| `nextjs-create-repo`  | สร้าง Data Layer (Interface → Implementation) |
| `nextjs-theme-css`    | กฎการเขียน CSS Theme Variables                |
| `nextjs-multi-theme`  | Multi-Theme System ด้วย Zustand               |

### กฎการตั้งชื่อ (Naming Convention)

ใช้ pattern: `[stack]-[action]-[target]`

- `nextjs-*` — Skills สำหรับ Next.js
- `laravel-*` — Skills สำหรับ Laravel (coming soon)

---

## 💡 สำหรับนักพัฒนา (How to add new skill)

1. เพิ่มไฟล์ Markdown ของคุณในโฟลเดอร์ `skills/`
2. ตั้งชื่อไฟล์หลักว่า **`SKILL.md`** (ต้องมี YAML frontmatter)
3. ลงทะเบียนใน [src/registry.js](file:///Users/marosdeeuma/agent-project-patterns/src/registry.js)

---

## 🤝 Contributing

Contributions are welcome! If you have a skill that could benefit others, please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///Users/marosdeeuma/agent-project-patterns/LICENSE) file for details.

---

<p align="center">Made with ❤️ for the AI Generation</p>
