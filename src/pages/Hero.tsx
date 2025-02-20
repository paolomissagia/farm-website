import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import Logo from "@/assets/logo.png";
import { scrollToSection } from "@/helpers/functions";

export default function Hero() {
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  return (
    <section className="flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="flex w-full max-w-6xl flex-col items-center md:flex-row-reverse">
        <div className="mb-8 w-full md:w-1/2">
          <img src={Logo} alt="Logo image" className="w-full" />
        </div>
        <div className="flex w-full flex-col items-center justify-center text-center md:w-1/2">
          <h1 className="mb-4 text-4xl font-bold">
            Agar & Dienstleistungen Oberlausitz GbR
          </h1>
          <p className="mb-8 max-w-lg text-xl">
            Erfahren Sie mehr über unsere Dienstleistungen und wie wir Ihnen
            weiterhelfen können
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
            <Button
              onClick={() => scrollToSection("choose-machine")}
              variant="default"
              size="lg"
            >
              Optionen anzeigen
            </Button>
            <Button
              onClick={() => setIsContactModalOpen(true)}
              variant="outline"
              size="lg"
            >
              Kontaktieren Sie uns
            </Button>
          </div>
        </div>
      </div>
      {isContactModalOpen && (
        <ContactModal onClose={() => setIsContactModalOpen(false)} />
      )}
    </section>
  );
}
