import * as React from "react"
import { cn } from "@/lib/utils"

function Progress({ value = 0, className, ...props }) {
  return (
    <div className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100", className)} {...props}>
      <div
        className="h-full bg-gradient-to-r from-[#0c8aa4] to-[#38bcd4] transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export { Progress }
