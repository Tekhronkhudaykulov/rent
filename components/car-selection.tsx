"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Car } from "@/types/car.types";
import { mockCars } from "@/data/mock-data";
import { CarIcon, Fuel, Settings, Calendar, CheckCircle } from "lucide-react";

interface CarSelectionProps {
  onCarSelect: (car: Car) => void;
  selectedCarId?: string;
}

export function CarSelection({
  onCarSelect,
  selectedCarId,
}: CarSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CarIcon className="h-6 w-6" />
          Car Selection ({mockCars.filter((car) => car.available).length}{" "}
          available)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockCars.map((car) => (
            <Card
              key={car.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCarId === car.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              } ${!car.available ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={() => car.available && onCarSelect(car)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Car Image */}
                  <div className="relative">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.model}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    {selectedCarId === car.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {!car.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center">
                        <Badge variant="destructive">Unavailable</Badge>
                      </div>
                    )}
                  </div>

                  {/* Car Info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{car.model}</h3>
                      <Badge
                        variant={car.available ? "default" : "destructive"}
                      >
                        {car.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              car.color === "White"
                                ? "#ffffff"
                                : car.color === "Black"
                                ? "#000000"
                                : car.color === "Red"
                                ? "#ef4444"
                                : car.color === "Blue"
                                ? "#3b82f6"
                                : car.color === "Silver"
                                ? "#94a3b8"
                                : "#22c55e",
                          }}
                        ></div>
                        <span>{car.color}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3 h-3" />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Daily:</span>
                        <span className="font-medium">
                          {new Intl.NumberFormat("en-US").format(
                            car.pricePerDay
                          )}{" "}
                          ₺
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-green-600">
                        <span>Total:</span>
                        <span>
                          {new Intl.NumberFormat("en-US").format(
                            car.totalPrice
                          )}{" "}
                          ₺
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
