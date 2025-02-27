import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { CreativeCarousel } from "./creative-components/CreativeCarousel";
import CreativeHeroPage from "./creative-components/CreativeHeroPage";
import { CreativeUsers } from "./creative-components/CreativeUsers";



export default function CreativeDirectoryPage() {
    return (
        <main className="w-full h-fit text-primary-2">
            <div className="pt-[10dvh] flex flex-col w-full">
                <CreativeHeroPage />
                <CreativeCarousel />
            </div>
            <CreativeUsers />
            <Infinite />
            <Subscribe />
        </main>
    )
}