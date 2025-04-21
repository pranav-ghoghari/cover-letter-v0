import { NextResponse } from "next/server"
import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

export async function POST(request: Request) {
  try {
    const { letter } = await request.json()

    if (!letter) {
      return NextResponse.json({ error: "No HTML content provided" }, { status: 400 })
    }

    console.log("Received HTML content for PDF generation")

    // Set up browser with more verbose logging
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security", "--no-sandbox"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
      ignoreHTTPSErrors: true,
    })

    console.log("Browser launched")
    const page = await browser.newPage()
    console.log("Page created")

    // Create HTML template with proper styling
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cover Letter</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12pt;
              line-height: 1.5;
              color: #000;
              padding: 15mm;
              max-width: 210mm;
              margin: 0 auto;
            }
            h1 { font-size: 18pt; margin-top: 16pt; margin-bottom: 8pt; }
            h2 { font-size: 16pt; margin-top: 14pt; margin-bottom: 7pt; }
            h3 { font-size: 14pt; margin-top: 12pt; margin-bottom: 6pt; }
            p { margin-bottom: 10pt; }
            ul, ol { margin-bottom: 10pt; padding-left: 20pt; }
            li { margin-bottom: 4pt; }
            @page { size: A4; margin: 15mm; }
          </style>
        </head>
        <body>
          ${letter}
        </body>
      </html>
    `

    console.log("Setting page content")
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    console.log("Page content set")

    // Generate PDF with debugging
    console.log("Generating PDF")
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
    })
    console.log(`PDF generated, size: ${pdfBuffer.length} bytes`)
    console.log("Raw PDF buffer:", pdfBuffer);
    console.log("PDF buffer length:", pdfBuffer.length);
    await browser.close()
    console.log("Browser closed")

    // Return PDF as base64
    const base64Pdf = Buffer.from(pdfBuffer).toString("base64");

    console.log("Converted Base64 PDF string (first 100 chars):", base64Pdf.substring(0, 100));
    console.log("Converted Base64 PDF string length:", base64Pdf.length);

    const responseData = { pdf: base64Pdf };
    console.log("Sending JSON response with Base64 PDF:", responseData);
    return NextResponse.json({ pdf: base64Pdf })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF", details: String(error) }, { status: 500 })
  }
}
