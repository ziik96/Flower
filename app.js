// Конфигурация шаблонов
const documentTemplates = [
  {
    id: "sale_contract",
    name: "Договор купли-продажи",
    fileName: (data) => `Договор_купли-продажи_${slugify(data.item_description || "товар")}.pdf`,
    fields: [
      { name: "city", label: "Город", type: "text", grid: 6, required: true },
      { name: "date", label: "Дата", type: "date", grid: 6, required: true },
      { name: "seller_name", label: "Продавец (ФИО)", type: "text", grid: 6, required: true },
      { name: "buyer_name", label: "Покупатель (ФИО)", type: "text", grid: 6, required: true },
      { name: "item_description", label: "Описание предмета сделки", type: "text", grid: 12, required: true },
      { name: "price", label: "Цена (в руб.)", type: "number", grid: 6, required: true },
      { name: "additional_terms", label: "Дополнительные условия", type: "textarea", grid: 12, required: false },
    ],
    buildHtml: (data) => {
      const date = formatDateRu(data.date);
      return `
        <div class="page">
          <div class="document">
            <h1>ДОГОВОР КУПЛИ-ПРОДАЖИ</h1>
            <div class="row"><p>${escapeHtml(data.city)}</p><p>«${date.day}» ${date.monthText} ${date.year} г.</p></div>
            <p>Гражданин(ка) ${escapeHtml(data.seller_name)}, именуемый(ая) в дальнейшем «Продавец», с одной стороны, и гражданин(ка) ${escapeHtml(data.buyer_name)}, именуемый(ая) в дальнейшем «Покупатель», с другой стороны, совместно именуемые «Стороны», заключили настоящий договор о нижеследующем:</p>
            <h2>1. Предмет договора</h2>
            <p>1.1. Продавец обязуется передать в собственность Покупателя, а Покупатель обязуется принять и оплатить следующий товар: ${escapeHtml(data.item_description)}.</p>
            <h2>2. Цена и порядок расчетов</h2>
            <p>2.1. Цена товара составляет ${formatCurrency(data.price)} (₽).</p>
            <p>2.2. Оплата производится в полном объеме до/в момент передачи товара.</p>
            ${data.additional_terms ? `<h2>3. Дополнительные условия</h2><p class="pre">${escapeHtml(data.additional_terms)}</p>` : ""}
            <h2>Подписи сторон</h2>
            <div class="signature"><p>Продавец: _____________ / ${escapeHtml(data.seller_name)}</p><p>Покупатель: _____________ / ${escapeHtml(data.buyer_name)}</p></div>
          </div>
        </div>
      `;
    },
  },
  {
    id: "resume",
    name: "Резюме",
    fileName: (data) => `Резюме_${slugify(data.full_name || "кандидат")}.pdf`,
    fields: [
      { name: "full_name", label: "ФИО", type: "text", grid: 12, required: true },
      { name: "position", label: "Желаемая позиция", type: "text", grid: 12, required: true },
      { name: "phone", label: "Телефон", type: "text", grid: 6, required: true },
      { name: "email", label: "Email", type: "email", grid: 6, required: true },
      { name: "summary", label: "Краткое summary", type: "textarea", grid: 12, required: false },
      { name: "skills", label: "Навыки (через запятую)", type: "text", grid: 12, required: false },
      { name: "experience", label: "Опыт (свободная форма)", type: "textarea", grid: 12, required: false },
    ],
    buildHtml: (data) => {
      const skills = (data.skills || "").split(",").map(s => s.trim()).filter(Boolean);
      return `
        <div class="page">
          <div class="document">
            <h1>${escapeHtml(data.full_name)}</h1>
            <p class="muted">${escapeHtml(data.position)}</p>
            <p><strong>Контакты:</strong> ${escapeHtml(data.phone)} · ${escapeHtml(data.email)}</p>
            ${data.summary ? `<h2>О себе</h2><p class="pre">${escapeHtml(data.summary)}</p>` : ""}
            ${skills.length ? `<h2>Навыки</h2><p>${skills.map(s => `<span>${escapeHtml(s)}</span>`).join(", ")}</p>` : ""}
            ${data.experience ? `<h2>Опыт</h2><p class="pre">${escapeHtml(data.experience)}</p>` : ""}
          </div>
        </div>
      `;
    },
  },
  {
    id: "thank_you",
    name: "Благодарственное письмо",
    fileName: (data) => `Благодарность_${slugify(data.recipient_name || "адресат")}.pdf`,
    fields: [
      { name: "recipient_name", label: "Кому (ФИО/организация)", type: "text", grid: 12, required: true },
      { name: "sender_name", label: "От кого (ФИО/организация)", type: "text", grid: 12, required: true },
      { name: "occasion", label: "Повод/тема", type: "text", grid: 12, required: false },
      { name: "message", label: "Текст благодарности", type: "textarea", grid: 12, required: true },
      { name: "date", label: "Дата", type: "date", grid: 6, required: true },
      { name: "city", label: "Город", type: "text", grid: 6, required: false },
    ],
    buildHtml: (data) => {
      const date = formatDateRu(data.date);
      return `
        <div class="page">
          <div class="document">
            <h1>Благодарственное письмо</h1>
            <p>Уважаемый(ая) ${escapeHtml(data.recipient_name)}${data.occasion ? `, по поводу: ${escapeHtml(data.occasion)}` : ""}!</p>
            <p class="pre">${escapeHtml(data.message)}</p>
            <div class="signature">
              <p>${escapeHtml(data.city || "")}</p>
              <p>«${date.day}» ${date.monthText} ${date.year} г.</p>
            </div>
            <div class="signature">
              <p>С уважением,</p>
              <p>${escapeHtml(data.sender_name)}</p>
            </div>
          </div>
        </div>
      `;
    },
  },
];

// DOM элементы
const templateSelectEl = document.getElementById("template-select");
const formEl = document.getElementById("dynamic-form");
const generateBtnEl = document.getElementById("generate-btn");
const printAreaEl = document.getElementById("print-area");

// Инициализация
initTemplateOptions();
attachEventListeners();

function initTemplateOptions() {
  for (const template of documentTemplates) {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = template.name;
    templateSelectEl.appendChild(option);
  }
}

function attachEventListeners() {
  templateSelectEl.addEventListener("change", handleTemplateChange);
  generateBtnEl.addEventListener("click", handleGenerateClick);
}

function handleTemplateChange() {
  const template = getSelectedTemplate();
  formEl.innerHTML = "";
  if (!template) {
    generateBtnEl.disabled = true;
    return;
  }
  for (const field of template.fields) {
    formEl.appendChild(createFieldElement(field));
  }
  generateBtnEl.disabled = false;
}

async function handleGenerateClick(event) {
  event.preventDefault();
  const template = getSelectedTemplate();
  if (!template) return;

  const formData = collectFormData(template.fields);
  const validationError = validateFormData(template.fields, formData);
  if (validationError) {
    alert(validationError);
    return;
  }

  // Построить HTML для печати
  const html = template.buildHtml(formData);
  printAreaEl.innerHTML = html;

  // Дождаться подгрузки шрифтов и раскладки
  await ensureReadyForPrint();

  // Генерация PDF
  const fileName = safeFileName(template.fileName(formData) || `${template.name}.pdf`);
  generatePdfFromElement(printAreaEl, fileName);
}

function getSelectedTemplate() {
  const selectedId = templateSelectEl.value;
  return documentTemplates.find(t => t.id === selectedId);
}

function createFieldElement(field) {
  const wrapper = document.createElement("div");
  wrapper.className = "field-group";
  wrapper.style.gridColumn = `span ${clampGrid(field.grid ?? 12)}`;

  const label = document.createElement("label");
  label.htmlFor = `field_${field.name}`;
  label.textContent = field.label;

  let input;
  if (field.type === "textarea") {
    input = document.createElement("textarea");
    input.className = "textarea";
    input.rows = 4;
  } else {
    input = document.createElement("input");
    input.type = field.type || "text";
    input.className = "input";
  }
  input.id = `field_${field.name}`;
  input.name = field.name;
  if (field.required) input.required = true;

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  return wrapper;
}

function collectFormData(fields) {
  const data = {};
  for (const field of fields) {
    const el = formEl.querySelector(`[name="${CSS.escape(field.name)}"]`);
    if (!el) continue;
    let value = (el.value || "").toString().trim();
    if (field.type === "number") {
      value = value ? Number(value) : "";
    }
    data[field.name] = value;
  }
  return data;
}

function validateFormData(fields, data) {
  for (const field of fields) {
    if (field.required) {
      const value = data[field.name];
      const isEmpty = value === undefined || value === null || value === "";
      if (isEmpty) {
        return `Заполните обязательное поле: "${field.label}"`;
      }
    }
  }
  return null;
}

function generatePdfFromElement(containerEl, fileName) {
  const pageEl = containerEl.querySelector(".page");
  if (!pageEl) return;

  const opt = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: Math.max(2, Math.ceil(window.devicePixelRatio || 1)), useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  html2pdf().from(pageEl).set(opt).save();
}

// Вспомогательные функции
async function ensureReadyForPrint() {
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  } catch (_) {}
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 30));
}

function formatDateRu(value) {
  if (!value) {
    const d = new Date();
    return { day: String(d.getDate()).padStart(2, "0"), monthText: monthToText(d.getMonth()), year: String(d.getFullYear()) };
  }
  const d = new Date(value);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    monthText: monthToText(d.getMonth()),
    year: String(d.getFullYear()),
  };
}

function monthToText(monthIndex) {
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return months[monthIndex] || "";
}

function formatCurrency(value) {
  if (value === "" || value === null || value === undefined || isNaN(Number(value))) return "";
  return new Intl.NumberFormat("ru-RU").format(Number(value));
}

function clampGrid(n) { return Math.min(12, Math.max(1, Number(n) || 12)); }

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function slugify(str) {
  return String(str || "").toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-zа-я0-9_\-]+/gi, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function safeFileName(name) {
  return name.replace(/[\\/:*?"<>|]+/g, "_");
}