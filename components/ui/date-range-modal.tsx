"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface DateRangeModalProps {
  onClose: () => void;
  onConfirm?: (range: DateRange) => void;
}

export function DateRangeModal({ onClose, onConfirm }: DateRangeModalProps) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kiralama Tarihleri</DialogTitle>
          <DialogDescription>
            Aracı hangi tarihlerde kiralamak istediğinizi seçiniz.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Vazgeç
          </Button>
          <Button>Onayla</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
