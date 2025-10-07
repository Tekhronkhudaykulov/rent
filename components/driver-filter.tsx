"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Driver } from "@/types/driver.types";
import { citizenshipOptions } from "@/data/mock-data";
import { Filter, Search, X, ChevronDown, ChevronUp } from "lucide-react";

interface DriverFilterProps {
  drivers: Driver[];
  onFilteredDriversChange: (filteredDrivers: Driver[]) => void;
}

export function DriverFilter({
  drivers,
  onFilteredDriversChange,
}: DriverFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCitizenship, setSelectedCitizenship] = useState<string>("all");

  useEffect(() => {
    let filtered = drivers;

    // Search filter (name, passport, license)
    if (searchTerm) {
      filtered = filtered.filter(
        (driver) =>
          driver.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.passportSeries
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          driver.driverLicense.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Citizenship filter
    if (selectedCitizenship !== "all") {
      filtered = filtered.filter(
        (driver) => driver.citizenship === selectedCitizenship
      );
    }

    onFilteredDriversChange(filtered);
  }, [searchTerm, selectedCitizenship, drivers, onFilteredDriversChange]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCitizenship("all");
  };

  const hasActiveFilters = searchTerm || selectedCitizenship !== "all";
  const filteredCount = drivers.length;

  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-blue-600" />
            Driver Filter
            {hasActiveFilters && (
              <span className="text-sm font-normal text-blue-600">
                ({filteredCount} found)
              </span>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Show
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Search Box */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, passport, or license..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Citizenship Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Citizenship
              </label>
              <Select
                value={selectedCitizenship}
                onValueChange={setSelectedCitizenship}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All countries</SelectItem>
                  {citizenshipOptions.map((citizenship) => (
                    <SelectItem key={citizenship} value={citizenship}>
                      {citizenship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full text-gray-600 hover:text-gray-700 bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
