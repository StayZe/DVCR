import EventDisplay from "./components/EventDisplay";
import ControlPanel from "./components/ControlPanel";

export default function ObsPage() {
  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      {/* Zone gauche : affichage */}
      <div className="w-1/2 flex items-center justify-center bg-transparent">
        <EventDisplay />
      </div>

      {/* Zone droite : panneau de contrôle */}
      <div className="w-1/2 bg-gray-800 p-6 overflow-y-auto">
        <ControlPanel />
      </div>
    </div>
  );
}
