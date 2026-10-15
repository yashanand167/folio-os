"use client";

import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function parseStoredDate(value?: string) {
  if (!value || value === "Present") return undefined;
  const iso = parseISO(value);
  if (isValid(iso)) return iso;
  if (/^\d{4}$/.test(value)) return new Date(Number(value), 0, 1);
  return undefined;
}

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowPresent?: boolean;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  allowPresent = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const isPresent = value === "Present";
  const date = parseStoredDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            data-empty={!date && !isPresent}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && !isPresent && "text-muted-foreground",
            )}
          />
        }
      >
        <CalendarIcon />
        {isPresent ? (
          "Present"
        ) : date ? (
          format(date, "PPP")
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isPresent ? undefined : date}
          onSelect={(next) => {
            onChange(next ? format(next, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
          captionLayout="dropdown"
          startMonth={new Date(1960, 0)}
          endMonth={new Date(new Date().getFullYear() + 8, 11)}
        />
        {allowPresent ? (
          <div className="border-t border-border p-2">
            <Button
              type="button"
              variant={isPresent ? "default" : "ghost"}
              size="sm"
              className="w-full"
              onClick={() => {
                onChange("Present");
                setOpen(false);
              }}
            >
              Present
            </Button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
