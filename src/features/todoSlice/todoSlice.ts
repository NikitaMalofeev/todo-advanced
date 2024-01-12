import { createSelector, createSlice } from '@reduxjs/toolkit';
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
                prevStatus: TodoStatus;
            }>
        ) => {
            const { curItem, nextStatus, prevStatus } = action.payload;

            const prevList = state[prevStatus].filter(
                (elem) => elem.id !== curItem.id
            );
            state[prevStatus] = prevList;

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
        // getTodoById: (state, action: PayloadAction<string>) => {
        //     const idToFind = action.payload;
        //     const allTasks = [
        //         ...state.waiting,
        //         ...state.progress,
        //         ...state.finished,
        //     ];
        //     return allTasks.find((task) => task.id === idToFind);
        // },
    },
});

export const { actions: todoActions } = todoSlice;
export default todoSlice.reducer;
