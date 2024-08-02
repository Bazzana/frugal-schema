import { Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
 
export function DeleteButton({onClick}) {
    
    return(
      <Button onClick={onClick} variant="destructive" className="w-8">
        <Trash2 className="h-4 w-4" />
      </Button>
    )
  }
  
  export default DeleteButton