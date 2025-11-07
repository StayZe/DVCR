"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useEventStore } from "../store";

// Configuration de l'animation
const ANIMATION_CONFIG = {
  entryDuration: 1,
  displayDuration: 6,
  exitDuration: 1,
  ease: "power3.inOut",
};

// Mapping des types d'événements vers leurs labels
const EVENT_LABELS = {
  BUT: "But !!!",
  CARTON_JAUNE: "Carton Jaune",
  CARTON_ROUGE: "Carton Rouge",
  CARTON_BLANC: "Carton Blanc",
  CHANGEMENT: "🔄 Changement",
} as const;

// Mapping des types d'événements vers leurs icônes
const EVENT_ICONS = {
  BUT: { src: "/img/soccer-ball.png", alt: "Balle de football", className: "invert" },
  CARTON_JAUNE: { src: "/img/yellow-card.png", alt: "Carton jaune", className: "" },
  CARTON_ROUGE: { src: "/img/red-card.png", alt: "Carton rouge", className: "" },
  CARTON_BLANC: { src: "/img/white-card.png", alt: "Carton blanc", className: "" },
} as const;

export default function EventDisplay() {
  const { currentEvent, clearEvent } = useEventStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation d'entrée et sortie de l'événement
  const animateEvent = useCallback(() => {
    const element = containerRef.current;
    if (!element) return;

    // Nettoyage des animations en cours
    timelineRef.current?.kill();
    gsap.killTweensOf(element);

    // Position initiale (hors écran à gauche)
    gsap.set(element, { x: "-100%", opacity: 0 });

    // Timeline : entrée → affichage → sortie
    timelineRef.current = gsap
      .timeline({
        defaults: { ease: ANIMATION_CONFIG.ease },
        onComplete: () => {
          clearEvent();
          timelineRef.current = null;
        },
      })
      .to(element, { x: "0%", opacity: 1, duration: ANIMATION_CONFIG.entryDuration })
      .to(element, { x: "0%", opacity: 1, duration: ANIMATION_CONFIG.displayDuration })
      .to(element, { x: "-100%", opacity: 0, duration: ANIMATION_CONFIG.exitDuration });
  }, [clearEvent]);

  // Déclencher l'animation lors d'un nouvel événement
  useEffect(() => {
    if (currentEvent) {
      animateEvent();
    }
  }, [currentEvent, animateEvent]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      if (containerRef.current) {
        gsap.killTweensOf(containerRef.current);
      }
    };
  }, []);

  if (!currentEvent) return null;

  const { type, player, playerIn, playerOut } = currentEvent;
  const isSubstitution = type === "CHANGEMENT";
  const eventIcon = EVENT_ICONS[type as keyof typeof EVENT_ICONS];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-8 left-8 z-50 flex flex-row items-center justify-center h-14"
    >
      {/* Logo CSSA */}
      <Logo />

      {/* Contenu de l'événement */}
      <div className="text-white min-w-64 -ml-4 z-10">
        {isSubstitution ? (
          <SubstitutionDisplay playerIn={playerIn} playerOut={playerOut} />
        ) : (
          <StandardEventDisplay player={player} type={type} />
        )}
      </div>

      {/* Icône de l'événement */}
      {eventIcon && <EventIcon {...eventIcon} />}
    </div>
  );
}

// Composant Logo
function Logo() {
  return (
    <div className="z-50">
      <Image
        className="z-50 h-16 w-auto"
        src="/img/homiris.jpg"
        width={400}
        height={400}
        alt="logo aa"
      />
    </div>
  );
}

// Composant pour l'affichage d'un changement
function SubstitutionDisplay({ 
  playerIn, 
  playerOut 
}: { 
  playerIn?: string; 
  playerOut?: string; 
}) {
  return (
    <div className="text-lg font-bold">
      {playerIn && (
        <div className="bg-white pl-8 h-8 flex flex-row justify-between items-center">
          <span className="text-black">{playerIn}</span>
          <FontAwesomeIcon className="px-1 text-black" icon={faArrowUp} />
        </div>
      )}
      {playerOut && (
        <div className="bg-black pl-8 h-8 flex flex-row justify-between items-center">
          <span className="text-white">{playerOut}</span>
          <FontAwesomeIcon className="px-1" icon={faArrowDown} />
        </div>
      )}
    </div>
  );
}

// Composant pour l'affichage d'un événement standard
function StandardEventDisplay({ 
  player, 
  type 
}: { 
  player?: string; 
  type: string; 
}) {
  return (
    <>
      {player && (
        <div className="bg-vert h-8 px-6 flex flex-row items-center">
          <p className="text-lg font-semibold text-white/90">{player}</p>
        </div>
      )}
      <div className="bg-rouge h-8 px-6 flex flex-row items-center">
        <p className="font-bold tracking-wide uppercase drop-shadow-md">
          {EVENT_LABELS[type as keyof typeof EVENT_LABELS] || type}
        </p>
      </div>
    </>
  );
}

// Composant pour l'icône d'événement
function EventIcon({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className: string; 
}) {
  return (
    <div className="-ml-2 flex items-center z-20">
      <Image
        className={`w-6 h-auto drop-shadow-md rotate-12 ${className}`}
        src={src}
        width={64}
        height={64}
        alt={alt}
      />
    </div>
  );
}