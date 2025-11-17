document.addEventListener('DOMContentLoaded', async () => {
  try {
    const items = await fetchItems();
    const emptyState = document.getElementById('emptyState');
    if (!Array.isArray(items) || items.length === 0) {
      if (emptyState) emptyState.classList.remove('d-none');
      return;
    }
    renderCharts(items);
  } catch (err) {
    console.error('Falha ao carregar dados para os gráficos', err);
  }
});

function renderCharts(items) {
  const byLocation = groupCount(items, (i) => (i.location || '-').trim());
  const byDifficulty = groupCount(items, (i) => normalizeDifficulty(i.difficulty));

  const chartByLocationEl = document.getElementById('chartByLocation');
  const chartByDifficultyEl = document.getElementById('chartByDifficulty');
  if (chartByLocationEl) {
    new Chart(chartByLocationEl, {
      type: 'bar',
      data: {
        labels: Object.keys(byLocation),
        datasets: [{
          label: 'Qtd. de trilhas',
          data: Object.values(byLocation),
          backgroundColor: 'rgba(13, 110, 253, 0.5)',
          borderColor: 'rgba(13, 110, 253, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: '#0d6efd' } },
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Trilhas por Localização' }
        }
      }
    });
  }

  if (chartByDifficultyEl) {
    const labels = Object.keys(byDifficulty);
    const values = Object.values(byDifficulty);
    new Chart(chartByDifficultyEl, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(25, 135, 84, 0.7)',   // Fácil
            'rgba(255, 193, 7, 0.7)',   // Média
            'rgba(220, 53, 69, 0.7)',   // Difícil
            'rgba(108, 117, 125, 0.7)'  // Outros/Indefinido
          ],
          borderColor: [
            'rgba(25, 135, 84, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(220, 53, 69, 1)',
            'rgba(108, 117, 125, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Distribuição por Dificuldade' }
        }
      }
    });
  }
}

function groupCount(items, selector) {
  return items.reduce((acc, item) => {
    const key = selector(item) || '-';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function normalizeDifficulty(value) {
  const v = String(value || '').trim().toLowerCase();
  if (v.startsWith('f')) return 'Fácil';
  if (v.startsWith('m')) return 'Média';
  if (v.startsWith('d')) return 'Difícil';
  return 'Indefinido';
}


