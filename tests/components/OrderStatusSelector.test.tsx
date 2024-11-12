import {render, screen} from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector.tsx";
import {Theme} from "@radix-ui/themes";
import {userEvent} from "@testing-library/user-event";
import {expect} from "vitest";

describe('OrderStatusSelector', ()=> {
    const renderComponent = () => {
        render(
            <Theme>
                <OrderStatusSelector onChange={vi.fn()}/>
            </Theme>
        );

        return {
            trigger: screen.getByRole('combobox'),

            //we can`t use below the same technique as we did above,
            // because this code is executed when we render our component and there are
            // no options rendered in the DOM.
            // So we use function (lazy evaluation) there to postpone
            // the execution of this piece of code
            getOptions: () => screen.findAllByRole('option')

        }
    }
    it('should render New as default value', ()=> {
        const {trigger} = renderComponent();

        expect(trigger).toHaveTextContent(/new/i);

    });

    it('should render correct statuses', async ()=> {
        const {trigger, getOptions} = renderComponent();

        const user = userEvent.setup();
        await user.click(trigger);

        const options = await getOptions();
        expect(options).toHaveLength(3);
        const labels = options.map(option => option.textContent);
        expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
    });
});