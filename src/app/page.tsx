"use client";
import { Timeline } from "@/components/acernity/timeline";
import { Calendar } from "@/components/ui/calendar";
import { CodeBlock } from "@/components/ui/code-block";
import { CodeBlockDemo } from "@/components/ui/code-block-demo";
import { CodeEditor } from "@/components/ui/code-editor";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { format } from "date-fns";
import { LuGithub } from "react-icons/lu";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const exampleCode = `"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month:
          "space-y-4 p-2 border rounded-md bg-popover text-popover-foreground",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        caption_dropdowns:
          "flex justify-center space-x-1 relative items-center",
        vhidden: "sr-only",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Dropdown: ({ value, onChange, children, caption, ...props }) => {
          const options = React.Children.toArray(
            children
          ) as React.ReactElement[];
          const selected = options.find((child) => child.props.value === value);
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };
          return (
            <Select onValueChange={handleChange} value={value as string}>
              <SelectTrigger className="w-[80px] ">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent defaultValue="algo" className="max-h-60">
                {options.map((option, id: number) => (
                  <SelectItem key={id} value={option.props.value}>
                    {option.props.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
`;

const exampleCode2 = `"use client";
import { Calendar } from "@/components/ui/calendar";
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
            <label className="text-sm font-bold">Birth Date</label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <div>
                  <input
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
`;

export default function Home() {
  const [date, setDate] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-5xl">
          <div className="text-start text-lg font-bold mb-4 p-5 px-10 pl-10 flex items-center justify-between   gap-4">
            Shadcn Date of Birth Picker
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <a href="">
                <LuGithub />
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center px-4 ">
            <div className="border px-56 py-28 rounded-xl bor">
              <div className="space-y-2 w-full max-w-xs ">
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
                        className="w-full border rounded px-2 py-1 bg-foreground/5"
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
                          setIsPopoverOpen(false); // Close the popover
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

          <div className="mt-8 text-start pl-8">
            <p className="font-medium text-lg">1) Usage</p>
            <p>
              Install{" "}
              <a
                href="https://ui.shadcn.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Shadcn UI
              </a>{" "}
              , and add{" "}
              <a
                href="https://ui.shadcn.com/docs/components/date-picker"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Date Picker
              </a>
              ,{" "}
              <a
                href="https://ui.shadcn.com/docs/components/select"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Select
              </a>{" "}
              ,
              <a
                href="https://ui.shadcn.com/docs/components/button"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Button
              </a>{" "}
              ,{" "}
              <a
                href="https://ui.shadcn.com/docs/components/popover"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Popover
              </a>{" "}
              and{" "}
              <a
                href="https://ui.shadcn.com/docs/components/popover"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Input
              </a>
            </p>
          </div>
          <div className="mt-8 text-start pl-8">
            <p className="font-medium text-lg">
              2) Add following libraries to your project
              <CodeBlock fileName="terminal" code="npm i date-fns" />
            </p>
          </div>
          <div className="mt-8 text-start pl-8">
            <p className="font-medium text-lg">
              3) Update the Date picker Component
            </p>
            <CodeBlock
              code={exampleCode}
              language="tsx"
              fileName="calendar.tsx"
            />
          </div>
          <div className="mt-8 text-start pl-8">
            <p className="font-medium text-lg">4) Demo</p>
            <CodeBlockDemo />
          </div>
          <div className="mt-8 text-wrap max-w-2xl text-justify pl-14 p-8 pt-0">
            Done 🎉, this component is free to use, but if you find it useful,
            feel free to star the{" "}
            <a href="" className="underline">
              {" "}
              repository
            </a>{" "}
            on GitHub. If you want to be extra cool, you can also buy me a
            coffee and I will be forever grateful.
            <div className="flex gap-2 mt-4">
              <a
                href="https://buymeacoffee.com/piyush5784"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{ height: "60px", width: "217px" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
