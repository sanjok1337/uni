import {Button} from "@nextui-org/button";

export const Video = () => {

    return (
        <main className="relative">
            <div className="relative">
                <video className="w-full h-[650px]  object-cover" autoPlay muted loop playsInline>
                    <source
                        src="https://cf-cdn-v6-api.audi.at/files/acbfe9304cf827c1786336504c28c831aa494ca4/1f407cf0-3dfd-4058-bad9-c3bf1f528def/walkaroundrsq8performance1920x10801"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-black opacity-50"></div>

            </div>
        </main>
    )

}

export default Video