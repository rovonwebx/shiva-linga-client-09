// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = L.map('indiaMap').setView([23.5937, 78.9629], 5); // Center of India
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Custom icon for Jyotirlinga markers
    const jyotirlingaIcon = L.divIcon({
        className: 'jyotirlinga-marker',
        html: '<div class="marker-icon jyotirlinga-icon"><i class="fas fa-om"></i></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    // Custom icon for other significant Linga markers
    const otherLingaIcon = L.divIcon({
        className: 'other-linga-marker',
        html: '<div class="marker-icon other-icon"><i class="fas fa-gopuram"></i></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
    });
    
    // Define Jyotirlinga locations
    const jyotirlingas = [
        {
            id: 'somnath',
            name: 'Somnath Temple',
            location: [20.8880, 70.4010],
            description: 'One of the oldest and most revered Jyotirlingas, located on the western coast of Gujarat.',
            image: 'images/somnath.jpg'
        },
        {
            id: 'mallikarjuna',
            name: 'Mallikarjuna Temple (Sri Sailam)',
            location: [16.0788, 78.8677],
            description: 'Located on the Shri Sailam mountain ranges in Andhra Pradesh.',
            image: 'images/mallikarjuna.jpg'
        },
        {
            id: 'mahakaleshwar',
            name: 'Mahakaleshwar Temple',
            location: [23.1829, 75.7682],
            description: 'Located in the ancient city of Ujjain, famous for its unique south-facing Linga.',
            image: 'images/mahakaleshwar.jpg'
        },
        {
            id: 'omkareshwar',
            name: 'Omkareshwar Temple',
            location: [22.2433, 76.1519],
            description: 'Situated on an island in the Narmada River, shaped like the sacred Om symbol.',
            image: 'images/omkareshwar.jpg'
        },
        {
            id: 'kedarnath',
            name: 'Kedarnath Temple',
            location: [30.7346, 79.0669],
            description: 'Located in the Himalayan ranges, accessible only for six months a year due to extreme weather.',
            image: 'images/kedarnath.jpg'
        },
        {
            id: 'bhimashankar',
            name: 'Bhimashankar Temple',
            location: [19.0722, 73.5383],
            description: 'Located in the Sahyadri ranges, surrounded by wildlife sanctuary and dense forests.',
            image: 'images/bhimashankar.jpg'
        },
        {
            id: 'vishwanath',
            name: 'Kashi Vishwanath Temple',
            location: [25.3109, 83.0107],
            description: 'Located in the holy city of Varanasi, one of the most famous Shiva temples in India.',
            image: 'images/vishwanath.jpg'
        },
        {
            id: 'trimbakeshwar',
            name: 'Trimbakeshwar Temple',
            location: [19.9322, 73.5292],
            description: 'Located near the source of the Godavari River, features a unique three-faced Linga.',
            image: 'images/trimbakeshwar.jpg'
        },
        {
            id: 'vaidyanath',
            name: 'Vaidyanath Temple (Baidyanath Dham)',
            location: [24.4834, 86.7019],
            description: 'Also known as Baidyanath Dham, one of the most revered Shaktipeeths as well.',
            image: 'images/vaidyanath.jpg'
        },
        {
            id: 'nageshwar',
            name: 'Nageshwar Temple',
            location: [22.3917, 69.0193],
            description: 'Located near Dwarka, believed to protect devotees from all poisons and snake bites.',
            image: 'images/nageshwar.jpg'
        },
        {
            id: 'rameshwaram',
            name: 'Rameshwaram Temple',
            location: [9.2876, 79.3129],
            description: 'Located on Rameshwaram island, associated with Lord Rama\'s return from Lanka.',
            image: 'images/rameshwaram.jpg'
        },
        {
            id: 'grishneshwar',
            name: 'Grishneshwar Temple',
            location: [20.0258, 75.1709],
            description: 'Located near Ellora Caves, the smallest Jyotirlinga temple but of great significance.',
            image: 'images/grishneshwar.jpg'
        }
    ];
    
    // Define other significant Linga locations
    const otherLingas = [
        {
            id: 'amarnath',
            name: 'Amarnath Cave',
            location: [34.2150, 75.5000],
            description: 'Famous for its natural ice Linga that forms and dissolves with seasons.',
            image: 'images/amarnath.jpg'
        },
        {
            id: 'pashupatinath',
            name: 'Pashupatinath Temple',
            location: [27.7105, 85.3488],
            description: 'Though in Nepal, it\'s culturally significant to Indian spiritual geography.',
            image: 'images/pashupatinath.jpg'
        },
        {
            id: 'lingaraj',
            name: 'Lingaraj Temple',
            location: [20.2359, 85.8346],
            description: 'One of the oldest temples in Bhubaneswar, representing Shiva as Tribhuvaneshwara.',
            image: 'images/lingaraj.jpg'
        },
        {
            id: 'murudeshwar',
            name: 'Murudeshwar Temple',
            location: [14.0924, 74.4849],
            description: 'Features the world\'s second-tallest Shiva statue and a magnificent temple by the Arabian Sea.',
            image: 'images/murudeshwar.jpg'
        }
    ];
    
    // Store all markers for later reference
    const markers = {};
    
    // Function to create popup content
    function createPopupContent(site) {
        return `
            <div class="popup-content">
                <h3>${site.name}</h3>
                <img src="${site.image}" alt="${site.name}">
                <p>${site.description}</p>
                <a href="#" class="popup-link" onclick="scrollToLinga('${site.id}'); return false;">Read More</a>
            </div>
        `;
    }
    
    // Add Jyotirlinga markers to the map
    jyotirlingas.forEach(site => {
        const marker = L.marker(site.location, {
            icon: jyotirlingaIcon,
            title: site.name, // Add tooltip on hover
            riseOnHover: true // Bring to front when hovered
        })
            .bindPopup(createPopupContent(site), {
                className: 'custom-popup',
                maxWidth: 300,
                autoPan: true,
                closeButton: true
            })
            .bindTooltip(site.name, {
                direction: 'top',
                className: 'custom-tooltip',
                offset: [0, -15],
                opacity: 0.9
            })
            .addTo(map);
        
        // Add mouseover event to show popup automatically
        marker.on('mouseover', function() {
            this.openPopup();
            highlightSidebarItem(site.id);
        });
        
        // Add mouseout event to close popup when not hovering
        marker.on('mouseout', function() {
            // Don't close popup immediately to allow user to move mouse to popup
            setTimeout(() => {
                if (!document.querySelector('.leaflet-popup:hover')) {
                    this.closePopup();
                    unhighlightSidebarItems();
                }
            }, 300);
        });
        
        markers[site.id] = marker;
    });
    
    // Add other Linga markers to the map
    otherLingas.forEach(site => {
        const marker = L.marker(site.location, {
            icon: otherLingaIcon,
            title: site.name, // Add tooltip on hover
            riseOnHover: true // Bring to front when hovered
        })
            .bindPopup(createPopupContent(site), {
                className: 'custom-popup',
                maxWidth: 300,
                autoPan: true,
                closeButton: true
            })
            .bindTooltip(site.name, {
                direction: 'top',
                className: 'custom-tooltip',
                offset: [0, -15],
                opacity: 0.9
            })
            .addTo(map);
        
        // Add mouseover event to show popup automatically
        marker.on('mouseover', function() {
            this.openPopup();
            highlightSidebarItem(site.id);
        });
        
        // Add mouseout event to close popup when not hovering
        marker.on('mouseout', function() {
            // Don't close popup immediately to allow user to move mouse to popup
            setTimeout(() => {
                if (!document.querySelector('.leaflet-popup:hover')) {
                    this.closePopup();
                    unhighlightSidebarItems();
                }
            }, 300);
        });
        
        markers[site.id] = marker;
    });
    
    // Add click event listeners to the linga items in the sidebar
    const lingaItems = document.querySelectorAll('.linga-item');
    
    lingaItems.forEach(item => {
        item.addEventListener('click', function() {
            const lingaId = this.getAttribute('data-id');
            const marker = markers[lingaId];
            
            if (marker) {
                // Center the map on the marker
                map.setView(marker.getLatLng(), 8);
                
                // Open the popup
                marker.openPopup();
                
                // Highlight the active item
                lingaItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Function to scroll to a specific linga in the sidebar
    window.scrollToLinga = function(lingaId) {
        const lingaItem = document.querySelector(`.linga-item[data-id="${lingaId}"]`);
        
        if (lingaItem) {
            // Highlight the active item
            lingaItems.forEach(i => i.classList.remove('active'));
            lingaItem.classList.add('active');
            
            // Scroll the item into view
            lingaItem.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };
    
    // Function to highlight a sidebar item
    function highlightSidebarItem(lingaId) {
        const lingaItem = document.querySelector(`.linga-item[data-id="${lingaId}"]`);
        
        if (lingaItem) {
            // Highlight the active item
            lingaItems.forEach(i => i.classList.remove('hover-active'));
            lingaItem.classList.add('hover-active');
        }
    }
    
    // Function to unhighlight all sidebar items
    function unhighlightSidebarItems() {
        lingaItems.forEach(i => i.classList.remove('hover-active'));
    }
    
    // Add hover events to sidebar items
    lingaItems.forEach(item => {
        const lingaId = item.getAttribute('data-id');
        
        item.addEventListener('mouseenter', function() {
            const marker = markers[lingaId];
            if (marker) {
                marker.openPopup();
                map.setView(marker.getLatLng(), map.getZoom());
            }
            highlightSidebarItem(lingaId);
        });
        
        item.addEventListener('mouseleave', function() {
            const marker = markers[lingaId];
            if (marker) {
                setTimeout(() => {
                    if (!document.querySelector('.leaflet-popup:hover')) {
                        marker.closePopup();
                    }
                }, 300);
            }
            unhighlightSidebarItems();
        });
    });
    
    // Add India outline (simplified)
    fetch('india-outline.geojson')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: {
                    color: '#ff7700',
                    weight: 2,
                    opacity: 0.6,
                    fillColor: '#fff0e6',
                    fillOpacity: 0.1
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading India outline:', error);
        });
});