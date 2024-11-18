import Video from "@/components/Video/Video";
import PopularCar from "@/components/PopularCar/PopularCar";
import NewAuto from "@/components/NewAuto/NewAuto";


export default function Home() {
    return (
        <>
            <Video/>
            <PopularCar/>
            <div className='container max-w-[1500px] mx-auto w-full h-[2px] bg-white/5'></div>
            <NewAuto/>
        </>
    );
}
