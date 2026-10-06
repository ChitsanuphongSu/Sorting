# QA-REPORT.md
# รายงานผลการตรวจสอบคุณภาพ (Quality Assurance & Testing Report)

**โครงการ:** Data Structures Chapter 12 — Sorting Algorithms  
**วันที่ทดสอบ:** 7 ตุลาคม 2026  
**สถานะ:** ผ่านการทดสอบทั้งหมด 88 ข้อ และ Production Build สำเร็จ 100%

---

## 1. ผลการรัน Automated Test Suite (Vitest)

คำสั่ง: `npx vitest run`  
ผลลัพธ์:
- **Test Files:** 2 passed (2)
- **Total Tests:** 88 passed (88 tests)
- **Execution Time:** ~263ms

### รายละเอียด Test Suites:
1. `src/algorithms/sortingEngines.test.ts` (84 tests):
   - **Edge Cases & Data Tests (7 Engines × 11 Data Types = 77 tests):**
     1. Lecture Example 1 `[64, 25, 12, 22, 11]` -> **PASSED**
     2. Lecture Example 2 `[25, 32, 12, 55, 9, 18, 50, 45]` -> **PASSED**
     3. Already Sorted `[1, 2, 3, 4, 5]` -> **PASSED**
     4. Reverse Sorted `[5, 4, 3, 2, 1]` -> **PASSED**
     5. Duplicate Values `[4, 2, 4, 3, 2, 1]` -> **PASSED**
     6. Single Element `[42]` -> **PASSED**
     7. Negative Numbers `[12, -3, 45, 0, -10]` -> **PASSED**
     8. Empty Array `[]` -> **PASSED** (ไม่ Crash, คืนค่า `actionType: 'done'`)
     9. Two Elements `[2, 1]` -> **PASSED**
     10. Two Equal Elements `[2, 2]` -> **PASSED**
     11. Max Supported Array (15 Elements) -> **PASSED**
   - **Step Transition & Metadata Assertion Tests (7 tests):**
     - Selection Sort: ตรวจสอบความถูกต้องของ `minCandidateIndex`, `sortedBoundary` และการ Swap
     - Bubble Sort: ตรวจสอบว่าคู่ที่เปรียบเทียบและสลับติดกันจริง (`|a - b| === 1`) และทดสอบ `earlyExitTriggered`
     - Insertion Sort: ตรวจสอบการสร้าง `holeIndex`, การแยก `keyValue` และการ Insert
     - Shell Sort: ตรวจสอบระยะห่างของการ Shift เท่ากับ `gap` และลำดับการลดค่า `gap` (4 -> 2 -> 1)
     - Merge Sort: ตรวจสอบความถูกต้องของ `split` ranges และ slice ซ้าย/ขวา
     - Quick Sort: ตรวจสอบว่า `pivotIndex`, `iPointer` และ `jPointer` ถูกจำกัดอยู่ในช่วง partition range
     - Heap Sort: ตรวจสอบว่า `heapSize` ลดลงแบบ monotonic และจำนวนโหนดใน Tree เท่ากับความยาวอาร์เรย์เสมอ

2. `src/data/sortingData.test.ts` (4 tests):
   - ตรวจสอบจำนวนข้อสอบ Quiz >= 20 ข้อ -> **PASSED**
   - ตรวจสอบความครอบคลุม 7 อัลกอริทึม -> **PASSED**
   - ตรวจสอบโครงสร้างตัวเลือก เฉลย และคำอธิบายทุกข้อ -> **PASSED**
   - ตรวจสอบ Interactive Labs ทั้ง 8 ข้อ -> **PASSED**

---

## 2. ผลการตรวจสอบและคอมไพล์ (Production Build Verification)

คำสั่ง: `npm run build` (`tsc -b && vite build`)  
ผลลัพธ์:
- **TypeScript Type Check:** ไม่มีข้อผิดพลาด (0 errors)
- **Vite Bundle Output:**
  - `dist/index.html` (0.98 kB)
  - `dist/assets/index-*.css` (45.69 kB)
  - `dist/assets/index-*.js` (465.96 kB)
- **Status:** Build สำเร็จสมบูรณ์

---

## 3. สรุปผลการปรับปรุงตาม Surgical QA Items

| ประเด็นที่ตรวจทาน | การแก้ไขที่ดำเนินการ | ผลการตรวจสอบ |
|---|---|---|
| **Heap Sort Dynamic Tree** | ปรับจากการ Hard-code 3 ระดับ เป็น Dynamic Binary Tree Renderer รองรับ 2–15 โหนดตามสมการ $parent(i) = \lfloor (i-1)/2 \rfloor$, $left(i) = 2i+1$, $right(i) = 2i+2$ | ผ่าน สมบูรณ์ รองรับชุดข้อมูล 2–15 ตัว |
| **Quick Sort PDF Audit** | ตรวจสอบการเลือก Pivot ตัวสุดท้าย, ตัวชี้ $i$ วิ่งขวาหา $> Pivot$, $j$ วิ่งซ้ายหา $< Pivot$, สลับ $i \leftrightarrow j$ เมื่อ $i < j$, สลับ $Pivot \leftrightarrow i$ เมื่อ $j \le i$ | ผ่าน ตรงตามสไลด์หน้า 50–62 ทุกประการ |
| **Merge Sort Divide View** | เพิ่ม Lightweight Divide & Conquer Breadcrumb Step (Original $\rightarrow$ Divide $\rightarrow$ Merge $\rightarrow$ Sorted) เสริมกับกล่องผสาน Subarrays | ผ่าน สื่อสารขั้นตอนชัดเจน ไม่รกสายตา |
| **Negative Values Rendering** | ปรับสมการความสูงของ Array Bar ให้ใช้ Safe Normalized Scaling $[(val - min) / range]$ ไม่เกิดค่าติดลบหรือ CSS Error | ผ่าน ค่าติดลบแสดงผลได้อย่างปลอดภัย |
| **Shell Sort Terminology** | ปรับคำอธิบาย UI และ Step Label เป็น "ขยับข้อมูลข้ามช่องด้วยระยะ Gap" และ "Shift / Insert ตาม Gap" | ผ่าน ถูกต้องตามหลักการและสไลด์ |
| **Insertion Key Animation** | ปรับจาก `animate-bounce` เป็น Calm Academic Focus Style (Ring + Shadow + Subtle Scale) | ผ่าน สบายตาและเป็นมืออาชีพ |
