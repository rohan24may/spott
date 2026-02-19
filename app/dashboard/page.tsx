"use client";

import Link from "next/link";
import { Calendar, Ticket, Plus, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-12">

      {/* ================= WELCOME SECTION ================= */}

      <section className="rounded-3xl p-10 md:p-14 bg-gradient-to-br from-indigo-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-pink-500/10 to-orange-500/10 blur-3xl" />

        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Welcome back 👋
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Manage your events, track registrations, and discover what’s happening around you.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button asChild className="gap-2 rounded-full">
              <Link href="/create-event">
                <Plus className="w-4 h-4" /> Create Event
              </Link>
            </Button>

            <Button variant="outline" asChild className="gap-2 rounded-full">
              <Link href="/explore">
                Explore Events <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
            <h3 className="text-3xl font-bold">0</h3>
            <div className="flex items-center gap-2 mt-2 text-indigo-600 text-sm">
              <Calendar className="w-4 h-4" />
              Events registered
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">My Events</p>
            <h3 className="text-3xl font-bold">0</h3>
            <div className="flex items-center gap-2 mt-2 text-indigo-600 text-sm">
              <Users className="w-4 h-4" />
              Events created
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Tickets</p>
            <h3 className="text-3xl font-bold">0</h3>
            <div className="flex items-center gap-2 mt-2 text-indigo-600 text-sm">
              <Ticket className="w-4 h-4" />
              Registered tickets
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Activity</p>
            <h3 className="text-3xl font-bold">—</h3>
            <div className="flex items-center gap-2 mt-2 text-indigo-600 text-sm">
              Last interaction
            </div>
          </CardContent>
        </Card>

      </section>

      {/* ================= UPCOMING EVENTS ================= */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Upcoming Events</h2>

          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link href="/my-tickets">View All</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* EventCard components will go here later */}
          <Card className="p-8 text-center rounded-2xl">
            <p className="text-muted-foreground">
              No upcoming events yet.
            </p>
          </Card>
        </div>
      </section>

      {/* ================= RECOMMENDED ================= */}

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recommended For You</h2>

          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link href="/explore">Explore More</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* EventCard components will go here */}
          <Card className="p-8 text-center rounded-2xl">
            <p className="text-muted-foreground">
              Personalized events will appear here.
            </p>
          </Card>
        </div>
      </section>

      {/* ================= QUICK ACTIONS ================= */}

      <section>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>

        <div className="grid md:grid-cols-4 gap-6">

          <Link href="/create-event">
            <Card className="p-6 rounded-2xl hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
              <Plus className="mb-4 text-indigo-600" />
              <h3 className="font-semibold mb-1">Create Event</h3>
              <p className="text-sm text-muted-foreground">
                Host your own event in minutes
              </p>
            </Card>
          </Link>

          <Link href="/explore">
            <Card className="p-6 rounded-2xl hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
              <Calendar className="mb-4 text-indigo-600" />
              <h3 className="font-semibold mb-1">Explore</h3>
              <p className="text-sm text-muted-foreground">
                Discover events around you
              </p>
            </Card>
          </Link>

          <Link href="/my-events">
            <Card className="p-6 rounded-2xl hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
              <Users className="mb-4 text-indigo-600" />
              <h3 className="font-semibold mb-1">My Events</h3>
              <p className="text-sm text-muted-foreground">
                Manage created events
              </p>
            </Card>
          </Link>

          <Link href="/my-tickets">
            <Card className="p-6 rounded-2xl hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
              <Ticket className="mb-4 text-indigo-600" />
              <h3 className="font-semibold mb-1">My Tickets</h3>
              <p className="text-sm text-muted-foreground">
                View your registrations
              </p>
            </Card>
          </Link>

        </div>
      </section>

    </div>
  );
}
