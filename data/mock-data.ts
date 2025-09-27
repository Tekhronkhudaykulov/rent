import type { Driver, CreateDriverData } from "@/types/driver.types";
import type { Car } from "@/types/car.types";
import { ki8 } from "@/public/images";
// import Kia from "";
export const mockDrivers: Driver[] = [
  {
    id: "1",
    photo: "/driver-photo-1.jpg",
    fullName: "Mehmet Ali Öztürk",
    passportSeries: "TR1234567",
    driverLicense: "TR987654321",
    citizenship: "Türkiye",
    createdAt: new Date("2024-01-15"),
  },
];

// Türk sürücü varsayılan verisi
export const defaultDriverData: CreateDriverData = {
  photo: null,
  fullName: "Mehmet Ali Öztürk",
  passportSeries: "TR1234567",
  driverLicense: "TR987654321",
  citizenship: "Türkiye",
};

export const citizenshipOptions = [
  "Özbekistan",
  "Rusya",
  "Kazakistan",
  "Kırgızistan",
  "Tacikistan",
  "Türkmenistan",
  "Beyaz Rusya",
  "Ukrayna",
  "Türkiye",
  "Diğer",
];

export const mockCars: Car[] = [
  {
    id: "7",
    model: "Kia K8",
    color: "Gri",
    year: 2023,
    pricePerDay: 2200,
    totalPrice: 15400,
    image: "https://i.ibb.co/385yFqv/kia.jpg", // bu rasmni public papkaga qo‘y
    available: true,
    fuelType: "Benzin",
    transmission: "Otomatik",
  },
  {
    id: "1",
    model: "Toyota Camry",
    color: "Beyaz",
    year: 2023,
    pricePerDay: 1500, // 150000 so'm ≈ 1500 ₺ (örnek)
    totalPrice: 10500,
    image: "/white-toyota-camry.jpg",
    available: true,
    fuelType: "Benzin",
    transmission: "Otomatik",
  },
  {
    id: "2",
    model: "BMW X5",
    color: "Siyah",
    year: 2022,
    pricePerDay: 3000,
    totalPrice: 21000,
    image: "/black-bmw-x5.jpg",
    available: true,
    fuelType: "Benzin",
    transmission: "Otomatik",
  },
  {
    id: "3",
    model: "Mercedes C-Class",
    color: "Kırmızı",
    year: 2023,
    pricePerDay: 2500,
    totalPrice: 17500,
    image: "/red-mercedes-c-class.jpg",
    available: false,
    fuelType: "Benzin",
    transmission: "Otomatik",
  },
  {
    id: "4",
    model: "Audi A4",
    color: "Mavi",
    year: 2022,
    pricePerDay: 2000,
    totalPrice: 14000,
    image: "/blue-audi-a4.jpg",
    available: true,
    fuelType: "Benzin",
    transmission: "Otomatik",
  },
  {
    id: "5",
    model: "Lexus RX",
    color: "Gümüş",
    year: 2023,
    pricePerDay: 2800,
    totalPrice: 19600,
    image: "/silver-lexus-rx.jpg",
    available: true,
    fuelType: "Hibrit",
    transmission: "Otomatik",
  },
  {
    id: "6",
    model: "Honda Accord",
    color: "Yeşil",
    year: 2021,
    pricePerDay: 1200,
    totalPrice: 8400,
    image: "/green-honda-accord.jpg",
    available: false,
    fuelType: "Benzin",
    transmission: "Manuel",
  },
];
