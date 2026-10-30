import retoPacificoBanner from './assets/reto-pacifico.png'
import mlhBanner from './assets/mlh.png'
import GemmaChat from './GemmaChat'
import Marketplace from './Marketplace'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialEvents = [
  { id: 1, title: 'Feria de Electrónica y Automatización', university: 'ESPOL', club: 'Club de Robótica', date: '2026-11-05', time: '09:00', end: '13:00', location: 'Campus Gustavo Galindo, Guayaquil', mode: 'Presencial', access: 'Solo ESPOL', purpose: 'Formativo', area: 'Electrónica', tags: ['Robótica', 'Automatización', 'Proyectos'], certificate: true, featured: true, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80', description: 'Exposición de prototipos, demostraciones de sistemas de control y proyectos de automatización. Conoce estudiantes con intereses similares y descubre nuevas tecnologías.', requirements: 'Presentar identificación universitaria.' , learning: 'Observación de prototipos, sistemas de control y aplicaciones de automatización.', skills: 'Identificación de componentes y tendencias de electrónica y robótica.' },
  { id: 2, title: 'Conecta con tu futuro: charla de empleabilidad', university: 'ESPOL', club: 'Comunidad de Emprendimiento', date: '2026-11-07', time: '15:00', end: '17:00', location: 'Auditorio universitario', mode: 'Híbrido', access: 'Abierto al público', purpose: 'Contacto laboral', area: 'Empleabilidad', tags: ['Empresas', 'Networking', 'Pasantías'], certificate: false, featured: true, image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80', description: 'Conversatorio sobre preparación profesional, habilidades demandadas y acercamiento a empresas. Las vacantes deberán verificarse en los canales oficiales.', requirements: 'Registro previo.' , learning: 'Preparación profesional, habilidades demandadas y acercamiento a empresas.', skills: 'Networking y orientación profesional.' },
  { id: 3, title: 'Taller práctico de robótica', university: 'ESPOL', club: 'Club de Robótica', date: '2026-11-10', time: '10:00', end: '12:00', location: 'Laboratorio de electrónica', mode: 'Presencial', access: 'Solo miembros del club', purpose: 'Formativo', area: 'Robótica', tags: ['Arduino', 'Sensores', 'Programación'], certificate: true, featured: false, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', description: 'Construcción y programación de prototipos con sensores y actuadores.', requirements: 'Ser miembro activo del club y llevar computadora.' , learning: 'Construcción y programación de prototipos con sensores y actuadores.', skills: 'Programación, integración de sensores y actuadores.' },
  { id: 4, title: 'Jornada de voluntariado y comunidad', university: 'ESPOL', club: 'Club de Impacto Social', date: '2026-11-12', time: '08:30', end: '12:30', location: 'Punto de encuentro en campus', mode: 'Presencial', access: 'Abierto al público', purpose: 'Social', area: 'Impacto social', tags: ['Voluntariado', 'Comunidad', 'Sostenibilidad'], certificate: true, featured: false, image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80', description: 'Actividad de participación comunitaria y colaboración entre estudiantes.', requirements: 'Inscripción previa y disposición para trabajo en equipo.' , learning: 'Participación comunitaria y colaboración entre estudiantes.', skills: 'Trabajo en equipo y compromiso social.' },
  { id: 5, title: 'Hackatón de soluciones digitales', university: 'Universidad de Guayaquil', club: 'Club de Programación', date: '2026-11-15', time: '09:00', end: '18:00', location: 'Campus universitario', mode: 'Híbrido', access: 'Abierto al público', purpose: 'Competencia', area: 'Programación', tags: ['Innovación', 'IA', 'Software'], certificate: true, featured: false, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80', description: 'Desafío colaborativo de desarrollo de prototipos tecnológicos.', requirements: 'Equipo de 2 a 4 personas.' , learning: 'Desarrollo colaborativo de prototipos tecnológicos.', skills: 'Resolución de problemas, desarrollo de software y trabajo en equipo.' },
  { id: 6, title: 'Diseño y creatividad para emprendedores', university: 'ESPOL', club: 'Club de Emprendimiento', date: '2026-11-18', time: '16:00', end: '18:00', location: 'Plataforma virtual', mode: 'Virtual', access: 'Solo ESPOL', purpose: 'Emprendimiento', area: 'Diseño', tags: ['Diseño', 'Negocios', 'Creatividad'], certificate: false, featured: false, image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80', description: 'Herramientas de diseño para presentar y validar ideas de negocio.', requirements: 'Correo institucional.' , learning: 'Herramientas de diseño para presentar y validar ideas de negocio.', skills: 'Comunicación visual, creatividad y validación de ideas.' },
]

// Eventos adicionales proporcionados para la demostración. No se inventan fechas ni horarios.
const specialEvents = [
  { id: 101, title: 'Reto del Pacífico', university: 'ESPOL', club: 'Club de Robótica', date: null, time: null, end: null, location: 'Coliseo nuevo (detrás de UBP), ESPOL', mode: 'Presencial', access: 'Por confirmar', purpose: 'Competencia', area: 'Robótica', tags: ['Robótica', 'Competencia'], certificate: false, featured: false, status: 'Culminado', rating: 4.8, image: retoPacificoBanner, description: 'Competencia de robótica del Club de Robótica. Los detalles de actividades y fecha están pendientes de confirmación.', requirements: 'Evento finalizado.', learning: 'Contenido específico no informado.', skills: 'No especificadas.' },
  { id: 102, title: 'Hacktober - MLH', university: 'ESPOL', club: 'IEEE - HKN Nu Zeta', date: null, time: null, end: null, location: 'Campus Las Peñas, ESPOL', mode: 'Presencial', access: 'Por confirmar', purpose: 'Formativo', area: 'Programación', tags: ['Hacktober', 'MLH', 'Tecnología'], certificate: false, featured: false, status: 'En proceso', image: mlhBanner, description: 'Actividad Hacktober - MLH del grupo IEEE - HKN Nu Zeta, en proceso en el campus Las Peñas. Agenda y horarios por confirmar.', requirements: 'Consultar con la organización.', learning: 'Temario pendiente de confirmación.', skills: 'Por confirmar.' },
]

const clubs = [
  { name: 'Club de Robótica', university: 'ESPOL', icon: '🤖', tags: ['Robótica', 'Electrónica', 'Automatización', 'Programación', 'Innovación'], about: 'Aprende construyendo proyectos tecnológicos.', founded: '2020-03-12', members: 86, faculty: 'Facultad de Ingeniería en Electricidad y Computación (FIEC)', email: 'presirobotica@espol.edu.ec' },
  { name: 'Comunidad de Emprendimiento', university: 'ESPOL', icon: '🚀', tags: ['Negocios', 'Startups', 'Networking', 'Innovación', 'Liderazgo'], about: 'Transforma ideas en proyectos con impacto.', founded: '2021-08-20', members: 54, faculty: 'Facultad de Ciencias Sociales y Humanísticas (FCSH)', email: 'presiemprendimiento@espol.edu.ec' },
  { name: 'Club de Impacto Social', university: 'ESPOL', icon: '🌱', tags: ['Voluntariado', 'Comunidad', 'Sostenibilidad', 'Inclusión', 'Liderazgo'], about: 'Participa en actividades de vinculación social.', founded: '2019-05-17', members: 112, faculty: 'Facultad de Ciencias de la Vida (FCV)', email: 'presiimpactosocial@espol.edu.ec', phone: '+593 99 000 1234' },
  { name: 'Club de Programación', university: 'Universidad de Guayaquil', icon: '💻', tags: ['Software', 'IA', 'Programación', 'Web', 'Hackatones'], about: 'Crea soluciones digitales en equipo.', founded: '2022-02-10', members: 73, faculty: 'Facultad de Ciencias Matemáticas y Físicas (Universidad de Guayaquil)', email: 'presiprogramacion@ug.edu.ec', github: 'https://github.com/iclub-programacion-demo' },
]

const unique = values => ['Todos', ...new Set(values)]
const readSaved = key => { try { return JSON.parse(localStorage.getItem(key)) || [] } catch { return [] } }
const prettyDate = date => date ? new Date(`${date}T12:00:00`).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Fecha por confirmar'

function App() {
  const [page, setPage] = useState('Explorar')
  const [search, setSearch] = useState('')
  const [university, setUniversity] = useState('Todas')
  const [access, setAccess] = useState('Todos')
  const [purpose, setPurpose] = useState('Todos')
  const [area, setArea] = useState('Todos')
  const [mode, setMode] = useState('Todos')
  const [selected, setSelected] = useState(null)
  const [selectedClub, setSelectedClub] = useState(null)
  const [joined, setJoined] = useState(() => readSaved('iclub-registrations'))
  const [interests, setInterests] = useState(() => readSaved('iclub-interests'))
  const [saved, setSaved] = useState(() => readSaved('iclub-saved'))
  const [clubRequests, setClubRequests] = useState(() => readSaved('iclub-club-requests'))
  const [onlyUpcoming, setOnlyUpcoming] = useState(false)

  useEffect(() => { localStorage.setItem('iclub-registrations', JSON.stringify(joined)) }, [joined])
  useEffect(() => { localStorage.setItem('iclub-interests', JSON.stringify(interests)) }, [interests])
  useEffect(() => { localStorage.setItem('iclub-saved', JSON.stringify(saved)) }, [saved])
  useEffect(() => { localStorage.setItem('iclub-club-requests', JSON.stringify(clubRequests)) }, [clubRequests])

  const events = useMemo(() => initialEvents.filter(e => {
    const query = `${e.title} ${e.club} ${e.description} ${e.tags.join(' ')}`.toLowerCase()
    return query.includes(search.toLowerCase()) &&
      (university === 'Todas' || e.university === university) &&
      (access === 'Todos' || e.access === access) &&
      (purpose === 'Todos' || e.purpose === purpose) &&
      (area === 'Todos' || e.area === area) &&
      (mode === 'Todos' || e.mode === mode) &&
      (!onlyUpcoming || e.date >= new Date().toLocaleDateString('en-CA'))
  }).sort((a, b) => a.date.localeCompare(b.date)), [search, university, access, purpose, area, mode, onlyUpcoming])

  const toggle = (value, setter) => setter(old => old.includes(value) ? old.filter(x => x !== value) : [...old, value])
  const go = destination => { setPage(destination); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const resetFilters = () => { setSearch(''); setUniversity('Todas'); setAccess('Todos'); setPurpose('Todos'); setArea('Todos'); setMode('Todos'); setOnlyUpcoming(false) }
  const addCalendar = e => {
    if (!e.date || !e.time || !e.end) return
    const start = `${e.date.replaceAll('-', '')}T${e.time.replace(':', '')}00`
    const end = `${e.date.replaceAll('-', '')}T${e.end.replace(':', '')}00`
    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.set('action', 'TEMPLATE')
    url.searchParams.set('text', e.title)
    url.searchParams.set('dates', `${start}/${end}`)
    url.searchParams.set('details', `${e.description}\nEvento de demostración: verifica los datos con el organizador.`)
    url.searchParams.set('location', e.location)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }
  const shareEvent = async e => {
    const text = `${e.title} — ${prettyDate(e.date)} · ${e.university} (evento de demostración)`
    if (navigator.share) { try { await navigator.share({ title: e.title, text, url: window.location.href }) } catch { /* cancelled */ } }
    else { try { await navigator.clipboard.writeText(`${text}\n${window.location.href}`); alert('Información copiada al portapapeles.') } catch { alert(text) } }
  }
  const filterProps = [
    { label: 'Universidad', value: university, setter: setUniversity, values: unique(initialEvents.map(e => e.university)) },
    { label: 'Acceso', value: access, setter: setAccess, values: unique(initialEvents.map(e => e.access)) },
    { label: 'Propósito', value: purpose, setter: setPurpose, values: unique(initialEvents.map(e => e.purpose)) },
    { label: 'Área de interés', value: area, setter: setArea, values: unique(initialEvents.map(e => e.area)) },
    { label: 'Modalidad', value: mode, setter: setMode, values: unique(initialEvents.map(e => e.mode)) },
  ]

  const eventCard = (e, featured = false) => (
    <article className={`event-card ${featured ? 'featured' : ''}`} key={e.id}>
      <div className={`event-cover ${e.id === 101 || e.id === 102 ? 'event-cover-logo' : ''}`} style={{ backgroundImage: e.id === 101 || e.id === 102 ? `url('${e.image}')` : `linear-gradient(0deg,rgba(10,15,32,.72),rgba(10,15,32,.08)),url('${e.image}')` }}>
        <span className="date-chip">{e.status ? `● ${e.status}` : `📅 ${prettyDate(e.date)}`}</span>
        <button className={`bookmark ${saved.includes(e.id) ? 'bookmarked' : ''}`} onClick={() => toggle(e.id, setSaved)} aria-label="Guardar evento">{saved.includes(e.id) ? '♥' : '♡'}</button>
      </div>
      <div className="event-content">
        <div className="tag-row"><span className="pill purple">{e.purpose}</span><span className="pill">{e.access}</span><span className="pill">{e.mode}</span>{e.rating && <span className="pill event-rating">★ {e.rating.toFixed(1)} / 5</span>}</div>
        <h3>{e.title}</h3>
        <p className="event-description">{e.description}</p>
        <div className="event-meta"><span>🎓 {e.university}</span><span>📍 {e.location}</span>{e.time && <span>🕘 {e.time}</span>}</div>
        <div className="card-bottom"><span className="club-label">Organiza: {e.club}</span><button className="primary small" onClick={() => setSelected(e)}>Ver detalles ↗</button></div>
      </div>
    </article>
  )

  return (
    <div className="app-shell">
      <header className="topbar"><div className="topbar-inner"><button className="brand" onClick={() => go('Explorar')}>✦ <span>iClub</span></button><nav aria-label="Navegación principal">{['Explorar', 'Clubes', 'Eventos', 'Mi perfil', 'Marketplace'].map(p => <button key={p} className={page === p ? 'nav-active' : ''} onClick={() => go(p)}>{p}</button>)}</nav><span className="demo-label">DEMO 2026</span></div></header>
      <main className="main-wrap">
        {page === 'Explorar' && <>
          <section className="intro"><div><div className="eyebrow">✦ TU COMUNIDAD UNIVERSITARIA</div><h1>Descubre lo que <span>está pasando.</span></h1><p>Ferias, talleres, experiencias y oportunidades que conectan contigo.</p></div><div className="intro-orb">✺</div></section>
          <div className="demo-notice">ℹ️ Prototipo: todos los eventos y sus fechas son ficticios. No representan convocatorias confirmadas.</div>
          <div className="search-row"><span>⌕</span><input aria-label="Buscar eventos" placeholder="Buscar eventos, clubes, temas o habilidades..." value={search} onChange={e => setSearch(e.target.value)} /><button onClick={resetFilters}>Limpiar filtros</button></div>
          <div className="filters">{filterProps.map(f => <label key={f.label}>{f.label}<select value={f.value} onChange={e => f.setter(e.target.value)}>{f.values.map(v => <option key={v} value={v}>{v}</option>)}</select></label>)}</div>
          <div className="quick-tags"><span>Explorar:</span>{['Formativo', 'Contacto laboral', 'Social', 'Competencia'].map(t => <button key={t} className={purpose === t ? 'chosen' : ''} onClick={() => setPurpose(purpose === t ? 'Todos' : t)}>#{t.replaceAll(' ', '')}</button>)}<label className="upcoming-check"><input type="checkbox" checked={onlyUpcoming} onChange={e => setOnlyUpcoming(e.target.checked)} /> Solo futuros</label></div>
          <div className="section-heading"><div><span className="eyebrow">SELECCIÓN PARA TI</span><h2>Eventos destacados</h2></div><span>{events.length} resultados</span></div>
          <div className="featured-grid">{events.filter(e => e.featured).map(e => eventCard(e, true))}</div>
          <div className="section-heading"><div><span className="eyebrow">DESCUBRE MÁS</span><h2>Todos los eventos</h2></div><span>Ordenados por fecha</span></div>
          <div className="event-grid">{events.map(e => eventCard(e))}</div>
          {events.length === 0 && <div className="empty-state"><h3>No encontramos eventos</h3><p>Prueba con otros filtros o elimina alguna condición.</p><button className="primary" onClick={resetFilters}>Restablecer filtros</button></div>}
        </>}
        {page === 'Clubes' && <><div className="page-head"><span className="eyebrow">COMUNIDADES</span><div className="clubs-title-row"><h1>Clubes universitarios</h1><button className="map-ghost-button" type="button" aria-label="Mapa de clubes (próximamente)" title="Mapa próximamente"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></svg>Mapa</button></div><p>Conoce a las personas que hacen posible cada actividad.</p></div><div className="club-grid">{clubs.map(c => <article className="club-card" key={c.name}><div className="club-icon">{c.icon}</div><span className="pill purple">{c.university}</span><h3>{c.name}</h3><p>{c.about}</p><div className="tag-row">{c.tags.map(t => <span className="pill" key={t}>#{t}</span>)}</div><div className="club-actions"><button className="secondary" type="button" onClick={() => setSelectedClub(c)}>Ver detalles ↗</button><button className="primary" onClick={() => toggle(c.name, setClubRequests)}>{clubRequests.includes(c.name) ? '✓ Solicitud registrada (demo)' : 'Solicitar ingreso'}</button></div></article>)}</div><p className="muted-note">Las solicitudes se guardan solo en este navegador. No se envían a los clubes.</p></>}
        {page === 'Eventos' && <>
          <div className="page-head"><span className="eyebrow">ACTIVIDADES DE LA COMUNIDAD</span><h1>Eventos universitarios</h1><p>Conoce actividades pasadas, iniciativas en curso y próximos encuentros.</p></div>
          <div className="section-heading"><div><span className="eyebrow">COMUNIDAD EN ACCIÓN</span><h2>Eventos destacados</h2></div></div>
          <div className="featured-grid">{specialEvents.map(e => eventCard(e, true))}</div>
          <div className="section-heading"><div><span className="eyebrow">PRÓXIMAS ACTIVIDADES</span><h2>Eventos programados (demo)</h2></div></div>
          <div className="event-grid">{initialEvents.map(e => eventCard(e))}</div>
          <p className="muted-note">Prototipo: las fechas de los eventos de demostración son ficticias. Para Reto del Pacífico y Hacktober - MLH no se han proporcionado fechas ni horarios exactos.</p>
        </>}
        {page === 'Marketplace' && <Marketplace />}
        {page === 'Mi perfil' && <><div className="page-head"><span className="eyebrow">TU ESPACIO</span><h1>Mi perfil e intereses</h1><p>Personaliza lo que te gustaría descubrir.</p></div><div className="profile-grid"><section className="panel"><h2>¿Qué te interesa?</h2><p>Selecciona áreas para obtener recomendaciones.</p><div className="tag-row">{unique(initialEvents.map(e => e.area)).filter(x => x !== 'Todos').map(a => <button className={`interest-chip ${interests.includes(a) ? 'selected' : ''}`} key={a} onClick={() => toggle(a, setInterests)}>{interests.includes(a) ? '✓ ' : '+ '}{a}</button>)}</div><h2>Mis actividades</h2><p>Eventos inscritos: <strong>{joined.length}</strong> · Guardados: <strong>{saved.length}</strong></p></section><section className="panel"><h2>Recomendados para ti</h2>{initialEvents.filter(e => interests.includes(e.area)).length ? initialEvents.filter(e => interests.includes(e.area)).map(e => <button className="recommendation" key={e.id} onClick={() => setSelected(e)}>{e.title}<span>Ver →</span></button>) : <p>Elige una o más áreas para recibir recomendaciones basadas en etiquetas.</p>}</section></div></>}

      </main>
      <GemmaChat eventos={[...initialEvents, ...specialEvents]} clubes={clubs} intereses={interests} />
      <footer className="footer">✦ iClub · Conectando comunidades universitarias <span>Prototipo de hackatón · Datos de demostración</span></footer>
      {selectedClub && <div className="modal-backdrop" onClick={() => setSelectedClub(null)}><section className="modal club-detail-modal" role="dialog" aria-modal="true" aria-label={`Detalles de ${selectedClub.name}`} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedClub(null)} aria-label="Cerrar">✕</button><div className="modal-body"><div className="club-detail-icon">{selectedClub.icon}</div><span className="pill purple">{selectedClub.university}</span><h2>{selectedClub.name}</h2><p>{selectedClub.about}</p><div className="detail-list"><div><strong>📅 Fundación</strong><span>{prettyDate(selectedClub.founded)}</span></div><div><strong>👥 Miembros</strong><span>{selectedClub.members} integrantes (demo)</span></div><div><strong>🎓 Facultad de origen</strong><span>{selectedClub.faculty}</span></div><div><strong>✉️ Correo de contacto</strong><span>{selectedClub.email} (ejemplo)</span></div>{selectedClub.phone && <div><strong>📞 Presidente del club</strong><span>{selectedClub.phone} (ficticio, no contactar)</span></div>}{selectedClub.github && <div><strong>💻 GitHub</strong><span>{selectedClub.github.replace('https://github.com/', '@')} (ejemplo)</span></div>}</div><div className="tag-row">{selectedClub.tags.map(t => <span className="pill" key={t}>#{t}</span>)}</div><div className="modal-actions"><button className="primary" onClick={() => toggle(selectedClub.name, setClubRequests)}>{clubRequests.includes(selectedClub.name) ? '✓ Solicitud registrada (demo)' : 'Solicitar ingreso (demo)'}</button><button className="secondary" onClick={() => setSelectedClub(null)}>Cerrar</button></div><p className="muted-note">Datos de fundación, miembros, facultad y contacto ilustrativos; no verificados ni oficiales. Las solicitudes no se envían.</p></div></section></div>}
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-label="Detalles del evento" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Cerrar">✕</button><div className={`modal-image ${selected.id === 101 || selected.id === 102 ? 'modal-image-logo' : ''}`} style={{ backgroundImage: `url('${selected.image}')` }} /><div className="modal-body"><div className="tag-row"><span className="pill purple">{selected.purpose}</span><span className="pill">{selected.access}</span><span className="pill">{selected.mode}</span>{selected.rating && <span className="pill event-rating">★ {selected.rating.toFixed(1)} / 5</span>}</div><h2>{selected.title}</h2><p>{selected.description}</p><div className="detail-list"><div><strong>📅 Fecha</strong><span>{selected.date ? `${prettyDate(selected.date)} · ${selected.time || 'Horario por confirmar'}` : (selected.status || 'Fecha por confirmar')}</span></div><div><strong>📍 Lugar</strong><span>{selected.location}</span></div><div><strong>🎓 Universidad</strong><span>{selected.university}</span></div><div><strong>👥 Organiza</strong><span>{selected.club}</span></div><div><strong>📋 Requisitos</strong><span>{selected.requirements}</span></div>{selected.rating && <div><strong>⭐ Calificación</strong><span>{selected.rating.toFixed(1)} / 5 estrellas</span></div>}<div><strong>🏅 Certificado</strong><span>{selected.certificate ? 'Sí (demo)' : 'No indicado'}</span></div></div><div className="tag-row">{selected.tags.map(t => <span className="pill" key={t}>#{t}</span>)}</div><div className="modal-actions"><button className="primary" disabled={selected.status === 'Pasado'} onClick={() => toggle(selected.id, setJoined)}>{selected.status === 'Pasado' ? 'Evento finalizado' : joined.includes(selected.id) ? '✓ Inscripción registrada' : 'Inscribirme (demo)'}</button>{selected.date && selected.time && selected.end && <button className="secondary" onClick={() => addCalendar(selected)}>📅 Calendario</button>}<button className="secondary" onClick={() => shareEvent(selected)}>↗ Compartir</button></div><p className="muted-note">La inscripción es local y no reserva un cupo real. Confirma siempre la información con el organizador.</p></div></section></div>}
    </div>
  )
}

export default App
