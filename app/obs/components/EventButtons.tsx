import React from "react";

const EVENTS = ["BUT", "CARTON_JAUNE", "CARTON_ROUGE", "CARTON_BLANC", "CHANGEMENT"];

export default function EventButtons({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (event: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {EVENTS.map((evt) => (
        <button
          key={evt}
          onClick={() => onSelect(evt)}
          className={`py-2 px-4 rounded text-sm ${
            selected === evt
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {evt.replace("_", " ")}
        </button>
      ))}
    </div>
  );
}
