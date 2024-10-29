import {render, screen} from '@testing-library/react';
import ProductImageGallery from "../../src/components/ProductImageGallery.tsx";

describe('ProductImageGallery', () => {
    it('should render nothing if given an empty array', ()=> {
    const {container} = render(<ProductImageGallery imageUrls={[]}/>);
    expect(container).toBeEmptyDOMElement();


    })

    it('should render list of images with the right source attribute rendered in the DOM ', ()=> {
    const imageUrls = ['url1', 'url2'];

    render(<ProductImageGallery imageUrls={imageUrls}/>);

    //by this expression we will get all images in the DOM
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    imageUrls.forEach((url, index)=> {
        expect(images[index]).toHaveAttribute('src', url);
    })

    });
})