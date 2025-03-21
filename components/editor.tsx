"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write")
  const [preview, setPreview] = useState<string>("")

  useEffect(() => {
    // En un entorno real, aquí convertirías Markdown a HTML
    // Por simplicidad, solo mostramos el texto sin formato
    setPreview(value)
  }, [value])

  return (
    <Tabs defaultValue="write" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="write">Escribir</TabsTrigger>
        <TabsTrigger value="preview">Vista previa</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe el contenido de tu post aquí..."
          className="min-h-[300px] resize-y"
        />
      </TabsContent>
      <TabsContent value="preview" className="mt-2">
        <div
          className={cn(
            "border rounded-md p-4 min-h-[300px] prose dark:prose-invert max-w-none",
            activeTab === "preview" ? "block" : "hidden",
          )}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </TabsContent>
    </Tabs>
  )
}

