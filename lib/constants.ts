export type EventItem = {
    image: string;
    title: string;
    location: string;
    date: string;
    time: string;
    slug: string;
}

export const events: EventItem[] = [
    {
        title: "Next.js Conf 2026",
        image: "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "nextjs-conf-2026",
        location: "San Francisco, CA",
        date: "October 25, 2026",
        time: "09:00 AM",
    },
    {
        title: "HackTheWeb 2026",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
        slug: "hack-the-web-2026",
        location: "Berlin, Germany",
        date: "July 12-14, 2026",
        time: "All Day",
    },
    {
        title: "AI & Future Summit",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
        slug: "ai-future-summit",
        location: "Tokyo, Japan",
        date: "November 5, 2026",
        time: "10:00 AM",
    },
    {
        title: "React Global Meetup",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
        slug: "react-global-meetup",
        location: "Remote (Online)",
        date: "June 20, 2026",
        time: "04:00 PM UTC",
    },
    {
        title: "DevOps Days Austin",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
        slug: "devops-days-austin-2026",
        location: "Austin, TX",
        date: "May 4-5, 2026",
        time: "08:30 AM",
    },
    {
        title: "Cloud Native Hackathon",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
        slug: "cloud-native-hackathon",
        location: "London, UK",
        date: "September 18, 2026",
        time: "09:00 AM",
    },
];
