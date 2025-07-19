// @ts-nocheck
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import { SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import Avatar from "../Avatar";

interface ListingCardProps {
  data: any;
  userData?: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any;
}

// Helper component for robust image fallback
const ListingImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  // Use state to fallback to <img> if next/image fails
  const [imgError, setImgError] = React.useState(false);
  if (imgError) {
    return <img src={src} alt={alt} className="object-cover h-full w-full group-hover:scale-110 transition" style={{ width: '100%', height: '100%' }} onError={e => (e.currentTarget.src = '/images/placeholder.jpg')} />;
  }
  return (
    <Image
      fill
      className="object-cover h-full w-full group-hover:scale-110 transition"
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
    />
  );
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  userData,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = reservation ? reservation.totalPrice : data.price;
  const reservationDate = reservation
    ? `${format(new Date(reservation.startDate), "PP")} - ${format(new Date(reservation.endDate), "PP")}`
    : null;

  // Ensure images is always an array with at least one valid image URL
  let images: string[] = [];
  if (Array.isArray(data.images) && data.images.length > 0) {
    images = data.images.filter((img: any) => typeof img === 'string' && img.length > 0);
  }
  if (images.length === 0 && typeof data.imageSrc === 'string' && data.imageSrc.length > 0) {
    images = [data.imageSrc];
  }
  if (images.length === 0) {
    images = ["/images/placeholder.jpg"];
  }

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          {/* Image removed as per user request. Section left blank. */}
        </div>
        <div className="font-semibold text-lg">{data.title || "No title"}</div>
        <div className="font-light text-neutral-500">{data.location || "No location"}</div>
        <div className="text-sm text-neutral-700">{data.description || "No description"}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {typeof price === 'number' ? price : 0}</div>
          {!reservation && <div className="font-light">day</div>}
        </div>
        <div className="text-xs text-neutral-500">Category: {data.category || "-"} | Type: {data.type || "-"}</div>
        <div className="text-xs text-neutral-500">Available: {typeof data.available === 'boolean' ? (data.available ? "Yes" : "No") : "-"}</div>
        <div className="text-xs text-neutral-500">Rating: {typeof data.rating === 'number' ? data.rating : "-"}</div>
        <div className="text-xs text-neutral-500">Security Deposit: ${typeof data.securityDeposit === 'number' ? data.securityDeposit : 0}</div>
        <div className="text-xs text-neutral-500">Usage Policy: {data.usagePolicy || "-"}</div>
        {Array.isArray(data.features) && data.features.length > 0 && (
          <ul className="text-xs text-neutral-500 list-disc ml-4">
            {data.features.map((f: string, i: number) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
