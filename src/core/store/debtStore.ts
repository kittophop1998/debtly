import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// Debt State Types
export interface Debt {
  id: string;
  title: string;
  amount: number;
  currency: string;
  type: 'owe' | 'owed'; // I owe someone vs someone owes me
  creditorId?: string; // Who I owe (if type is 'owe')
  debtorId?: string; // Who owes me (if type is 'owed')
  description?: string;
  dueDate?: string;
  status: 'active' | 'paid' | 'overdue' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  payments: Payment[];
}

export interface Payment {
  id: string;
  debtId: string;
  amount: number;
  paymentDate: string;
  note?: string;
}

export interface DebtFilters {
  type?: 'owe' | 'owed' | 'all';
  status?: 'active' | 'paid' | 'overdue' | 'cancelled' | 'all';
  sortBy?: 'amount' | 'dueDate' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface DebtState {
  debts: Debt[];
  selectedDebt: Debt | null;
  filters: DebtFilters;
  isLoading: boolean;
  error: string | null;
}

export interface DebtActions {
  // Debt CRUD operations
  fetchDebts: () => Promise<void>;
  addDebt: (debt: Omit<Debt, 'id' | 'createdAt' | 'updatedAt' | 'payments'>) => Promise<void>;
  updateDebt: (id: string, updates: Partial<Debt>) => Promise<void>;
  deleteDebt: (id: string) => Promise<void>;
  
  // Payment operations
  addPayment: (debtId: string, payment: Omit<Payment, 'id'>) => Promise<void>;
  
  // UI state management
  setSelectedDebt: (debt: Debt | null) => void;
  setFilters: (filters: Partial<DebtFilters>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed values
  getTotalOwed: () => number;
  getTotalOwing: () => number;
  getFilteredDebts: () => Debt[];
}

// Debt Store
export const useDebtStore = create<DebtState & DebtActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // State
      debts: [],
      selectedDebt: null,
      filters: {
        type: 'all',
        status: 'all',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      },
      isLoading: false,
      error: null,

      // Actions
      fetchDebts: async () => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual API call
          const response = await fetch('/api/debts');
          if (!response.ok) {
            throw new Error('Failed to fetch debts');
          }
          const debts = await response.json();
          set({ debts, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      addDebt: async (debtData) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual API call
          const response = await fetch('/api/debts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(debtData),
          });

          if (!response.ok) {
            throw new Error('Failed to add debt');
          }

          const newDebt = await response.json();
          set(state => ({
            debts: [...state.debts, newDebt],
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      updateDebt: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual API call
          const response = await fetch(`/api/debts/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
          });

          if (!response.ok) {
            throw new Error('Failed to update debt');
          }

          const updatedDebt = await response.json();
          set(state => ({
            debts: state.debts.map(debt => 
              debt.id === id ? updatedDebt : debt
            ),
            selectedDebt: state.selectedDebt?.id === id ? updatedDebt : state.selectedDebt,
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      deleteDebt: async (id) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual API call
          const response = await fetch(`/api/debts/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete debt');
          }

          set(state => ({
            debts: state.debts.filter(debt => debt.id !== id),
            selectedDebt: state.selectedDebt?.id === id ? null : state.selectedDebt,
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      addPayment: async (debtId, paymentData) => {
        set({ isLoading: true, error: null });
        try {
          // TODO: Implement actual API call
          const response = await fetch(`/api/debts/${debtId}/payments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          if (!response.ok) {
            throw new Error('Failed to add payment');
          }

          const newPayment = await response.json();
          set(state => ({
            debts: state.debts.map(debt => 
              debt.id === debtId 
                ? { ...debt, payments: [...debt.payments, newPayment] }
                : debt
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          });
        }
      },

      // UI state management
      setSelectedDebt: (debt) => set({ selectedDebt: debt }),
      
      setFilters: (newFilters) => set(state => ({
        filters: { ...state.filters, ...newFilters }
      })),

      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),

      // Computed values
      getTotalOwed: () => {
        return get().debts
          .filter(debt => debt.type === 'owed' && debt.status === 'active')
          .reduce((total, debt) => total + debt.amount, 0);
      },

      getTotalOwing: () => {
        return get().debts
          .filter(debt => debt.type === 'owe' && debt.status === 'active')
          .reduce((total, debt) => total + debt.amount, 0);
      },

      getFilteredDebts: () => {
        const { debts, filters } = get();
        let filtered = [...debts];

        // Filter by type
        if (filters.type && filters.type !== 'all') {
          filtered = filtered.filter(debt => debt.type === filters.type);
        }

        // Filter by status
        if (filters.status && filters.status !== 'all') {
          filtered = filtered.filter(debt => debt.status === filters.status);
        }

        // Sort
        if (filters.sortBy) {
          filtered.sort((a, b) => {
            const aVal = a[filters.sortBy!];
            const bVal = b[filters.sortBy!];
            
            if (typeof aVal === 'string' && typeof bVal === 'string') {
              return filters.sortOrder === 'asc' 
                ? aVal.localeCompare(bVal)
                : bVal.localeCompare(aVal);
            }
            
            if (typeof aVal === 'number' && typeof bVal === 'number') {
              return filters.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            }
            
            return 0;
          });
        }

        return filtered;
      },
    })),
    {
      name: 'debt-store',
    }
  )
);

// Selector hooks for better performance
export const useDebts = () => useDebtStore((state) => state.getFilteredDebts());
export const useDebtSummary = () => useDebtStore((state) => ({
  totalOwed: state.getTotalOwed(),
  totalOwing: state.getTotalOwing(),
}));
export const useDebtFilters = () => useDebtStore((state) => state.filters);