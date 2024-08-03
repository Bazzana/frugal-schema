'use client'

import { useState } from "react";

import ComponentSelect from "../components/ComponentSelect.js";
import Button from "../components/GenericButton.js";
import DescriptionDialog from "../components/DescriptionDialog.js";
import OutputJSON from "../components/OutputJSON.js";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Component {
  id?: number;
  componentName: string;
  componentType: string;
  componentDescription: string;
}

export default function Home() {
  // Initialize state with an empty array for component values
  const [componentList, setComponentList] = useState<Component[]>([]);
  const [nextId, setNextId] = useState(0);
  const [blockName, setblockName] = useState('');

  const addComponent = () => {
    setComponentList([
      ...componentList,
      { id: nextId, componentName: '', componentType: '', componentDescription: '' }
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

  const canRenderJSON = () => {
    return componentList.length == 0 ? true : false
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <DescriptionDialog />
      <Card>
        <CardHeader>
          <CardTitle>Storyblok Schema Generator</CardTitle>
          <CardDescription>Begin by setting a Block name</CardDescription>
        </CardHeader>
        <CardContent className="py-4 px-0">
          <div className="py-4 px-4">
            <Label htmlFor="Component Type">Block Name</Label>
            <Input 
            name="Blok Name"
            required
            value={blockName}
            onChange={(e) => setblockName(e.target.value)}  // Update local state on input change
            />
          </div>
          {componentList.map(component => (
            <ComponentSelect
              key={component.id} // Use unique ID
              component={component}
              onChange={(updatedComponent) => updateComponent(component.id, updatedComponent)}
              deleteComponent={() => removeComponent(component.id)}
            />
          ))}
        </CardContent>
        <CardFooter className="flex flex-row justify-between gap-4">
          <Button onClick={addComponent} disabled={false} buttonText="Add Component" />
          <Button disabled={canRenderJSON()} buttonText="Render JSON" />
        </CardFooter>
      </Card>
      <div>Block Name: {blockName} </div>
      <div className="border px-2 py-2 rounded-lg">Block Components:
        <OutputJSON blockName={blockName} component={componentList}/>
      </div>
    </main>
  );
}