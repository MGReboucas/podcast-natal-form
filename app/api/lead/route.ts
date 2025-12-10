import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

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

    // Validação bem básica pra evitar registro vazio
    if (!name || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message: 'Nome e WhatsApp são obrigatórios.',
        },
        { status: 400 },
      )
    }

    const newLead = await prisma.lead.create({
      data: {
        name: String(name),
        whatsapp: String(whatsapp),

        // aqui você está usando string no schema (sem enum do Prisma)
        tipoPodcast: String(tipoPodcast || 'INDEFINIDO'),
        temLogo: Boolean(temLogo),
        interesse: String(interesse || 'UNICO'),

        horas: typeof horas === 'number' ? horas : horas ? Number(horas) : null,

        vezesMes:
          typeof vezesMes === 'number'
            ? vezesMes
            : vezesMes
            ? Number(vezesMes)
            : null,

        horasSessao:
          typeof horasSessao === 'number'
            ? horasSessao
            : horasSessao
            ? Number(horasSessao)
            : null,

        horario: horario ? String(horario) : null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Lead salvo com sucesso.',
        lead: newLead,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao salvar lead:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno ao salvar lead.',
      },
      { status: 500 },
    )
  }
}
