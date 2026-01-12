import * as React from "react"
import { ChevronDownIcon, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function PublicationDatepicker({ field }: { field: any }) {
    const [open, setOpen] = React.useState(false)

    // On convertit la valeur string du field en objet Date pour Shadcn
    const selectedDate = field.value ? new Date(field.value) : undefined

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="text-[10px] uppercase font-bold text-muted-foreground">
                Date de publication
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-between text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                            {field.value ? (
                                format(selectedDate!, "PPP", { locale: fr })
                            ) : (
                                <span>Choisir une date</span>
                            )}
                        </div>
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            // On enregistre la date au format string ISO pour Laravel
                            field.onChange(date ? date.toISOString() : null)
                            setOpen(false)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
