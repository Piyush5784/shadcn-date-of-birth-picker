"use client";
import { Calendar } from "@/components/ui/calendar";
import { CodeBlock } from "@/components/ui/code-block";
import { CodeBlockDemo } from "@/components/ui/code-block-demo";
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
import { exampleCode } from "@/examples/example-code";

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

              <a href="https://github.com/Piyush5784">
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
                href="https://ui.shadcn.com/docs/installation"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Shadcn UI
              </a>{" "}
              , and add{" "}
              <a
                href="https://ui.shadcn.com/docs/components/calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Calender
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
                href="https://ui.shadcn.com/docs/components/input"
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
              2) Update the calender component
            </p>
            <p className="text-foreground/50 text-sm p-2">
              Calender component is present in src/component. If not, create one
            </p>
            <CodeBlock
              code={exampleCode}
              language="tsx"
              fileName="calendar.tsx"
            />
          </div>
          <div className="mt-8 text-start pl-8">
            <p className="font-medium text-lg">3) Demo</p>
            <CodeBlockDemo />
          </div>
          <div className="mt-8 text-wrap max-w-2xl text-justify pl-14 p-8 pt-0">
            Done 🎉, this component is free to use, but if you find it useful,
            feel free to star the{" "}
            <a
              href="https://github.com/Piyush5784/shadcn-date-of-birth-picker"
              className="underline"
            >
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
