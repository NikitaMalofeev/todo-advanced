import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Для расширенных матчеров

import TodoItem from './TodoItem';

test('отображение TodoItem', () => {
    const todo = {
        id: 1,
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца',
        status: 'waiting',
        date: '2024-01-12',
    };

    render(<TodoItem {...todo} />);

    // Проверяем, что заголовок и статус отображаются правильно
    expect(screen.getByText('Купить продукты')).toBeInTheDocument();
    expect(screen.getByText('waiting')).toBeInTheDocument();
});

test('нажатие на кнопку редактирования открывает модальное окно', () => {
    const todo = {
        id: 1,
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца',
        status: 'waiting',
        date: '2024-01-12',
    };

    render(<TodoItem {...todo} />);

    // Нажимаем на кнопку редактирования
    fireEvent.click(screen.getByTestId('edit-button'));

    // Проверяем, что модальное окно для редактирования открыто
    expect(screen.getByText('Редактирование задачи')).toBeInTheDocument();
});

test('редактирование TodoItem', () => {
    const todo = {
        id: 1,
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца',
        status: 'waiting',
        date: '2024-01-12',
    };

    render(<TodoItem {...todo} />);

    // Нажимаем на кнопку редактирования
    fireEvent.click(screen.getByTestId('edit-button'));

    // Редактируем инпуты в модальном окне
    fireEvent.change(screen.getByLabelText('Название задачи'), {
        target: { value: 'Новое название' },
    });
    fireEvent.change(screen.getByLabelText('Описание задачи'), {
        target: { value: 'Новое описание' },
    });

    // Нажимаем на кнопку подтверждения
    fireEvent.click(screen.getByTestId('confirm-button'));

    // Проверяем, что задача отредактирована
    expect(screen.getByText('Новое название')).toBeInTheDocument();
    expect(screen.getByText('Новое описание')).toBeInTheDocument();
});
