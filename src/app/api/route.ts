import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface Transport {
  host: string
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const cellphone = formData.get('cellphone')
  const message = formData.get('message')
  const anexo: File | null = formData.get('anexo') as unknown as File

  const bytes = await anexo.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    segure: true,
    port: 465,
    auth: {
      user: process.env.USER_NAME,
      pass: process.env.PASS_WORD,
    },
  } as Transport)

  const output = `
    <p>Você tem um novo Contato.</p>
    <h3>Detalhes do Contato</h3>
  <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Telefone: ${cellphone}</li>
    <li>Mensagem: ${message}</li>
  </ul>
    <h3>Arquivos</h3>

  `
  try {
    await transporter.sendMail({
      from: 'contato@sensualmodasintima.com.br',
      to: `${email}`,
      subject: `${name} te enviou uma mensagem`,
      html: output,
      attachments: [
        {
          filename: anexo.name,
          content: buffer,
        },
      ],
    })

    return NextResponse.json({ message: 'Email send' })
  } catch (error) {
    console.log('Erro:', error)
    return NextResponse.json({ message: 'Error' })
  }
}
