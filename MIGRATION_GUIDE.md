# 🚀 Frontend Architecture Migration Guide

## ✅ เสร็จแล้ว - Completed Tasks

### 1. ✅ Feature-based Architecture 
- ✅ สร้างโครงสร้าง `src/features/` แยกตาม business logic
- ✅ ย้าย auth components ไป `features/auth/`  
- ✅ ย้าย debt components ไป `features/debt/`
- ✅ สร้าง dashboard feature structure
- ✅ สร้าง shared components และ core infrastructure

### 2. ✅ Zustand State Management
- ✅ สร้าง `authStore.ts` แทน AuthContext
- ✅ สร้าง `debtStore.ts` สำหรับ debt management
- ✅ สร้าง `uiStore.ts` สำหรับ UI state (modals, toasts, theme)
- ✅ สร้าง StoreProvider สำหรับ initialization

### 3. ✅ Atomic Design System
- ✅ สร้าง atoms: Button, Input, Card, Avatar, Badge, Text, etc.
- ✅ เตรียมโครงสร้าง molecules, organisms, templates
- ✅ Barrel exports สำหรับ component organization

### 4. ✅ Error Boundaries  
- ✅ สร้าง ErrorBoundary component
- ✅ สร้าง AsyncErrorBoundary สำหรับ async errors
- ✅ สร้าง RouteErrorBoundary สำหรับ page-level errors

## 🔄 ขั้นตอนต่อไป - Next Steps

### Phase 1: Migration (1-2 weeks)

#### 1.1 อัปเดต Layout และ Providers
```tsx
// app/layout.tsx - ปรับจาก multiple contexts เป็น Zustand
import { StoreProvider, RouteErrorBoundary } from '@/core/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <RouteErrorBoundary>
          <StoreProvider>
            {children}
          </StoreProvider>
        </RouteErrorBoundary>
      </body>
    </html>
  );
}
```

#### 1.2 อัปเดต Import Paths
```tsx
// เปลี่ยนจาก
import { useAuthContext } from '@/contexts/auth/AuthProvider';
import { Button } from '@/components/ui/Button';

// เป็น
import { useAuthStore } from '@/core/store';
import { Button } from '@/shared/components/atoms';
```

#### 1.3 อัปเดต Components ให้ใช้ Zustand
```tsx
// เปลี่ยนจาก Context API
const { user, login, logout } = useAuthContext();

// เป็น Zustand
const { user, login, logout } = useAuthStore();
```

### Phase 2: Feature Enhancement (2-3 weeks)

#### 2.1 สร้าง Molecules
```tsx
// src/shared/components/molecules/FormField.tsx
export const FormField = ({ label, error, children }) => (
  <div>
    <Label error={!!error}>{label}</Label>
    {children}
    {error && <Text variant="small" color="error">{error}</Text>}
  </div>
);
```

#### 2.2 สร้าง Organisms  
```tsx
// src/shared/components/organisms/Navigation.tsx
// src/features/debt/components/DebtList.tsx
```

#### 2.3 อัปเดต API Integration
```tsx
// ใช้ Zustand stores แทน manual state management
const { debts, addDebt, isLoading } = useDebtStore();
```

### Phase 3: Optimization (1-2 weeks)

#### 3.1 Code Splitting
```tsx
// Lazy load features
const DebtManagement = lazy(() => import('@/features/debt'));
const Dashboard = lazy(() => import('@/features/dashboard'));
```

#### 3.2 Performance Monitoring
```tsx
// Add performance tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
```

## 📁 โครงสร้างใหม่

```
src/
├── features/                 # Feature-based modules
│   ├── auth/
│   │   ├── components/      # Auth-specific components
│   │   ├── hooks/          # Auth hooks  
│   │   ├── services/       # Auth API services
│   │   ├── types/          # Auth types
│   │   ├── utils/          # Auth utilities
│   │   └── index.ts        # Public API
│   ├── debt/
│   │   ├── components/     # Debt management components
│   │   ├── hooks/          # Debt hooks
│   │   ├── services/       # Debt API services
│   │   ├── types/          # Debt types
│   │   ├── utils/          # Debt utilities  
│   │   └── index.ts        # Public API
│   └── dashboard/
│       ├── components/     # Dashboard components
│       └── ...
├── shared/                  # Shared across features
│   ├── components/         # Reusable UI components
│   │   ├── atoms/         # Basic components
│   │   ├── molecules/     # Composed components  
│   │   ├── organisms/     # Complex components
│   │   └── templates/     # Layout templates
│   ├── hooks/             # Shared hooks
│   ├── utils/             # Utility functions
│   ├── types/             # Global types
│   └── constants/         # App constants
├── core/                   # Core infrastructure  
│   ├── store/             # Zustand stores
│   ├── api/              # API configuration
│   ├── providers/        # Global providers
│   ├── config/           # App configuration
│   └── middleware/       # Request/response middleware
└── app/                   # Next.js App Router (existing)
```

## 🎯 Migration Checklist

### ⚡ Critical - ทำก่อน
- [ ] อัปเดต app/layout.tsx ให้ใช้ StoreProvider
- [ ] เปลี่ยน AuthContext เป็น useAuthStore  
- [ ] เปลี่ยน import paths เป็น feature-based
- [ ] เพิ่ม ErrorBoundary ในหน้าสำคัญ

### 🔧 Important - ทำตาม
- [ ] ย้าย components ที่เหลือไป atomic design structure
- [ ] สร้าง molecules และ organisms ที่จำเป็น
- [ ] อัปเดต API calls ให้ใช้ Zustand stores
- [ ] เพิ่ม loading states และ error handling

### 🚀 Nice to have - ทำได้เมื่อมีเวลา  
- [ ] Code splitting โดย features
- [ ] Performance monitoring
- [ ] A/B testing setup
- [ ] Advanced error tracking

## 🔗 Import Mapping

### เก่า → ใหม่
```tsx
// Contexts
'@/contexts/auth/AuthProvider' → '@/features/auth' 
'@/contexts/store/AppContext' → '@/core/store'

// Components  
'@/components/ui/Button' → '@/shared/components/atoms'
'@/components/debt/AddDebtModal' → '@/features/debt'
'@/components/layout/Header' → '@/shared/components/organisms'

// Services
'@/services/auth' → '@/features/auth/services'
'@/services/base' → '@/core/api'
```

## ⚠️ Breaking Changes

1. **Context API → Zustand**: จำเป็นต้องแปลง useContext calls
2. **Import Paths**: ต้องอัปเดต import statements ทั้งหมด  
3. **Component Structure**: atoms อาจต้อง props changes
4. **State Management**: การจัดการ state เปลี่ยนไปใหม่หมด

## 🎉 Benefits After Migration

- **Better Performance**: Zustand มี re-render น้อยกว่า Context
- **Improved DX**: Feature-based organization ง่ายต่อการ maintain
- **Better Error Handling**: Comprehensive error boundaries
- **Scalability**: Ready for micro-frontend และ team scaling
- **Type Safety**: Better TypeScript integration
- **Testing**: Easier unit testing with isolated features

---

**🚨 แนะนำ**: ทำทีละขั้นตอน test ให้ดีก่อนไปขั้นต่อไป เพื่อไม่ให้เกิด breaking changes มากเกินไป