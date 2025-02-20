import { Machine } from "@/helpers/interfaces";
import Minibagger from "@/assets/minibagger.jpeg";
import Tandemanhanger from "@/assets/tandemanhanger.jpeg";
import Anhager from "@/assets/anhanger.jpeg";

export const machines: Machine[] = [
  {
    id: 1,
    name: "CAT Minibagger 1,8T",
    image: Minibagger,
    description: "verschiedene Löffel und Greifer auf Anfrage",
    price: 90,
    hourlyPrice: 15.5,
    weekendPrice: 140,
  },
  {
    id: 2,
    name: "PKW Tandemanhänger",
    image: Tandemanhanger,
    description: "mit Auffahrrampen",
    price: 45,
  },
  {
    id: 3,
    name: "PKW Anhänger",
    image: Anhager,
    description: "3-Seiten-Kipper",
    price: 55,
  },
];
