import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../src/components/Modal';

describe('Modal', () => {
    it('should add a note when clicking the "Créer" button', () => {
        const mockAddNote = (title, note, comment) => {
            return
        }
        const addNoteMock = vi.fn().mockImplementation(mockAddNote);
        const handleModalMock = vi.fn();

        vi.mock('../store/notes', () => ({
            useNoteStore: () => ({
                addNote: addNoteMock
            })
        }));

        render(<Modal handleModal={handleModalMock} />);

        const titleInput = screen.getByTestId('create-input-title');
        const noteInput = screen.getByTestId('create-input-note');
        const commentInput = screen.getByTestId('create-input-comment');
        const createButton = screen.getByTestId('create-todo');

        fireEvent.change(titleInput, { target: { value: 'Test Title' } });
        fireEvent.change(noteInput, { target: { value: 'Test Note' } });
        fireEvent.change(commentInput, { target: { value: 'Test Comment' } });

        fireEvent.click(createButton);

        expect(addNoteMock).toHaveBeenCalledWith(
            'Test Title',
            'Test Note',
            'Test Comment'
        );
        expect(handleModalMock).toHaveBeenCalledTimes(1);
    });
});
