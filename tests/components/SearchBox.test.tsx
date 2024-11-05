import {queryByPlaceholderText, render, screen} from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox.tsx";
import {userEvent} from "@testing-library/user-event";

describe('SearchBox', ()=> {
    const renderSearchBox = () => {
        const onChange = vi.fn();
        render(<SearchBox onChange={onChange}/>);

        return {
            input: screen.queryByPlaceholderText(/search/i),
            user: userEvent.setup(),
            onChange
        }
    }

    it('it should render the input field for searching', () => {
        const {input} = renderSearchBox();

        expect(input).toBeInTheDocument();
    });

    it('should call onChange when Enter is pressed', async () => {
        const {input, onChange, user} = renderSearchBox();

        const searchTerm = "SearchTerm";
        await user.type(input, searchTerm + "{enter}");

        expect(onChange).toHaveBeenCalledWith(searchTerm);
    });

    it('should not call onChange if input is empty', async () => {
        const {input, onChange, user} = renderSearchBox();

        await user.type(input, "{enter}");

        expect(onChange).not.toHaveBeenCalled();
    });
});