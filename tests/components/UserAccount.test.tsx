//usersname is rendered in the DOM, getByText,

// 2 editButton:
// 1 - editButton is rendered (pass adminUser)
//2 - (pass non-admin user) assert
// that editButton is not in the DOM
//queryByRole
//expect().not.toBeInTheDocument


import {render, screen} from '@testing-library/react';
import UserAccount from "../../src/components/UserAccount.tsx";
import {User} from "../../src/entities.ts";
import {expect} from "vitest";


describe ('UserAccount', () => {
    it('should render user name', () => {
        const user: User = { id: 1, name: "Olya"};
        render(<UserAccount user={user} />);

        expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    it('should render edit button if user is admin', () => {
        const user: User = { id: 1, name: "Olya", isAdmin: true};
        render(<UserAccount user={user} />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    });

    it('should not render edit button if user is not admin', () => {
        const user: User = { id: 1, name: "Olya", isAdmin: false};
        render(<UserAccount user={user} />);

        //it`s importanyt to not using getByRole here, because we are not going to have button in the DOM and it`ll cause the error
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    });
})