"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/slider";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";

// Компонент деталей автомобіля
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
                    <Chip key={index} variant="bordered" className="text-white/60">
                        {spec}
                    </Chip>
                ))}
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>
            <div className="flex justify-between gap-4 flex-wrap items-center">
                <p className="text-[20px] font-bold">{price}</p>
                <Button color="primary" className="w-full py-6">
                    Придбати
                </Button>
            </div>
        </div>
    );
};

// Головний компонент
export const CarFilterAndCard = () => {
    // Дані автомобілів
    const carData = [
        {
            name: "AUDI RS6",
            imageSrc:
                "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["10 Л.", "Автоматична", "Передній привід", "Седан", "2020"],
            price: 115650,
        },
        {
            name: "AUDI RS6 Avant",
            imageSrc:
                "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/e253f49a-19c4-4ab2-9eb7-d500a24fc262/crop:SMART/resize:1920:823/a4avant2023",
            specs: ["8 Л.", "Механічна", "Повний привід", "Купе", "2018"],
            price: 95000,
        },
        {
            name: "AUDI A3",
            imageSrc:
                "https://cf-cdn-v6-api.audi.at/images/aaf535b4d4d054137d3d24e317c3c8f9ab7cca37/a4avant2023/crop:SMART/resize:1920:1080",
            specs: ["5 Л.", "Механічна", "Передній привід", "Хетчбек", "2019"],
            price: 60000,
        },
        {
            name: "AUDI Q7",
            imageSrc:
                "https://cf-cdn-v6-api.audi.at/images/11e89c4564f9bc31e2a45d69c432f6597b719cc4/a4avant2023/crop:SMART/resize:1920:823",
            specs: ["12 Л.", "Автоматична", "Повний привід", "Позашляховик", "2021"],
            price: 130000,
        },
        {
            name: "BMW X5",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/4/4f/2020_BMW_X5_M_Competition_3.0_F96.jpg",
            specs: ["3 Л.", "Автоматична", "Повний привід", "Позашляховик", "2023"],
            price: 85000,
        },
        {
            name: "MERCEDES S-Class",
            imageSrc:
                "https://upload.wikimedia.org/wikipedia/commons/a/a2/2019_Mercedes-Benz_S-Class_400d_4MATIC.jpg",
            specs: ["4 Л.", "Автоматична", "Повний привід", "Седан", "2022"],
            price: 120000,
        },
    ];

    // Стан фільтрів
    const [filters, setFilters] = useState({
        transmission: [],
        drive: [],
        bodyType: [],
        priceRange: [0, 200000],
        yearRange: [2000, 2024],
        search: "", // Додано поле для пошуку
    });

    // Обробка змін фільтрів
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Фільтрування автомобілів
    const filteredCars = carData.filter((car) => {
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
            Number(car.specs[car.specs.length - 1]) >= filters.yearRange[0] &&
            Number(car.specs[car.specs.length - 1]) <= filters.yearRange[1];

        return (
            matchesSearch &&
            matchesTransmission &&
            matchesDrive &&
            matchesBodyType &&
            matchesPrice &&
            matchesYear
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
