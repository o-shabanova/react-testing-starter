import {render, screen} from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions.tsx";
import {userEvent} from "@testing-library/user-event";

describe('TermsAndConditions', () => {
    const renderComponent = () => {
        render(<TermsAndConditions />);

        return {
            heading: screen.getByRole("heading"),
            checkbox: screen.getByRole("checkbox"),
            button: screen.getByRole("button"),
        };
    };

    it('should render with correct text and initial state', () => {
       const {heading, checkbox, button} =  renderComponent(); //this function returns object, so on left side we destructure returned object

        expect(heading).toHaveTextContent('Terms & Conditions');
        expect(checkbox).not.toBeChecked();
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeDisabled();

    });

    it('should enable the button when the checkbox is checked', async () => {
        const {checkbox, button} =  renderComponent(); //this function returns object, so on left side we destructure returned object

        const user = userEvent.setup(); //returns object
        await user.click(checkbox);
        expect(button).toBeEnabled();

    })
})