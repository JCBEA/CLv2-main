"use client"; // Make sure this is at the top of your file

import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import Featured from "./g-user-components/FeaturedGallery";
import CollectionGallery from "./g-user-components/CollectionGallery";
import useAuthRedirect from "@/services/hoc/auth";

export default function GalleryVisitorPage() {
    useAuthRedirect();    //authguard

    return (
        <main className="w-full h-fit text-primary-2 overflow-x-hidden">
            <div className="pt-[10dvh] flex flex-col w-full max-w-full">
                <CollectionGallery />
                <Featured />
                <Infinite />
                <Subscribe />
            </div>
        </main>
    );
}
