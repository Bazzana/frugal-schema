'use client'

import { useState, useEffect } from "react";

import ComponentSelect from "../components/ComponentSelect.tsx";
import Button from "../components/GenericButton.tsx";
import DescriptionDialog from "../components/DescriptionDialog.tsx";
import OutputJSON from "../components/OutputJSON.tsx";
import GenericSelect from "../components/GenericSelect.tsx";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Component {
  id?: number;
  componentName: string;
  componentType: string;
  componentDescription: string;
}

export default function Home() {
  const [authToken, setAuthToken] = useState('');
  const [spaceID, setSpaceID] = useState('');
  const [regionValue, setRegionValue] = useState('');
  const [existingSpaceComponents, setExistingSpaceComponents] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Initialize state with an empty array for component values
  const [componentList, setComponentList] = useState<Component[]>([]);
  const [nextId, setNextId] = useState(0);
  const [blockName, setBlockName] = useState('');

  const SBRegions = [{"European Union" : "https://mapi.storyblok.com"},{"United States" : "https://api-us.storyblok.com"},{"Canada" : "https://api-ca.storyblok.com"},{"Australia" : "https://api-ap.storyblok.com"},{"China" : "https://app.storyblokchina.cn"}]

  useEffect(() => {
    existingSpaceComponents.length > 0 && isLoading == true ? setIsLoading(false) : '' ;
  }, [existingSpaceComponents]);

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

  const getComponents = (e) => {
    const StoryblokClient = require('storyblok-js-client')
    setIsLoading(true);
    const Storyblok = new StoryblokClient({
      oauthToken: authToken
    })
    Storyblok.get('spaces/'+spaceID+'/components/', {})
    .then(response => {
      setExistingSpaceComponents(response.data.components)
    }).catch(error => { 
      console.log(error)
    })
  }

  return (
    <main className="container relative flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <div className="relative grid w-full scroll-m-20 gap-4">
        <div className="flex grow-0">
          <DescriptionDialog />
        </div>
        <Tabs defaultValue="api" className="">
          <TabsList>
            <TabsTrigger value="api">Authorisation</TabsTrigger>
            <TabsTrigger value="generator">Block Generator</TabsTrigger>
          </TabsList>
          <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Authorisation</CardTitle>
              <CardDescription>Select the region your Storyblok space is in, input your authorisation token, and the corresponding space ID to fetch components from.</CardDescription>
            </CardHeader>
            <CardContent className="py-4 px-0 flex flex-row">
              <div className="py-4 px-4 w-1/3">
                <Label htmlFor="Component Type">Authorisation Token</Label>
                <Input 
                name="Authorisation Token"
                required
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}  // Update local state on input change
                />
              </div>
              <div className="py-4 px-4 w-1/3">
                <Label htmlFor="Component Type">Storyblok Space ID</Label>
                <Input 
                name="Storyblok Space ID"
                required
                value={spaceID}
                onChange={(e) => setSpaceID(e.target.value)}  // Update local state on input change
                />
              </div>
              <div className="py-4 px-4 w-1/3">
                <GenericSelect options={SBRegions.map(obj => Object.keys(obj)[0])} label={'StoryBlok Space Region'} onChange={(value) => setRegionValue(value)} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-row justify-between gap-4">
              <Button onClick={getComponents} disabled={regionValue == "" || authToken == "" || isLoading == true ? true : false} isLoading={isLoading} buttonText="Get existing components" />
            </CardFooter>
          </Card>
          </TabsContent>
          <TabsContent value="generator">
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
                onChange={(e) => setBlockName(e.target.value)}  // Update local state on input change
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
          </TabsContent>
        </Tabs>
      <div>Auth Token: {authToken == "" ? 'Null' : authToken} </div>
      <div>Space Region: {regionValue == "" ? 'Null' : regionValue} </div>
      <div>Existing components: {existingSpaceComponents.length > 0 ? existingSpaceComponents.map(obj => Object.values(obj)[0] + ", ") : 'None found'} </div>
      <div>Block Name: {blockName == "" ? 'Null' : blockName} </div>
      <div className="border px-2 py-2 rounded-lg">Block Components:
        <OutputJSON blockName={blockName} component={componentList}/>
      </div></div>
    </main>
  );
}