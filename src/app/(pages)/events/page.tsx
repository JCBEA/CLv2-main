import { CalendarEvent } from "@/app/user-interface/events/CalendarEvent";
import { EventHeroPage } from "@/app/user-interface/events/EventHeroPage";
import { UpcomingEvents } from "@/app/user-interface/events/UpcomingEvents";


export default function EventsPage() {
    return (
        <main className="w-full h-fit">
            <EventHeroPage />
            <UpcomingEvents />
            <CalendarEvent />
        </main>
    );
}