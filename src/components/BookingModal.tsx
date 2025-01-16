import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useForm } from "@/helpers/hooks";
import { BookingFormData, BookingModalProps } from "@/helpers/interfaces";
import {
  EMAIL_BOOKING_TEMPLATE_ID,
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
} from "@/helpers/constants";
import { validatePhone } from "@/helpers/functions";

export default function BookingModal({ machine, onClose }: BookingModalProps) {
  const { toast } = useToast();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange, resetForm } = useForm<BookingFormData>({
    name: "",
    phone: "",
    startDate: undefined,
    endDate: undefined,
    startTime: "",
    endTime: "",
    deliveryAddress: "",
    rentalType: machine.id == 1 ? "daily" : undefined,
  });

  const handleDateChange =
    (field: "startDate" | "endDate") => (date: Date | undefined) => {
      handleChange({
        target: { name: field, value: date },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

  const handleEndDateChange = (date: Date | undefined) => {
    if (date && formData.startDate) {
      handleChange({
        target: { name: "endDate", value: date },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  function formatDate(date: Date | undefined) {
    return date ? format(date, "dd/MM/yy") : undefined;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formData.startDate) {
      setDateError("Startdatum ist erforderlich");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setPhoneError("Bitte geben Sie eine gültige Telefonnummer ein.");
      return;
    } else {
      setPhoneError(null);
    }

    try {
      setIsSubmitting(true);

      const bookingData = {
        ...formData,
        machineName: machine.name,
        machinePrice: machine.price,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
      };

      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_BOOKING_TEMPLATE_ID,
        bookingData,
        {
          publicKey: EMAIL_PUBLIC_KEY,
        },
      );

      toast({
        title: "Buchung erfolgreich",
        description: `Ihre Buchung für ${machine.name} wurde erfolgreich aufgenommen. Wir werden uns bald bei Ihnen melden.`,
        duration: 5000,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error", error);

      toast({
        title: "Fehler",
        description:
          "Es gab ein Problem bei Ihrer Buchung. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{machine.name} buchen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
          </div>
          {machine.id === 1 && (
            <div>
              <Label>Mietart</Label>
              <RadioGroup
                name="rentalType"
                value={formData.rentalType}
                onValueChange={(value: "hourly" | "daily") =>
                  handleChange({
                    target: { name: "rentalType", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Täglich</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hourly" id="hourly" />
                  <Label htmlFor="hourly">Stündlich</Label>
                </div>
              </RadioGroup>
            </div>
          )}
          <div>
            <Label htmlFor="startDate">
              {formData.rentalType == "hourly" ? "Datum" : "Startdatum"}
            </Label>
            <DatePicker
              value={formData.startDate}
              onChange={handleDateChange("startDate")}
            />
            {dateError && <p className="text-sm text-red-500">{dateError}</p>}
          </div>
          {formData.rentalType === "hourly" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Startzeit</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">Endzeit</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          {formData.rentalType === "daily" && (
            <div>
              <Label htmlFor="endDate">Enddatum</Label>
              <DatePicker
                value={formData.endDate}
                onChange={handleEndDateChange}
                disabled={(date) =>
                  formData.startDate ? date < formData.startDate : false
                }
              />
            </div>
          )}
          <div>
            <Label htmlFor="deliveryAddress">Lieferadresse</Label>
            <Textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <DialogFooter className="flex flex-col space-y-2 sm:justify-end sm:space-x-4 sm:space-y-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Senden
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
