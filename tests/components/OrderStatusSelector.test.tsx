import {render, screen} from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector.tsx";
import {Theme} from "@radix-ui/themes";
import {userEvent} from "@testing-library/user-event";
import {expect} from "vitest";

describe('OrderStatusSelector', ()=> {
    const renderComponent = () => {
        const onChange = vi.fn();
        render(
            <Theme>
                <OrderStatusSelector onChange={onChange}/>
            </Theme>
        );

        return {
            trigger: screen.getByRole('combobox'),

            //we can`t use below the same technique as we did above,
            // because this code is executed when we render our component and there are
            // no options rendered in the DOM.
            // So we use function (lazy evaluation) there to postpone
            // the execution of this piece of code
            getOptions: () => screen.findAllByRole('option'),
            getOption: (label: RegExp) => screen.findByRole('option', {name: label}),
            user: userEvent.setup(),
            onChange
        }
    }
    it('should render New as default value', ()=> {
        const {trigger} = renderComponent();

        expect(trigger).toHaveTextContent(/new/i);

    });

    it('should render correct statuses', async ()=> {
        const {trigger, getOptions, user} = renderComponent();

         await user.click(trigger);

        const options = await getOptions();
        expect(options).toHaveLength(3);
        const labels = options.map(option => option.textContent);
        expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
    });

    //user interaction tests
    it.each([
        {label: /processed/i, value: 'processed'},
        {label: /fulfilled/i, value: 'fulfilled'},
    ])('should call onChange with $value when the $label option is selected', async({ label, value }) => {
        const {trigger, user, onChange, getOption} = renderComponent();
        await user.click(trigger);

        const option = await getOption(label);
        await user.click(option);

        expect(onChange).toHaveBeenCalledWith(value);
    });

    //but we can`t do the same thing with new option, because 'new' is the default option and before test that option,
    // we have to choose another option to change to 'new' option again

    it(`should call onChange with 'new' when the New option is selected`, async () => {
        const {trigger, user, onChange, getOption } = renderComponent();
        await user.click(trigger);

            const processedOption = await getOption(/processed/i);
            await user.click(processedOption);

            await user.click(trigger);
            const newOption = await getOption(/new/i);
            await user.click(newOption);

            expect(onChange).toHaveBeenCalledWith('new');
    })
});