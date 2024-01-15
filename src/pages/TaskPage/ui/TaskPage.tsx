import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TTodoItem, TodoStatus } from '../../../share/types/todo';

const TaskPage = () => {
    const location = useLocation();
    const [todoItem, setTodoItem] = useState<TTodoItem>({
        id: '',
        title: '',
        description: '',
        status: '' as TodoStatus,
        date: '',
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id') || '';
        const title = queryParams.get('title') || '';
        const description = queryParams.get('description') || '';
        const status = (queryParams.get('status') as TodoStatus) || 'waiting';
        const date = queryParams.get('date') || '';

        // Записываем параметры в состояние
        setTodoItem({
            id,
            title,
            description,
            status,
            date,
        });

        // Здесь вы можете использовать полученные значения
        console.log('ID:', id);
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Status:', status);
        console.log('Date:', date);
    }, [location.search]);

    return (
        <div className="task_page_container">
            <h1>Подробнее о задаче: {todoItem.title}</h1>
            <div className="task_page_container_description">
                <p>Описание: {todoItem.description}</p>
            </div>
            <p>Статус: {todoItem.status}</p>
            <p>Дата добавления: {todoItem.date}</p>
            {/* Другие компоненты и код страницы */}
        </div>
    );
};

export default TaskPage;
