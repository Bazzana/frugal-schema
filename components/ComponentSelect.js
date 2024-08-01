import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Hardcoded list of defined component types
// Context: https://www.storyblok.com/docs/api/management/core-resources/components/possible-field-types
const componentTypes = ['bloks','text','textarea','richtext','markdown','number','datetime','boolean','option','options','asset','multiasset','multilink','table','section','custom','image','file'];

export function ComponentSelect() {
  return (
    <Select>
    <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Add a component" />
    </SelectTrigger>
    <SelectContent>
      {componentTypes.map((sbComponent, index) => {
        return <SelectItem key={sbComponent} value={sbComponent}>{sbComponent}</SelectItem>
      })}
    </SelectContent>
    </Select>
  )
}

export default ComponentSelect;
