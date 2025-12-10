import { NextResponse } from 'next/server'
import prisma from '../../lib/prisma' // ajuste o caminho se o lib estiver em outro lugar

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

    // Validação básica
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

        // default simples, mas você pode validar antes
        tipoPodcast: tipoPodcast ? String(tipoPodcast) : 'INDEFINIDO',
        temLogo: Boolean(temLogo),
        interesse: interesse ? String(interesse) : 'UNICO',

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
  } catch (err: unknown) {
    console.error('Erro ao salvar lead:', err)

    const errorMessage =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
        ? err
        : 'Erro desconhecido'

    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno ao salvar lead.',
        debug: errorMessage, // depois, em produção, você pode remover esse campo
      },
      { status: 500 },
    )
  }
}
