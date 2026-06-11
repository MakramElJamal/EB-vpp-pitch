import fs from 'node:fs'
import path from 'node:path'
import puppeteer from 'puppeteer-core'
import { PDFDocument } from 'pdf-lib'

const URL = process.env.EXPORT_URL || 'http://localhost:4317'
const OUT = process.env.EXPORT_OUT || path.resolve('exports', 'VPP_Jordan_Pitch_Presentation.pdf')
const SHOTS_DIR = path.resolve('exports', 'slides')
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

const VW = 1600
const VH = 900

fs.mkdirSync(SHOTS_DIR, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--force-device-scale-factor=1', '--hide-scrollbars'],
})

const page = await browser.newPage()
await page.setViewport({ width: VW, height: VH, deviceScaleFactor: 1.5 })
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

// Kill smooth scrolling so jumps are instant, and hide the scrollbar
await page.addStyleTag({ content: 'html{scroll-behavior:auto!important} ::-webkit-scrollbar{display:none!important}' })
await page.evaluate(() => document.fonts.ready)
await new Promise((r) => setTimeout(r, 1500))

// Compute every slide's scroll position in document order
const slides = await page.evaluate(() => {
  const vh = window.innerHeight
  const out = []
  const yFor = (el, align) => {
    const r = el.getBoundingClientRect()
    const top = r.top + window.scrollY
    if (align === 'top') return top
    if (align === 'bottom') return top + r.height - vh
    return r.height >= vh * 0.95 ? top : top - (vh - r.height) / 2
  }
  const add = (el, align, label, wait) => {
    if (el) out.push({ y: Math.max(0, Math.round(yFor(el, align))), label, wait })
  }

  add(document.querySelector('#hero'), 'top', 'hero', 4200)

  const money = document.querySelector('.dark-section')
  if (money) {
    add(money, 'top', 'money-counter', 5000)
    add(money.children[1], 'center', 'money-equation', 2500)
  }

  for (const id of ['problem', 'solution', 'traction', 'bizmodel', 'moat']) {
    const sec = document.querySelector('#' + id)
    if (!sec) continue
    add(sec, 'top', id + '-title', 2200)
    sec.querySelectorAll('[data-step]').forEach((s, i) =>
      add(s, 'center', `${id}-step${i + 1}`, 3200))
  }

  const opp = [...document.querySelectorAll('section')]
    .find((s) => s.querySelector('h2')?.textContent.includes('hiding in plain sight'))
  if (opp) {
    add(opp, 'top', 'opportunity-timeline', 3200)
    add(opp, 'bottom', 'opportunity-stat', 3000)
  }

  const askInner = document.querySelector('#ask .max-w-5xl')
  if (askInner) {
    add(document.querySelector('#ask'), 'top', 'ask-header-kpi', 2800)
    add(askInner.children[2], 'center', 'ask-breakeven-chart', 4300)
    add(askInner.children[3], 'center', 'ask-milestones', 2800)
    add(askInner.children[4], 'center', 'ask-unit-econ', 2800)
  }

  const close = document.querySelector('#close')
  if (close) {
    add(close, 'top', 'close-columns', 3400)
    add(close.children[1], 'center', 'close-final', 3000)
  }

  return out.sort((a, b) => a.y - b.y)
})

console.log(`${slides.length} slides`)

const shots = []
for (let i = 0; i < slides.length; i++) {
  const s = slides[i]
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), s.y)
  await new Promise((r) => setTimeout(r, s.wait))
  const file = path.join(SHOTS_DIR, `${String(i + 1).padStart(2, '0')}-${s.label}.png`)
  await page.screenshot({ path: file })
  shots.push(file)
  console.log(`  ${i + 1}/${slides.length}  ${s.label} @ y=${s.y}`)
}

await browser.close()

const pdf = await PDFDocument.create()
for (const file of shots) {
  const img = await pdf.embedPng(fs.readFileSync(file))
  const p = pdf.addPage([VW, VH])
  p.drawImage(img, { x: 0, y: 0, width: VW, height: VH })
}
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, await pdf.save())
console.log(`PDF written: ${OUT} (${slides.length} pages)`)
