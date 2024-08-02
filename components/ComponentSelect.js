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

import DeleteButton from "./DeleteButton.js";
import { Input } from "@/components/ui/input"

// Hardcoded list of defined component types
// Context: https://www.storyblok.com/docs/api/management/core-resources/components/possible-field-types
const componentTypes = ['bloks','text','textarea','richtext','markdown','number','datetime','boolean','option','options','asset','multiasset','multilink','table','section','custom','image','file'];

export function ComponentSelect({ onChange, deleteComponent}) {
    let [componentName, setComponentName] = useState('');
    let [componentType, setComponentType] = useState('');

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
    <div className="">
      {componentName}
      <div className="flex gap-4">
        <Input 
        required
        onChange={(e) => handleInputChange(e.target.value)}  // Update local state on input change
        />
        <Select className="flex-grow" onValueChange={(value) => {
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
        <DeleteButton onClick={removeComponent}/>
      </div>
    </div>
  )
}

export default ComponentSelect;
