import { Machine } from "@/helpers/interfaces";

export const machines: Machine[] = [
  {
    id: 1,
    name: "CAT Minibagger 1,8T",
    image: "https://www.zeppelin-rental.de/rentalshop/api/category/v1/image/75",
    description: "verschiedene Löffel und Greifer auf Anfrage",
    price: 90,
    hourlyPrice: 15.5,
    weekendPrice: 140,
  },
  {
    id: 2,
    name: "PKW Tandemanhänger",
    image:
      "https://thierberg.de/wp-content/uploads/2021/05/Humbaur_HT304121_1.png",
    description: "mit Auffahrrampen",
    price: 45,
  },
  {
    id: 3,
    name: "PKW Anhänger",
    image:
      "https://unitrailer.de/hpeciai/efcf20b9e2eabd881b7d58367dcefd84/ger_pl_Tieflader-Pkw-Anhanger-Garden-Trailer-200-KIPP-200x106-cm-750-kg-mit-Hochspriegel-Hochplane-und-Stutzrad-4178_8.png",
    description: "3-Seiten-Kipper",
    price: 55,
  },
];
