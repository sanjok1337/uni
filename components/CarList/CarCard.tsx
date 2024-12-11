"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Для отримання параметрів з URL
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";

// Компонент деталей автомобіля
const CarDetails = ({ name, imageSrc, specs, price }) => {
    const router = useRouter();

    const handlePurchaseClick = () => {
        
        if (name === "BMW M8") {
            router.push(`/cars`); 
        } else {
            
            router.push(`/cars/${name.toLowerCase().replace(/\s+/g, '-')}`);
        }
    };

    return (
        <div className="flex flex-col gap-5 bg-[rgba(255,255,255,0.03)] border border-white/5 p-6 rounded-[14px]">
            <p className="text-[24px] font-bold">{name}</p>
            <img width={250} alt={`${name} Image`} src={imageSrc} className="rounded-lg" />
            <div className="flex flex-wrap gap-2">
                {specs.map((spec, index) => (
                    <Chip key={index} variant="bordered" className="text-white/60">
                        {spec}
                    </Chip>
                ))}
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>
            <div className="flex justify-between gap-4 flex-wrap items-center">
                <p className="text-[20px] font-bold">{price}</p>
                <Button color="primary" className="w-full py-6" onClick={handlePurchaseClick}>
                    Придбати
                </Button>
            </div>
        </div>
    );
};

export const CarFilterAndCard = () => {
    const searchParams = useSearchParams(); // Отримуємо параметри пошуку з URL
    const router = useRouter();
    
    const carData = [
        // Додано кілька автомобілів, змінюйте чи додавайте інші
        {
            name: "Audi RS6",
            imageSrc: "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["4 Л.", "Автоматична", "Передній привід", "Седан", "2020"],
            price: 115650,
        },
        {
            name: "BMW M8",
            specs: ["3.5 Л.", "Механічна", "Повний привід", "Купе", "2020"],
            imageSrc: "https://www.pngplay.com/wp-content/uploads/13/BMW-8-Series-Gran-Coupe-Transparent-Free-PNG.png",
            price: 95000,
        },
        {
            name: "Mercedes AMG GT",
            imageSrc: "https://rk.mb-qr.com/media/thumbnails/cards/Front-03_75LQYEt.png.860x860_q95.png",
            specs: ["3.3 Л.", "Автоматична", "Повний привід", "Купе", "2022"],
            price: 135000,
        },
        {
            name: "Porsche/911",
            imageSrc: "https://www.pngplay.com/wp-content/uploads/13/Porsche-911-Background-PNG-Image.png",
            specs: ["2.5 Л.", "Автоматична", "Повний привід", "Купе", "2022"],
            price: 135000,
        },
        {
            name: "Bentley",
            imageSrc: "https://i.pinimg.com/originals/07/be/cf/07becf4ed2b16e70b7cd515120179292.png",
            specs: ["4 Л.", "Автоматична", "Повний привід", "Купе", "2022"],
            price: 135000,
        },
        {
            name: "Range Rover",
            imageSrc: "https://www.pngall.com/wp-content/uploads/5/Range-Rover-PNG-Free-Image.png",
            specs: ["5 Л.", "Автоматична", "Повний привід", "Купе", "2022"],
            price: 135000,
        },
        // Додаткові автомобілі...
    ];

    const [filters, setFilters] = useState({
        transmission: [],
        drive: [],
        bodyType: [],
        priceRange: [0, 200000],
        yearRange: [2000, 2024],
        engineRange: [0, 15],
        search: searchParams.get("search") || "", // Витягування марки з URL параметра
    });

    useEffect(() => {
        // Оновлюємо параметри пошуку у URL, якщо змінюється фільтр
        router.push(`?search=${filters.search}`);
    }, [filters.search, router]);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const filteredCars = carData.filter((car) => {
        const engineLitres = parseFloat(car.specs[0]);
        const carYear = parseInt(car.specs[car.specs.length - 1], 10);

        const matchesSearch =
            car.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesTransmission =
            filters.transmission.length === 0 || filters.transmission.some((t) => car.specs.includes(t));
        const matchesDrive =
            filters.drive.length === 0 || filters.drive.some((d) => car.specs.includes(d));
        const matchesBodyType =
            filters.bodyType.length === 0 || filters.bodyType.some((b) => car.specs.includes(b));
        const matchesPrice =
            car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
        const matchesYear =
            carYear >= filters.yearRange[0] && carYear <= filters.yearRange[1];
        const matchesEngine =
            engineLitres >= filters.engineRange[0] && engineLitres <= filters.engineRange[1];

        return (
            matchesSearch &&
            matchesTransmission &&
            matchesDrive &&
            matchesBodyType &&
            matchesPrice &&
            matchesYear &&
            matchesEngine
        );
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Пошук */}
            <div className="col-span-4 mb-6">
                <Input
                    type="text"
                    variant="bordered"
                    label="Пошук..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                />
            </div>

            {/* Фільтри */}
            <div className="col-span-1">
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Коробка передач</p>
                    <CheckboxGroup
                        label="Оберіть коробку передач"
                        onChange={(value) => handleFilterChange("transmission", value)}
                    >
                        <Checkbox value="Автоматична">Автоматична</Checkbox>
                        <Checkbox value="Механічна">Механічна</Checkbox>
                    </CheckboxGroup>
                </div>
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Привід</p>
                    <CheckboxGroup
                        label="Оберіть привід"
                        onChange={(value) => handleFilterChange("drive", value)}
                    >
                        <Checkbox value="Передній привід">Передній привід</Checkbox>
                        <Checkbox value="Повний привід">Повний привід</Checkbox>
                    </CheckboxGroup>
                </div>
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Тип кузову</p>
                    <CheckboxGroup
                        label="Оберіть тип кузову"
                        onChange={(value) => handleFilterChange("bodyType", value)}
                    >
                        <Checkbox value="Седан">Седан</Checkbox>
                        <Checkbox value="Купе">Купе</Checkbox>
                        <Checkbox value="Позашляховик">Позашляховик</Checkbox>
                    </CheckboxGroup>
                </div>
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Ціна</p>
                    <Slider
                        label="Діапазон цін"
                        step={1000}
                        minValue={0}
                        maxValue={200000}
                        defaultValue={filters.priceRange}
                        onChange={(value) => handleFilterChange("priceRange", value)}
                    />
                </div>
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Рік випуску</p>
                    <Slider
                        label="Діапазон років"
                        step={1}
                        minValue={2000}
                        maxValue={2024}
                        defaultValue={filters.yearRange}
                        onChange={(value) => handleFilterChange("yearRange", value)}
                    />
                </div>
                <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                    <p>Літраж двигуна</p>
                    <Slider
                        label="Діапазон літражу"
                        step={0.2}
                        minValue={0}
                        maxValue={7}
                        defaultValue={filters.engineRange}
                        onChange={(value) => handleFilterChange("engineRange", value)}
                    />
                </div>
            </div>

            {/* Список автомобілів */}
            <div className="col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car, index) => (
                        <CarDetails
                            key={index}
                            name={car.name}
                            imageSrc={car.imageSrc}
                            specs={car.specs}
                            price={`${car.price} €`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarFilterAndCard;