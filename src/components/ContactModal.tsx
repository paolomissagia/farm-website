import React from "react";
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

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;

const EMAIL_CONTACT_TEMPLATE_ID = import.meta.env
  .VITE_EMAIL_CONTACT_TEMPLATE_ID;

const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

export default function ContactModal({ onClose }: ContactModalProps) {
  const { formData, handleChange, resetForm } = useForm<ContactFormData>({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const contactData = {
        ...formData,
      };

      emailjs.send(EMAIL_SERVICE_ID, EMAIL_CONTACT_TEMPLATE_ID, contactData, {
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
          <DialogTitle>Contact Us</DialogTitle>
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
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
