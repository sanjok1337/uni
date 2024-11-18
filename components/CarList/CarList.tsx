import CarCard from "@/components/CarList/CarCard";
import CarFilter from "@/components/CarList/CarFilter";
import SearchBar from "@/components/CarList/SearchBar";

// Компонент списка автомобилей с фильтром
export const CarList = () => {
    return (
        <main className="container mx-auto max-w-[1550px] py-10 px-6">
            <SearchBar/>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4 w-full">
                    <CarFilter />
                </div>
                <div className="">
                    <CarCard />
                </div>
            </div>
        </main>
    );
};

export default CarList;