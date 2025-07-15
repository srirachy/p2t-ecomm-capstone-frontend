import { create } from 'zustand';
import { categorySlice } from './slices/categorySlice';
import { adminSlice } from './slices/adminSlice';

const useStore = create((...set) => ({
    ...categorySlice(...set),
    ...adminSlice(...set),
}));

export default useStore;