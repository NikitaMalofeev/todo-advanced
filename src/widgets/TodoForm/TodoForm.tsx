import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

type TodoFormProps = {
    onConfirm: (title: string, desc: string, date: string) => void;
    defaultTitle: string;
    defaultDesc: string;
};
const TodoForm = ({
    onConfirm,
    defaultDesc = '',
    defaultTitle = '',
}: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(defaultTitle);
    const [date, setDate] = useState(new Date().toLocaleDateString());

    const handleAddTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        onConfirm(title, description, date);
        setTitle('');
        setDescription('');
        setDate(new Date().toLocaleDateString());
    };

    return (
        <form onSubmit={handleAddTodo}>
            <fieldset className="input_fieldset">
                <label
                    className="input_label"
                    htmlFor="title"
                >
                    Заголовок
                </label>
                <input
                    className="input-field"
                    id="title"
                    name="title"
                    type="text"
                    value={title || defaultTitle}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(event.target.value);
                    }}
                    required
                    placeholder="Добавьте заголовок"
                />
            </fieldset>
            <fieldset className="input_fieldset">
                <label
                    className="input_label"
                    htmlFor="desc"
                >
                    Описание
                </label>
                <textarea
                    className="input-textarea"
                    id="desc"
                    name="description"
                    value={description || defaultDesc}
                    onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                        setDescription(event.target.value);
                    }}
                    required
                    placeholder="Добавьте описание"
                />
            </fieldset>
            <div className="task_footer">
                <span className="task_date">Текущая дата {date}</span>
                <input
                    type="submit"
                    className="default_button"
                />
            </div>
        </form>
    );
};
export default TodoForm;
