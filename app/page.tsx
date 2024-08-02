'use client'

import { useState } from "react";

import ComponentSelect from "../components/ComponentSelect.js";
import Button from "../components/GenericButton.js";

export default function Home() {
  // Initialize state with an empty array for component values
  const [componentList, setComponentList] = useState(['']);

  const addComponent = () => {
    setComponentList([...componentList, '']);
  };

  const removeComponent = (index: number) => {
    setComponentList(componentList.filter((_, i) => i !== index));
  };

  // Function to update a specific component's value in the list
  const updateComponent = (index:number, value:string) => {
    const updatedList = [...componentList];
    updatedList[index] = value;
    setComponentList(updatedList);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      {componentList}
      {componentList.map((value:string, index:number) => (
        <ComponentSelect
          key={index}
          onChange={(newValue: string) => updateComponent(index, newValue)}
          deleteComponent={(newValue: string) => removeComponent(index, newValue)}
          value={undefined}          
        />
      ))}
      <Button onClick={addComponent} disabled={false} buttonText="Add Component" />
    </main>
  );
}