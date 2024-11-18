import {Button} from "@nextui-org/button";
import {Image} from "@nextui-org/image";


export const NewAuto = () => {

    return (
        <main className="container mx-auto max-w-7xl py-20 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col gap-5">
                    <h1 className="text-[36px] font-black">Нові автомобілі у наявності</h1>
                    <p className="text-[14px] opacity-60">Пориньте у світ Audi прямо зараз із нашими новими автомобілями, що вже є у наявності! Це дуже зручно — одразу сісти у свій новий автомобіль і поїхати. Наші нові автомобілі оснащені інноваційними технологіями та функціями, які забезпечать неповторні враження від водіння. Відкрийте для себе ідеальне поєднання динамічності, елегантності та комфорту.</p>
                    <Button className="w-fit">Перейти</Button>
                </div>
                <div className="">
                    <img
                        alt="NextUI hero Image"
                        className="w-full h-[360px] object-cover rounded-xl"
                        src="https://cf-cdn-v6-api.audi.at/images/aaf535b4d4d054137d3d24e317c3c8f9ab7cca37/8ef6f167-e360-4cfd-b722-7d3d1041aa6c/crop:SMART/resize:2048:2048/Newcars"
                    />
                </div>
            </div>
        </main>
    )

}

export default NewAuto