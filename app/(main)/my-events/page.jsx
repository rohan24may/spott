"use client";

import { useRouter } from "next/navigation";
import { Plus, Loader2, Calendar, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EventCard from "@/components/event-card";

export default function MyEventsPage() {
  const router = useRouter();

  const { data: events, isLoading } = useConvexQuery(api.events.getMyEvents);
  const { mutate: deleteEvent } = useConvexMutation(api.events.deleteEvent);

  const handleDelete = async (eventId) => {
    const confirmed = window.confirm(
      "Delete this event permanently? This will remove all registrations."
    );
    if (!confirmed) return;

    try {
      await deleteEvent({ eventId });
      toast.success("Event deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  const handleEventClick = (eventId) => {
    router.push(`/my-events/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const totalEvents = events?.length || 0;

  return (
    <div className="min-h-screen px-4 pb-24 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Your Events 🎉
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage, track, and grow your events
            </p>
          </div>

          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white shadow"
          >
            <Link href="/create-event" className="flex gap-2 items-center">
              <Plus className="w-4 h-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* STATS STRIP */}
        {totalEvents > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <Calendar className="w-8 h-8 text-indigo-500" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Total events
                  </p>
                  <p className="text-2xl font-bold">{totalEvents}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <BarChart3 className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Active events
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      events?.filter(
                        (e) => new Date(e.endDate).getTime() > Date.now()
                      ).length
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6 flex items-center gap-4">
                <BarChart3 className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Past events
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      events?.filter(
                        (e) => new Date(e.endDate).getTime() <= Date.now()
                      ).length
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* EMPTY STATE */}
        {events?.length === 0 ? (
          <Card className="p-14 text-center rounded-3xl">
            <div className="max-w-md mx-auto space-y-5">
              <div className="text-6xl">📅</div>

              <h2 className="text-2xl font-bold">
                Create your first event
              </h2>

              <p className="text-muted-foreground">
                Start hosting meetups, workshops, concerts or any gathering.
              </p>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white"
              >
                <Link href="/create-event" className="flex gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          /* EVENTS GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {events?.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                action="event"
                onClick={() => handleEventClick(event._id)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
