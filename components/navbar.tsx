import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/link";
import NextLink from "next/link";

export const Navbar = () => {

    return (
        <NextUINavbar maxWidth="xl" className="bg-[rgba(255,255,255,0.02)] py-4" position="sticky">
            <NavbarContent className="basis-1/5  sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-4 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">ACME</p>
                    </NextLink>
                </NavbarBrand>
                <div className="h-[20px] w-[1px] bg-white/5"></div>
                <ul className="hidden lg:flex gap-4 sm:flex justify-start ml-2">
                    <NavbarItem>
                        <div className="flex gap-2">
                            <Link className='text-white opacity-90 hover:opacity-70 transition-all duration-300' href="/">Автосалони</Link>
                        </div>
                    </NavbarItem>
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex md:flex">
                    <Link href="carlist">
                        <Button
                            className="text-sm font-normal text-default-600 bg-default-100"
                            variant="flat"
                        >
                            Каталог
                        </Button>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <NavbarMenuToggle/>
            </NavbarContent>
            <NavbarMenu>
                <div className="mx-4 mt-20 flex flex-col gap-2">
                    <NavbarMenuItem>
                        <div className="flex flex-col gap-5">
                            <Link className='text-[24px]' href="/">Автосалони</Link>
                            <Link className='text-[24px]'   href="/">Каталог</Link>
                        </div>
                    </NavbarMenuItem>
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
