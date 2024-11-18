import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {Chip} from "@nextui-org/chip";
import {Slider} from "@nextui-org/slider";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
import {Input} from "@nextui-org/input";


export const CarFilter = () => {

    return (
        <main className="opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out flex flex-col gap-5">
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Коробка передач</p>
                </div>
                <div className="flex flex-wrap gap-2">
                <CheckboxGroup
      label="Оберіть коробку передач"
      defaultValue={["3"]}
    >
      <Checkbox value="Автоматична">Автоматична</Checkbox>
      <Checkbox value="Механічна">Механічна</Checkbox>
      <Checkbox value="3">Неважливо</Checkbox>
    </CheckboxGroup>
                </div>
            </div>
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Привід</p>
                </div>
                <div className="flex flex-wrap gap-2">
                <CheckboxGroup
      label="Оберіть Привід"
      defaultValue={["3"]}
    >
      <Checkbox value="Автоматична">Передній-Привід</Checkbox>
      <Checkbox value="Механічна">Задній-Привід</Checkbox>
      <Checkbox value="2">Повний-Привід</Checkbox>
      <Checkbox value="3">Неважливо</Checkbox>
    </CheckboxGroup>
                </div>
            </div>
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Тип Кузову</p>
                </div>
                <div className="flex flex-wrap gap-2">
                <CheckboxGroup
      label="Оберіть тип кузову"
      defaultValue={["3"]}
    >
      <Checkbox value="Седан">Седан</Checkbox>
      <Checkbox value="Механічна">Купе</Checkbox>
      <Checkbox value="2">Універсал</Checkbox>
      <Checkbox value="1">Хетчбек</Checkbox>
      <Checkbox value="3">Неважливо</Checkbox>
    </CheckboxGroup>
                </div>
            </div>
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Ціна</p>
                </div>
                <div className="flex flex-wrap gap-2">
                <Slider 
                    label="."
                    step={50} 
                    minValue={0} 
                    maxValue={200000} 
                    defaultValue={[100, 500]} 
                    formatOptions={{style: "currency", currency: "USD"}}
                    className="max-w-md"
    />
                </div>
            </div>
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Рік Випуску</p>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="Рік" label="Від" />
      <Input type="Рік" label="До" />
    </div>
            </div>
            <div className="p-5 bg-white/5 flex flex-col gap-5 rounded-[14px]">
                <div className="">
                    <p>Літраж мотору</p>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="Літрів" label="Від" />
      <Input type="Літрів" label="До" />
    </div>
    </div>
        </main>
    )

}

export default CarFilter