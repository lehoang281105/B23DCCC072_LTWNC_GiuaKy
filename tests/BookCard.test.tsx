import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookCard } from '../src/features/books/components/BookCard';
import type { Book } from '../src/types/book';

const mockBook: Book = {
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  publishYear: 2008,
  totalCopies: 5,
  availableCopies: 3,
  pages: 464,
  coverUrl: '/cover.jpg',
  rating: 4.8,
  description: 'A handbook of agile software craftsmanship.',
};

describe('BookCard component', () => {
  it('renders book information correctly', () => {
    const onBorrow = jest.fn();
    const onReturn = jest.fn();

    render(
      <BookCard
        book={mockBook}
        isBorrowed={false}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('Còn 3 bản')).toBeInTheDocument();
  });

  it('triggers onBorrow when user clicks Muon button', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    const onReturn = jest.fn();

    render(
      <BookCard
        book={mockBook}
        isBorrowed={false}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );

    const borrowBtn = screen.getByRole('button', { name: /Mượn sách Clean Code/i });
    await user.click(borrowBtn);

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b1');
  });

  it('disables borrow button when availableCopies is 0', () => {
    const onBorrow = jest.fn();
    const onReturn = jest.fn();
    const outOfStockBook: Book = { ...mockBook, availableCopies: 0 };

    render(
      <BookCard
        book={outOfStockBook}
        isBorrowed={false}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );

    const borrowBtn = screen.getByRole('button', { name: /Mượn sách Clean Code/i });
    expect(borrowBtn).toBeDisabled();
    expect(screen.getByText('Hết bản')).toBeInTheDocument();
  });

  it('shows return button and triggers onReturn when book is borrowed', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    const onReturn = jest.fn();

    render(
      <BookCard
        book={mockBook}
        isBorrowed={true}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );

    const returnBtn = screen.getByRole('button', { name: /Trả sách Clean Code/i });
    expect(returnBtn).toBeInTheDocument();
    await user.click(returnBtn);

    expect(onReturn).toHaveBeenCalledTimes(1);
    expect(onReturn).toHaveBeenCalledWith('b1');
  });
});
