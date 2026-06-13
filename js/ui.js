const UI = {
    renderEvents(events) {
        const grid = document.getElementById('events-grid');
        if (events.length === 0) {
            grid.innerHTML = `<div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 3rem;">No events found matching your search.</div>`;
            return;
        }
        grid.innerHTML = events.map(event => `
            <div class="event-card glass-card" onclick="app.showEventDetails(${event.id})">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}" loading="lazy">
                    <span class="event-tag">${event.tag}</span>
                </div>
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <div class="event-details">
                        <span>${this.formatDate(event.date)}</span>
                        <span>${event.location}</span>
                    </div>
                    <button class="glass-btn primary" style="width: 100%">View Details</button>
                </div>
            </div>
        `).join('');
    },

    formatDate(dateStr) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    },

    showModal(contentHtml) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        content.innerHTML = contentHtml;
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },

    hideModal() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    },

    renderEventDetails(event) {
        return `
            <div class="modal-detail-view">
                <div style="height: 250px; border-radius: 20px; overflow: hidden; margin-bottom: 1.5rem;">
                    <img src="${event.image}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${event.title}</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">${event.description}</p>
                
                <div class="event-meta" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                    <div class="glass-card" style="padding: 1rem;">
                        <small style="color: var(--accent-color)">DATE</small>
                        <div>${this.formatDate(event.date)}</div>
                    </div>
                    <div class="glass-card" style="padding: 1rem;">
                        <small style="color: var(--accent-color)">LOCATION</small>
                        <div>${event.location}</div>
                    </div>
                </div>

                <div class="schedule-section" style="margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem;">Schedule</h4>
                    <div class="timeline" style="border-left: 2px solid var(--glass-border); padding-left: 1.5rem;">
                        ${event.schedule.map(item => `
                            <div class="timeline-item" style="margin-bottom: 1rem; position: relative;">
                                <div style="position: absolute; left: -2.1rem; top: 0.2rem; width: 12px; height: 12px; border-radius: 50%; background: var(--accent-color);"></div>
                                <div style="font-weight: 600; font-size: 0.9rem;">${item.time}</div>
                                <div style="color: var(--text-muted);">${item.activity}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="booking-section">
                    <h4 style="margin-bottom: 1rem;">Secure Your Ticket</h4>
                    <form id="booking-form" class="booking-form" onsubmit="app.handleBooking(event, ${event.id})">
                        <div class="form-group">
                            <label>Ticket Type</label>
                            <select id="ticket-type" required onchange="UI.updateTotal(${event.id})">
                                ${event.tickets.map(t => `<option value="${t.id}">${t.name} - $${t.price}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="attendee-name" required placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="attendee-email" required placeholder="john@example.com">
                        </div>
                        <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                            <div>Total: <span id="booking-total" style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color);">$${event.tickets[0].price}</span></div>
                            <button type="submit" class="glass-btn primary">Confirm Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    updateTotal(eventId) {
        const event = mockEvents.find(e => e.id === eventId);
        const ticketId = document.getElementById('ticket-type').value;
        const ticket = event.tickets.find(t => t.id === ticketId);
        document.getElementById('booking-total').innerText = `$${ticket.price}`;
    },

    renderMyTickets(bookings) {
        const list = document.getElementById('tickets-list');
        if (bookings.length === 0) {
            list.innerHTML = `<div class="glass-card" style="text-align: center; color: var(--text-muted); padding: 5rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎫</div>
                <h3>Your Wallet is Empty</h3>
                <p>Book an event to see your digital tickets here.</p>
                <button class="glass-btn primary" onclick="UI.switchView('home')" style="margin-top: 2rem;">Explore Events</button>
            </div>`;
            return;
        }

        list.innerHTML = `
            <div class="wallet-container">
                ${bookings.map(booking => `
                    <div class="ticket-stub">
                        <div class="stub-left">
                            <div class="stub-header" style="margin-bottom: 2rem;">
                                <small style="color: var(--accent-color); font-weight: 700; letter-spacing: 2px;">OFFICIAL ENTRY PASS</small>
                                <h2 style="margin-top: 0.5rem;">${booking.eventTitle}</h2>
                                <div style="color: var(--text-muted); font-size: 0.9rem;">${booking.ticketName}</div>
                            </div>
                            
                            <div class="stub-info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 1.5rem;">
                                <div>
                                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7rem;">Date</small>
                                    <div style="font-weight: 600;">${this.formatDate(booking.eventDate)}</div>
                                </div>
                                <div>
                                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7rem;">Attendee</small>
                                    <div style="font-weight: 600;">${booking.attendeeName}</div>
                                </div>
                                <div>
                                    <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.7rem;">Booking ID</small>
                                    <div style="font-weight: 600; font-family: monospace;">#${booking.id.slice(-8).toUpperCase()}</div>
                                </div>
                            </div>
                        </div>
                        <div class="stub-right">
                            <div class="qr-container" style="background: white; padding: 10px; border-radius: 12px; margin-bottom: 1.5rem;">
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${booking.id}" style="width: 110px; height: 120px; display: block;">
                            </div>
                            <div class="stub-actions" style="display: flex; gap: 0.8rem;">
                                <button class="glass-btn" onclick="app.deleteBooking('${booking.id}')" style="padding: 0.5rem 1rem; color: #ff4757; border-color: rgba(255,71,87,0.2); font-size: 0.8rem;">Cancel</button>
                                <button class="glass-btn" onclick="alert('Ticket saved to device!')" style="padding: 0.5rem 1rem; font-size: 0.8rem;">Save</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    showHowItWorks() {
        const content = `
            <div style="text-align: center; padding: 2rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">How It Works</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
                    <div>
                        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔍</div>
                        <h4>Discover</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Browse through curated premium events across the globe.</p>
                    </div>
                    <div>
                        <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎫</div>
                        <h4>Book</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Secure your tickets with our encrypted checkout system.</p>
                    </div>
                    <div>
                        <div style="font-size: 3.5rem; margin-bottom: 1rem;">✨</div>
                        <h4>Experience</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Attend the event and show your unique QR code at the door.</p>
                    </div>
                </div>
                <button class="glass-btn primary" onclick="UI.hideModal()" style="margin-top: 3rem;">Get Started</button>
            </div>
        `;
        this.showModal(content);
    },

    renderAdminDashboard(allBookings) {
        const stats = document.getElementById('admin-stats');
        const table = document.getElementById('all-bookings');

        const totalRevenue = allBookings.reduce((sum, b) => sum + b.price, 0);
        const uniqueEvents = new Set(allBookings.map(b => b.eventId)).size;
        
        const chartBars = [40, 70, 45, 90, 65, 85, 100];

        stats.innerHTML = `
            <div class="admin-card-row">
                <div class="glass-card stat-card">
                    <div style="color: var(--text-muted); font-size: 0.9rem;">Total Revenue</div>
                    <div class="value">$${totalRevenue.toLocaleString()}</div>
                    <div class="chart-box">
                        ${chartBars.map(h => `<div class="chart-bar" style="height: ${h}%"></div>`).join('')}
                    </div>
                </div>
                
                <div class="glass-card stat-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.9rem;">Attendee Base</div>
                        <div class="value">${allBookings.length}</div>
                        <p style="color: #00ff88; font-size: 0.85rem;">Verified registrations</p>
                    </div>
                    <div style="margin-top: 2rem;">
                        <button class="glass-btn primary" onclick="app.exportBookings()" style="width: 100%;">Export Dataset</button>
                    </div>
                </div>

                <div class="glass-card stat-card">
                    <div style="color: var(--text-muted); font-size: 0.9rem;">Quick Actions</div>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin-top: 1.5rem;">
                        <button class="glass-btn" onclick="alert('Maintenance mode active!')">System Status</button>
                        <button class="glass-btn" onclick="app.clearAllData()" style="color: #ff4757; border-color: rgba(255,71,87,0.2);">Reset Platform</button>
                    </div>
                </div>
            </div>
        `;

        table.innerHTML = `
            <div class="bookings-table-header" style="padding: 2rem;">
                <h3 style="margin: 0;">Live Booking Stream</h3>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; min-width: 700px;">
                    <thead>
                        <tr style="background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--glass-border);">
                            <th style="padding: 1.5rem;">REF ID</th>
                            <th style="padding: 1.5rem;">ATTENDEE</th>
                            <th style="padding: 1.5rem;">EVENT</th>
                            <th style="padding: 1.5rem;">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allBookings.length === 0 ? `
                            <tr><td colspan="4" style="padding: 5rem; text-align: center; color: var(--text-muted);">No booking logs available.</td></tr>
                        ` : allBookings.map(b => `
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                                <td style="padding: 1.5rem;"><code style="color: var(--text-muted)">#${b.id.slice(-6)}</code></td>
                                <td style="padding: 1.5rem;">
                                    <div style="font-weight: 600;">${b.attendeeName}</div>
                                    <small style="color: var(--text-muted)">${b.attendeeEmail}</small>
                                </td>
                                <td style="padding: 1.5rem;">${b.eventTitle}</td>
                                <td style="padding: 1.5rem; font-weight: 800; color: #00ff88;">$${b.price}</td>
                            </tr>
                        `).reverse().join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    switchView(viewId) {
        const sections = ['hero', 'features', 'events-section', 'my-tickets-section', 'admin-section'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => link.classList.remove('active'));

        const activeLink = document.querySelector(`[data-view="${viewId}"]`);
        if (activeLink) activeLink.classList.add('active');

        if (viewId === 'home') {
            document.getElementById('hero').classList.remove('hidden');
            document.getElementById('features').classList.remove('hidden');
            document.getElementById('events-section').classList.remove('hidden');
        } else if (viewId === 'my-tickets') {
            document.getElementById('my-tickets-section').classList.remove('hidden');
            app.loadMyTickets();
        } else if (viewId === 'admin') {
            document.getElementById('admin-section').classList.remove('hidden');
            app.loadAdmin();
        }
        
        window.scrollTo(0, 0);
    }
};
