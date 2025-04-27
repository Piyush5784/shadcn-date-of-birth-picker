"use client";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";

const page = () => {
  const [date, setDate] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <div className="border px-56 py-28 rounded-xl">
          <div className="space-y-2 w-full max-w-xs">
            <label className="text-sm font-bold pl-2">Birth Date</label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div>
                  <Input
                    readOnly
                    value={
                      date
                        ? format(new Date(date), "yyyy-MM-dd")
                        : "Pick a date"
                    }
                    className="w-full border rounded px-2 py-1"
                    type="text"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-none p-0">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setDate(format(selectedDate, "yyyy-MM-dd"));
                      setIsPopoverOpen(false);
                    }
                  }}
                  captionLayout="dropdown-buttons"
                  fromYear={1960}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
