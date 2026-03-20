/**
 * Central export point for all database models.
 * Import from here rather than individual model files:
 *   import { Event, Booking } from "@/database";
 */

export { connectToDatabase } from "@/lib/mongodb";
export { default as Event } from "./event.model";
export { default as Booking } from "./booking.model";

// Re-export interfaces for use in server actions, API routes, and components
export type { IEvent } from "./event.model";
export type { IBooking } from "./booking.model";
