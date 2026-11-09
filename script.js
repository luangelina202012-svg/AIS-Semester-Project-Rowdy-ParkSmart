/* Rowdy ParkSmart — UTSA Main Campus surface-parking prototype.
 * Lot names: official UTSA Main Campus map and parking page (checked Nov. 9, 2026).
 * https://www.utsa.edu/campusservices/docs/Park-Trans-Map_Main-Campus.pdf
 * https://www.utsa.edu/campusservices/parking/main-campus-parking.html
 * All capacities and available counts below are MADE-UP DEMO VALUES.
 * Counts cover an entire lot, not spaces eligible for a particular permit.
 * Permit tags describe designated spaces; always check posted signs.
 * University Oaks is grouped because the sources do not name individual lots.
 * Open index.html directly. Simulation runs locally without requests or a server.
 */
(() => {
    'use strict';

    const UPDATE_INTERVAL_MS = 15000;
    const PARKING_URL = 'https://www.utsa.edu/campusservices/parking/main-campus-parking.html';
    const MAP_URL = 'https://www.utsa.edu/campusservices/docs/Park-Trans-Map_Main-Campus.pdf';

    // This catalog is embedded so file:// pages do not need to fetch a TSV file.
    // All capacities are illustrative. Edit these values to adjust the demo.
    const LOT_CATALOG = [
    {
        "id": "ACL",
        "name": "Activity Center Lot",
        "types": [
            "Employee",
            "Accessible"
        ],
        "capacity": 100,
        "accessibleCapacity": 5
    },
    {
        "id": "BS",
        "name": "Barshop Boulevard Lot",
        "types": [
            "Commuter",
            "Employee"
        ],
        "capacity": 400,
        "accessibleCapacity": 20
    },
    {
        "id": "BR1",
        "name": "Bauerle Road Lot 1",
        "types": [
            "Commuter",
            "Employee"
        ],
        "capacity": 300,
        "accessibleCapacity": 15
    },
    {
        "id": "BR2",
        "name": "Bauerle Road Lot 2",
        "types": [
            "Employee",
            "Reserved",
            "Accessible"
        ],
        "capacity": 150,
        "accessibleCapacity": 8
    },
    {
        "id": "BR3",
        "name": "Bauerle Road Lot 3",
        "types": [
            "Employee"
        ],
        "capacity": 100,
        "accessibleCapacity": 5
    },
    {
        "id": "BL",
        "name": "Bosque Street Lot",
        "types": [
            "Employee",
            "Reserved",
            "Accessible"
        ],
        "capacity": 80,
        "accessibleCapacity": 4
    },
    {
        "id": "BK1",
        "name": "Brackenridge Avenue Lot 1",
        "types": [
            "Commuter",
            "Employee",
            "Reserved"
        ],
        "capacity": 300,
        "accessibleCapacity": 15
    },
    {
        "id": "BK2",
        "name": "Brackenridge Avenue Lot 2",
        "types": [
            "Commuter",
            "Employee",
            "Reserved"
        ],
        "capacity": 200,
        "accessibleCapacity": 5
    },
    {
        "id": "BK3",
        "name": "Brackenridge Avenue Lot 3",
        "types": [
            "Employee",
            "Reserved"
        ],
        "capacity": 500,
        "accessibleCapacity": 50
    },
    {
        "id": "BK4",
        "name": "Brackenridge Avenue Lot 4",
        "types": [
            "Commuter"
        ],
        "capacity": 250,
        "accessibleCapacity": 15
    },
    {
        "id": "BK5",
        "name": "Brackenridge Avenue Lot 5",
        "types": [
            "Commuter",
            "Employee"
        ],
        "capacity": 450,
        "accessibleCapacity": 30
    },
    {
        "id": "DL",
        "name": "Devine Avenue Lot",
        "types": [
            "Employee",
            "Reserved",
            "Accessible"
        ],
        "capacity": 100,
        "accessibleCapacity": 5
    },
    {
        "id": "EC1",
        "name": "East Campus Lot 1",
        "types": [
            "Commuter",
            "Accessible"
        ],
        "capacity": 600,
        "accessibleCapacity": 30
    },
    {
        "id": "EC2",
        "name": "East Campus Lot 2",
        "types": [
            "Commuter",
            "Accessible"
        ],
        "capacity": 500,
        "accessibleCapacity": 25
    },
    {
        "id": "EC3",
        "name": "East Campus Lot 3",
        "types": [
            "Commuter"
        ],
        "capacity": 400,
        "accessibleCapacity": 20
    },
    {
        "id": "FL",
        "name": "Ford Lot",
        "types": [
            "Employee",
            "Reserved",
            "Accessible"
        ],
        "capacity": 180,
        "accessibleCapacity": 9
    },
    {
        "id": "KCL",
        "name": "Key Circle Lot",
        "types": [
            "Accessible"
        ],
        "capacity": 40,
        "accessibleCapacity": 2
    },
    {
        "id": "R1",
        "name": "Resident Lot 1",
        "types": [
            "Resident",
            "Accessible"
        ],
        "capacity": 250,
        "accessibleCapacity": 12
    },
    {
        "id": "R2",
        "name": "Resident Lot 2",
        "types": [
            "Resident",
            "Employee",
            "Reserved"
        ],
        "capacity": 300,
        "accessibleCapacity": 15
    },
    {
        "id": "R3",
        "name": "Resident Lot 3",
        "types": [
            "Resident"
        ],
        "capacity": 200,
        "accessibleCapacity": 10
    },
    {
        "id": "R4",
        "name": "Resident Lot 4",
        "types": [
            "Resident"
        ],
        "capacity": 250,
        "accessibleCapacity": 12
    },
    {
        "id": "R5",
        "name": "Resident Lot 5",
        "types": [
            "Resident",
            "Employee",
            "Reserved"
        ],
        "capacity": 350,
        "accessibleCapacity": 18
    },
    {
        "id": "SU",
        "name": "Student Union Lot",
        "types": [
            "Reserved",
            "Accessible"
        ],
        "capacity": 60,
        "accessibleCapacity": 3
    },
    {
        "id": "TEP",
        "name": "Thermal Energy Plant Lot",
        "types": [
            "Reserved",
            "Accessible"
        ],
        "capacity": 40,
        "accessibleCapacity": 2
    },
    {
        "id": "UC",
        "name": "University Center Lot",
        "types": [
            "Reserved",
            "Accessible"
        ],
        "capacity": 60,
        "accessibleCapacity": 3
    },
    {
        "id": "UO",
        "name": "University Oaks lots (grouped)",
        "types": [
            "Resident",
            "Accessible"
        ],
        "capacity": 600,
        "accessibleCapacity": 30
    },
    {
        "id": "XL",
        "name": "Ximenes Avenue Lot",
        "types": [
            "Commuter",
            "Employee",
            "Reserved"
        ],
        "capacity": 350,
        "accessibleCapacity": 18
    }
];

    // Equivalent to the old Java random.nextInt(maximum + 1).
    const randomCount = maximum => Math.floor(Math.random() * (maximum + 1));
    const clone = value => JSON.parse(JSON.stringify(value));

    // Create fixed category capacities once per page load. Only the availability
    // changes during simulation. These random splits are not actual permit rules.
    function createStartingLots() {
        return LOT_CATALOG.map(definition => {
            const { accessibleCapacity, ...lot } = definition;
            const employeeCapacity = randomCount(lot.capacity - accessibleCapacity);
            const studentCapacity = lot.capacity - accessibleCapacity - employeeCapacity;
            lot.breakdown = {
                employee: { capacity: employeeCapacity, available: 0 },
                student: { capacity: studentCapacity, available: 0 },
                accessible: { capacity: accessibleCapacity, available: 0 }
            };
            generateAvailability(lot);
            return lot;
        });
    }

    function generateAvailability(lot) {
        Object.values(lot.breakdown).forEach(category => {
            category.available = randomCount(category.capacity);
        });
        lot.available = Object.values(lot.breakdown)
            .reduce((sum, category) => sum + category.available, 0);
        lot.occupied = lot.capacity - lot.available;
    }

    const startingLots = createStartingLots();
    let parkingLots = clone(startingLots);
    let selectedStatus = 'all';
    let selectedLotId = null;
    let updateTimer = null;
    let lastUpdated = new Date();
    let ui;
    const formatNumber = number => number.toLocaleString('en-US');
    const percentAvailable = lot => lot.available / lot.capacity * 100;

    // 25% or more: available; 10–25%: filling up; below 10%: nearly full.
    function getStatus(percent) {
        if (percent >= 25) return { key: 'available', label: 'Available' };
        if (percent >= 10) return { key: 'limited', label: 'Filling up' };
        return { key: 'full', label: percent === 0 ? 'Full' : 'Nearly full' };
    }

    function renderOverview() {
        const capacity = parkingLots.reduce((sum, lot) => sum + lot.capacity, 0);
        const available = parkingLots.reduce((sum, lot) => sum + lot.available, 0);
        const percent = capacity ? available / capacity * 100 : 0;
        ui.totalAvailable.textContent = formatNumber(available);
        ui.totalCapacity.textContent = formatNumber(capacity);
        ui.percentAvailable.textContent = `${Math.round(percent)}%`;
        ui.overallStatus.textContent = `${getStatus(percent).label} · simulated`;
        ui.lotCount.textContent = parkingLots.length;
        ui.updated.textContent = `● Demo updated ${lastUpdated.toLocaleTimeString([], {
            hour: 'numeric', minute: '2-digit', second: '2-digit'
        })}`;
    }

    function renderLots() {
        const query = ui.search.value.trim().toLowerCase();
        const type = ui.typeFilter.value;
        const visibleLots = parkingLots.filter(lot => {
            const matchesSearch = `${lot.name} ${lot.id} ${lot.types.join(' ')}`
                .toLowerCase().includes(query);
            const matchesType = type === 'all' || lot.types.includes(type);
            const matchesStatus = selectedStatus === 'all' ||
                getStatus(percentAvailable(lot)).key === selectedStatus;
            return matchesSearch && matchesType && matchesStatus;
        });

        visibleLots.sort((a, b) => {
            if (ui.sort.value === 'name') return a.name.localeCompare(b.name, undefined, { numeric: true });
            const difference = ui.sort.value === 'percent'
                ? percentAvailable(b) - percentAvailable(a)
                : b.available - a.available;
            return difference || a.name.localeCompare(b.name, undefined, { numeric: true });
        });

        const fragment = document.createDocumentFragment();
        visibleLots.forEach(lot => {
            const percent = percentAvailable(lot);
            const status = getStatus(percent);
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'lot-card';
            card.dataset.lotId = lot.id;
            card.setAttribute('aria-haspopup', 'dialog');
            card.setAttribute('aria-label', `${lot.name}: ${lot.available} simulated spots available. View details.`);
            // All interpolated strings come from the fixed catalog, never user input.
            card.innerHTML = `
                <div class="card-header">
                    <span class="lot-icon" aria-hidden="true">P</span>
                    <span class="status ${status.key}">${status.label}</span>
                </div>
                <h3 class="lot-name">${lot.name}</h3>
                <div class="lot-type">${lot.types.join(' · ')}</div>
                <div class="availability"><strong>${formatNumber(lot.available)}</strong>
                    <span>/ ${formatNumber(lot.capacity)} demo spaces</span></div>
                <div class="progress"><span class="fill ${status.key}" style="width:${percent}%"></span></div>
                <div class="card-bottom"><span>${Math.round(percent)}% available · simulated</span>
                    <b>View details ↗</b></div>`;
            fragment.appendChild(card);
        });
        // Preserve keyboard focus if an automatic update rebuilds the cards.
        const focusedId = document.activeElement?.dataset.lotId;
        ui.lotGrid.replaceChildren(fragment);
        if (focusedId) {
            Array.from(ui.lotGrid.children).find(card => card.dataset.lotId === focusedId)?.focus({ preventScroll: true });
        }
        ui.resultCount.textContent = `${visibleLots.length} of ${parkingLots.length} parking areas`;
        ui.noResults.hidden = visibleLots.length > 0;
    }

    function renderDetails() {
        const lot = parkingLots.find(item => item.id === selectedLotId);
        if (!lot) return;
        const status = getStatus(percentAvailable(lot));
        ui.dialogContent.innerHTML = `
            <div class="overline">SURFACE PARKING · DEMO</div>
            <h2 id="lotDetailTitle">${lot.name}</h2>
            <span class="status ${status.key}">${status.label}</span>
            <div class="detail-num">${formatNumber(lot.available)}</div>
            <div class="detail-sub">Simulated available spaces</div>
            <div class="detail-row"><span>Demo capacity</span><strong>${formatNumber(lot.capacity)}</strong></div>
            <div class="detail-row"><span>Demo occupied spaces</span><strong>${formatNumber(lot.capacity - lot.available)}</strong></div>
            <table class="breakdown">
                <caption>Demo simulation: available / capacity</caption>
                <thead><tr><th scope="col">Demo category</th><th scope="col">Available</th><th scope="col">Capacity</th></tr></thead>
                <tbody>
                    <tr><th scope="row">Employee</th><td>${lot.breakdown.employee.available}</td><td>${lot.breakdown.employee.capacity}</td></tr>
                    <tr><th scope="row">Student</th><td>${lot.breakdown.student.available}</td><td>${lot.breakdown.student.capacity}</td></tr>
                    <tr><th scope="row">Accessible</th><td>${lot.breakdown.accessible.available}</td><td>${lot.breakdown.accessible.capacity}</td></tr>
                </tbody>
            </table>
            <p class="detail-footer">These category allocations are randomly generated for practice; they do not represent UTSA permit rules or actual category capacities.</p>
            <p><strong>Designated space categories:</strong> ${lot.types.join(', ')}</p>
            <p class="detail-footer">Counts and capacities are invented for this prototype.
                Availability is for the whole parking area, not your permit category.
                Check posted signs and official permit rules before parking.
                ${lot.id === 'UO' ? 'University Oaks is shown as one grouped parking area.' : ''}</p>
            <p><a href="${MAP_URL}" target="_blank" rel="noopener noreferrer">Official campus parking map ↗</a></p>
            <p><a href="${PARKING_URL}" target="_blank" rel="noopener noreferrer">Official parking and permit information ↗</a></p>`;
    }

    function render() {
        renderOverview();
        renderLots();
        if (ui.lotDialog.open) renderDetails();
    }

    // Refresh redraws the current state; Simulate actually generates new counts.
    function refreshDashboard() {
        render();
    }

    function simulateUpdate() {
        parkingLots.forEach(generateAvailability);
        lastUpdated = new Date();
        render();
    }

    function configureAutomaticUpdates() {
        clearInterval(updateTimer);
        updateTimer = null;
        if (ui.autoUpdate.checked) updateTimer = setInterval(simulateUpdate, UPDATE_INTERVAL_MS);
    }

    function resetDemo() {
        parkingLots = clone(startingLots);
        lastUpdated = new Date();
        selectedStatus = 'all';
        selectedLotId = null;
        if (ui.lotDialog.open) ui.lotDialog.close();
        ui.search.value = '';
        ui.typeFilter.value = 'all';
        ui.sort.value = 'available';
        ui.autoUpdate.checked = true;
        document.querySelectorAll('.chip[data-status]').forEach(chip => {
            const active = chip.dataset.status === 'all';
            chip.classList.toggle('active', active);
            chip.setAttribute('aria-pressed', String(active));
        });
        configureAutomaticUpdates();
        render();
    }

    function initialize() {
        const ids = ['lotGrid', 'totalAvailable', 'totalCapacity', 'percentAvailable',
            'overallStatus', 'lotCount', 'updated', 'search', 'typeFilter', 'sort',
            'resultCount', 'noResults', 'autoUpdate', 'intervalLabel', 'refreshBtn',
            'simulateBtn', 'resetBtn', 'lotDialog', 'dialogContent', 'closeDialog'];
        ui = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
        const missing = ids.filter(id => !ui[id]);
        if (missing.length) {
            console.error(`Rowdy ParkSmart: missing HTML elements: ${missing.join(', ')}`);
            return;
        }

        // Replace the original garage option with relevant surface-space filters.
        ui.typeFilter.replaceChildren();
        ['all', 'Commuter', 'Resident', 'Employee', 'Reserved', 'Accessible'].forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value === 'all' ? 'All space categories' : value;
            ui.typeFilter.appendChild(option);
        });
        ui.typeFilter.setAttribute('aria-label', 'Filter by designated space category');
        ui.intervalLabel.textContent = UPDATE_INTERVAL_MS / 1000;
        ui.lotDialog.setAttribute('aria-labelledby', 'lotDetailTitle');
        document.querySelector('.live')?.replaceChildren(document.createElement('i'), ' Demo mode');
        const demoFoot = document.querySelector('.demo-foot');
        if (demoFoot) demoFoot.textContent = 'All counts are simulated in your browser. Category allocations are illustrative; check posted signs and official permit rules.';
        const status = document.getElementById('connectionStatus');
        if (status) {
            status.textContent = 'Local demo · 26 surface lots + University Oaks grouped · Simulated counts';
            status.style.background = '#eef1fa';
        }

        ui.search.addEventListener('input', renderLots);
        ui.typeFilter.addEventListener('change', renderLots);
        ui.sort.addEventListener('change', renderLots);
        document.querySelectorAll('.chip[data-status]').forEach(chip => {
            chip.setAttribute('aria-pressed', String(chip.dataset.status === selectedStatus));
            chip.addEventListener('click', () => {
                selectedStatus = chip.dataset.status;
                document.querySelectorAll('.chip[data-status]').forEach(button => {
                    const active = button === chip;
                    button.classList.toggle('active', active);
                    button.setAttribute('aria-pressed', String(active));
                });
                renderLots();
            });
        });
        ui.refreshBtn.addEventListener('click', refreshDashboard);
        ui.simulateBtn.addEventListener('click', simulateUpdate);
        ui.resetBtn.addEventListener('click', resetDemo);
        ui.autoUpdate.addEventListener('change', configureAutomaticUpdates);
        ui.lotGrid.addEventListener('click', event => {
            const card = event.target.closest('[data-lot-id]');
            if (!card) return;
            selectedLotId = card.dataset.lotId;
            renderDetails();
            ui.lotDialog.showModal();
        });
        ui.closeDialog.addEventListener('click', () => ui.lotDialog.close());
        // Native dialog also handles Escape and keyboard focus trapping.
        ui.lotDialog.addEventListener('click', event => {
            const rect = ui.lotDialog.getBoundingClientRect();
            if (event.target === ui.lotDialog && (event.clientX < rect.left ||
                event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
                ui.lotDialog.close();
            }
        });
        ui.lotDialog.addEventListener('close', () => {
            const previousId = selectedLotId;
            selectedLotId = null;
            Array.from(ui.lotGrid.children).find(card => card.dataset.lotId === previousId)?.focus({ preventScroll: true });
        });
        configureAutomaticUpdates();
        render();
    }

    // Works whether the script is at the bottom of the page or loaded with defer.
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
    else initialize();
})();
