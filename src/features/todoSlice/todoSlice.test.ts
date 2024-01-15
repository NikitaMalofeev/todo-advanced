// import { todoActions, todoReducers } from './todoSlice';

// describe('Todo Slice', () => {
//     let initialState: any;

//     beforeEach(() => {
//         initialState = {
//             waiting: [],
//             progress: [],
//             finished: [],
//         };
//     });

//     it('should handle addItem', () => {
//         const newItem = {
//             id: 1,
//             title: 'New Task',
//             description: 'Description',
//             status: 'waiting',
//         };
//         const nextState = todoReducers(
//             initialState,
//             todoActions.addItem(newItem)
//         );

//         expect(nextState.waiting.length).toEqual(1);
//         expect(nextState.waiting[0]).toEqual(newItem);
//     });

//     it('should handle editItem', () => {
//         const existingItem = {
//             id: 1,
//             title: 'Task 1',
//             description: 'Description 1',
//             status: 'waiting',
//         };
//         const updatedItem = {
//             id: 1,
//             title: 'Updated Task',
//             description: 'Updated Description',
//             status: 'waiting',
//         };
//         initialState.waiting.push(existingItem);

//         const nextState = todoReducer(
//             initialState,
//             todoActions.editItem(updatedItem)
//         );

//         expect(nextState.waiting.length).toEqual(1);
//         expect(nextState.waiting[0]).toEqual(updatedItem);
//     });

//     it('should handle updateStatusItem', () => {
//         const curItem = {
//             id: 1,
//             title: 'Task 1',
//             description: 'Description 1',
//             status: 'waiting',
//         };
//         const nextState = todoReducers(
//             { ...initialState, waiting: [curItem] },
//             todoActions.updateStatusItem({
//                 curItem,
//                 nextStatus: 'progress',
//                 prevStatus: 'waiting',
//             })
//         );

//         expect(nextState.waiting.length).toEqual(0);
//         expect(nextState.progress.length).toEqual(1);
//         expect(nextState.progress[0]).toEqual({
//             ...curItem,
//             status: 'progress',
//         });
//     });

//     it('should handle deleteItem', () => {
//         const curItem = {
//             id: 1,
//             title: 'Task 1',
//             description: 'Description 1',
//             status: 'waiting',
//         };
//         initialState.waiting.push(curItem);

//         const nextState = todoReducers(
//             initialState,
//             todoActions.deleteItem({ id: 1, curStatus: 'waiting' })
//         );

//         expect(nextState.waiting.length).toEqual(0);
//     });
// });
