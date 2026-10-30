
import { useState } from 'react'

export default function GemmaChat({ eventos = [] }) {
  const [mensaje, setMensaje] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [cargando, setCargando] = useState(false)

  async function consultarGemma(e) {
    e.preventDefault()
    if (!mensaje.trim() || cargando) return

    setCargando(true)
    setRespuesta('')

    try {
      const solicitud = await fetch('http://localhost:3001/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje,
          eventos
        })
      })

      const datos = await solicitud.json()

      if (!solicitud.ok) {
        throw new Error(datos.error || 'Error al consultar Gemma')
      }

      setRespuesta(datos.respuesta)
    } catch (error) {
      setRespuesta('No fue posible conectar con Gemma: ' + error.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="gemma-chat">
      <div className="gemma-heading">
        <span className="gemma-icon">✦</span>
        <div>
          <h2>iClub AI</h2>
          <p>Recomendaciones inteligentes con Gemma 4</p>
        </div>
      </div>

      <p>
        Cuéntame qué estudias, cuáles son tus intereses y
        qué tipo de actividades te gustaría encontrar.
      </p>

      <form onSubmit={consultarGemma}>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Ejemplo: Estudio Mecatrónica y busco talleres de robótica y oportunidades laborales..."
          rows={4}
          maxLength={1000}
        />

        <button type="submit" disabled={cargando || !mensaje.trim()}>
          {cargando ? 'Gemma está pensando...' : '✦ Obtener recomendaciones'}
        </button>
      </form>

      {respuesta && (
        <div className="gemma-response">
          <strong>✦ Recomendación de Gemma</strong>
          <p>{respuesta}</p>
        </div>
      )}
    </section>
  )
}
