// mocks.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // You might need to install redux-thunk as well
import { todoActions } from '../../../features/todoSlice/todoSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const mock = new MockAdapter(axios);

// добавление айтема
mock.onPost('/api/todo/addItem').reply((config) => {
    const data = JSON.parse(config.data);
    store.dispatch(todoActions.addItem(data));
    return [200, data];
});
// редактирование данных айтема
mock.onPut('/api/todo/editItem').reply((config) => {
    const data = JSON.parse(config.data);
    store.dispatch(todoActions.editItem(data));
    return [200, data];
});

// обновление статуса айтема
mock.onPut('/api/todo/updateStatusItem').reply((config) => {
    const data = JSON.parse(config.data);
    store.dispatch(todoActions.updateStatusItem(data));
    return [200, data];
});

// удаление данных айтема
mock.onDelete('/api/todo/deleteItem').reply((config) => {
    const data = JSON.parse(config.data);
    store.dispatch(todoActions.deleteItem(data));
    return [200, data];
});

export default mock;
