"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Ticket,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import EventCard from "@/components/event-card";
import { format } from "date-fns";

export default function Page() {
  const router = useRouter();

  /* ------------------ DYNAMIC DATA ------------------ */

  const { data: trendingEvents, isLoading: loadingTrending } =
    useConvexQuery(api.explore.getPopularEvents, { limit: 6 });

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  const { data: nearbyEvents, isLoading: loadingNearby } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || "Gurugram",
      state: currentUser?.location?.state || "Haryana",
      limit: 4,
    }
  );

  const handleEventClick = (slug) => {
    router.push(`/events/${slug}`);
  };

  /* ------------------ LOADING STATE ------------------ */

  if (loadingTrending || loadingNearby) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <main className="bg-white text-gray-900 space-y-20">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden pt-10 pb-20 animate-in fade-in slide-in-from-bottom duration-700">
        {/* background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />

        {/* glow blobs */}
        <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-pink-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} /> New events every day
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Find events.
              <br />
              Meet people.
              <br />
              <span className="text-indigo-600">Create experiences.</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-xl">
              Discover workshops, tech meetups, college fests, and concerts happening around you — or host your own in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base rounded-full hover:scale-105 transition"
                >
                  Explore Events
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>

              <Link href="/create-event">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base rounded-full hover:bg-gray-100 transition"
                >
                  Host an Event
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative">
            <div className=" rounded-3xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <Image
                src="/kkk.png"
                alt="Event platform preview"
                width={600}
                height={600}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRENDING EVENTS ================= */}

      {trendingEvents?.length > 0 && (
        <section className="max-w-7xl mx-auto animate-in slide-in-from-bottom duration-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold">Trending this week</h2>
              <p className="text-gray-500">
                Most popular events people are joining right now
              </p>
            </div>

            <Link href="/explore">
              <Button variant="outline" className="rounded-full">
                View all
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= NEAR YOU ================= */}

      {nearbyEvents?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 animate-in slide-in-from-bottom duration-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold">Events near you</h2>
              <p className="text-gray-500">
                Based on your location — {currentUser?.location?.city || "India"}
              </p>
            </div>

            <Link href="/explore">
              <Button variant="outline" className="rounded-full">
                Browse all
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearbyEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => handleEventClick(event.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= CATEGORY STRIP ================= */}

      <section className=" animate-in slide-in-from-bottom duration-700">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-4 text-center">
            Browse by category
          </h2>
          <p className="text-gray-500 text-center mb-16">
            Explore what interests you the most.
          </p>

          <div className="grid md:grid-cols-4 gap-8">

            {[
              { title: "Tech Meetups", icon: Sparkles },
              { title: "Workshops", icon: Ticket },
              { title: "College Fests", icon: Users },
              { title: "Concerts", icon: Calendar },
            ].map((item, index) => (
              <div
                key={index}
                className="group border rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white"
              >
                <item.icon
                  className="text-indigo-600 mb-6 group-hover:scale-110 transition"
                  size={28}
                />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Discover curated {item.title.toLowerCase()} near you.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOST CTA ================= */}

      <section className="py-28 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl mx-6 text-center animate-in slide-in-from-bottom duration-700">
        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to host your own event?
          </h2>

          <p className="text-lg text-indigo-100 mb-10">
            Launch, manage, and grow your community — all from one platform.
          </p>

          <Link href="/create-event">
            <Button
              size="lg"
              className="px-10 py-6 text-base rounded-full bg-white text-indigo-700 hover:scale-105 transition"
            >
              Create an Event
            </Button>
          </Link>

        </div>
      </section>
    </main>
  );
}
