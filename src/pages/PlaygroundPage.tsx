import SearchBox from "../components/SearchBox.tsx";

const PlaygroundPage = () => {
    return <SearchBox onChange={(text) => console.log(text)}/>;
};

export default PlaygroundPage;
