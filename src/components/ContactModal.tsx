import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ContactFormData, ContactModalProps } from "@/helpers/interfaces";
import { useForm } from "@/helpers/hooks";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import {
  EMAIL_CONTACT_TEMPLATE_ID,
  EMAIL_PUBLIC_KEY,
  EMAIL_SERVICE_ID,
} from "@/helpers/constants";
import { validatePhone } from "@/helpers/functions";

export default function ContactModal({ onClose }: ContactModalProps) {
  const { toast } = useToast();
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const { formData, handleChange, resetForm } = useForm<ContactFormData>({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const contactData = {
        ...formData,
      };

      if (!validatePhone(formData.phone)) {
        setPhoneError("Bitte geben Sie eine gültige Telefonnummer ein.");
        return;
      } else {
        setPhoneError(null);
      }

      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_CONTACT_TEMPLATE_ID,
        contactData,
        {
          publicKey: EMAIL_PUBLIC_KEY,
        },
      );

      toast({
        title: "Kontaktanfrage gesendet",
        description:
          "Vielen Dank für Ihre Nachricht. Wir werden uns bald bei Ihnen melden.",
        duration: 5000,
      });

      resetForm();
      onClose();
    } catch (error) {
      console.error("Error", error);

      toast({
        title: "Fehler",
        description:
          "Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kontaktieren Sie uns</DialogTitle>
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
          <div>
            <Label htmlFor="message">Nachricht</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Stornieren
            </Button>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
