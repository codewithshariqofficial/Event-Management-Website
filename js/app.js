const app = {
    init() {
        this.renderSkeleton();
        setTimeout(() => {
            UI.renderEvents(mockEvents);
        }, 1500); // Simulate network delay for premium feel
        this.setupEventListeners();
        console.log("Event Horizon Initialized");
    },

    renderSkeleton() {
        const grid = document.getElementById('events-grid');
        grid.innerHTML = Array(6).fill(0).map(() => `
            <div class="event-card glass-card skeleton" style="height: 350px;"></div>
        `).join('');
    },

    setupEventListeners() {
        // Nav Scroll Effect
        const nav = document.querySelector('.glass-nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Hero Mouse Parallax (Desktop Only)
        const hero = document.getElementById('hero');
        const visual = document.querySelector('.hero-visual');
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (hero && visual && !isTouchDevice) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const moveX = (clientX - innerWidth / 2) / 30;
                const moveY = (clientY - innerHeight / 2) / 30;
                visual.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('mobile-menu');
        const navLinksContainer = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') && 
                !navLinksContainer.contains(e.target) && 
                e.target !== menuToggle) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });

        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinksContainer.classList.remove('active');
                const view = e.currentTarget.getAttribute('data-view');
                UI.switchView(view);
            });
        });

        // Search & Filter
        const searchInput = document.getElementById('search-input');
        const tagFilter = document.getElementById('tag-filter');

        const handleFilter = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedTag = tagFilter.value;

            const filtered = mockEvents.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                                     event.description.toLowerCase().includes(searchTerm);
                const matchesTag = selectedTag === 'all' || event.tag === selectedTag;
                return matchesSearch && matchesTag;
            });

            UI.renderEvents(filtered);
        };

        searchInput.addEventListener('input', handleFilter);
        tagFilter.addEventListener('change', handleFilter);

        // Modal Close
        document.querySelector('.close-modal').addEventListener('click', () => {
            UI.hideModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') {
                UI.hideModal();
            }
        });
    },

    showEventDetails(eventId) {
        const event = mockEvents.find(e => e.id === eventId);
        if (event) {
            UI.showModal(UI.renderEventDetails(event));
        }
    },

    handleBooking(event, eventId) {
        event.preventDefault();
        const eventData = mockEvents.find(e => e.id === eventId);
        const ticketId = document.getElementById('ticket-type').value;
        const ticket = eventData.tickets.find(t => t.id === ticketId);
        
        const booking = {
            id: Date.now().toString(),
            eventId: eventId,
            eventTitle: eventData.title,
            eventDate: eventData.date,
            attendeeName: document.getElementById('attendee-name').value,
            attendeeEmail: document.getElementById('attendee-email').value,
            ticketName: ticket.name,
            price: ticket.price
        };

        bookingManager.saveBooking(booking);
        UI.hideModal();
        alert(`Booking Confirmed! Your ticket for ${eventData.title} is ready.`);
        UI.switchView('my-tickets');
    },

    deleteBooking(bookingId) {
        if (confirm("Are you sure you want to cancel this booking?")) {
            bookingManager.deleteBooking(bookingId);
            this.loadMyTickets();
        }
    },

    clearAllData() {
        if (confirm("⚠️ DANGER: This will delete ALL booking records. Proceed?")) {
            bookingManager.clearAllBookings();
            this.loadAdmin();
            alert("System database cleared.");
        }
    },

    exportBookings() {
        const bookings = bookingManager.getBookings();
        if (bookings.length === 0) return alert("No bookings to export");

        const headers = ["ID", "Attendee", "Email", "Event", "Ticket", "Price"];
        const rows = bookings.map(b => [
            b.id, b.attendeeName, b.attendeeEmail, b.eventTitle, b.ticketName, b.price
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'bookings_export.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    loadMyTickets() {
        const bookings = bookingManager.getBookings();
        UI.renderMyTickets(bookings);
    },

    loadAdmin() {
        const bookings = bookingManager.getBookings();
        UI.renderAdminDashboard(bookings);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
