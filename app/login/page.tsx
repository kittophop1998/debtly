'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Input, Card } from '../../src/components/ui';
import { useAuthContext } from '../../src/hooks';
import { PublicRoute } from '../../src/components/layout';
import { ThemeToggle } from '../providers';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const loginSchema = z.object({
    username: z.string()
        .min(3, { message: 'Username ต้องมีอย่างน้อย 3 ตัวอักษร' })
        .nonempty({ message: 'กรุณากรอก Username' }),
    password: z.string()
        .min(6, { message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' })
        .nonempty({ message: 'กรุณากรอกรหัสผ่าน' }),
})

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login, isLoading } = useAuthContext();
    const router = useRouter();

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange', // Validate on change for better UX
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            clearErrors(); // Clear any previous errors

            const success = await login(data.username, data.password);

            if (success) {
                // Login สำเร็จ - AuthProvider จะ redirect ไปหน้าหลักอัตโนมัติ
                router.push('/dashboard');
            } else {
                setError('root', {
                    type: 'manual',
                    message: 'Username หรือรหัสผ่านไม่ถูกต้อง'
                });
            }
        } catch (error: unknown) {
            setError('root', {
                type: 'manual',
                message: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
            });
        }
    };

    return (
        <PublicRoute redirectTo="/dashboard">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 px-4">
                {/* Theme Toggle in top-right corner */}
                <div className="fixed top-4 right-4 z-10">
                    <ThemeToggle />
                </div>
                <Card
                    variant="bordered"
                    className="w-full max-w-md mx-auto shadow-2xl border-4 border-indigo-200 bg-gradient-to-b from-white to-blue-50"
                    padding="lg"
                >
                    {/* Title Section */}
                    <div className="text-center mb-8">
                        <div className="mb-4">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent mb-2">
                                Debtly
                            </h1>
                            <p className="text-2xl text-gray-700 font-medium">
                                จัดการหนี้แสนสนุก
                            </p>
                        </div>
                        <div className="h-1 w-24 bg-gradient-to-r from-teal-600 to-sky-600 mx-auto rounded-full mb-2"></div>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-teal-400 to-sky-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Input
                                type="text"
                                label="Username"
                                placeholder="กรอก Username ของคุณ"
                                {...register('username')}
                                error={errors.username?.message}
                                disabled={isLoading || isSubmitting}
                                className="border-2 border-gray-300 focus:border-indigo-500 rounded-xl"
                            />
                        </div>

                        <div>
                            <Input
                                type="password"
                                label="Password"
                                placeholder="กรอกรหัสผ่านของคุณ"
                                {...register('password')}
                                error={errors.password?.message}
                                disabled={isLoading || isSubmitting}
                                className="border-2 border-gray-300 focus:border-indigo-500 rounded-xl"
                            />
                        </div>

                        {errors.root && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <p className="text-red-600 text-sm font-medium text-center">{errors.root.message}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl border-2 border-transparent hover:border-indigo-300 transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:opacity-50"
                            disabled={isLoading || isSubmitting}
                        >
                            {isLoading || isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    กำลังเข้าสู่ระบบ...
                                </div>
                            ) : (
                                'เข้าสู่ระบบ'
                            )}
                        </Button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            ยังไม่มีบัญชี?{' '}
                            <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
                                onClick={() => router.push('/register')}
                            >
                                สมัครสมาชิก
                            </button>
                        </p>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                        <p className="text-xs text-yellow-700 text-center">
                            <strong>Demo:</strong> Username: admin, Password: password
                        </p>
                    </div>
                </Card>
            </div>
        </PublicRoute>
    );
}