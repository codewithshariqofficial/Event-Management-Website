const mockEvents = [
    {
        id: 1,
        title: "Global Tech Summit 2026",
        date: "2026-08-15",
        location: "Silicon Valley, CA",
        tag: "Technology",
        image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f1?auto=format&fit=crop&q=80&w=1000",
        description: "The premier gathering for tech innovators and leaders. Explore the future of AI, Quantum Computing, and beyond.",
        schedule: [
            { time: "09:00 AM", activity: "Opening Keynote: The AI Era" },
            { time: "11:30 AM", activity: "Panel Discussion: Ethics in Tech" },
            { time: "02:00 PM", activity: "Workshop: Building for the Future" }
        ],
        tickets: [
            { id: "standard", name: "Standard Access", price: 299 },
            { id: "vip", name: "VIP Experience", price: 599 }
        ]
    },
    {
        id: 2,
        title: "Nexus Music Festival",
        date: "2026-09-12",
        location: "Ibiza, Spain",
        tag: "Music",
        image: "https://images.unsplash.com/photo-1459749411177-042180ceea72?auto=format&fit=crop&q=80&w=1000",
        description: "A 3-day immersive music experience featuring the world's top electronic and indie artists.",
        schedule: [
            { time: "04:00 PM", activity: "Beachside Warmup" },
            { time: "08:00 PM", activity: "Main Stage: Headliners" },
            { time: "11:00 PM", activity: "After-Hours Glow Party" }
        ],
        tickets: [
            { id: "day1", name: "Day 1 Pass", price: 99 },
            { id: "full", name: "3-Day Pass", price: 249 }
        ]
    },
    {
        id: 3,
        title: "Eco-Future Expo",
        date: "2026-10-05",
        location: "Singapore",
        tag: "Sustainability",
        image: "https://images.unsplash.com/photo-1536850280170-1cd0086326bc?auto=format&fit=crop&q=80&w=1000",
        description: "Showcasing the latest in green technology, sustainable living, and environmental conservation.",
        schedule: [
            { time: "10:00 AM", activity: "Green Tech Showcase" },
            { time: "01:00 PM", activity: "Keynote: Zero Waste Living" },
            { time: "03:30 PM", activity: "Networking: Eco-Entrepreneurs" }
        ],
        tickets: [
            { id: "general", name: "General Entry", price: 0 },
            { id: "workshop", name: "Workshop Bundle", price: 45 }
        ]
    },
    {
        id: 4,
        title: "Design Masters Workshop",
        date: "2026-11-20",
        location: "London, UK",
        tag: "Design",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1000",
        description: "Master the art of UI/UX design with world-class mentors. From wireframes to high-fidelity prototypes.",
        schedule: [
            { time: "09:30 AM", activity: "The Psychology of Color" },
            { time: "12:00 PM", activity: "Hands-on: Figma Mastery" },
            { time: "03:00 PM", activity: "Review Session" }
        ],
        tickets: [
            { id: "standard", name: "Full Day Pass", price: 150 },
            { id: "student", name: "Student Discount", price: 75 }
        ]
    },
    {
        id: 5,
        title: "Culinary Arts Gala",
        date: "2026-12-05",
        location: "Paris, France",
        tag: "Food",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
        description: "A night of fine dining and culinary excellence featuring Michelin-star chefs.",
        schedule: [
            { time: "07:00 PM", activity: "Welcome Champagne" },
            { time: "08:00 PM", activity: "7-Course Degustation" },
            { time: "10:30 PM", activity: "Dessert Showcase" }
        ],
        tickets: [
            { id: "single", name: "Single Guest", price: 350 },
            { id: "couple", name: "Couple's Special", price: 600 }
        ]
    }
];
