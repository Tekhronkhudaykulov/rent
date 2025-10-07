"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DriverForm } from "./driver-form";
import { CarSelection } from "./car-selection";
import { DriverFilter } from "./driver-filter";
import { CreativeLoading } from "./creative-loading";
import type { CreateDriverData, Driver } from "@/types/driver.types";
import type { Car } from "@/types/car.types";
import { mockDrivers } from "@/data/mock-data";
import { UserPlus, Users, CheckCircle, UserCheck } from "lucide-react";
import { DateRangeModal } from "./ui/date-range-modal";

export function RentcarDashboard() {
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [filteredDrivers, setFilteredDrivers] = useState<any>(mockDrivers);
  const [selectDate, setSelectDate] = useState({
    from: "",
    to: "",
  });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  console.log("selectDate", selectDate);

  const handleAddDriverClick = () => {
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowDriverForm(true);
  };

  const handleAddDriver = (data: CreateDriverData) => {
    const newDriver: Driver = {
      id: Date.now().toString(),
      photo: data.photo
        ? URL.createObjectURL(data.photo)
        : "/turkish-driver.jpg",
      fullName: data.fullName,
      passportSeries: data.passportSeries,
      driverLicense: data.driverLicense,
      citizenship: data.citizenship,
      createdAt: new Date(),
    };

    setDrivers((prev) => [...prev, newDriver]);
    setShowDriverForm(false);
  };

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setIsOpen(true);
  };

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriverId(selectedDriverId === driverId ? null : driverId);
    setIsOpen(true);
  };

  const handleCompleteRental = () => {
    const selectedDriver = drivers.find((d) => d.id === selectedDriverId);
    if (selectedCar && selectedDriver) {
      // alert(
      //   `Rental successfully completed!\nDriver: ${
      //     selectedDriver.fullName
      //   }\nCar: ${selectedCar.model}\nTotal Price: ${new Intl.NumberFormat(
      //     "en-US"
      //   ).format(selectedCar.totalPrice)} ₺`
      // );
      setSelectedCar(null);
      setSelectedDriverId(null);
    } else {
      alert("Please select both a driver and a car to complete the rental");
    }
  };

  const formatDateEN = (dateStr: string) => {
    if (!dateStr) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  return (
    <>
      <CreativeLoading
        isVisible={showLoading}
        onComplete={handleLoadingComplete}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">RENTCAR CRM</h1>
            <p className="text-lg text-gray-600">
              Car rental management system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Drivers Section */}
            <div className="space-y-6">
              {showDriverForm ? (
                <DriverForm
                  onSubmit={handleAddDriver}
                  onCancel={() => setShowDriverForm(false)}
                />
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-6 w-6 hidden md:inline" />
                          <span className="hidden md:inline">
                            Drivers ({drivers.length})
                          </span>
                          {selectedDriverId && (
                            <span className="text-sm text-green-600 font-normal">
                              - selected: {selectedDriver?.fullName}
                            </span>
                          )}
                        </CardTitle>
                        <Button
                          onClick={handleAddDriverClick}
                          className="flex items-center gap-2 md:w-max w-full"
                        >
                          <UserPlus className="h-4 w-4" />
                          Add Driver
                        </Button>
                      </div>
                    </CardHeader>

                    {/* driver */}
                    <CardContent>
                      {filteredDrivers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>
                            {drivers.length === 0
                              ? "No drivers added yet"
                              : "No drivers found for the applied filters"}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Card
                            key={filteredDrivers[0].id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedDriverId === filteredDrivers[0].id
                                ? "ring-2 ring-green-500 bg-green-50"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              handleDriverSelect(filteredDrivers[0].id)
                            }
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                  <img
                                    src={
                                      filteredDrivers[0].photo ||
                                      "/placeholder.svg"
                                    }
                                    alt={filteredDrivers[0].fullName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                  />
                                  {selectedDriverId ===
                                    filteredDrivers[0].id && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                      <UserCheck className="h-4 w-4 text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm truncate">
                                    {filteredDrivers[0].fullName}
                                  </h3>
                                  <p className="text-xs text-gray-600">
                                    Passport:{" "}
                                    {filteredDrivers[0].passportSeries}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    Driver License:{" "}
                                    {filteredDrivers[0].driverLicense}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {filteredDrivers[0].citizenship}
                                  </p>
                                </div>
                                {selectedDriverId === filteredDrivers[0].id && (
                                  <div className="text-green-600 font-medium text-sm">
                                    Active
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Driver Filter */}
                  {drivers.length > 0 && (
                    <DriverFilter
                      drivers={drivers}
                      onFilteredDriversChange={setFilteredDrivers}
                    />
                  )}
                </>
              )}
            </div>

            {/* Right Column - Cars Section */}
            <div className="space-y-6">
              <CarSelection
                onCarSelect={handleCarSelect}
                selectedCarId={selectedCar?.id}
              />

              {(selectedCar || selectedDriverId) && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h3 className="font-semibold text-green-800">
                          Rental Status
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Driver:</span>
                          <span
                            className={
                              selectedDriverId
                                ? "text-green-600 font-medium"
                                : "text-gray-500"
                            }
                          >
                            {selectedDriver
                              ? selectedDriver.fullName
                              : "Not selected"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Car:</span>
                          <span
                            className={
                              selectedCar
                                ? "text-green-600 font-medium"
                                : "text-gray-500"
                            }
                          >
                            {selectedCar ? selectedCar.model : "Not selected"}
                          </span>
                        </div>
                        {selectedCar && (
                          <div className="flex items-center justify-between">
                            <span>Price:</span>
                            <span className="text-green-600 font-bold">
                              {new Intl.NumberFormat("en-US").format(
                                selectedCar.totalPrice
                              )}{" "}
                              ₺
                            </span>
                          </div>
                        )}

                        {selectDate.from && selectDate.to && (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span>Start Date:</span>
                              <span className="font-medium">
                                {formatDateEN(selectDate.from)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>End Date:</span>
                              <span className="font-medium">
                                {formatDateEN(selectDate.to)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={handleCompleteRental}
                        disabled={!selectedCar || !selectedDriverId}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {selectedCar && selectedDriverId
                          ? "Complete Rental"
                          : `Select ${!selectedDriverId ? "driver" : ""}${
                              !selectedDriverId && !selectedCar ? " and " : ""
                            }${!selectedCar ? "car" : ""}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection Modal */}
      {isOpen && selectedCar && selectedDriverId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setSelectedCar(null);
                setSelectedDriverId(null);
              }}
            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-4">Rental Dates</h2>

            {/* Date inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={selectDate.from}
                  onChange={(e) =>
                    setSelectDate((prev) => ({ ...prev, from: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={selectDate.to}
                  onChange={(e) =>
                    setSelectDate((prev) => ({ ...prev, to: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
