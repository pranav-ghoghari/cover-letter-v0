"use client"

import { useEffect, useState, useRef } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Undo, Redo, Download, Loader2 } from "lucide-react"
import { generatePDF } from "@/utils/pdf-generator"
import { useToast } from "@/hooks/use-toast"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const { toast } = useToast()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p></p>", // Ensure there's always valid content
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[400px]",
      },
    },
  })

  // Use useEffect to update content safely
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>")
    }
  }, [content, editor])

  const handleDownloadPDF = async () => {
    if (!editor) return

    setIsGeneratingPDF(true)

    try {
      // Get the editor content
      const editorContent = editor.getHTML()

      console.log("Editor content for PDF:", editorContent)

      if (!editorContent || editorContent === "<p></p>") {
        toast({
          title: "No content to download",
          description: "Please generate a cover letter first.",
          variant: "destructive",
        })
        setIsGeneratingPDF(false)
        return
      }

      // Alternative method: get content from DOM
      let contentToUse = editorContent
      if (editorRef.current) {
        const editorElement = editorRef.current.querySelector(".ProseMirror")
        if (editorElement) {
          // This gets the rendered HTML which might be more reliable
          contentToUse = editorElement.innerHTML
          console.log("Using DOM content for PDF:", contentToUse)
        }
      }

      await generatePDF(contentToUse, "cover-letter.pdf")

      toast({
        title: "PDF Downloaded",
        description: "Your cover letter has been downloaded as a PDF.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "PDF Generation Failed",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (!editor) {
    return <div className="border rounded-md p-4 min-h-[400px] flex items-center justify-center">Loading editor...</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-accent" : ""}
            type="button"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-accent" : ""}
            type="button"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
            type="button"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}
            type="button"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-accent" : ""}
            type="button"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-accent" : ""}
            type="button"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            type="button"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            type="button"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF || !editor.getText().trim()}
          size="sm"
          className="ml-auto"
          type="button"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>
      <div className="border rounded-md p-4 overflow-y-auto" ref={editorRef}>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
