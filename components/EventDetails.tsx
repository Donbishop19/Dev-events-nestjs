import BookEvent from "@/components/BookEvent";
import {notFound} from "next/navigation";
import EventCard from "@/components/EventCard";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import {IEvent} from "@/database";
import Image from "next/image";
import {cacheLife} from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => (
    <div className='flex-row-gap-2 items-center'>
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({agendaItems}: {agendaItems: string[]}) => (
    <div className='agenda'>
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: {tags: string[] }) => (
    <div className='flex flex-row-gap-2 flex-wrap'>
        {tags.map((tag) => (
            <div key={tag} className='pill'>{tag}</div>
        ))}
    </div>
)

const EventDetails = async ({ params }: { params: Promise<string> }) => {
    'use cache'
    cacheLife('hours');

    const  slug  = await params;

    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { event } = await request.json();

    if(!event) return notFound();

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    const { description, image, overview, date, time, location, mode, agenda, audience, organizer, tags } = event;

    console.log(similarEvents);

    return (
        <section id='event'>
            <div className='header'>
                <h1>Event Description</h1>
                <p>
                    {description}
                </p>
            </div>
            <div className='details'>
                {/* left side - Event Content */}
                <div className='content'>
                    <Image src={image} alt='event banner' width={800} height={800} className='banner' />

                    <section className='flex-col-gap-2'>
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className='flex-col-gap-2'>
                        <h2>Event Details</h2>


                        <EventDetailsItem icon='/icons/calendar.svg' alt='calendar' label={date} />
                        <EventDetailsItem icon='/icons/clock.svg' alt='clock' label={time} />
                        <EventDetailsItem icon='/icons/pin.svg' alt='pin' label={location} />
                        <EventDetailsItem icon='/icons/mode.svg' alt='mode' label={mode} />
                        <EventDetailsItem icon='/icons/audience.svg' alt='audience' label={audience} />
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className='flex-col-gap-2'>
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags} />
                </div>

                {/* right side - Booking Form */}
                <aside className='booking'>
                    <div className='signup-card'>
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className='text-sm'>
                                Join {bookings} people who already booked this event
                            </p>
                        ): (
                            <p className='text-sm'>Be The First to Book Your Spot </p>
                        )}

                        <BookEvent eventId={event._id} slug={event.slug} />

                    </div>
                </aside>
            </div>

            <div className='w-full flex flex-col  mt-20'>
                <h2>Similar Events</h2>
                <div className='events'>
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard key={similarEvent.title} {...similarEvent} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default EventDetails
