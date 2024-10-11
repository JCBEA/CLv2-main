import { Infinite } from "@/components/reusable-component/Infinite";
import PublishGallery from "./publish-components/PublishGallery";
import { Subscribe } from "@/components/reusable-component/Subscribe";

export default function CreativeServices() {
    return (
        <main className="w-full h-fit text-primary-2">
      <PublishGallery />
            <Infinite />
            <Subscribe />
        </main>
    )
}