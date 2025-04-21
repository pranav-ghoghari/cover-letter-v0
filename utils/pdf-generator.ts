import html2pdf from "html2pdf.js"
import { generateSimplePDF } from "./simple-pdf-generator"

export async function generatePDF(content: string, filename = "cover-letter.pdf"): Promise<void> {
  try {
    // Try server-side generation first
    await generatePDFServerSide(content, filename)
  } catch (serverError) {
    console.error("Server-side PDF generation failed, trying client-side:", serverError)

    try {
      // Fall back to client-side if server fails
      await generatePDFClientSide(content, filename)
    } catch (clientError) {
      console.error("Client-side PDF generation failed, using simple fallback:", clientError)

      // Last resort: simple text-based PDF
      generateSimplePDF(content, filename)
    }
  }
}

async function generatePDFClientSide(content: string, filename: string): Promise<void> {
  // Create a properly formatted HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Cover Letter</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            padding: 10mm;
            max-width: 190mm;
            margin: 0 auto;
          }
          h1 { font-size: 18pt; margin-top: 16pt; margin-bottom: 8pt; }
          h2 { font-size: 16pt; margin-top: 14pt; margin-bottom: 7pt; }
          h3 { font-size: 14pt; margin-top: 12pt; margin-bottom: 6pt; }
          p { margin-bottom: 10pt; }
          ul, ol { margin-bottom: 10pt; padding-left: 20pt; }
          li { margin-bottom: 4pt; }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `

  // Create a temporary container
  const container = document.createElement("div")
  container.innerHTML = htmlContent
  document.body.appendChild(container)
  container.style.position = "absolute"
  container.style.left = "-9999px"

  try {
    // Configure html2pdf options
    const options = {
      margin: 15,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    }

    // Generate and download the PDF
    await html2pdf().from(container).set(options).save()
  } finally {
    // Clean up
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }
}

async function generatePDFServerSide(content: string, filename: string): Promise<void> {
  try {
    // Ensure content is properly wrapped in HTML
    const wrappedContent = content.startsWith("<") ? content : `<div>${content}</div>`

    // Call our server-side API
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ letter: wrappedContent }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Server PDF generation failed:", errorData)
      throw new Error(`Server-side PDF generation failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("Server response data:", data);

    if (!data.pdf) {
      throw new Error("No PDF data received")
    }
    console.log("Received Base64 PDF string:", data.pdf.substring(0, 50), "..."); // Log first 50 chars

    // Convert base64 to blob
    const binaryString = window.atob(data.pdf)
    console.log("Decoded binary string length:", binaryString.length);
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: "application/pdf" })

    // Create download link
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Clean up
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error("Error in server-side PDF generation:", error)
    throw error
  }
}
