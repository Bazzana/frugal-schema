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

interface Component {
  id: number;
  componentName: string;
  componentType: string;
}

export default function Home() {
  // Initialize state with an empty array for component values
  const [componentList, setComponentList] = useState<Component[]>([]);
  const [nextId, setNextId] = useState(0);

  const addComponent = () => {
    setComponentList([
      ...componentList,
      { id: nextId, componentName: '', componentType: '' }
    ]);
    setNextId(nextId + 1); // Increment ID for next component
  };

  const removeComponent = (id: number) => {
    setComponentList(componentList.filter(component => component.id !== id));
  };

  // Function to update a specific component's value in the list
  const updateComponent = (id: number, updatedComponent: Omit<Component, 'id'>) => {
    setComponentList(componentList.map(component =>
      component.id === id ? { ...component, ...updatedComponent } : component
    ));
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
          {componentList.map(component => (
            <ComponentSelect
              key={component.id} // Use unique ID
              component={component}
              onChange={(updatedComponent) => updateComponent(component.id, updatedComponent)}
              deleteComponent={() => removeComponent(component.id)}
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