import CarCard from "@/components/CarList/CarCard";


// Компонент списка автомобилей с фильтром
export const CarList = () => {
    return (
        <main className="container mx-auto max-w-[1550px] py-10 px-6">
            
            <div className="flex flex-col lg:flex-row gap-8">
                
                <div className="">
                    <CarCard />
                </div>
            </div>
        </main>
    );
};

export default CarList;