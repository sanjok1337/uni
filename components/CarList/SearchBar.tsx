import {Input} from "@nextui-org/input";

export const SearchBar = () => {
    return (
        <main className="container mx-auto max-w-7xl mb-10">
            <Input type="email" variant="bordered" label="Пошук..." />
        </main>
    );
};

export default SearchBar;