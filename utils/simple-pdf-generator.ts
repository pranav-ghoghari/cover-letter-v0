import { jsPDF } from "jspdf"

export function generateSimplePDF(content: string, filename = "cover-letter.pdf"): void {
  try {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set font
    doc.setFont("helvetica")
    doc.setFontSize(12)

    // Strip HTML tags to get plain text
    const plainText = content.replace(/<[^>]*>?/gm, "")

    // Split text into lines that fit on the page
    const pageWidth = 210 // A4 width in mm
    const margin = 20 // margin in mm
    const maxWidth = pageWidth - 2 * margin
    const lineHeight = 7 // line height in mm

    // Add text with line breaks and pagination
    doc.text(plainText, margin, margin, {
      maxWidth: maxWidth,
      lineHeightFactor: 1.5,
    })

    // Save the PDF
    doc.save(filename)
  } catch (error) {
    console.error("Error generating simple PDF:", error)
    throw error
  }
}
