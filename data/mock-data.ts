import type { Driver, CreateDriverData } from "@/types/driver.types";
import type { Car } from "@/types/car.types";

export const mockDrivers: Driver[] = [
  {
    id: "1",
    photo: "/driver-photo-1.jpg",
    fullName: "Мехмет Али Озтюрк",
    passportSeries: "TR1234567",
    driverLicense: "TR987654321",
    citizenship: "Турция",
    createdAt: new Date("2024-01-15"),
  },
];

// Turkish person default data
export const defaultDriverData: CreateDriverData = {
  photo: null,
  fullName: "Мехмет Али Озтюрк",
  passportSeries: "TR1234567",
  driverLicense: "TR987654321",
  citizenship: "Турция",
};

export const citizenshipOptions = [
  "Узбекистан",
  "Россия",
  "Казахстан",
  "Кыргызстан",
  "Таджикистан",
  "Туркменистан",
  "Беларусь",
  "Украина",
  "Турция",
  "Другое",
];

export const mockCars: Car[] = [
  {
    id: "1",
    model: "Toyota Camry",
    color: "Белый",
    year: 2023,
    pricePerDay: 150000,
    totalPrice: 1050000,
    image: "/white-toyota-camry.jpg",
    available: true,
    fuelType: "Бензин",
    transmission: "Автомат",
  },
  {
    id: "2",
    model: "BMW X5",
    color: "Черный",
    year: 2022,
    pricePerDay: 300000,
    totalPrice: 2100000,
    image: "/black-bmw-x5.jpg",
    available: true,
    fuelType: "Бензин",
    transmission: "Автомат",
  },
  {
    id: "3",
    model: "Mercedes C-Class",
    color: "Красный",
    year: 2023,
    pricePerDay: 250000,
    totalPrice: 1750000,
    image: "/red-mercedes-c-class.jpg",
    available: false,
    fuelType: "Бензин",
    transmission: "Автомат",
  },
  {
    id: "4",
    model: "Audi A4",
    color: "Синий",
    year: 2022,
    pricePerDay: 200000,
    totalPrice: 1400000,
    image: "/blue-audi-a4.jpg",
    available: true,
    fuelType: "Бензин",
    transmission: "Автомат",
  },
  {
    id: "5",
    model: "Lexus RX",
    color: "Серебристый",
    year: 2023,
    pricePerDay: 280000,
    totalPrice: 1960000,
    image: "/silver-lexus-rx.jpg",
    available: true,
    fuelType: "Гибрид",
    transmission: "Автомат",
  },
  {
    id: "6",
    model: "Honda Accord",
    color: "Зеленый",
    year: 2021,
    pricePerDay: 120000,
    totalPrice: 840000,
    image: "/green-honda-accord.jpg",
    available: false,
    fuelType: "Бензин",
    transmission: "Механика",
  },
];
