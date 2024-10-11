import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import Featured from "./g-user-components/FeaturedGallery";
import CollectionGallery from "./g-user-components/CollectionGallery";

export default function GalleryVisitorPage() {
    return (
        <main className="w-full h-fit text-primary-2 overflow-x-hidden"> {/* Ensure no horizontal scrolling */}
            <div className="pt-[10dvh] flex flex-col w-full max-w-full"> {/* Ensure full width with no overflow */}
                <CollectionGallery />
                <Featured />
                <Infinite />
                <Subscribe />
            </div>
        </main>
    )
}
