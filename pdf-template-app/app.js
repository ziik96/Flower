// Template definitions
const templates = [
  {
    id: 'sale-contract',
    name: 'Договор купли-продажи',
    description: 'Шаблон простого договора купли-продажи между двумя сторонами.',
    fields: [
      { key: 'sellerName', label: 'ФИО продавца', type: 'text', required: true },
      { key: 'buyerName', label: 'ФИО покупателя', type: 'text', required: true },
      { key: 'item', label: 'Предмет договора (что продаётся)', type: 'text', required: true },
      { key: 'price', label: 'Цена (в рублях)', type: 'number', required: true },
      { key: 'date', label: 'Дата заключения', type: 'date', required: true },
      { key: 'place', label: 'Место заключения', type: 'text', required: true },
    ],
    makeDoc: (data) => {
      const priceText = `${Number(data.price).toLocaleString('ru-RU')} ₽`;
      return {
        content: [
          { text: 'ДОГОВОР КУПЛИ-ПРОДАЖИ', style: 'title' },
          { text: `\nГород ${data.place}, дата: ${formatDate(data.date)}\n\n` },
          {
            text:
              `Гражданин(ка) ${data.sellerName} (далее — «Продавец»), с одной стороны, ` +
              `и гражданин(ка) ${data.buyerName} (далее — «Покупатель»), с другой стороны, ` +
              `заключили настоящий договор о нижеследующем:`,
          },
          { text: '\n1. Предмет договора', style: 'subtitle' },
          { text: `1.1. Продавец продаёт, а Покупатель покупает: ${data.item}.` },
          { text: `1.2. Цена товара составляет: ${priceText}.` },
          { text: '\n2. Порядок расчётов', style: 'subtitle' },
          { text: '2.1. Оплата производится единовременно при подписании договора.' },
          { text: '\n3. Подписи сторон', style: 'subtitle' },
          {
            columns: [
              { width: '*', text: `Продавец: ${data.sellerName}\nПодпись: __________` },
              { width: '*', text: `Покупатель: ${data.buyerName}\nПодпись: __________`, alignment: 'right' },
            ],
            margin: [0, 12, 0, 0],
          },
        ],
        styles: defaultStyles,
        defaultStyle: { font: 'Roboto' },
        pageMargins: [40, 60, 40, 60],
      };
    },
  },
  {
    id: 'resume',
    name: 'Резюме',
    description: 'Краткое резюме кандидата.',
    fields: [
      { key: 'fullName', label: 'ФИО', type: 'text', required: true },
      { key: 'position', label: 'Желаемая позиция', type: 'text', required: true },
      { key: 'phone', label: 'Телефон', type: 'tel', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'skills', label: 'Навыки (через запятую)', type: 'textarea', required: true },
      { key: 'experience', label: 'Опыт (кратко)', type: 'textarea', required: true },
      { key: 'education', label: 'Образование (кратко)', type: 'textarea', required: true },
    ],
    makeDoc: (data) => {
      const skillsList = data.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      return {
        content: [
          { text: data.fullName, style: 'title' },
          { text: data.position, style: 'subtitle' },
          {
            columns: [
              { text: `Тел: ${data.phone}` },
              { text: `Email: ${data.email}`, alignment: 'right' },
            ],
            margin: [0, 6, 0, 12],
          },
          { text: 'Навыки', style: 'section' },
          { ul: skillsList, margin: [0, 2, 0, 8] },
          { text: 'Опыт', style: 'section' },
          { text: data.experience, margin: [0, 2, 0, 8] },
          { text: 'Образование', style: 'section' },
          { text: data.education },
        ],
        styles: defaultStyles,
        defaultStyle: { font: 'Roboto' },
        pageMargins: [40, 40, 40, 40],
      };
    },
  },
  {
    id: 'thank-you-letter',
    name: 'Благодарственное письмо',
    description: 'Небольшое письмо с благодарностью.',
    fields: [
      { key: 'recipient', label: 'Кому (ФИО/организация)', type: 'text', required: true },
      { key: 'message', label: 'Текст благодарности', type: 'textarea', required: true },
      { key: 'sender', label: 'От кого (ФИО/организация)', type: 'text', required: true },
      { key: 'date', label: 'Дата', type: 'date', required: true },
    ],
    makeDoc: (data) => ({
      content: [
        { text: `Уважаемый(ая) ${data.recipient}!`, style: 'subtitle' },
        { text: data.message, margin: [0, 12, 0, 12] },
        { text: `С уважением, ${data.sender}` },
        { text: `\n${formatDate(data.date)}`, alignment: 'right' },
      ],
      styles: defaultStyles,
      defaultStyle: { font: 'Roboto' },
    }),
  },
];

const defaultStyles = {
  title: { fontSize: 18, bold: true, margin: [0, 0, 0, 8] },
  subtitle: { fontSize: 12, bold: true, margin: [0, 8, 0, 8] },
  section: { fontSize: 12, bold: true, margin: [0, 10, 0, 4] },
};

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU');
  } catch (_) {
    return String(dateStr || '');
  }
}

// UI Elements
const templateSelect = document.getElementById('templateSelect');
const templateDescription = document.getElementById('templateDescription');
const dynamicForm = document.getElementById('dynamicForm');
const generateBtn = document.getElementById('generateBtn');
const statusEl = document.getElementById('status');

init();

function init() {
  // populate select
  templateSelect.innerHTML = [
    '<option value="" disabled selected>— Выберите шаблон —</option>',
    ...templates.map((t) => `<option value="${t.id}">${t.name}</option>`),
  ].join('');

  templateSelect.addEventListener('change', onTemplateChange);
  generateBtn.addEventListener('click', onGenerateClick);
}

function onTemplateChange() {
  const template = getSelectedTemplate();
  generateBtn.disabled = !template;
  status('');
  if (!template) {
    templateDescription.textContent = '';
    dynamicForm.innerHTML = '';
    return;
  }

  templateDescription.textContent = template.description || '';
  renderForm(template.fields);
}

function renderForm(fields) {
  dynamicForm.innerHTML = '';

  fields.forEach((field) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'field';

    const label = document.createElement('label');
    label.textContent = field.label + (field.required ? ' *' : '');
    label.setAttribute('for', field.key);

    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.className = 'textarea';
      input.rows = 4;
    } else {
      input = document.createElement('input');
      input.type = field.type || 'text';
      input.className = 'input';
    }
    input.id = field.key;
    input.name = field.key;
    if (field.required) input.required = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    if (field.hint) {
      const hint = document.createElement('div');
      hint.className = 'hint';
      hint.textContent = field.hint;
      wrapper.appendChild(hint);
    }

    dynamicForm.appendChild(wrapper);
  });
}

function collectFormData() {
  const formData = new FormData(dynamicForm);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

function validateForm() {
  const invalid = [];
  for (const el of dynamicForm.elements) {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      if (el.required && !String(el.value).trim()) {
        invalid.push(el.name || el.id);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
        break;
      }
    }
  }
  return invalid.length === 0;
}

function onGenerateClick(e) {
  e.preventDefault();
  const template = getSelectedTemplate();
  if (!template) return;

  if (!validateForm()) {
    status('Заполните обязательные поля (отмечены *).');
    return;
  }

  const data = collectFormData();

  try {
    status('Генерация PDF...');
    const docDefinition = template.makeDoc(data);
    const fileName = `${template.name.replace(/\s+/g, '_')}.pdf`;
    pdfMake.createPdf(docDefinition).download(fileName, () => {
      status('Готово. Файл загружается.');
    });
  } catch (err) {
    console.error(err);
    status('Ошибка генерации PDF. Проверьте введённые данные.');
  }
}

function status(msg) {
  statusEl.textContent = msg || '';
}

function getSelectedTemplate() {
  const id = templateSelect.value;
  return templates.find((t) => t.id === id);
}