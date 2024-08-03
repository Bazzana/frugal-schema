'use client'
import * as React from "react"
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import DeleteButton from "./DeleteButton.js";

// Hardcoded list of defined component types
// Context: https://www.storyblok.com/docs/api/management/core-resources/components/possible-field-types
const componentTypes = ['bloks','text','textarea','richtext','markdown','number','datetime','boolean','option','options','asset','multiasset','multilink','table','section','custom','image','file'];

export function ComponentSelect({ component, onChange, deleteComponent }) {
  const [componentName, setComponentName] = useState(component.componentName);
  const [componentType, setComponentType] = useState(component.componentType);

    useEffect(() => {
      setComponentName(component.componentName);
      setComponentType(component.componentType);
    }, [component]);

    useEffect(() => {
      onChange({componentName, componentType});
    }, [componentName, componentType]);

    const handleSelectChange = (value) => {
      setComponentType(value);
    };

    const handleInputChange = (value) => {
      setComponentName(value);
    };

    const removeComponent = () => {
      deleteComponent();
    };

  return (
    <div className="border flex gap-4 justify-between mb-4 bg-background border-py-4 relative -mt-1 -mx-4 shadow-md">
      <div className="flex gap-4 flex-col flex-grow py-4 px-4">
      <Label htmlFor="Component Name">Component Name</Label>
        <Input 
        name="Component Name"
        required
        value={componentName}
        onChange={(e) => handleInputChange(e.target.value)}  // Update local state on input change
        />
        <Label htmlFor="Component Type">Component Type</Label>
        <Select className="flex-grow" name="Component Type" value={componentType}
        onValueChange={(value) => {
          handleSelectChange(value);  // Handle change to notify parent
        }}>
        <SelectTrigger>
            <SelectValue placeholder="Add a component" />
        </SelectTrigger>
        <SelectContent>
          {componentTypes.map((sbComponent, index) => {
            return <SelectItem key={index} value={sbComponent}>{sbComponent}</SelectItem>
          })}
        </SelectContent>
        </Select>
      </div>
      <DeleteButton className="flex-shrink pt-1" onClick={removeComponent}/>
    </div>
  )
}

export default ComponentSelect;
