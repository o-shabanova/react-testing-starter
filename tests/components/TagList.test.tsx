import {render, screen, waitFor} from "@testing-library/react";
import TagList from "../../src/components/TagList.tsx";

describe('TagList', () => {
    it('should render tags', async () => {
        render(<TagList/>);

        //can work properly only with code without siddde effects
        // await waitFor(() => {
        //     const listItems = screen.getAllByRole('listitem');
        //     expect(listItems.length).toBeGreaterThan(0);
        // });

        //more expected code
        const listItems = await screen.findAllByRole('listitem');
        expect(listItems.length).toBeGreaterThan(0);
    })
})