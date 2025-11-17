const API_URL = '/items';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('App inicializado');

  // Renderização dinâmica dos cards e carrossel a partir da API
  const [cardsContainer, carouselContainer] = [
    document.getElementById('cards-container'),
    document.getElementById('carousel-container')
  ];
  if (cardsContainer || carouselContainer) {
    const items = await fetchItems();
    if (cardsContainer) renderHomeCards(items, cardsContainer);
    if (carouselContainer) renderHighlightsCarousel(items, carouselContainer);
  }

  // Seção do autor
  const authorContainer = document.getElementById('autor-container');
  if (authorContainer) {
    renderAuthorSection(authorContainer);
  }

  // Renderização da página de detalhes quando aplicável
  const detailsContainer = document.getElementById('detalhes-container');
  if (detailsContainer) {
    await renderDetailsPage(detailsContainer);
  }

  // CRUD (seção administrativa)
  setupCrudSection();
});

async function fetchItems() {
  const response = await fetch(API_URL);
  if (!response.ok) return [];
  return await response.json();
}

async function fetchItemById(id) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`);
  if (!response.ok) return null;
  return await response.json();
}

async function createItem(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erro ao criar item');
  return await response.json();
}

async function updateItem(id, data) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Erro ao atualizar item');
  return await response.json();
}

async function deleteItem(id) {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erro ao excluir item');
}

function renderHomeCards(items, container) {
  if (!Array.isArray(items)) return;
  container.innerHTML = '';

  items.forEach((item) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm border-0';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.className = 'card-img-top';
    img.style.height = '200px';
    img.style.objectFit = 'cover';

    const body = document.createElement('div');
    body.className = 'card-body';

    const h5 = document.createElement('h5');
    h5.className = 'card-title text-primary';
    h5.textContent = item.title;

    const p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = item.description;

    const link = document.createElement('a');
    link.href = `detalhes.html?id=${encodeURIComponent(item.id)}`;
    link.className = 'btn btn-outline-primary';
    link.textContent = 'Ver detalhes';

    body.appendChild(h5);
    body.appendChild(p);
    body.appendChild(link);

    card.appendChild(img);
    card.appendChild(body);

    col.appendChild(card);
    container.appendChild(col);
  });
}

function renderHighlightsCarousel(items, container) {
  if (!Array.isArray(items) || items.length === 0) return;

  const id = 'carouselDestaques';

  container.innerHTML = '';

  const carousel = document.createElement('div');
  carousel.id = id;
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-bs-ride', 'carousel');

  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  const inner = document.createElement('div');
  inner.className = 'carousel-inner rounded shadow';

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', `#${id}`);
    button.setAttribute('data-bs-slide-to', String(index));
    if (index === 0) button.className = 'active';
    button.setAttribute('aria-label', `Slide ${index + 1}`);
    indicators.appendChild(button);

    const slide = document.createElement('div');
    slide.className = `carousel-item${index === 0 ? ' active' : ''}`;

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.className = 'd-block w-100';
    img.style.height = '420px';
    img.style.objectFit = 'cover';

    const caption = document.createElement('div');
    caption.className = 'carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3';
    const h5 = document.createElement('h5');
    h5.textContent = item.title;
    const p = document.createElement('p');
    p.textContent = item.description || '';
    const link = document.createElement('a');
    link.href = `detalhes.html?id=${encodeURIComponent(item.id)}`;
    link.className = 'btn btn-warning btn-sm';
    link.textContent = 'Ver detalhes';
    caption.appendChild(h5);
    caption.appendChild(p);
    caption.appendChild(link);

    slide.appendChild(img);
    slide.appendChild(caption);
    inner.appendChild(slide);
  });

  const prev = document.createElement('button');
  prev.className = 'carousel-control-prev';
  prev.type = 'button';
  prev.setAttribute('data-bs-target', `#${id}`);
  prev.setAttribute('data-bs-slide', 'prev');
  prev.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span>';

  const next = document.createElement('button');
  next.className = 'carousel-control-next';
  next.type = 'button';
  next.setAttribute('data-bs-target', `#${id}`);
  next.setAttribute('data-bs-slide', 'next');
  next.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Próximo</span>';

  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.appendChild(prev);
  carousel.appendChild(next);

  container.appendChild(carousel);
}

function renderAuthorSection(container) {
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card border-0 shadow';
  const body = document.createElement('div');
  body.className = 'card-body';
  const h3 = document.createElement('h3');
  h3.className = 'fw-bold text-primary mb-3';
  h3.textContent = 'Sobre o Autor';
  const p = document.createElement('p');
  p.className = 'mb-2';
  p.textContent = 'Trabalho acadêmico desenvolvido por Luan Costa. Projeto base para a próxima etapa com consumo de APIs e funcionalidades avançadas.';
  const list = document.createElement('ul');
  list.className = 'mb-0';
  const li1 = document.createElement('li'); li1.textContent = 'Curso: Programação Web';
  const li2 = document.createElement('li'); li2.textContent = 'Semestre: 2025/2';
  const li3 = document.createElement('li'); li3.textContent = 'Contato: luan@example.com';
  list.appendChild(li1); list.appendChild(li2); list.appendChild(li3);
  body.appendChild(h3);
  body.appendChild(p);
  body.appendChild(list);
  card.appendChild(body);
  container.appendChild(card);
}

async function renderDetailsPage(container) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = '<div class="alert alert-warning" role="alert">Nenhum item informado na URL.</div>';
    return;
  }

  const item = await fetchItemById(id);
  if (!item) {
    container.innerHTML = '<div class="alert alert-danger" role="alert">Item não encontrado.</div>';
    return;
  }

  container.innerHTML = '';

  const colImg = document.createElement('div');
  colImg.className = 'col-lg-6';
  const imgEl = document.createElement('img');
  imgEl.src = item.image || '';
  imgEl.alt = item.title || '';
  imgEl.className = 'img-fluid rounded shadow';
  colImg.appendChild(imgEl);

  const colText = document.createElement('div');
  colText.className = 'col-lg-6 d-flex align-items-center';
  const content = document.createElement('div');
  const h1 = document.createElement('h2');
  h1.className = 'fw-bold text-primary mb-3';
  h1.textContent = item.title || '';
  const p = document.createElement('p');
  p.className = 'lead';
  p.textContent = item.description || '';

  const detailsList = document.createElement('ul');
  detailsList.className = 'list-unstyled mt-3';
  const d1 = document.createElement('li'); d1.innerHTML = `<strong>Dificuldade:</strong> ${item.difficulty || '-'}`;
  const d2 = document.createElement('li'); d2.innerHTML = `<strong>Distância:</strong> ${item.distanceKm ?? '-'} km`;
  const durationMin = Number(item.durationMin || 0);
  const d3 = document.createElement('li'); d3.innerHTML = `<strong>Duração:</strong> ${Math.floor(durationMin/60)}h ${durationMin%60}min`;
  const d4 = document.createElement('li'); d4.innerHTML = `<strong>Melhor época:</strong> ${item.bestSeason || '-'}`;
  const d5 = document.createElement('li'); d5.innerHTML = `<strong>Localização:</strong> ${item.location || '-'}`;
  detailsList.appendChild(d1); detailsList.appendChild(d2); detailsList.appendChild(d3); detailsList.appendChild(d4); detailsList.appendChild(d5);

  const back = document.createElement('a');
  back.href = 'index.html';
  back.className = 'btn btn-outline-secondary mt-3';
  back.textContent = 'Voltar para a Home';

  content.appendChild(h1);
  content.appendChild(p);
  content.appendChild(detailsList);
  content.appendChild(back);
  colText.appendChild(content);

  container.appendChild(colImg);
  container.appendChild(colText);

  const fotosContainer = document.getElementById('fotos-container');
  if (fotosContainer) {
    fotosContainer.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row g-3';
    (item.photos || []).forEach((photo) => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';
      const card = document.createElement('div');
      card.className = 'card border-0 shadow-sm h-100';
      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.title;
      img.className = 'card-img-top';
      img.style.height = '160px';
      img.style.objectFit = 'cover';
      const body = document.createElement('div');
      body.className = 'card-body p-2';
      const small = document.createElement('p');
      small.className = 'card-text small text-muted text-center';
      small.textContent = photo.title;
      body.appendChild(small);
      card.appendChild(img);
      card.appendChild(body);
      col.appendChild(card);
      row.appendChild(col);
    });
    fotosContainer.appendChild(row);
  }
}

function setupCrudSection() {
  const form = document.getElementById('crud-form');
  const list = document.getElementById('items-admin-list');
  if (!form || !list) return;

  const hiddenId = document.getElementById('item-id');
  const title = document.getElementById('item-title');
  const description = document.getElementById('item-description');
  const image = document.getElementById('item-image');
  const difficulty = document.getElementById('item-difficulty');
  const distance = document.getElementById('item-distance');
  const duration = document.getElementById('item-duration');
  const season = document.getElementById('item-season');
  const locationInput = document.getElementById('item-location');
  const submitBtn = document.getElementById('submit-button');
  const cancelBtn = document.getElementById('cancel-edit');
  const formTitle = document.getElementById('crud-form-title');

  async function refresh() {
    const items = await fetchItems();
    renderAdminList(items);
    const cardsContainer = document.getElementById('cards-container');
    const carouselContainer = document.getElementById('carousel-container');
    if (cardsContainer) renderHomeCards(items, cardsContainer);
    if (carouselContainer) renderHighlightsCarousel(items, carouselContainer);
  }

  function toPayload() {
    return {
      title: title.value.trim(),
      description: description.value.trim(),
      image: image.value.trim() || './trilha.jpg',
      difficulty: difficulty.value.trim() || '-',
      distanceKm: distance.value ? Number(distance.value) : 0,
      durationMin: duration.value ? Number(duration.value) : 0,
      bestSeason: season.value.trim() || '-',
      location: locationInput.value.trim() || '-',
      photos: []
    };
  }

  function clearForm() {
    hiddenId.value = '';
    form.reset();
    submitBtn.textContent = 'Cadastrar';
    cancelBtn.classList.add('d-none');
    formTitle.textContent = 'Cadastrar novo item';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      if (hiddenId.value) {
        await updateItem(hiddenId.value, toPayload());
      } else {
        await createItem(toPayload());
      }
      clearForm();
      await refresh();
    } catch (err) {
      alert('Falha ao salvar item.');
      console.error(err);
    }
  });

  cancelBtn.addEventListener('click', () => clearForm());

  function renderAdminList(items) {
    list.innerHTML = '';
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'list-group-item d-flex justify-content-between align-items-center';
      row.innerHTML = `<span class="text-truncate" style="max-width:65%"><strong>#${item.id}</strong> - ${item.title}</span>`;
      const actions = document.createElement('div');
      actions.className = 'btn-group btn-group-sm';
      const edit = document.createElement('button');
      edit.className = 'btn btn-outline-primary';
      edit.textContent = 'Editar';
      edit.addEventListener('click', () => {
        hiddenId.value = item.id;
        title.value = item.title || '';
        description.value = item.description || '';
        image.value = item.image || '';
        difficulty.value = item.difficulty || '';
        distance.value = item.distanceKm ?? '';
        duration.value = item.durationMin ?? '';
        season.value = item.bestSeason || '';
        locationInput.value = item.location || '';
        submitBtn.textContent = 'Salvar alterações';
        cancelBtn.classList.remove('d-none');
        formTitle.textContent = 'Editar item';
      });
      const del = document.createElement('button');
      del.className = 'btn btn-outline-danger';
      del.textContent = 'Excluir';
      del.addEventListener('click', async () => {
        if (confirm(`Excluir o item "${item.title}"?`)) {
          try {
            await deleteItem(item.id);
            await refresh();
          } catch (err) {
            alert('Falha ao excluir.');
            console.error(err);
          }
        }
      });
      actions.appendChild(edit);
      actions.appendChild(del);
      row.appendChild(actions);
      list.appendChild(row);
    });
  }

  // Inicializa lista
  refresh();
}


