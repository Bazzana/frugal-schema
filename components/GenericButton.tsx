import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function GenericButton({onClick, buttonText, disabled, isLoading}) {
  return <Button disabled={disabled} onClick={onClick}>{isLoading == true ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} {buttonText}</Button>
}

export default GenericButton