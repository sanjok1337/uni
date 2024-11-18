import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {Chip} from "@nextui-org/chip";

export const CarFilter = () => {

    return (
        <main className="opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Фільтр</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Chip variant='bordered' className='text-white/60'>10 Л.</Chip>
                    <Chip variant='bordered' className='text-white/60'>Автоматична</Chip>
                    <Chip variant='bordered' className='text-white/60'>Автоматична</Chip>
                </div>
            </div>
        </main>
    )

}

export default CarFilter