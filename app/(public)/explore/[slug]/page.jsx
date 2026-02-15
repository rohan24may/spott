"use client";

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Loader2, MapPin } from "lucide-react";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { CATEGORIES } from "@/lib/data";
import { parseLocationSlug } from "@/lib/location-utils";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/event-card";

export default function DynamicExplorePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const categoryInfo = CATEGORIES.find((cat) => cat.id === slug);
  const isCategory = !!categoryInfo;

  const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: true };

  if (!isCategory && !isValid) {
    notFound();
  }

  const { data: events, isLoading } = useConvexQuery(
    isCategory
      ? api.explore.getEventsByCategory
      : api.explore.getEventsByLocation,
    isCategory
      ? { category: slug, limit: 50 }
      : city && state
      ? { city, state, limit: 50 }
      : "skip"
  );

  const handleEventClick = (eventSlug) => {
    router.push(`/events/${eventSlug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  /* ================= CATEGORY VIEW ================= */

  if (isCategory) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 p-10 md:p-16 shadow-sm">
          
          {/* soft glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-orange-500/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            
            {/* Icon */}
            <div className="text-6xl md:text-7xl">
              {categoryInfo.icon}
            </div>

            {/* Text */}
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {categoryInfo.label}
              </h1>

              <p className="text-lg text-muted-foreground">
                {categoryInfo.description}
              </p>

              {events && events.length > 0 && (
                <p className="text-sm text-muted-foreground pt-2">
                  {events.length} event{events.length !== 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
        </section>

        {/* GRID */}
        {events && events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-lg">
              No events found in this category yet.
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ================= LOCATION VIEW ================= */

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-10 md:p-16 shadow-sm">
        
        {/* glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
          
          <div className="text-6xl md:text-7xl">📍</div>

          <div className="space-y-3 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Events in {city}
            </h1>

            <p className="text-lg text-muted-foreground">
              {state}, India
            </p>

            <div className="flex items-center gap-4 pt-2">
              <Badge className="gap-2 bg-white/80 backdrop-blur">
                <MapPin className="w-3 h-3" />
                {city}, {state}
              </Badge>

              {events && events.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {events.length} event{events.length !== 1 ? "s" : ""} available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      {events && events.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => handleEventClick(event.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="text-muted-foreground text-lg">
            No events found in {city}, {state} yet.
          </p>
        </div>
      )}
    </div>
  );
}
