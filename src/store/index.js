import { create } from 'zustand';
import { categorySlice } from './slices/categorySlice';
import { adminSlice } from './slices/adminSlice';
import { cartSlice } from './slices/cartSlice';

const useStore = create((...set) => ({
    ...categorySlice(...set),
    ...adminSlice(...set),
    ...cartSlice(...set),
}));

export default useStore;
