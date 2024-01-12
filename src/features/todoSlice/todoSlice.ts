import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TTodoItem, TodoStatus } from '../../share/types/todo';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        waiting: [] as TTodoItem[],
        progress: [] as TTodoItem[],
        finished: [] as TTodoItem[],
    },
    reducers: {
        addItem: (state, action: PayloadAction<TTodoItem>) => {
            state.waiting.push(action.payload);
        },
        editItem: (state, action: PayloadAction<TTodoItem>) => {
            const item = action.payload;
            const editedList = state.waiting.map((elem) => {
                if (elem.id === item.id) {
                    return {
                        ...elem,
                        title: item.title,
                        description: item.description,
                    };
                }
                return elem;
            });
            state.waiting = editedList;
        },
        updateStatusItem: (
            state,
            action: PayloadAction<{
                curItem: TTodoItem;
                nextStatus: TodoStatus;
                prevStatus: TodoStatus; // Добавляем параметр для предыдущего статуса
            }>
        ) => {
            const { curItem, nextStatus, prevStatus } = action.payload;

            // Удаляем текущий элемент из массива в предыдущем статусе
            const prevList = state[prevStatus].filter(
                (elem) => elem.id !== curItem.id
            );
            state[prevStatus] = prevList;

            // Обновляем статус элемента и добавляем его в массив следующего статуса
            const newItem = {
                ...curItem,
                status: nextStatus,
            };
            state[nextStatus].push(newItem);
        },
        deleteItem: (
            state,
            action: PayloadAction<{
                id: string | number;
                curStatus: TodoStatus;
            }>
        ) => {
            const { id, curStatus } = action.payload;
            const newList = state[curStatus].filter((elem) => elem.id !== id);
            state[curStatus] = newList;
        },
    },
});
// export const { addItem, updateStatusItem, deleteItem, editItem } =
//     todoSlice.actions;
export const { actions: todoActions } = todoSlice;
export default todoSlice.reducer;
