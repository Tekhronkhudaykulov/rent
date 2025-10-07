"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CreateDriverData } from "@/types/driver.types";
import { defaultDriverData, citizenshipOptions } from "@/data/mock-data";
import { Upload, X, User } from "lucide-react";

interface DriverFormProps {
  onSubmit: (data: CreateDriverData) => void;
  onCancel: () => void;
}

export function DriverForm({ onSubmit, onCancel }: DriverFormProps) {
  const [formData, setFormData] = useState<CreateDriverData>(defaultDriverData);
  const [previewImage, setPreviewImage] = useState<string>(
    "/turkish-driver.jpg"
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          Add Driver
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Driver Photo</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Driver preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Upload className="h-6 w-6 text-white" />
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Click to change the photo</p>
                <p className="text-xs">Supported formats: JPG, PNG</p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Passport Series */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Passport Series</label>
            <Input
              value={formData.passportSeries}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  passportSeries: e.target.value,
                }))
              }
              placeholder="TR1234567"
              required
            />
          </div>

          {/* Driver License */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Driver’s License Number
            </label>
            <Input
              value={formData.driverLicense}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  driverLicense: e.target.value,
                }))
              }
              placeholder="TR987654321"
              required
            />
          </div>

          {/* Citizenship */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Citizenship</label>
            <Select
              value={formData.citizenship}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, citizenship: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select citizenship" />
              </SelectTrigger>
              <SelectContent>
                {citizenshipOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Add Driver
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
