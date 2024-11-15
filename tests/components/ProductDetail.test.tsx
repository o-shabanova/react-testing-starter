import { render, screen} from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail.tsx";

describe('ProductDetail', () => {
    it('should render the list of products', async () => {
        render(<ProductDetail productId={1} />);

        expect(await screen.findByText(/product 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/\$10/i)).toBeInTheDocument();
    })
})