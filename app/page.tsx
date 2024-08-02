'use client'

import { useState } from "react";

import ComponentSelect from "../components/ComponentSelect.js";
import Button from "../components/GenericButton.js";
import DescriptionDialog from "../components/DescriptionDialog.js";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  // Initialize state with an empty array for component values
  const [componentList, setComponentList] = useState([]);

  const addComponent = () => {
    setComponentList([...componentList, '']);
  };

  const removeComponent = (index: number) => {
    setComponentList(componentList.filter((_, i) => i !== index));
  };

  // Function to update a specific component's value in the list
  const updateComponent = (index:number, value:string[]) => {
    const updatedList = [...componentList];
    updatedList[index] = value;
    setComponentList(updatedList);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <DescriptionDialog />
      <Card>
        <CardHeader>
          <CardTitle>Storyblok Schema Generator</CardTitle>
          <CardDescription>Begin by adding a component</CardDescription>
        </CardHeader>
        <CardContent>
        {componentList.map((value:string, index:number) => (
              <ComponentSelect
                key={index}
                onChange={(newValue: string[]) => updateComponent(index, newValue)}
                deleteComponent={(newValue: string[]) => removeComponent(index)}
                className="mb-4"
              />
            ))}
        </CardContent>
        <CardFooter className="flex flex-col">
        <Button onClick={addComponent} disabled={false} buttonText="Add Component" />
            {componentList.map((value:string, index:number) => (
              <div className="block">{value.componentName}, {value.componentType}</div>
            ))}
        </CardFooter>
      </Card>
    </main>
  );
}