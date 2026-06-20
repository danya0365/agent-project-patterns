# เพิ่มฟีเจอร์โดเมนใหม่ (ลอกจาก `items`)

`items` คือฟีเจอร์ตัวอย่างใน `saas-starter` ที่ไหลครบทั้ง 4 layer — เป็นแม่แบบที่ดีที่สุด
ในการเพิ่มโดเมนของคุณ ขั้นตอนด้านล่างคือลำดับ "ลอกแล้ว rename" สมมติฟีเจอร์ใหม่ชื่อ `product`
(เปลี่ยน `Item`/`item`/`items` → `Product`/`product`/`products` ให้หมด)

## ลำดับไฟล์ (ตามทิศ dependency)

1. **Schema** — `src/infrastructure/db/schema/products.ts`
   ลอกจาก `items.ts`: ตาราง scope ด้วย `shopId` (FK → `shops`, `onDelete: "cascade"`),
   index รองรับ keyset pagination `(shopId, createdAt, id)`
   แล้วเพิ่ม `export * from "./products";` ใน `schema/index.ts`

2. **Entity** — เพิ่ม `Product` (+ enum ที่ต้องใช้) ใน `src/domain/entities/index.ts`
   *(domain เป็น pure TS — ห้าม import Drizzle/Next)*

3. **Repository port** — `src/application/repositories/IProductRepository.ts`
   ทุกเมธอดที่อ่าน/เขียน tenant รับ `shopId`; มี `pageByShop(shopId, opts)` คืน `Page<Product>`

4. **Repository impl** — `src/infrastructure/repositories/drizzle/DrizzleProductRepository.ts`
   ขึ้นต้น `import "server-only"`; ทุก `where` มี `eq(schema.products.shopId, shopId)`;
   pagination ใช้ `cursorWhere` + `toPage` จาก `./_cursor`

5. **Use cases** — `src/application/use-cases/product/` (`Create/Update/Delete/List...`)
   - business rule + validation อยู่ที่นี่
   - **mutate ต้องเช็ค tenant scope**: `findById` แล้วยืนยัน `entity.shopId === shopId` ก่อนแก้/ลบ
     (ดู `UpdateItemUseCase` / `DeleteItemUseCase`)

6. **Server actions** — `src/presentation/actions/product-actions.ts`
   - `"use server"`, ดึง `shopId` จาก `requireRole("shop_owner")` + `assertShopActive(shopId)`
   - เรียก use case (ไม่เขียน logic เอง), `revalidatePath(...)`, คืน `FormState`

7. **Components** — `src/presentation/components/product/` (เช่น `ProductForm`, `ProductList`)
   - client component; ฟอร์มใช้ `useActionState`; ลิสต์ใช้ `<LoadMore>` (cursor)
   - **ใช้ semantic token เท่านั้น** (`bg-card`, `text-muted`, `border-border` …) ห้าม hardcode สี

8. **Route** — `app/(shop)/shop/products/page.tsx` (+ `loading.tsx`)
   - server component: `requireShopAccess()` → เรียก `ListProductsUseCase` → render form + list

9. **DI container** — `src/infrastructure/di/container.ts`
   เพิ่ม `import` + `readonly productRepository: IProductRepository = new DrizzleProductRepository();`

10. **Nav** — เพิ่มลิงก์ใน `src/presentation/components/layout/AppTabBar.tsx` (กลุ่ม `shop`)

11. **Migration** — `npm run db:generate` (สร้าง SQL จาก schema ใหม่) แล้ว `npm run db:push` ลง local

12. **Test** — `src/application/use-cases/product/products-flow.integration.test.ts`
    ลอกจาก `items-flow.integration.test.ts`: ใช้ `migrateTestDb()` + `seedShop()` + DI container
    ต้องมีเคส **กันข้ามผู้เช่า** (ร้าน B แก้/ลบของร้าน A ไม่ได้) และเคส pagination

## Verify (ต้องเขียวก่อนถือว่าเสร็จ)

```bash
npx tsc --noEmit
npm run lint:all      # ESLint + stylelint + dependency-cruiser (architecture gate)
npm test              # integration tests (in-memory libSQL)
```

ถ้า `depcruise` ฟ้อง = มี import ผิดทิศ (เช่น component แตะ container, application แตะ infrastructure) — แก้ให้ตรง layer
ถ้า ESLint ฟ้องเรื่องสี = ไป map เป็น semantic token

## เช็คลิสต์กันพลาด

- [ ] ทุก query scope ด้วย `shopId`
- [ ] mutate ผ่าน use case ที่ยืนยัน ownership ก่อน
- [ ] Drizzle repo / secret service มี `import "server-only"`
- [ ] component ไม่ import container/repo ตรงๆ
- [ ] UI ใช้ semantic token (ไม่มี `bg-[#...]` / `text-gray-*`)
- [ ] มี integration test รวมเคสข้ามผู้เช่า
- [ ] `npm run lint:all && npm test` เขียว
