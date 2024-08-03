import { Button } from "@/components/ui/button"

export function GenericButton({onClick, buttonText, disabled}) {
    
  return <Button disabled={disabled} onClick={onClick}>{buttonText}</Button>
}

export default GenericButton