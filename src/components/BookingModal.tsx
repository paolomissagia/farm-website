import React from "react";
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
import { useForm } from "@/helpers/hooks";
import { BookingFormData, BookingModalProps } from "@/helpers/interfaces";
import emailjs from "@emailjs/browser";
import { format } from "date-fns";

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;

const EMAIL_BOOKING_TEMPLATE_ID = import.meta.env
  .VITE_EMAIL_BOOKING_TEMPLATE_ID;

const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export default function BookingModal({ machine, onClose }: BookingModalProps) {
  const { formData, handleChange, resetForm } = useForm<BookingFormData>({
    name: "",
    phone: "",
    startDate: undefined,
    endDate: undefined,
    startTime: "",
    endTime: "",
    deliveryAddress: "",
    rentalType: undefined,
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

    try {
      const bookingData = {
        ...formData,
        machineName: machine.name,
        machinePrice: machine.price,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
      };

      emailjs.send(EMAIL_SERVICE_ID, EMAIL_BOOKING_TEMPLATE_ID, bookingData, {
        publicKey: EMAIL_PUBLIC_KEY,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
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
          </div>
          {machine.id === 1 && (
            <div>
              <Label>Mietart</Label>
              <RadioGroup
                name="rentalType"
                value={formData.rentalType}
                onValueChange={(value) =>
                  handleChange({
                    target: { name: "rentalType", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
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
            <Label htmlFor="startDate">Startdatum</Label>
            <DatePicker
              value={formData.startDate || undefined}
              onChange={handleDateChange("startDate")}
            />
          </div>
          {formData.rentalType === "hourly" ? (
            <>
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
            </>
          ) : (
            <div>
              <Label htmlFor="endDate">Enddatum</Label>
              <DatePicker
                value={formData.endDate || undefined}
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
              rows={2}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit">Jetzt buchen</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
