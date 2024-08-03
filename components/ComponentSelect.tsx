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

import DeleteButton from "./DeleteButton.tsx";

// Hardcoded list of defined component types
// Context: https://www.storyblok.com/docs/api/management/core-resources/components/possible-field-types
const componentTypes = ['bloks','text','textarea','richtext','markdown','number','datetime','boolean','option','options','asset','multiasset','multilink','table','section','custom','image','file'];

export function ComponentSelect({ component, onChange, deleteComponent }) {
  const [componentName, setComponentName] = useState(component.componentName);
  const [componentDescription, setComponentDescription] = useState(component.componentDescription);
  const [componentType, setComponentType] = useState(component.componentType);

    useEffect(() => {
      setComponentName(component.componentName);
      setComponentDescription(component.componentDescription);
      setComponentType(component.componentType);
    }, [component]);

    useEffect(() => {
      onChange({componentName, componentDescription, componentType});
    }, [componentName, componentDescription, componentType]);

    const handleSelectChange = (value) => {
      setComponentType(value);
    };

    const handleInputChange = (value) => {
      setComponentName(value);
    };

    const handleDescriptionChange = (value) => {
      setComponentDescription(value);
    };

    const removeComponent = () => {
      deleteComponent();
    };

  return (
    <div className="border flex flex-col bg-background relative -m-[1px] -mx-[1px] shadow-md justify-end">
      <div className="flex justify-end">
        <DeleteButton onClick={removeComponent}/>
      </div>
      <div className="flex gap-4 flex-col flex-grow pb-4 px-4">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col basis-1/2">
            <Label htmlFor="Component Name" className="mb-4">Component Name</Label>
            <Input 
            name="Component Name"
            required
            value={componentName}
            onChange={(e) => handleInputChange(e.target.value)}  // Update local state on input change
            />
          </div>
          <div className="flex flex-col basis-1/2">
            <Label htmlFor="Component Type" className="mb-4">Component Type</Label>
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
        </div>
        <Label htmlFor="Component Description">Component Description</Label>
        <Input 
        name="Component Description"
        required
        value={componentDescription}
        onChange={(e) => handleDescriptionChange(e.target.value)}  // Update local state on input change
        />
      </div>
    </div>
  )
}

export default ComponentSelect;
