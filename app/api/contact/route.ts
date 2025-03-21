import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // En un entorno real, aquí enviarías el email
    // Por ejemplo, usando un servicio como SendGrid, Mailgun, etc.
    console.log("Contact form submission:", { name, email, message })

    // Simular un retraso para dar sensación de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Error processing contact form" }, { status: 500 })
  }
}

