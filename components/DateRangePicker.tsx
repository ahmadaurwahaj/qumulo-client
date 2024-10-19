"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { format, setHours, setMinutes, subDays } from "date-fns";
import { CalendarDays, CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropIcon from "@/assets/icons/DropIcon";

export interface HeaderProps {
  timeRange: TimeRange;
  date: DateRange | undefined;
  disabled: boolean;
  setTimeRange: (timeRange: TimeRange) => void;
  setDate: (date: DateRange | undefined) => void;
}
export type TimeRange =
| 'Last 30 days'
| 'Last 7 days'
  | 'Custom';

const convertTimeRangeToDates = (
  timeRange: TimeRange,
  isBillingService: boolean,
  date?: DateRange,
) => {
  let startDate = new Date();
  let endDate = new Date();

  if (timeRange === 'Last 30 days') {
    startDate.setMonth(startDate.getMonth() - 1);
  }
  if (timeRange === 'Last 7 days') {
    startDate.setDate(startDate.getDate() - 7);
  }
  
  if (timeRange === 'Custom' && date?.from && date.to) {
    startDate = new Date(date.from);
    endDate = new Date(date.to);
    if (isBillingService) {
      startDate = setMinutes(setHours(startDate, 23), 59);
    }
  }
  if (isBillingService) {
    endDate = setMinutes(setHours(endDate, 46), 59);
  }

  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
};

export const useTimeRange = (isBillingService = false) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('Last 7 days');

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const handleSetDate = useCallback(
    (date: DateRange | undefined) => {
      setDate(date);
      setTimeRange('Custom');
    },
    [setDate, setTimeRange],
  );

  const { startDate, endDate } = useMemo(() => {
    return convertTimeRangeToDates(timeRange, isBillingService, date);
  }, [timeRange, date, isBillingService]);

  return { timeRange, date, setTimeRange, handleSetDate, startDate, endDate };
};

export const DateRangePicker = ({
  
  timeRange,
  date,
  disabled,
  setTimeRange,
  setDate,
}: HeaderProps) => {
  const [customDate, setCustomDate] = useState<DateRange | undefined>(date);

  const label = useMemo(() => {
    if (timeRange === 'Custom') {
      if (date?.from) {
        if (date.to) {
          return `${format(date.from, 'dd MMMM yyyy')} - ${format(date.to, 'dd MMMM yyyy')}`;
        } else {
          return format(date.from, 'dd MMMM yyyy');
        }
      }
    }
    return timeRange;
  }, [date, timeRange]);

  const handleCancel = useCallback(() => {
    setCustomDate(date);
  }, [date]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        asChild
        className="px-2 py-[3px] bg-[#222C36] h-6 border-[#373F48] min-w-[110px] rounded"
      >
        <Button
          variant="outline"
          className="gap-1 text-left font-medium text-[#A6AAAE]"
        >
          <span className="grow">{label}</span>
          <span>
            <DropIcon />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => setTimeRange("Last 7 days")}>
          Last 7 days
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTimeRange("Last 30 days")}>
          Last 30 days
        </DropdownMenuItem>
        <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>
                    <CalendarIcon className="mr-2 size-4" />
                  </span>
                  Custom
                </DropdownMenuSubTrigger>
              
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="mx-2 p-0">
                  <div>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={customDate}
                      onSelect={setCustomDate}
                      className="pb-1.5"
                      numberOfMonths={2}
                      toDate={new Date()}
                    />
                    <div className="flex justify-end gap-2 px-3 pb-3 align-middle">
                      <DropdownMenuItem className="p-0 focus:bg-transparent">
                        <Button
                          variant="outline"
                          className="px-3 py-2"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="p-0 focus:bg-transparent">
                        <Button
                          variant="default"
                          className="px-3 py-2"
                          disabled={!customDate?.from || !customDate.to}
                          onClick={() => setDate(customDate)}
                        >
                          Apply
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
