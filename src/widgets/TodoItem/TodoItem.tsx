import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faCheck,
    faPen,
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';
import TodoItemView from '../TodoItemView/TodoItemView';
import TodoForm from '../TodoForm/TodoForm';
import { todoActions } from '../../features/todoSlice/todoSlice';
import { TTodoItem, TodoStatus } from '../../share/types/todo';
import { useNavigate } from 'react-router-dom';

type TodoItemProps = TTodoItem & {
    nextStatus?: TodoStatus;
    prevStatus?: TodoStatus;
};
const TodoItem = (todo: TodoItemProps) => {
    const [openView, setOpenView] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { id, title, description, status, nextStatus, prevStatus, date } =
        todo;

    const dispatch = useDispatch();
    const getPreviousStatus = (currentStatus: TodoStatus) => {
        console.log('test');
        switch (currentStatus) {
            case 'progress':
                return 'waiting';
            case 'finished':
                return 'progress';
            default:
                return null;
        }
    };

    const navigate = useNavigate();

    const handelDeleteItem = () => {
        dispatch(todoActions.deleteItem({ id: id, curStatus: status }));
    };

    const handleUpdateNextStatus = () => {
        if (nextStatus) {
            const curTodo: TTodoItem = {
                id: id,
                title: title,
                description: description,
                status: status,
                date: date,
            };

            dispatch(
                todoActions.updateStatusItem({
                    curItem: curTodo,
                    nextStatus: nextStatus,
                    prevStatus: status,
                })
            );
        }
    };
    const handleUpdatePrevStatus = () => {
        const prevStatus = getPreviousStatus(status); // Функция для получения предыдущего статуса
        if (prevStatus) {
            const curTodo: TTodoItem = {
                id: id,
                title: title,
                description: description,
                status: status,
                date: date,
            };

            dispatch(
                todoActions.updateStatusItem({
                    curItem: curTodo,
                    nextStatus: prevStatus,
                    prevStatus: status,
                })
            );
        }
    };
    const handleEditItem = (title: string, desc: string) => {
        const curTodo: TTodoItem = {
            id: id,
            title: title,
            description: desc,
            status: status,
            date: date,
        };
        dispatch(todoActions.editItem(curTodo));
        setOpenEdit(!openEdit);
    };
    return (
        <>
            <div
                className="todo_item"
                // onClick={() => setOpenView(!openView)}
                onClick={() => navigate('/task')}
                style={{ cursor: 'pointer' }}
            >
                <div>
                    <h2 className="todo_item_title">{title}</h2>
                    <p className="status_chip">{status}</p>
                    <span className="todo_item_date">{date}</span>
                </div>
                <div className="todo_item_button_container">
                    <button
                        className={`todo_item_button todo_item_button_delete`}
                        onClick={handelDeleteItem}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            color="#856fd7"
                            fontSize={20}
                            width={50}
                        />
                    </button>
                    {status !== 'waiting' && (
                        <button
                            className={`todo_item_button todo_item_button_delete`}
                            onClick={handleUpdatePrevStatus}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                                color="#856fd7"
                                fontSize={20}
                                width={50}
                            />
                        </button>
                    )}
                    {status === 'waiting' && (
                        <button
                            className={`todo_item_button todo_item_button_edit`}
                            onClick={() => setOpenEdit(!openEdit)}
                        >
                            <FontAwesomeIcon
                                icon={faPen}
                                color="#856fd7"
                                fontSize={20}
                                width={50}
                            />
                        </button>
                    )}
                    {nextStatus && (
                        <button
                            className={`todo_item_button todo_item_button_update`}
                            onClick={handleUpdateNextStatus}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                color="#856fd7"
                                fontSize={23}
                                width={50}
                            />
                        </button>
                    )}
                </div>
            </div>
            <ModalWindow
                open={openView}
                handleOpen={() => setOpenView(!openView)}
            >
                <TodoItemView {...todo} />
            </ModalWindow>
            <ModalWindow
                open={openEdit}
                handleOpen={() => setOpenEdit(!openEdit)}
                title="Редактирование задачи"
            >
                <TodoForm
                    onConfirm={handleEditItem}
                    defaultTitle={title}
                    defaultDesc={description}
                />
            </ModalWindow>
        </>
    );
};
export default TodoItem;
