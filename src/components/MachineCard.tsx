import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookingModal from "@/components/BookingModal";
import { MachineCardProps } from "@/helpers/interfaces";

export default function MachineCard({ machine }: MachineCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  return (
    <Card className="flex min-h-[24rem] w-full max-w-sm flex-col">
      <div className="flex-grow">
        <CardHeader>
          <img
            src={machine.image}
            alt={machine.name}
            className="h-48 w-full object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl">{machine.name}</CardTitle>
          <div>
            <p className="mb-4 text-gray-600">{machine.description}</p>
            <div className="space-y-2">
              <p className="text-2xl font-bold">€{machine.price}/Tag</p>
              {machine.id === 1 && (
                <>
                  <p className="text-lg">€{machine.hourlyPrice}/Stunde</p>
                  <p className="text-lg">€{machine.weekendPrice}/Wochenende</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button className="w-full" onClick={() => setIsBookingModalOpen(true)}>
          Jetzt buchen
        </Button>
      </CardFooter>
      {isBookingModalOpen && (
        <BookingModal
          machine={machine}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </Card>
  );
}
