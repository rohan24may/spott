"use client";

import { Calendar, MapPin, Users, Trash2, X, QrCode, Eye } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { getCategoryIcon, getCategoryLabel } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventCard({
  event,
  onClick,
  onDelete,
  variant = "grid",
  action = null,
  className = "",
}) {
  /* ---------------- LIST VARIANT ---------------- */

  if (variant === "list") {
    return (
      <Card
        className={`py-0 group cursor-pointer rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all border-muted/40 ${className}`}
        onClick={onClick}
      >
        <CardContent className="p-3 flex gap-4 items-center">
          
          {/* Thumbnail */}
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
            {event.coverImage ? (
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center text-3xl"
                style={{ backgroundColor: event.themeColor }}
              >
                {getCategoryIcon(event.category)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-indigo-600 transition">
              {event.title}
            </h3>

            <p className="text-xs text-muted-foreground mb-1">
              {format(event.startDate, "EEE, dd MMM • HH:mm")}
            </p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">
                {event.locationType === "online" ? "Online" : event.city}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{event.registrationCount} attending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  /* ---------------- GRID VARIANT ---------------- */

  return (
    <Card
      className={`overflow-hidden rounded-2xl group pt-0 bg-white border-muted/40 transition-all ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={500}
            height={208}
            priority
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: event.themeColor }}
          >
            {getCategoryIcon(event.category)}
          </div>
        )}

        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Ticket type */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-black backdrop-blur">
            {event.ticketType === "free" ? "Free" : "Paid"}
          </Badge>
        </div>

        {/* Date pill */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
          {format(event.startDate, "dd MMM")}
        </div>
      </div>

      {/* Content */}
      <CardContent className="space-y-3 pt-4">
        
        {/* Category */}
        <Badge
          variant="outline"
          className="rounded-full px-3 py-1 text-xs font-medium"
        >
          {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-indigo-600 transition">
          {event.title}
        </h3>

        {/* Meta */}
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(event.startDate, "PPP")}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">
              {event.locationType === "online"
                ? "Online Event"
                : `${event.city}, ${event.state || event.country}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {event.registrationCount} / {event.capacity} registered
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        {action && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
            >
              {action === "event" ? (
                <>
                  <Eye className="w-4 h-4 mr-1" /> View
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-1" /> Ticket
                </>
              )}
            </Button>

            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event._id);
                }}
              >
                {action === "event" ? (
                  <Trash2 className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
