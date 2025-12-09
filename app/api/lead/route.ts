import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      whatsapp,
      tipoPodcast,
      temLogo,
      interesse,
      horas,
      vezesMes,
      horasSessao,
      horario,
    } = body

    // validações básicas
    if (!name || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nome e WhatsApp são obrigatórios.',
        },
        { status: 400 },
      )
    }

    const tiposValidos = ['SOLO', 'ENTREVISTA', 'BATE_PAPO', 'INDEFINIDO']
    const interessesValidos = ['UNICO', 'MENSAL']

    if (!tiposValidos.includes(tipoPodcast)) {
      return NextResponse.json(
        { success: false, message: 'tipoPodcast inválido.' },
        { status: 400 },
      )
    }

    if (!interessesValidos.includes(interesse)) {
      return NextResponse.json(
        { success: false, message: 'interesse inválido.' },
        { status: 400 },
      )
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        whatsapp,
        tipoPodcast,
        temLogo: Boolean(temLogo),
        interesse,
        horas: horas ?? null,
        vezesMes: vezesMes ?? null,
        horasSessao: horasSessao ?? null,
        horario: horario ?? null,
      },
    })

    // ✅ SEMPRE retornar algo em caso de sucesso
    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar lead', error)

    // ✅ E sempre retornar algo em caso de erro
    return NextResponse.json(
      { success: false, message: 'Erro interno ao salvar lead.' },
      { status: 500 },
    )
  }
}
