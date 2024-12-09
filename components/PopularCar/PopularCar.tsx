"use client";

import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation"; // Next.js routing

const CardItem = ({ title, subtitle, imageUrl, buttonText, link }) => {
    const router = useRouter();

    return (
        <Card className="h-[300px] relative overflow-hidden">
            <div className="relative group w-full h-full">
                <Image
                    isZoomed
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageUrl}
                />
                <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 group-hover:opacity-40 z-10"></div>
            </div>
            <CardHeader className="absolute z-20 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{subtitle}</p>
                <h4 className="text-white font-medium text-large">{title}</h4>
            </CardHeader>
            <CardFooter className="absolute bottom-2 left-2 z-20">
                <Button color="primary" size="sm" onClick={() => router.push(link)}>
                    {buttonText}
                </Button>
            </CardFooter>
        </Card>
    );
};

export const PopularCar = () => {
    const cardsData = [
        {
            title: "Audi",
            subtitle: "Німецька якість",
            imageUrl: "https://cf-cdn-v6-api.audi.at/images/98c577983eb11c0464e01cb7320b4bd5b1a86391/b1a698f3-8d7e-4b87-a363-8fceb1f4d9ff/crop:SMART/resize:1920:1080/financing",
            button: "Перейти",
            link: "/carlist"
        },
        {
            title: "BMW",
            subtitle: "Check Engine",
            imageUrl: "https://www.bmw.sk/content/dam/bmw/common/all-models/8-series/series-overview/bmw-8-series-gran-coupe-ms-g16.jpg",
            button: "Перейти",
            link: "/carlist"
        },
        {
            title: "Mercedes",
            subtitle: "Велична Історія",
            imageUrl: "https://e7852c3a.rocketcdn.me/wp-content/uploads/2023/12/Mercedes-AMG-1400x934.jpg",
            button: "Перейти",
            link: "/carlist"
        },
        {
            title: "Porsche",
            subtitle: "9/11",
            imageUrl: "https://www.startstop.sk/wp-content/uploads/2023/11/0214_roma_gold_u-crane_AKOS8758_edit_V02-scaled.jpg",
            button: "Перейти",
            link: "/carlist"
        },
        {
            title: "Bentley",
            subtitle: "Роки якості",
            imageUrl: "https://www.luxuscars.sk/content/uploads/2023/04/2023-bentley-continental-gt-le-mans-collection-1.jpg",
            button: "Перейти",
            link: "/carlist"
        },
        {
            title: "Range Rover",
            subtitle: "Британська велич",
            imageUrl: "https://assets.adac.de/image/upload/v1/Autodatenbank/Fahrzeugbilder/im06408-1-land-rover-range-rover.jpg",
            button: "Перейти",
            link: "/carlist"
        },
    ];

    return (
        <main className="container mx-auto max-w-[1550px] py-20 px-6">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between">
                    <h1 className="text-[24px] font-semibold">Популярні марки</h1>
                    <Button>Перейти</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cardsData.map((card, index) => (
                        <CardItem
                            key={index}
                            title={card.title}
                            subtitle={card.subtitle}
                            imageUrl={card.imageUrl}
                            buttonText={card.button}
                            link={card.link}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default PopularCar;
