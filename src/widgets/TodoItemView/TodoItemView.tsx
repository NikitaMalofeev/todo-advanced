import { TTodoItem } from '../../share/types/todo';

const TodoItemView = ({ title, description, status }: TTodoItem) => {
    return (
        <div>
            <h1>Заголовок: {title}</h1>
            <p style={{ margin: '10px 0' }}>Описание: {description}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '20px' }}>Статус: </p>
                <p className="status_chip">{status}</p>
            </div>
        </div>
    );
};
export default TodoItemView;
