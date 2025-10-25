# Header Component

## Overview
Header component ที่รองรับ responsive design สำหรับแอปพลิเคชัน WeGoWhere โดยเฉพาะรองรับหน้าจอขนาด 430x932px (Mobile)

## Features

### 🎯 Responsive Design
- **Mobile First Approach**: เริ่มจากการออกแบบสำหรับ mobile ก่อน
- **Breakpoints**:
  - `xs`: < 576px (Very small phones)
  - `sm`: 576px - 767px (Small phones)
  - `md`: 768px - 991px (Tablets)
  - `lg`: 992px+ (Desktop)
- **Specific Support**: ปรับให้เหมาะสมกับ 430x932px

### 🧭 Navigation Features
- **Back to Home Button**: ปุ่มกลับหน้าหลักที่ปรับตามบริบท
  - จากหน้า dashboard → กลับไปหน้าหลัก (/)
  - จากหน้าอื่นๆ → กลับไป dashboard (/dashboard)
  - ซ่อนอัตโนมัติในหน้าหลักและ dashboard
- **Smart Routing**: การนำทางที่เข้าใจบริบทของผู้ใช้

### 📱 Mobile Features
- **Hamburger Menu**: เมนูแบบ drawer สำหรับ mobile
- **User Profile**: แสดงข้อมูลผู้ใช้และตัวเลือกต่างๆ
- **Compact Layout**: การจัดวางที่เหมาะสมกับหน้าจอเล็ก
- **Touch-Friendly**: ปุ่มและองค์ประกอบที่เหมาะสำหรับการสัมผัส
- **Mobile Back Button**: ปุ่ม back ในเมนู mobile แบบเต็มขนาด

### 🖥️ Desktop Features
- **Horizontal Layout**: แสดงข้อมูลแบบแนวนอน
- **Dropdown Menu**: เมนูผู้ใช้แบบ dropdown
- **Theme Controls**: ตัวควบคุม theme และภาษาแบบ inline

## Props

```typescript
interface HeaderProps {
  title?: string;          // ชื่อแอปพลิเคชัน (default: "Go Mate")
  showWelcome?: boolean;   // แสดงข้อความต้อนรับ (default: true)
  showBackToHome?: boolean; // แสดงปุ่ม Back to Home/Dashboard (default: true)
}
```

## Usage

```tsx
import { Header } from '@/components/layout';

// Basic usage
<Header />

// Custom title
<Header title="Custom App Name" />

// Without welcome message
<Header showWelcome={false} />

// Without back button
<Header showBackToHome={false} />

// Full customization
<Header 
  title="My App" 
  showWelcome={true} 
  showBackToHome={true} 
/>
```

## Responsive Behavior

### Mobile (≤ 430px)
- Title size: 16px
- Show hamburger menu
- Hide inline controls
- Welcome text below title
- Compact spacing

### Tablet (431px - 767px)
- Title size: 18-20px
- Show some inline controls
- Balanced spacing

### Desktop (≥ 768px)
- Title size: 24px
- Full inline controls
- Welcome text inline
- Maximum spacing

## Component Structure

```
Header
├── Card Container
│   ├── Row (justify="space-between")
│   │   ├── Col (Title Section)
│   │   │   └── Title with gradient
│   │   ├── Col (Desktop Actions)
│   │   │   ├── Welcome Text
│   │   │   ├── LocaleToggle
│   │   │   ├── ThemeToggle
│   │   │   └── User Dropdown
│   │   └── Col (Mobile Menu Button)
│   │       └── Hamburger Button
│   └── Row (Mobile Welcome)
│       └── Welcome Text
└── Drawer (Mobile Menu)
    ├── User Info Section
    ├── Theme Controls
    └── Menu Items
```

## Styling

### CSS-in-JS
- ใช้ `style` props สำหรับ dynamic styling
- ใช้ theme values จาก `useThemeUtils`
- Clamp functions สำหรับ responsive font sizes

### Custom CSS Classes
- `.header-container`: Container styling
- `.header-title`: Title responsive styling
- `.mobile-menu-button`: Mobile menu button
- `.mobile-welcome-text`: Mobile welcome text
- `.desktop-welcome`: Desktop welcome (hidden on mobile)
- `.mobile-welcome`: Mobile welcome (hidden on desktop)

## Dependencies

- `antd`: UI components
- `@ant-design/icons`: Icons
- `next/link`: Navigation
- Custom theme system
- Auth context

## Accessibility

- **ARIA Labels**: ปุ่มมี aria-label ที่เหมาะสม
- **Keyboard Navigation**: รองรับการใช้งานด้วยคีย์บอร์ด
- **Focus Management**: จัดการ focus อย่างเหมาะสม
- **Color Contrast**: สีที่ใช้มี contrast เพียงพอ

## Performance

- **Lazy Loading**: Drawer เปิดเมื่อต้องการใช้งานเท่านั้น
- **Memoization**: ป้องกันการ re-render ที่ไม่จำเป็น
- **Optimized Icons**: ใช้ icon จาก Ant Design อย่างมีประสิทธิภาพ

## Testing Considerations

### Responsive Testing
```bash
# Test different screen sizes
# 430x932 (Target mobile size)
# 768x1024 (Tablet)
# 1920x1080 (Desktop)
```

### Functionality Testing
- Menu toggle functionality
- Theme switching
- Language switching
- User dropdown actions
- Logout functionality

## Future Enhancements

1. **Animation**: เพิ่ม transition animations
2. **Customization**: เพิ่ม props สำหรับ customization
3. **Search Bar**: เพิ่ม search functionality
4. **Notifications**: เพิ่ม notification badge
5. **Breadcrumbs**: เพิ่ม breadcrumb navigation

## Troubleshooting

### Common Issues

1. **Layout Breaks on Mobile**
   - ตรวจสอบ CSS clamp values
   - ตรวจสอบ container padding

2. **Menu Not Opening**
   - ตรวจสอบ state management
   - ตรวจสอบ click handlers

3. **Theme Not Applying**
   - ตรวจสอบ ThemeProvider wrapper
   - ตรวจสอบ useThemeUtils hook

4. **Text Overflow**
   - ตรวจสอบ max-width settings
   - ใช้ text-overflow: ellipsis