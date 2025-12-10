'use client'

import Image from 'next/image'
import { FormEvent, useState } from 'react'

type TipoPodcast = 'SOLO' | 'ENTREVISTA' | 'BATE_PAPO' | 'INDEFINIDO'
type Interesse = 'UNICO' | 'MENSAL'

interface LeadFormState {
  name: string
  whatsapp: string
  tipoPodcast: TipoPodcast
  temLogo: 'SIM' | 'NAO'
  interesse: Interesse
  horas: string
  vezesMes: string
  horasSessao: string
  horario: string
}

export default function HomePage() {
  const [form, setForm] = useState<LeadFormState>({
    name: '',
    whatsapp: '',
    tipoPodcast: 'INDEFINIDO',
    temLogo: 'NAO',
    interesse: 'UNICO',
    horas: '',
    vezesMes: '',
    horasSessao: '',
    horario: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleChange(field: keyof LeadFormState, value: string) {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    try {
      const payload = {
        name: form.name,
        whatsapp: form.whatsapp,
        tipoPodcast: form.tipoPodcast,
        temLogo: form.temLogo === 'SIM',
        interesse: form.interesse,
        horas:
          form.interesse === 'UNICO' && form.horas ? Number(form.horas) : null,
        vezesMes:
          form.interesse === 'MENSAL' && form.vezesMes
            ? Number(form.vezesMes)
            : null,
        horasSessao:
          form.interesse === 'MENSAL' && form.horasSessao
            ? Number(form.horasSessao)
            : null,
        horario: form.horario || null,
      }

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Erro ao enviar seus dados.')
      }

      setSuccess(
        'Pronto! Recebemos suas informações e vamos falar com você em breve. 🎧',
      )
    } catch (err: any) {
      setError(err.message || 'Erro inesperado ao enviar formulário.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isInteresseUnico = form.interesse === 'UNICO'
  const isInteresseMensal = form.interesse === 'MENSAL'

  return (
    <main className="min-h-screen bg-brand-blue text-foreground flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.12)] border border-brand-sand-soft overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-5/12 bg-brand-sand-soft p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-sand">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <Image
                  src="/podcast-natal-logo.png"
                  alt="Logo Podcast Natal"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-brand-blue">
                  Podcast Natal Studio
                </h1>
                <p className="text-xs md:text-sm text-slate-700">
                  Estúdio profissional para podcasts em Natal/RN.
                </p>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-brand-blue-dark mb-2">
              Pronto para tirar seu podcast do papel?
            </h2>
            <p className="text-sm text-slate-800 mb-3">
              Preencha rapidinho e vamos montar um orçamento que combina com o
              seu projeto. É sem compromisso e leva menos de 30 segundos.
            </p>
            <ul className="text-xs text-slate-800 space-y-1">
              <li>• Áudio e vídeo em qualidade profissional</li>
              <li>• Câmeras 4K, microfones premium e ambiente tratado</li>
              <li>• Orientação para quem nunca gravou podcast</li>
            </ul>

            <a
              href="https://wa.me/5584998045201?text=Ol%C3%A1%2C%20acabei%20de%20acessar%20o%20seu%20link%20e%20fiquei%20com%20uma%20d%C3%BAvida%20sobre%20o%20Podcast%20Natal."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block px-8 py-3 rounded-full text-white !text-white text-sm font-medium shadow 
             bg-[#25D366] hover:bg-[#128C7E] transition"
            >
              Dúvidas? Fale conosco no WhatsApp
            </a>
          </div>

          <p className="mt-6 text-[11px] text-slate-600">
            Suas informações estão seguras. Usamos apenas para preparar seu
            orçamento.
          </p>
        </div>

        {/* LADO DIREITO – formulário */}
        <div className="md:w-7/12 bg-white p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white"
                value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                required
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                WhatsApp
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white"
                value={form.whatsapp}
                onChange={e => handleChange('whatsapp', e.target.value)}
                required
              />
            </div>

            {/* Tipo de podcast */}
            <div>
              <p className="block text-sm font-medium text-brand-blue-dark mb-1">
                Qual tipo de podcast você quer gravar?
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                {[
                  { key: 'SOLO', label: 'Solo' },
                  { key: 'ENTREVISTA', label: 'Entrevista' },
                  { key: 'BATE_PAPO', label: 'Bate-papo' },
                  { key: 'INDEFINIDO', label: 'Ainda não sei' },
                ].map(option => {
                  const selected = form.tipoPodcast === option.key

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() =>
                        handleChange('tipoPodcast', option.key as TipoPodcast)
                      }
                      className={`pill-toggle ${
                        selected ? 'pill-toggle--active' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tem logo? */}
            <div>
              <p className="block text-sm font-medium text-brand-blue-dark mb-1">
                Você já tem logo ou identidade visual?
              </p>
              <div className="flex gap-2 text-xs md:text-sm">
                {[
                  { key: 'SIM', label: 'Sim' },
                  { key: 'NAO', label: 'Não' },
                ].map(option => {
                  const selected = form.temLogo === option.key

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleChange('temLogo', option.key)}
                      className={`pill-toggle ${
                        selected ? 'pill-toggle--active' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Interesse */}
            <div>
              <p className="block text-sm font-medium text-brand-blue-dark mb-1">
                Qual é seu interesse?
              </p>
              <div className="flex flex-col gap-2 text-xs md:text-sm text-brand-blue-dark">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="interesse"
                    value="UNICO"
                    checked={isInteresseUnico}
                    onChange={() => handleChange('interesse', 'UNICO')}
                  />
                  <span>Quero gravar apenas uma vez</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="interesse"
                    value="MENSAL"
                    checked={isInteresseMensal}
                    onChange={() => handleChange('interesse', 'MENSAL')}
                  />
                  <span>Quero fazer um orçamento mensal (frequência)</span>
                </label>
              </div>
            </div>

            {/* Campos condicionais */}
            {isInteresseUnico && (
              <div>
                <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                  Quantas horas você pretende gravar?
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark bg-white outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={form.horas}
                  onChange={e => handleChange('horas', e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="1">1 hora</option>
                  <option value="2">2 horas</option>
                  <option value="3">3 horas</option>
                  <option value="4">4 horas</option>
                  <option value="5">Outra quantidade</option>
                </select>
              </div>
            )}

            {isInteresseMensal && (
              <>
                <div>
                  <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                    Quantas vezes por mês pretende gravar?
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark bg-white outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={form.vezesMes}
                    onChange={e => handleChange('vezesMes', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="1">1 vez por mês</option>
                    <option value="2">2 vezes por mês</option>
                    <option value="4">4 vezes por mês</option>
                    <option value="5">Mais vezes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                    Quantas horas por sessão?
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark bg-white outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={form.horasSessao}
                    onChange={e => handleChange('horasSessao', e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="1">1 hora</option>
                    <option value="2">2 horas</option>
                    <option value="3">3 horas</option>
                    <option value="4">4 horas</option>
                  </select>
                </div>
              </>
            )}

            {/* Melhor dia/horário */}
            <div>
              <label className="block text-sm font-medium text-brand-blue-dark mb-1">
                Melhor dia/horário para gravar
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-brand-blue-dark outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white"
                placeholder="Ex: Noite durante a semana, sábado de manhã..."
                value={form.horario}
                onChange={e => handleChange('horario', e.target.value)}
              />
            </div>

            {/* mensagens */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            {/* botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-1 py-2.5 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-brand-blue-dark disabled:opacity-60 disabled:cursor-default transition"
            >
              {isSubmitting ? 'Enviando...' : 'Quero meu orçamento agora'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
