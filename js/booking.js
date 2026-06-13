const bookingManager = {
    STORAGE_KEY: 'event_horizon_bookings',

    saveBooking(booking) {
        const bookings = this.getBookings();
        bookings.push(booking);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    },

    getBookings() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    deleteBooking(bookingId) {
        let bookings = this.getBookings();
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    },

    clearAllBookings() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};
