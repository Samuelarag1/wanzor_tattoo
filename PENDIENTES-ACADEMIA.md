# Pendientes de decisión — Academia Wanzor

Checklist de todo lo que falta que definas/completes vos para que la Fase 1
(mockeada con contenido de ejemplo) se convierta en la web real. Mientras
completás esto, seguimos avanzando con el código en paralelo.

Referencia: plan técnico completo en `C:\Users\Samuel\.claude\plans\hashed-noodling-dolphin.md`.

## 1. Cuentas y credenciales

- [ ] **Postgres**: instalar Docker o crear proyecto en Neon/Vercel Postgres → `DATABASE_URI`
- [ ] **Mercado Pago**: cuenta de vendedor + Access Token/Public Key de prueba → `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY`
- [ ] **Resend**: cuenta + verificar dominio `wanzortatt.com` → `RESEND_API_KEY`
- [ ] **Bunny Stream**: cuenta para video protegido (ver decisión 3.1) → `BUNNY_STREAM_LIBRARY_ID`, `BUNNY_STREAM_API_KEY`
- [ ] **Vercel Blob**: habilitar en el proyecto de Vercel → `BLOB_READ_WRITE_TOKEN`

## 2. Precios y moneda

> Hoy todas las tarjetas, el checkout y el total muestran "Próximamente".
> Es lo más visible que falta: con los 4 precios se cargan en un minuto
> (`mockProducts` en `lib/mock/academia.ts`).

- [ ] Precio Nivel Principiante: ______
- [ ] Precio Nivel Intermedio: ______
- [ ] Precio Nivel Profesional: ______
- [ ] Precio Academia Completa: ______
- [ ] Moneda: ☐ ARS ☐ USD ☐ ambas

## 3. Decisiones de producto

- [ ] **3.1 Video**: ¿Bunny Stream desde el arranque (protegido, costo recurrente chico) o algo más simple para el MVP?
- [ ] **3.2 Cuotas sin interés** vía Mercado Pago: ☐ sí ☐ no
- [ ] **3.3 Política de reembolso/garantía** (texto para la FAQ)
- [ ] **3.4 Términos y condiciones + política de privacidad** (falta redactar/conseguir; procesamos pagos y datos de alumnos)
- [ ] **3.5 ¿Los niveles son correlativos?** (¿se puede comprar Profesional sin tener Intermedio?)

## 4. Contenido de cada nivel (copy de venta real)

Para **Principiante**, **Intermedio** y **Profesional**, reemplazar el mock
de `lib/mock/academia.ts` con:

- [ ] Resultado (qué vas a conseguir)
- [ ] Para quién es
- [ ] Qué incluye
- [ ] Cómo funciona
- [ ] FAQ del nivel (preguntas + respuestas reales)

## 5. Temario real

- [ ] Módulos y lecciones de cada nivel (nombres + orden)
- [ ] Videos grabados (o fecha estimada de grabación)
- [ ] PDFs/recursos descargables por lección

## 6. Copy general del sitio (hoy sigue hablando de mentoría 1 a 1)

- [ ] `lib/site.ts`: `description`, `keywords`, `seoFaqs`, `seoTopics`
- [ ] `components/structured-data.tsx`: schema.org todavía describe "Mentoría para tatuadores"
- [ ] `components/about-section.tsx` (ahora vive en `/mi-historia`): ¿se mantiene tal cual o se reescribe para la Academia?
- [ ] `components/cta-section.tsx` (ahora vive en `/contacto`): hoy dice "Reservá tu llamada" — no encaja con la Academia
- [ ] Decidir destino de las secciones que quedaron fuera de la Home: `pain-points-section`, `seo-content-section`, `manifesto-section`, `testimonials-section`, `faq-section` — no se borraron, solo no se están renderizando
- [ ] `/portafolio`: hoy muestra 1 trabajo (realismo) + 3 fotos de estudio y linkea a Instagram. Faltan más fotos de tatuajes terminados para ampliar la galería

## 7. Lo que es demostración (sin backend todavía)

Estas pantallas funcionan y se pueden clickear, pero simulan: llevan una
marca discreta "Vista demo" / "Alumno de ejemplo".

- Checkout → pago aprobado → email de acceso → login → Mi Academia (no cobra ni crea cuentas: eso es Fase 3, Mercado Pago + webhook)
- Mi Academia y el reproductor: alumna de ejemplo (Lucía Paz) con Principiante comprado y 2 lecciones vistas
- `/gestion`: alumnos y ventas de ejemplo; lo que se agrega en Contenido no se guarda. El panel real es el `/admin` de Payload (Fase 0, falta la base de datos)
- Los videos son una imagen fija con controles reales; el video real va con Bunny Stream (Fase 4)

## Cómo se usa esto

Marcá los checkboxes o completá los `______` directamente en este archivo a
medida que vayas decidiendo, y avisame — no hace falta que esté todo
completo de una vez.
