import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 selection:bg-blue-500 selection:text-white",
        "flex h-10 w-full min-w-0 rounded-md border border-gray-300 bg-white px-4 py-2 text-base shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200", // Adjust border and background colors
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
