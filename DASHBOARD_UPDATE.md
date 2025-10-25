# Dashboard Layout Update

## Overview
ปรับหน้า dashboard ให้ตรงกับ wireframes ที่กำหนด โดยมีการเปลี่ยนแปลงดังต่อไปนี้:

## 🔄 Changes Made

### 1. Header Layout Update
- **เดิม**: Simple header with back button และ user menu
- **ใหม่**: Dashboard header with complete layout
  - Logo (Go Mate)
  - Search bar สำหรับค้นหากิจกรรม
  - Create activity button
  - User avatar with dropdown menu (รวม profile option)

### 2. Dashboard Structure
```
-------------------------------------------------
| Header: <Logo> [Search bar] [Create activity] [Avatar]
-------------------------------------------------
| Filters: [Category] [Date] [Near me]
-------------------------------------------------
| Activity Card 1: Title | category | date | joinBtn
| - Host avatar | short desc | members: 3/6
| Activity Card 2: ...
-------------------------------------------------
| Pagination / infinite scroll
```

### 3. New Components Created

#### `DashboardHeader.tsx`
- Complete header component ตาม wireframes
- รวม search, create activity, และ user menu
- Profile option ถูกย้ายมาอยู่ใน user dropdown menu
- Responsive design สำหรับ mobile และ desktop

#### Mock Data System
- `mockData.ts`: Mock activities และ users สำหรับการทดสอบ
- Updated `useActivities` hook เพื่อใช้ mock data
- Support การ filter และ search

### 4. Activity Cards
- **Title** และ **category tag** ในบรรทัดเดียวกัน
- **Date/time** แสดงด้วย icon
- **Host avatar** และ **name**
- **Member count** (current/max)
- **Location** (ย่อถ้ายาวเกินไป)
- **Join button** ที่เปลี่ยนสีตามสถานะ

### 5. Filter System
- Category dropdown (All Categories + activity types)
- Date picker สำหรับกรองวันที่
- Near me button (placeholder)
- Real-time filtering และ search

### 6. Features Implemented
- ✅ Real-time search
- ✅ Category filtering
- ✅ Activity cards display
- ✅ Join button states (Join/Joined/Full)
- ✅ Responsive design
- ✅ Load more functionality
- ✅ Profile access in header dropdown

## 🎨 Design Features

### Activity Card States
- **Join**: Primary button สำหรับกิจกรรมที่สามารถเข้าร่วมได้
- **Joined**: Default button สำหรับกิจกรรมที่เข้าร่วมแล้ว
- **Full**: Disabled button สำหรับกิจกรรมที่เต็มแล้ว

### Responsive Layout
- Desktop: Full header layout with all elements
- Mobile: Responsive stack layout
- Card grid: xs=24, sm=12, lg=8 (1, 2, 3 columns)

### User Experience
- ❌ **เดิม**: Profile เป็น card แยกในหน้า dashboard
- ✅ **ใหม่**: Profile อยู่ใน header dropdown พร้อมกับ logout
- Search แบบ real-time
- Filter แบบ instant update
- Loading states และ empty states

## 📁 File Structure
```
src/
├── components/
│   └── layout/
│       ├── Header.tsx (เดิม - ยังใช้ในหน้าอื่น)
│       └── DashboardHeader.tsx (ใหม่ - สำหรับ dashboard)
├── lib/
│   └── mockData.ts (ใหม่)
└── hooks/
    └── useActivities.ts (ปรับปรุงให้ใช้ mock data)

app/
└── dashboard/
    └── page.tsx (ปรับปรุงทั้งหน้า)
```

## 🚀 Next Steps
1. ✅ Profile ถูกย้ายไปใน header dropdown แล้ว
2. ⏳ Implement actual API calls (ตอนนี้ใช้ mock data)
3. ⏳ Create activity page integration
4. ⏳ Near me filter implementation
5. ⏳ Activity detail view
6. ⏳ Real join/leave functionality

## 📱 Testing
เปิด http://localhost:3000/dashboard เพื่อดูผลลัพธ์

### Features to Test
1. Search กิจกรรม
2. Filter by category
3. Join button states
4. Profile access ใน header avatar dropdown
5. Responsive layout (ลองปรับขนาดหน้าจอ)
6. Load more functionality