import img_proto from './assets/marketplace/proto.jpg'
import img_patch from './assets/marketplace/patch.jpg'
import img_sold from './assets/marketplace/sold.jpg'
import img_pcb from './assets/marketplace/pcb.jpg'
import img_3d from './assets/marketplace/3d.jpg'
import img_ases from './assets/marketplace/ases.jpg'
import img_win from './assets/marketplace/win.jpg'
import img_polito from './assets/marketplace/polito.jpg'
import img_semillas from './assets/marketplace/semillas.jpg'
import { useMemo, useState } from 'react'

const products = [
  { id: 'proto', image: img_proto, club: 'Club de Robótica', icon: '🔌', name: 'Protoboard mediano', category: 'Componentes', price: 7, unit: 'unidad', desc: 'Placa de pruebas para prototipado electrónico sin soldadura.' },
  { id: 'patch', image: img_patch, club: 'Club de Robótica', icon: '🧵', name: 'Patches / jumpers', category: 'Componentes', price: 0.02, unit: 'unidad', desc: 'Patches para conexiones y proyectos. Confirma las especificaciones con el club.' },
  { id: 'sold', image: img_sold, club: 'Club de Robótica', icon: '🛠️', name: 'Servicio de soldadura', category: 'Servicios', price: 0.10, unit: 'punto', desc: 'Soldadura de componentes electrónicos; el precio se calcula por punto.' },
  { id: 'pcb', image: img_pcb, club: 'Club de Robótica', icon: '🧩', name: 'Fabricación de PCB', category: 'Servicios', price: null, unit: '', desc: 'Fabricación de placas de circuito impreso según diseño, cantidad y características.' },
  { id: '3d', image: img_3d, club: 'Club de Robótica', icon: '🖨️', name: 'Impresión 3D', category: 'Servicios', price: null, unit: '', desc: 'Impresiones personalizadas; el precio depende del material, peso, tamaño y tiempo de impresión.', materials: ['PLA', 'ABS', 'PETG', 'TPU', 'Otro'] },
  { id: 'ases', image: img_ases, club: 'Club de Emprendimiento', icon: '💡', name: 'Asesoría de emprendimiento', category: 'Asesorías', price: 10, unit: 'hora', desc: 'Orientación para desarrollar y validar ideas de negocio.' },
  { id: 'win', image: img_win, club: 'Club de Programación', icon: '💻', name: 'Clave de Windows', category: 'Software', price: 5.67, unit: 'clave', desc: 'Oferta demostrativa. Verifica que la licencia sea auténtica, válida y transferible antes de comprar.' },
  { id: 'polito', image: img_polito, club: 'Club de Impacto Social', icon: '🐧', name: 'Llavero de Polito', category: 'Artículos', price: 2.50, unit: 'unidad', desc: 'Llavero inspirado en Polito, mascota de ESPOL. Artículo de demostración, sin afiliación oficial confirmada.' },
  { id: 'semillas', image: img_semillas, club: 'Club de Impacto Social', icon: '🌱', name: 'Semillas de tomate', category: 'Artículos', price: 1, unit: 'paquete', desc: 'Semillas para comenzar un pequeño cultivo. Consulta cantidad y variedad.' },
]
const clubs = ['Todos los clubes', ...new Set(products.map(p => p.club))]
const money = n => `$${n.toFixed(2)}`

export default function Marketplace() {
  const [club, setClub] = useState('Todos los clubes')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [quote, setQuote] = useState(null)
  const [material, setMaterial] = useState('PLA')
  const [details, setDetails] = useState('')
  const [notice, setNotice] = useState('')
  const visible = useMemo(() => products.filter(p => (club === 'Todos los clubes' || p.club === club) && `${p.name} ${p.club} ${p.desc}`.toLowerCase().includes(search.toLowerCase())), [club, search])
  const cartItems = products.filter(p => cart[p.id] > 0 && p.price !== null)
  const total = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0)
  const count = cartItems.reduce((sum, p) => sum + cart[p.id], 0)
  const changeQty = (id, diff) => setCart(old => ({ ...old, [id]: Math.max(0, Math.min(9999, (old[id] || 0) + diff)) }))
  const openQuote = p => { setQuote(p); setMaterial('PLA'); setDetails(''); setNotice('') }
  const sendQuote = e => { e.preventDefault(); setNotice(`Solicitud de cotización preparada para ${quote.name}${quote.materials ? ` (${material})` : ''}. Esta es una demostración: aún no se envía al club.`) }

  return <section className="market-page">
    <div className="market-hero"><div><span className="eyebrow">✦ COMUNIDAD QUE CREA</span><h1>Marketplace <span>iClub</span></h1><p>Productos, servicios y proyectos ofrecidos por clubes universitarios.</p></div><div className="market-hero-icon" aria-hidden="true">🛍️</div></div>
    <div className="demo-notice">ℹ️ Marketplace de demostración: los productos, precios y ofertas no están verificados. No se procesan pagos ni se envían pedidos reales.</div>
    <div className="market-controls"><label>Buscar productos y servicios<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Ej. protoboard, impresión 3D..." /></label><label>Club vendedor<select value={club} onChange={e => setClub(e.target.value)}>{clubs.map(c => <option key={c}>{c}</option>)}</select></label></div>
    <div className="market-layout"><div className="market-grid">{visible.map(p => <article className="market-card" key={p.id}><div className="market-product-art"><img src={p.image} alt={`Imagen ilustrativa de ${p.name}`} loading="lazy" /><span className="market-category">{p.category}</span></div><div className="market-card-body"><div className="market-seller">{p.club}</div><h2>{p.name}</h2><p>{p.desc}</p><div className="market-card-bottom"><div><strong>{p.price === null ? 'A cotizar' : money(p.price)}</strong>{p.price !== null && <small> / {p.unit}</small>}</div>{p.price === null ? <button className="primary" onClick={() => openQuote(p)}>Cotizar ↗</button> : <button className="primary" onClick={() => changeQty(p.id, 1)}>+ Agregar</button>}</div></div></article>)}{visible.length === 0 && <div className="empty-state">No se encontraron productos con esos filtros.</div>}</div>
    <aside className="market-cart"><div className="market-cart-head"><h2>🛒 Mi pedido</h2><span>{count} artículos</span></div>{cartItems.length === 0 ? <p className="market-empty">Agrega productos para calcular el total de tu pedido.</p> : <div className="market-cart-list">{cartItems.map(p => <div className="market-cart-line" key={p.id}><div><strong>{p.name}</strong><small>{money(p.price)} / {p.unit}</small></div><div className="market-qty"><button aria-label={`Quitar uno de ${p.name}`} onClick={() => changeQty(p.id, -1)}>−</button><span>{cart[p.id]}</span><button aria-label={`Añadir uno de ${p.name}`} onClick={() => changeQty(p.id, 1)}>+</button></div><b>{money(p.price * cart[p.id])}</b></div>)}</div>}<div className="market-total"><span>Total estimado</span><strong>{money(total)}</strong></div><button className="market-order" disabled={!count} onClick={() => setNotice('Pedido preparado (demo). Todavía no hay pagos ni envío de solicitudes a los clubes.')}>Preparar pedido</button><p className="market-disclaimer">No incluye cotizaciones de PCB o impresión 3D. Sin pagos reales.</p>{notice && !quote && <p className="market-notice" role="status">{notice}</p>}</aside></div>
    {quote && <div className="modal-backdrop" onClick={() => setQuote(null)}><section className="market-quote-modal" role="dialog" aria-modal="true" aria-label={`Cotizar ${quote.name}`} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setQuote(null)} aria-label="Cerrar cotización">✕</button><span className="eyebrow">SOLICITAR COTIZACIÓN</span><h2>{quote.name}</h2><p>{quote.desc}</p><form onSubmit={sendQuote}>{quote.materials && <label>Material<select value={material} onChange={e => setMaterial(e.target.value)}>{quote.materials.map(m => <option key={m}>{m}</option>)}</select></label>}<label>Detalles de tu proyecto<textarea required minLength={10} maxLength={1000} value={details} onChange={e => setDetails(e.target.value)} placeholder={quote.id === 'pcb' ? 'Cantidad, dimensiones, capas y archivos de diseño...' : 'Medidas, cantidad, peso estimado, acabado y detalles de la pieza...'} rows={4}/></label><button className="primary" type="submit">Preparar solicitud</button></form>{notice && <p className="market-notice" role="status">{notice}</p>}</section></div>}
  </section>
}
