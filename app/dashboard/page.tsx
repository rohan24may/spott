"use client";

import { useRouter } from "next/navigation";
import { Loader2, Calendar, Users, Ticket } from "lucide-react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import EventCard from "@/components/event-card";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const router = useRouter();

  /* ================= QUERIES ================= */

  const { data: myEvents, isLoading: loadingEvents } =
    useConvexQuery(api.events.getMyEvents);

  const { data: myRegistrations, isLoading: loadingRegistrations } =
    useConvexQuery(api.registrations.getMyRegistrations);

  /* ================= SAFE FALLBACKS ================= */

  const events = myEvents ?? [];
  const registrations = myRegistrations ?? [];

  const isLoading = loadingEvents || loadingRegistrations;

  /* ================= CALCULATIONS ================= */

  const upcomingRegistrations = registrations.filter(
    (reg: any) =>
      reg?.event &&
      reg.event.startDate >= Date.now() &&
      reg.status === "confirmed"
  );

  const totalAttendees = events.reduce(
    (acc: number, event: any) =>
      acc + (event.registrationCount ?? 0),
    0
  );

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-14">

      {/* ================= HEADER ================= */}
      <section>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your activity on Spott
        </p>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card className="rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">My Events</p>
              <h2 className="text-3xl font-bold">{events.length}</h2>
            </div>
            <Calendar className="w-8 h-8 text-indigo-500" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Attendees</p>
              <h2 className="text-3xl font-bold">{totalAttendees}</h2>
            </div>
            <Users className="w-8 h-8 text-pink-500" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Tickets</p>
              <h2 className="text-3xl font-bold">
                {upcomingRegistrations.length}
              </h2>
            </div>
            <Ticket className="w-8 h-8 text-orange-500" />
          </CardContent>
        </Card>
      </section>

      {/* ================= MY EVENTS ================= */}
      {events.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Your Events</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 6).map((event: any) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => router.push(`/my-events/${event._id}`)}
                onDelete={() => {}}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= UPCOMING EVENTS ================= */}
      {upcomingRegistrations.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Upcoming Registrations</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRegistrations.slice(0, 6).map((reg: any) => (
              <EventCard
                key={reg._id}
                event={reg.event}
                onClick={() =>
                  router.push(`/events/${reg.event.slug}`)
                }
                onDelete={() => {}}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= EMPTY STATE ================= */}
      {events.length === 0 && registrations.length === 0 && (
        <Card className="p-12 text-center rounded-3xl">
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">
              Nothing here yet
            </h3>
            <p className="text-muted-foreground">
              Create or register for events to see them here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
