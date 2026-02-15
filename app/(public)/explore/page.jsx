"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users, ArrowRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { createLocationSlug } from "@/lib/location-utils";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CATEGORIES } from "@/lib/data";
import Autoplay from "embla-carousel-autoplay";
import EventCard from "@/components/event-card";

export default function ExplorePage() {
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 2500, stopOnInteraction: true }));

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(
    api.explore.getFeaturedEvents,
    { limit: 3 }
  );

  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || "Gurugram",
      state: currentUser?.location?.state || "Haryana",
      limit: 4,
    }
  );

  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(
    api.explore.getPopularEvents,
    { limit: 6 }
  );

  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  const handleEventClick = (slug) => router.push(`/events/${slug}`);
  const handleCategoryClick = (categoryId) =>
    router.push(`/explore/${categoryId}`);

  const handleViewLocalEvents = () => {
    const city = currentUser?.location?.city || "Gurugram";
    const state = currentUser?.location?.state || "Haryana";
    const slug = createLocationSlug(city, state);
    router.push(`/explore/${slug}`);
  };

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: categoryCounts?.[cat.id] || 0,
  }));

  const isLoading = loadingFeatured || loadingLocal || loadingPopular;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-24 animate-in fade-in duration-700">

      {/* HERO */}
<section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50 p-10 md:p-16 text-center shadow-sm">

  {/* glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-orange-500/10 blur-3xl" />

  <div className="relative max-w-3xl mx-auto">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
      Discover what's happening 🎉
    </h1>

    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
      Concerts, tech meetups, workshops, festivals — explore events
      happening around you.
    </p>

    {/* QUICK DISCOVERY PILLS */}
    <div className="flex flex-wrap justify-center gap-3">
      <Button
        variant="outline"
        className="rounded-full bg-white/70 backdrop-blur hover:scale-105 transition"
        onClick={handleViewLocalEvents}
      >
        📍 Near You
      </Button>

      <Button
        variant="outline"
        className="rounded-full bg-white/70 backdrop-blur hover:scale-105 transition"
        onClick={() => router.push("/explore/free")}
      >
        🆓 Free Events
      </Button>

      <Button
        variant="outline"
        className="rounded-full bg-white/70 backdrop-blur hover:scale-105 transition"
        onClick={() => router.push("/explore/online")}
      >
        💻 Online
      </Button>

      <Button
        variant="outline"
        className="rounded-full bg-white/70 backdrop-blur hover:scale-105 transition"
        onClick={() => router.push("/explore/week")}
      >
        📅 This Week
      </Button>
    </div>
  </div>
</section>

      {/* FEATURED */}
      {featuredEvents && featuredEvents.length > 0 && (
        <section className="animate-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">
            Featured Events
          </h2>

          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredEvents.map((event) => (
                <CarouselItem key={event._id}>
                  <div
                    className="relative h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => handleEventClick(event.slug)}
                  >
                    {event.coverImage ? (
                      <Image
                        src={event.coverImage}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 p-8 md:p-12 text-white">
                      <Badge className="mb-3 bg-white/90 text-black">
                        {event.city}
                      </Badge>

                      <h2 className="text-3xl md:text-5xl font-bold mb-3">
                        {event.title}
                      </h2>

                      <div className="flex gap-5 text-sm text-white/80">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(event.startDate, "PPP")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.registrationCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>
      )}

      {/* LOCAL */}
      {localEvents && localEvents.length > 0 && (
        <section className="animate-in slide-in-from-bottom duration-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Near You</h2>
              <p className="text-muted-foreground">
                Events in {currentUser?.location?.city || "your area"}
              </p>
            </div>

            <Button
              variant="outline"
              className="gap-2 rounded-full hover:scale-105 transition"
              onClick={handleViewLocalEvents}
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      <section className="animate-in slide-in-from-bottom duration-700">
        <h2 className="text-3xl font-bold mb-6 tracking-tight">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categoriesWithCounts.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-white to-indigo-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.label}</h3>
              <p className="text-sm text-muted-foreground">
                {category.count} events
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      {popularEvents && popularEvents.length > 0 && (
        <section className="animate-in slide-in-from-bottom duration-700">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">
            Trending Across India
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                variant="list"
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
