const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/destinations', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'destinations.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// API endpoint for destinations
app.get('/api/destinations', (req, res) => {
    const destinations = [
        {
            id: 1,
            name: 'Goa - Beaches & Heritage',
            category: 'beach',
            price: '₹28,999',
            duration: '6 days',
             image: 'https://images.pexels.com/photos/4428280/pexels-photo-4428280.jpeg?auto=compress&cs=tinysrgb&w=800', 
            description: 'Experience pristine beaches, Portuguese heritage, vibrant nightlife, and delicious Goan cuisine in India\'s beach paradise.'
        },
        {
            id: 2,
            name: 'Rajasthan - Royal Heritage',
            category: 'heritage',
            price: '₹45,999',
            duration: '12 days',
            image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
            description: 'Explore majestic palaces, desert safaris, colorful markets, and royal Rajasthani culture in the land of kings.'
        },
        {
            id: 3,
            name: 'Kerala - God\'s Own Country',
            category: 'nature',
            price: '₹32,999',
            duration: '8 days',
            image: 'https://www.indiaholidaymall.com/images/blog/The-Magical-Backwaters-of-Kerala.jpg',
            description: 'Cruise through serene backwaters, stay in traditional houseboats, and experience Kerala\'s lush green landscapes.'
        },
        {
            id: 4,
            name: 'Himachal Pradesh - Hill Stations',
            category: 'adventure',
            price: '₹38,999',
            duration: '10 days',
            image: 'https://images.pexels.com/photos/2961109/pexels-photo-2961109.jpeg',
            description: 'Discover snow-capped mountains, adventure sports, hill stations, and breathtaking Himalayan landscapes.'
        },
        {
            id: 5,
            name: 'Tamil Nadu - Temple Trail',
            category: 'heritage',
            price: '₹26,999',
            duration: '7 days',
            image: 'https://images.pexels.com/photos/33952160/pexels-photo-33952160.jpeg',
            description: 'Visit ancient temples, experience classical dance, explore Dravidian architecture, and taste authentic South Indian cuisine.'
        },
        {
            id: 6,
            name: 'Uttarakhand - Spiritual Journey',
            category: 'spiritual',
            price: '₹35,999',
            duration: '9 days',
            image: 'https://images.pexels.com/photos/20035462/pexels-photo-20035462.jpeg',
            description: 'Embark on a spiritual journey to sacred temples, holy rivers, and peaceful ashrams in the Himalayas.'
        },
        {
            id: 7,
            name: 'Maharashtra - Caves & Culture',
            category: 'heritage',
            price: '₹24,999',
            duration: '6 days',
            image: 'https://images.unsplash.com/photo-1580581096469-8afb38d3dbd5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ',
            description: 'Explore ancient cave temples, bustling Mumbai, hill stations, and Maharashtra\'s rich cultural heritage.'
        },
        {
            id: 8,
            name: 'Karnataka - Garden City & Beyond',
            category: 'nature',
            price: '₹29,999',
            duration: '8 days',
            image: 'https://images.unsplash.com/photo-1606141836992-bfcb00c776c2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Discover Bangalore\'s gardens, Mysore\'s palaces, Coorg\'s coffee plantations, and Karnataka\'s diverse landscapes.'
        },
        {
            id: 9,
            name: 'Andaman & Nicobar - Island Paradise',
            category: 'beach',
            price: '₹42,999',
            duration: '7 days',
            image: 'https://images.unsplash.com/photo-1617653202545-931490e8d7e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Relax on pristine beaches, enjoy water sports, explore coral reefs, and experience island life in the Bay of Bengal.'
        }
    ];
    
    const { category, search } = req.query;
    let filteredDestinations = destinations;
    
    if (category && category !== 'all') {
        filteredDestinations = filteredDestinations.filter(dest => dest.category === category);
    }
    
    if (search) {
        filteredDestinations = filteredDestinations.filter(dest => 
            dest.name.toLowerCase().includes(search.toLowerCase()) ||
            dest.description.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    res.json(filteredDestinations);
});

app.listen(PORT, () => {
    console.log(`Bharat Yatra Travels server running on http://localhost:${PORT}`);
});