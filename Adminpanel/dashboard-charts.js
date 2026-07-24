import { adminGetAllOrders } from './api.js';

async function initDashboardCharts() {
  let orders = [];
  try {
    orders = await adminGetAllOrders();
  } catch (err) {
    console.error('Could not load orders for charts:', err);
    return;
  }

  renderRevenueTrend(orders);
  renderOrderStatusChart(orders);
}

// ---- Revenue Trend (last 7 days) ----
function renderRevenueTrend(orders) {
  const days = [];
  const revenueByDay = {};

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const label = d.toLocaleDateString('en-PK', { weekday: 'short' });
    days.push({ key, label });
    revenueByDay[key] = 0;
  }

  orders.forEach(o => {
    if (!o.isPaid) return;
    const key = new Date(o.createdAt).toISOString().slice(0, 10);
    if (key in revenueByDay) {
      revenueByDay[key] += o.totalPrice || 0;
    }
  });

  const ctx = document.getElementById('revenueTrendChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: days.map(d => d.label),
      datasets: [{
        label: 'Revenue',
        data: days.map(d => revenueByDay[d.key]),
        borderColor: '#1c1c1e',
        backgroundColor: 'rgba(28,28,30,0.06)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: '#1c1c1e',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => `$${v}` },
          grid: { color: '#f2f2f2' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

// ---- Order Status Breakdown ----
function renderOrderStatusChart(orders) {
  const paid = orders.filter(o => o.isPaid && !o.isDelivered).length;
  const delivered = orders.filter(o => o.isDelivered).length;
  const pending = orders.filter(o => !o.isPaid && !o.isDelivered).length;

  const ctx = document.getElementById('orderStatusChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'Paid', 'Delivered'],
      datasets: [{
        data: [pending, paid, delivered],
        backgroundColor: ['#f59e0b', '#2563eb', '#16a34a'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 10, font: { size: 11 } }
        }
      }
    }
  });
}

initDashboardCharts();
