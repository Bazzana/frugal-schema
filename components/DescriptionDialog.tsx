import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DescriptionDialog({onClick}) {
    
    return(
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">?</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>What is this?</AlertDialogTitle>
            <AlertDialogDescription>
                This tool is a way to populate your Storyblok space with <a href="https://www.storyblok.com/docs/api/management/core-resources/components/" target="_blank" className="underline">Components.</a>
                This can be done directly in StoryBlok, but I built this tool as a means to make it slightly less time-consuming when creating new UI elements as I found the UI to be too finicky.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction>Thanks!</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
  }
  
  export default DescriptionDialog