import { useEffect, useRef, useState } from 'react'

export default function GemmaChat({ eventos = [], clubes = [], intereses = [] }) {
  const [abierto, setAbierto] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [historial, setHistorial] = useState([])
  const [cargando, setCargando] = useState(false)
  const finRef = useRef(null)

  useEffect(() => {
    if (abierto) finRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [historial, abierto, cargando])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setAbierto(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  async function consultarGemma(e) {
    e.preventDefault()
    const texto = mensaje.trim()
    if (!texto || cargando) return
    const anteriores = historial.filter(item => !item.error).slice(-8)
    setHistorial(actual => [...actual, { rol: 'usuario', texto }])
    setMensaje('')
    setCargando(true)
    try {
      const solicitud = await fetch('http://localhost:3001/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: texto, eventos, clubes, intereses, historial: anteriores })
      })
      const datos = await solicitud.json()
      if (!solicitud.ok) throw new Error(datos.error || 'Error al consultar Gemma')
      setHistorial(actual => [...actual, { rol: 'asistente', texto: datos.respuesta || 'Sin respuesta.' }])
    } catch (error) {
      setHistorial(actual => [...actual, { rol: 'asistente', texto: 'No fue posible conectar con Gemma: ' + error.message, error: true }])
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      {!abierto && (
        <button className="gemma-bubble" type="button" onClick={() => setAbierto(true)} aria-label="Abrir asistente iClub AI" title="Habla con iClub AI">
          <span aria-hidden="true">✦</span><span className="gemma-bubble-label">iClub AI</span>
        </button>
      )}
      <div className={`gemma-sidebar ${abierto ? 'is-open' : ''}`} role="dialog" aria-modal="false" aria-label="Asistente iClub AI" aria-hidden={!abierto}>
        <div className="gemma-sidebar-header">
          <div className="gemma-heading"><span className="gemma-icon">✦</span><div><h2>iClub AI</h2><p>Tu guía universitaria · Gemma 4</p></div></div>
          <button type="button" className="gemma-close" onClick={() => setAbierto(false)} aria-label="Cerrar asistente">✕</button>
        </div>
        <div className="gemma-messages" aria-live="polite">
          <div className="gemma-message assistant">¡Hola! ✨ Cuéntame qué quieres aprender o construir. Te recomendaré eventos y clubes del catálogo y te explicaré qué habilidades puedes desarrollar.</div>
          {historial.map((item, i) => <div key={i} className={`gemma-message ${item.rol === 'usuario' ? 'user' : 'assistant'} ${item.error ? 'error' : ''}`}>{item.texto}</div>)}
          {cargando && <div className="gemma-message assistant gemma-thinking">✦ Gemma está pensando…</div>}
          <div ref={finRef} />
        </div>
        <form className="gemma-compose" onSubmit={consultarGemma}>
          <label htmlFor="gemma-input">Pregunta a iClub AI</label>
          <textarea id="gemma-input" value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="Quiero construir un robot araña..." rows={3} maxLength={1000} disabled={!abierto} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit() } }} />
          <button type="submit" disabled={!abierto || cargando || !mensaje.trim()}>{cargando ? 'Pensando…' : 'Enviar ✦'}</button>
          <small>Las actividades son de demostración. Verifica los datos con el organizador.</small>
        </form>
      </div>
    </>
  )
}
