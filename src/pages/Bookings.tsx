import MachineCard from "@/components/MachineCard";
import { machines } from "@/helpers/data";

export default function Bookings() {
  return (
    <section id="choose-machine" className="px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Wählen Sie Ihre Maschine
      </h2>
      <div className="flex flex-col items-stretch justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
        {machines.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </section>
  );
}
