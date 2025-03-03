import { render, screen} from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail.tsx";
import {products} from "../mocks/data.ts";
import {http, HttpResponse} from "msw";
import {server} from "../mocks/server.ts";
import {expect} from "vitest";

describe('ProductDetail', () => {
    it('should render the list of products', async () => {
        render(<ProductDetail productId={1} />);

        expect(await screen.findByText(new RegExp(products[0].name))).toBeInTheDocument();
        expect(await screen.findByText(new RegExp(products[0].price.toString()))).toBeInTheDocument();
    });

    it('should render message if product not found', async() => {
        server.use(http.get('/products/1', ()=> HttpResponse.json(null)));

        render(<ProductDetail productId={1} />);

        const message = await screen.findByText(/not found/i);
        expect(message).toBeInTheDocument();
    });

    it('should render an error for invalid productId', async() => {
        //we don`t need to care about mock back end, because we are not going to call back end,
        //so we don`t need to use server.use()
        render(<ProductDetail productId={0} />);

        const message = await screen.findByText(/invalid/i);
        expect(message).toBeInTheDocument();
    });

})