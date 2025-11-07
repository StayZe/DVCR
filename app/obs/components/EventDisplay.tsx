"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useEventStore } from "../store";

export default function EventDisplay() {
  const { currentEvent, clearEvent } = useEventStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Fonction d'animation d'affichage (useCallback pour stable reference)
  const showEvent = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    // On stoppe toute animation en cours
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    gsap.killTweensOf(el);

    // Position de départ à gauche
    gsap.set(el, { x: "-100%", opacity: 0 });

    // Entrée gauche → visible → sortie droite
    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          // Fin d'affichage après 8s
          clearEvent();
          timelineRef.current = null;
        },
      })
      .to(el, { x: "0%", opacity: 1, duration: 1 }) // entrée
      .to(el, { x: "0%", opacity: 1, duration: 6 }) // visible
      .to(el, { x: "-100%", opacity: 0, duration: 1 }); // sortie
  }, [clearEvent]);

  // Détection de nouvel event
  useEffect(() => {
    if (!currentEvent) return;

    // On lance l'animation
    showEvent();
  }, [currentEvent, showEvent]);

  // Cleanup au démontage du composant
  useEffect(() => {
    const el = containerRef.current;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (el) {
        gsap.killTweensOf(el);
      }
    };
  }, []);

  if (!currentEvent) return null;

  const { type, player, playerIn, playerOut } = currentEvent;

  return (
    <div ref={containerRef} className="fixed bottom-8 left-8 z-50">
      <div className="bg-[#C00000]/95 text-white px-6 py-4 rounded-lg shadow-lg min-w-[340px] border-l-4 border-white/70">
        {/* Type d'événement */}
        <p className="text-2xl font-bold mb-2 tracking-wide uppercase drop-shadow-md">
          {type === "CHANGEMENT"
            ? "🔄 Changement"
            : type === "BUT"
            ? "⚽ But !"
            : type === "CARTON_JAUNE"
            ? "🟨 Carton Jaune"
            : type === "CARTON_ROUGE"
            ? "🟥 Carton Rouge"
            : type === "CARTON_BLANC"
            ? "⬜ Carton Blanc"
            : type}
        </p>

        {/* Si c'est un changement */}
        {type === "CHANGEMENT" && playerIn && playerOut && (
          <div className="text-lg leading-tight space-y-1">
            {playerIn && (
              <p className="text-green-300 font-semibold">
                ↗️ Entrée : <span className="text-white">{playerIn}</span>
              </p>
            )}
            {playerOut && (
              <p className="text-red-300 font-semibold">
                ↘️ Sortie : <span className="text-white">{playerOut}</span>
              </p>
            )}
          </div>
        )}

        {/* Si ce n'est pas un changement */}
        {type !== "CHANGEMENT" && player && (
          <p className="text-lg font-semibold text-white/90">👟 {player}</p>
        )}
      </div>
    </div>
  );
}
