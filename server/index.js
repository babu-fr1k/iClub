
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config({ path: './server/.env' })

const app = express()
const PORT = 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

if (!process.env.GEMINI_API_KEY) {
  console.error('Falta GEMINI_API_KEY en server/.env')
  process.exit(1)
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

app.get('/api/health', (req, res) => {
  res.json({ estado: 'Servidor iClub activo' })
})

app.post('/api/recomendar', async (req, res) => {
  try {
    const { mensaje, eventos } = req.body

    if (typeof mensaje !== 'string' || !mensaje.trim() || mensaje.length > 1000) {
      return res.status(400).json({
        error: 'Escribe una consulta válida de máximo 1000 caracteres.'
      })
    }

    if (!Array.isArray(eventos) || eventos.length > 50) {
      return res.status(400).json({
        error: 'Debes enviar una lista válida de eventos.'
      })
    }

    const prompt = `
Eres iClub AI, un asistente universitario.

Tu trabajo es recomendar actividades de una plataforma
de eventos universitarios.

Reglas:
- Responde en español.
- Recomienda únicamente eventos incluidos en el catálogo.
- Explica por qué son relevantes para el estudiante.
- Respeta los requisitos de acceso.
- No inventes fechas, empresas, vacantes ni certificados.
- Si no existe un evento apropiado, indícalo.

CATÁLOGO DE EVENTOS:
${JSON.stringify(eventos)}

CONSULTA DEL ESTUDIANTE:
${mensaje}
`

    const response = await ai.models.generateContent({
      model: 'gemma-4-26b-a4b-it',
      contents: prompt
    })

    res.json({
      respuesta: response.text || 'No se generó una respuesta.'
    })
  } catch (error) {
    console.error('Error al consultar Gemma:', error.message)

    res.status(502).json({
      error: 'No fue posible consultar Gemma. Revisa el modelo, la cuota y la clave de API.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor iClub AI: http://localhost:${PORT}`)
})