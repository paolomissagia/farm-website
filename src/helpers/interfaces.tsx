export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export interface ContactModalProps {
  onClose: () => void;
}

export interface Machine {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  hourlyPrice?: number;
  weekendPrice?: number;
}

export interface MachineCardProps {
  machine: Machine;
}

export interface BookingModalProps {
  machine: Machine;
  onClose: () => void;
}

export interface BookingFormData {
  name: string;
  phone: string;
  startDate: Date | undefined;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  deliveryAddress: string;
  rentalType?: string;
}
