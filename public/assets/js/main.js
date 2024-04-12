document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/data/content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateSidebar(data.sidebar);
            populateCards(data.cards);
            populateTrends(data.trends);
            populateUnresolvedTickets(data.unresolvedTickets);
            populateTasks(data.tasks);
        })
        .catch(error => console.error('Failed to load JSON data:', error));
});

function populateSidebar(items) {
    const menu = document.getElementById('menu');
    items.forEach(item => {
        const listItem = `
            <li class="nav-item">
                <a href="#" class="nav-link align-middle px-0">
                    <img src="${item.icon}" alt="${item.name} icon" width="30" height="30" class="rounded-circle">
                    <span class="ms-1 d-none d-sm-inline">${item.name}</span>
                </a>
            </li>
        `;
        menu.innerHTML += listItem;
    });
}

function populateCards(cards) {
    const cardsContainer = document.querySelector('.ticket-status');
    cards.forEach(card => {
        const cardHTML = `
            <div class="col-lg-3 py-2">
                <div class="card h-100 ticket-body">
                    <div class="card-body">
                        <h5 class="card-title ticket-name">${card.title}</h5>
                        <p class="card-text ticket-count">${card.count}</p>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}



function populateUnresolvedTickets(tickets) {
    const container = document.getElementById('unresolved-tickets-list');
    tickets.forEach(ticket => {
        const ticketHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h5>${ticket.status}</h5>
                <h5 class="semi num-gray">${ticket.count}</h5>
            </li>
        `;
        container.innerHTML += ticketHTML;
    });
}


function populateTasks(tasks) {
    const tasksContainer = document.getElementById('tasks-list');

    tasks.forEach(task => {
        const isChecked = task.status === 'checked' ? 'checked' : '';
        const statusLabel = task.status === 'urgent' ? '<span class="badge text-bg-warning">URGENT</span>' :
            task.status === 'new' ? '<span class="badge text-bg-success">NEW</span>' :
                task.status === 'default' ? '<span class="badge text-bg-light">DEFAULT</span>' : '';

        const taskHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${task.actionable ?
                `<h5 class="semi num-gray un-tic-bold">${task.task}</h5>
                     <button type="button" class="plus-button">+</button>` :
                `<div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="task-${task.id}" ${isChecked}>
                        <label class="form-check-label" for="task-${task.id}">
                            <h5 class="un-stat">${task.task}</h5>
                        </label>
                    </div>
                    ${statusLabel}`
            }
            </li>
        `;
        tasksContainer.innerHTML += taskHTML;
    });
}



// unresolved overdue open on hold
function populateCards(cards) {
    const cardsContainer = document.querySelector('.ticket-status');
    cards.forEach(card => {
        const cardHTML = `
            <div class="col-lg-3 py-2">
                <div class="card h-100 ticket-body">
                    <div class="card-body">
                        <h5 class="card-title ticket-name">${card.title}</h5>
                        <p class="card-text ticket-count">${card.count}</p>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += cardHTML;
    });
}

function populateTrends(trends) {
    document.getElementById('resolved-trend').querySelector('.trend-status-number').textContent = trends[0].value;
    document.getElementById('received-trend').querySelector('.trend-status-number').textContent = trends[1].value;
    document.getElementById('avg-first-response-trend').querySelector('.trend-status-number').textContent = trends[2].value;
    document.getElementById('avg-response-time-trend').querySelector('.trend-status-number').textContent = trends[3].value;
    document.getElementById('resolution-sla-trend').querySelector('.trend-status-number').textContent = trends[4].value;
}

