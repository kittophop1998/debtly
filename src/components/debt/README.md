# Debt Components

ไฟล์นี้มี components ที่เกี่ยวข้องกับการจัดการหนี้ในแอป Debtly

## Components

### AddDebtModal

Modal สำหรับการเพิ่มหนี้ใหม่

#### Props

- `isOpen: boolean` - สถานะการเปิด/ปิด modal
- `onClose: () => void` - function สำหรับปิด modal  
- `onSubmit: (debtData: DebtFormData) => void` - function สำหรับส่งข้อมูลหนี้ใหม่

#### DebtFormData Interface

```typescript
export interface DebtFormData {
  name: string;         // ชื่อหนี้
  creditor: string;     // เจ้าหนี้  
  totalAmount: number;  // ยอดทั้งหมด
  dueDate: string;      // วันครบกำหนด (YYYY-MM-DD)
  category: string;     // หมวดหมู่หนี้
}
```

#### หมวดหมู่หนี้ที่รองรับ

- `credit_card` - บัตรเครดิต
- `loan` - กู้ยืม
- `mortgage` - สินเชื่อบ้าน
- `car_loan` - สินเชื่อรถยนต์
- `personal_loan` - สินเชื่อส่วนบุคคล
- `other` - อื่นๆ

#### การใช้งาน

```tsx
import { AddDebtModal, DebtFormData } from '../components/debt';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (debtData: DebtFormData) => {
    // บันทึกข้อมูลหนี้
    console.log('New debt:', debtData);
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        เพิ่มหนี้
      </button>
      
      <AddDebtModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};
```

## การ Validation

Modal จะตรวจสอบข้อมูลทั้งหมดก่อนส่ง:

- **ชื่อหนี้**: ต้องไม่เป็นค่าว่าง
- **เจ้าหนี้**: ต้องไม่เป็นค่าว่าง  
- **ยอดทั้งหมด**: ต้องมากกว่า 0
- **วันครบกำหนด**: ต้องเลือกวันที่
- **หมวดหมู่**: ต้องเลือกหมวดหมู่

## Styling

Component ใช้ Tailwind CSS สำหรับ styling และรองรับ responsive design

## Features

- ✅ Form validation แบบ real-time
- ✅ Loading state ขณะ submit
- ✅ Error handling
- ✅ Responsive design
- ✅ Keyboard shortcuts (ESC เพื่อปิด modal)
- ✅ Click outside เพื่อปิด modal
- ✅ Accessibility support