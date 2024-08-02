import * as React from "react"
import { useRef, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import DeleteButton from "./DeleteButton.js";
import { Input } from "@/components/ui/input"

// Hardcoded list of defined component types
// Context: https://www.storyblok.com/docs/api/management/core-resources/components/possible-field-types
const componentTypes = ['bloks','text','textarea','richtext','markdown','number','datetime','boolean','option','options','asset','multiasset','multilink','table','section','custom','image','file'];

export function ComponentSelect({ onChange, deleteComponent}) {
    let inputRef = useRef({});
    let [componentName, setComponentName] = useState('');
    let [componentType, setComponentType] = useState('');

    const handleChange = (value) => {
      onChange(componentName,componentType);
    };

    const removeComponent = () => {
      deleteComponent();
    };

  return (
    <div className="">
      {componentName}
      {componentType}
      <div className="flex gap-4">
        <Input 
        required
        onChange={(e) => setComponentName(e.target.value)}  // Update local state on input change
        />
        <Select className="flex-grow" onValueChange={(value) => {
          setComponentType(value);  // Update local state on select change
          handleChange(value);  // Handle change to notify parent
        }}>
        <SelectTrigger>
            <SelectValue placeholder="Add a component" />
        </SelectTrigger>
        <SelectContent>
          {componentTypes.map((sbComponent, index) => {
            return <SelectItem key={sbComponent} value={sbComponent}>{sbComponent}</SelectItem>
          })}
        </SelectContent>
        </Select>
        <DeleteButton onClick={removeComponent}/>
      </div>
    </div>
  )
}

export default ComponentSelect;
