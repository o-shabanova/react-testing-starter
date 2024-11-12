import OrderStatusSelector from "../components/OrderStatusSelector.tsx";

const PlaygroundPage = () => {
    return (
        <OrderStatusSelector onChange={console.log}/>
    );
};

export default PlaygroundPage;
