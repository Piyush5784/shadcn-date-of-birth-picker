"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/acernity/timeline";
import { Calendar } from "@/components/ui/calendar";
import { CodeEditor } from "@/components/ui/code-editor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { format } from "date-fns";
import { useState } from "react";
import { CodeBlock } from "./code-block";
import { Input } from "./input";
import { implementationCode } from "@/examples/example-code";

export function CodeBlockDemo() {
  const [date, setDate] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Tabs defaultValue="preview" className="w-full p-3 max-w-2xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Implementation</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-4">
        <div className=" text-start ">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center py-4">
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
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-4">
        <CodeBlock
          code={implementationCode}
          fileName="code-block.tsx"
          language="tsx"
        />
      </TabsContent>
    </Tabs>
  );
}
