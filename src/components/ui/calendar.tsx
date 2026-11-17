"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils/cn";

type CalendarDensity = "default" | "compact";

interface CalendarProps {
  value?: Date | null;
  onChange?: (date: Date) => void;
  density?: CalendarDensity;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function Calendar({ value, onChange, density = "default", minDate, maxDate, className }: CalendarProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(value?.getMonth() ?? today.getMonth());
  const [viewYear, setViewYear] = useState(value?.getFullYear() ?? today.getFullYear());

  const days = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);
  const firstDayOfWeek = days[0].getDay();
  const cellSize = density === "compact" ? "size-8 text-xs" : "size-10 text-sm";

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  function isDisabled(date: Date): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  }

  return (
    <div className={cn("inline-flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-1 mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="size-8 inline-flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors text-neutral-600"
          aria-label="Mes anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-neutral-900">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="size-8 inline-flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors text-neutral-600"
          aria-label="Proximo mes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className={cn(
              "flex items-center justify-center text-xs font-medium text-neutral-500",
              cellSize
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className={cellSize} />
        ))}

        {days.map((date) => {
          const isSelected = value ? isSameDay(date, value) : false;
          const isToday = isSameDay(date, today);
          const disabled = isDisabled(date);

          return (
            <button
              key={date.getDate()}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(date)}
              className={cn(
                "inline-flex items-center justify-center rounded-lg font-semibold transition-colors",
                cellSize,
                disabled && "opacity-40 cursor-not-allowed",
                isSelected
                  ? "bg-primary-500 text-white"
                  : isToday
                    ? "ring-1 ring-primary-500 text-primary-700"
                    : "text-neutral-900 hover:bg-neutral-100",
                !disabled && !isSelected && "focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar, type CalendarProps, type CalendarDensity };
