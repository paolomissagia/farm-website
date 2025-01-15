import Hero from "@/pages/Hero";
import Bookings from "@/pages/Bookings";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Hero />
      <Bookings />
      <Toaster />
    </div>
  );
}
