import { Modal, Input, Button, Select, DatePicker, Form } from 'antd';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const { Option } = Select;

const schema = z.object({
    name: z.string().min(1, { message: 'ชื่อหนี้มีอย่างน้อย 1 ตัวอักษร' }).nonempty({ message: 'กรุณาใส่ชื่อหนี้' }),
    creditor: z.string().min(1, { message: 'ชื่อเจ้าหนี้มีอย่างน้อย 1 ตัวอักษร' }).nonempty({ message: 'กรุณาใส่ชื่อเจ้าหนี้' }),
    totalAmount: z.number().min(0.01, { message: 'ยอดเงินต้องมากกว่า 0' }).refine(val => val > 0, { message: 'กรุณาใส่ยอดเงินที่ถูกต้อง' }),
    dueDate: z.string().nonempty({ message: 'กรุณาเลือกวันครบกำหนด' }),
    category: z.string().nonempty({ message: 'กรุณาเลือกหมวดหมู่' }),
});

type AddDebtFormData = z.infer<typeof schema>;

export interface DebtFormData {
    name: string;
    creditor: string;
    totalAmount: number;
    dueDate: string;
    category: string;
}

interface AddDebtModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (debtData: DebtFormData) => void;
}

const debtCategories = [
    { value: 'credit_card', label: 'บัตรเครดิต' },
    { value: 'loan', label: 'กู้ยืม' },
    { value: 'mortgage', label: 'สินเชื่อบ้าน' },
    { value: 'car_loan', label: 'สินเชื่อรถยนต์' },
    { value: 'personal_loan', label: 'สินเชื่อส่วนบุคคล' },
    { value: 'other', label: 'อื่นๆ' },
];

export default function AddDebtModal(props: AddDebtModalProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddDebtFormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async () => {
        console.log('✅ Submit data:');
        await new Promise((r) => setTimeout(r, 1000)); // simulate API
    };

    return (
        <Modal
            title='เพิ่มหนี้ใหม่'
            open={props.isOpen}
            onCancel={props.onClose}
            footer={null}
        >
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Form.Item label="ชื่อหนี้" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                    <Input {...register('name')} placeholder="กรุณาใส่ชื่อหนี้" />
                </Form.Item>

                <Form.Item label="ชื่อเจ้าหนี้" validateStatus={errors.creditor ? 'error' : ''} help={errors.creditor?.message}>
                    <Input {...register('creditor')} placeholder="กรุณาใส่ชื่อเจ้าหนี้" />
                </Form.Item>

                <Form.Item label="ยอดเงิน" validateStatus={errors.totalAmount ? 'error' : ''} help={errors.totalAmount?.message}>
                    <Input type="number" {...register('totalAmount')} placeholder="กรุณาใส่ยอดเงิน" />
                </Form.Item>

                <Form.Item label="วันครบกำหนด" validateStatus={errors.dueDate ? 'error' : ''} help={errors.dueDate?.message}>
                    <DatePicker {...register('dueDate')} className="w-full" />
                </Form.Item>

                <Form.Item label="หมวดหมู่" validateStatus={errors.category ? 'error' : ''} help={errors.category?.message}>
                    <Select {...register('category')} className="w-full">
                        {debtCategories.map((cat) => (
                            <Option key={cat.value} value={cat.value}>
                                {cat.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                    เพิ่มหนี้
                </Button>
            </Form>

        </Modal>
    );
}