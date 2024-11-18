import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

// Компонент для отображения деталей автомобиля
const CarDetails = ({ name, imageSrc, specs, price }) => {
    return (
        <div className="flex flex-col gap-5 bg-[rgba(255,255,255,0.03)] border border-white/5 p-6 rounded-[14px]">
            <p className="text-[24px] font-bold">{name}</p>
            <Image
                width={250}
                alt={`${name} Image`}
                src={imageSrc}
                className="rounded-lg"
            />
            <div className="flex flex-wrap gap-2">
                {specs.map((spec, index) => (
                    <Chip key={index} variant='bordered' className='text-white/60'>{spec}</Chip>
                ))}
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>
            <div className="flex justify-between gap-4 flex-wrap items-center">
                <p className='text-[20px] font-bold'>{price}</p>
                <Button color="primary" className="w-full py-6">Придбати</Button>
            </div>
        </div>
    );
};

// Компонент списка карточек автомобилей
export const CarCard = () => {
    const carData = [
        {
            name: "AUDI RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Автоматична"],
            price: "115 650,00 €",
        },
        {
            name: "AUDI RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Автоматична"],
            price: "115 650,00 €",
        },
        {
            name: "AUDI RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Автоматична"],
            price: "50000$",
        },
        {
            name: "AUDI RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Автоматична"],
            price: "50000$",
        },
        {
            name: "AUDI RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Автоматична"],
            price: "50000$",
        },
    ];

    return (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carData.map((car, index) => (
                <CarDetails
                    key={index}
                    name={car.name}
                    imageSrc={car.imageSrc}
                    specs={car.specs}
                    price={car.price}
                />
            ))}
        </main>
    );
};

export default CarCard;

