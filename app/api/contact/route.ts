import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { name, email, phone, message } = await request.json();

        // 1. Configureer de Gmail SMTP Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD, // Het 16-cijferige App-wachtwoord
            },
        });

        // 2. Stel de e-mail opbouw in
        const mailOptions = {
            from: `"Monklus Website" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email, // Zorgt ervoor dat je direct naar de klant mailt als je op 'beantwoorden' klikt
            subject: `Nieuw renovatieverzoek van ${name}`,
            text: `
        Nieuw bericht ontvangen via het contactformulier van Monklus:
        
        Naam: ${name}
        E-mailadres: ${email}
        Telefoonnummer: ${phone || 'Niet opgegeven'}
        
        Bericht / Renovatieplannen:
        ${message}
      `,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1f2937; max-width: 600px; border: 1px solid #e5e7eb; rounded: 8px;">
          <h2 style="color: #1e3a8a; margin-bottom: 20px;">Nieuw renovatieverzoek (Monklus)</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mailadres:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Telefoonnummer:</strong> ${phone || 'Niet opgegeven'}</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p><strong>Bericht / Renovatieplannen:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b;">${message}</p>
        </div>
      `,
        };

        // 3. Verstuur de e-mail
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "E-mail succesvol verzonden!" }, { status: 200 });

    } catch (error) {
        console.error("SMTP Verzondfout:", error);
        return NextResponse.json({ success: false, message: "Er ging iets mis bij het verzenden." }, { status: 500 });
    }
}
