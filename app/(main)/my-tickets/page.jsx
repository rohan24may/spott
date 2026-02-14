"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar, MapPin, Loader2, Ticket } from "lucide-react";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import EventCard from "@/components/event-card";

export default function MyTicketsPage() {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState(null);

  const { data: registrations, isLoading } = useConvexQuery(
    api.registrations.getMyRegistrations
  );

  const { mutate: cancelRegistration } =
    useConvexMutation(api.registrations.cancelRegistration);

  const handleCancelRegistration = async (registrationId) => {
    if (!window.confirm("Cancel this ticket?")) return;

    try {
      await cancelRegistration({ registrationId });
      toast.success("Ticket cancelled");
    } catch (error) {
      toast.error(error.message || "Failed to cancel ticket");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const now = Date.now();

  const upcomingTickets = registrations?.filter(
    (reg) =>
      reg.event && reg.event.startDate >= now && reg.status === "confirmed"
  );

  const pastTickets = registrations?.filter(
    (reg) =>
      reg.event && (reg.event.startDate < now || reg.status === "cancelled")
  );

  return (
    <div className="min-h-screen px-4 pb-24 bg-gradient-to-br from-indigo-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Your Tickets 🎟️
          </h1>
          <p className="text-muted-foreground mt-2">
            Upcoming events and past experiences
          </p>
        </div>

        {/* UPCOMING */}
        {upcomingTickets?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {upcomingTickets.map((registration) => (
                <EventCard
                  key={registration._id}
                  event={registration.event}
                  action="ticket"
                  onClick={() => setSelectedTicket(registration)}
                  onDelete={() => handleCancelRegistration(registration._id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* PAST */}
        {pastTickets?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Past Events</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {pastTickets.map((registration) => (
                <EventCard
                  key={registration._id}
                  event={registration.event}
                  action={null}
                  className="opacity-60"
                />
              ))}
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!upcomingTickets?.length && !pastTickets?.length && (
          <Card className="p-14 text-center rounded-3xl">
            <CardContent className="space-y-6">
              <div className="text-6xl">🎟️</div>

              <h2 className="text-2xl font-bold">
                No tickets yet
              </h2>

              <p className="text-muted-foreground">
                Explore events and start attending amazing experiences.
              </p>

              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-400 text-white"
              >
                <Link href="/explore" className="flex gap-2 items-center">
                  <Ticket className="w-4 h-4" />
                  Browse Events
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* QR MODAL */}
      {selectedTicket && (
        <Dialog
          open={!!selectedTicket}
          onOpenChange={() => setSelectedTicket(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Ticket</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              <div className="text-center">
                <p className="font-semibold">
                  {selectedTicket.attendeeName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.event.title}
                </p>
              </div>

              <div className="flex justify-center p-6 bg-white rounded-lg">
                <QRCode value={selectedTicket.qrCode} size={200} level="H" />
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Ticket ID</p>
                <p className="font-mono text-sm">
                  {selectedTicket.qrCode}
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(selectedTicket.event.startDate, "PPP, h:mm a")}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedTicket.event.locationType === "online"
                    ? "Online Event"
                    : `${selectedTicket.event.city}, ${
                        selectedTicket.event.state ||
                        selectedTicket.event.country
                      }`}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Show this QR at event entrance
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
