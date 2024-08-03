import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function GenericSelect({ options, onChange, label}) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (value) => {
    setSelectedValue(value); // Update local state
    onChange(value); // Emit the value to the parent component
  };


  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Select className="flex-grow" name="Component Type" 
        onValueChange={(value) => {
          handleSelectChange(value);  // Handle change to notify parent
        }}>
        <SelectTrigger>
        <SelectValue placeholder="Select Region" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => {
            return <SelectItem key={index} value={option}>{option}</SelectItem>
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default GenericSelect;