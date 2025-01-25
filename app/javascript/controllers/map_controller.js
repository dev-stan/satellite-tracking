import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "map",
    "sidebarTitle",
    "satelliteCards",
    "searchAgain",
    "learnMore",
    "otherProjects",
    "searchForm",
    "searchQuery"
  ]

  connect() {
    // Get data from our HTML element
    this.mapboxToken = this.element.dataset.mapboxToken
    this.mapboxToken = this.element.dataset.mapboxToken
    this.satellites = JSON.parse(this.element.dataset.satellitesJson || "[]")
    console.log(this.satellites)

    // Initialize map
    mapboxgl.accessToken = "pk.eyJ1Ijoic3RhbnphbCIsImEiOiJjbHZrZGUxMmIxbnFuMmlwdXN1dHdnaHl0In0.VMt5dTMfCLySC2UZYeEZDw"
    this.map = new mapboxgl.Map({
      container: this.mapTarget,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [16.931992, 52.409538],
      zoom: 6,
      interactive: true
    })

    this.markers = []
    this.currentPopup = null

    // Buttons
    this.searchAgainTarget.addEventListener('click', () => {
      document.getElementById('header').scrollIntoView({ behavior: 'smooth' })
    })
    this.learnMoreTarget.addEventListener('click', () => {
      window.open('https://www.n2yo.com/?s=16763', '_blank')
    })
    this.otherProjectsTarget.addEventListener('click', () => {
      this.map.flyTo({ zoom: 4.5 })
    })

    // Search form
    this.searchFormTarget.addEventListener('submit', (event) => {
      event.preventDefault()
      const query = this.searchQueryTarget.value.trim()
      if (!query) {
        alert('Please enter a city name.')
        return
      }
      fetch(`/search?query=${encodeURIComponent(query)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error)
            return
          }
          this.initializeMapAndCards(data.satellites, data.observer_lat, data.observer_lng, query)
        })
        .catch((error) => {
          console.error('Error:', error)
          alert(`An error occurred: ${error.message}`)
        })
    })

    // Initialize with default location
    this.initializeMapAndCards(this.satellites, 52.409538, 16.931992, 'Poznan')
    this.map.resize()

    // Handle window resize for popups
    window.addEventListener('resize', () => {
      if (this.currentPopup) {
        this.currentPopup.remove()
        const selectedMarker = this.markers.find(m => m.element.style.backgroundColor === 'rgb(0, 42, 255)')
        if (selectedMarker) {
          const popupOptions = {
            offset: this.isMobileView() ? { 'bottom': [0, -15] } : 25
          }
          const newPopup = new mapboxgl.Popup(popupOptions)
            .setHTML(selectedMarker.marker.getPopup()._content.innerHTML)
          selectedMarker.marker.setPopup(newPopup)
          selectedMarker.marker.togglePopup()
          this.currentPopup = newPopup
        }
      }
    })
  }

  // Creates or refreshes the map markers and sidebar cards
  initializeMapAndCards(satellites, lat, lng, locationName) {
    this.map.setCenter([lng, lat])
    this.markers.forEach((m) => m.marker.remove())
    this.markers = []
    this.satelliteCardsTarget.innerHTML = ''

    satellites.forEach((satellite, index) => {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundColor = 'red'
      el.style.width = '20px'
      el.style.height = '20px'

      const popupContent = `
        <div class="popup-content">
          <h5>${satellite.satname}</h5>
          <div>Latitude: ${satellite.observer_lat.toFixed(4)}</div>
          <div>Longitude: ${satellite.observer_lng.toFixed(4)}</div>
          <div>Distance: ${satellite.distance.toFixed(2)} km</div>
          <div>Altitude: ${satellite.satalt?.toFixed(2) || 'N/A'} km</div>
          <div>Launch Date: ${satellite.launchdate || 'N/A'}</div>
          <div>Category: ${satellite.category || 'N/A'}</div>
        </div>
      `
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent)

      const marker = new mapboxgl.Marker(el)
        .setLngLat([satellite.observer_lng, satellite.observer_lat])
        .setPopup(popup)
        .addTo(this.map)

      this.markers.push({ marker: marker, index: index, element: el })

      el.addEventListener('click', () => {
        this.selectSatelliteByIndex(index)
      })

      const cardHtml = `
        <div class="card satellite-card" data-index="${index}">
          <div class="p-2">
            <h5>${satellite.satname}</h5>
            <p>Latitude: ${satellite.observer_lat.toFixed(4)}</p>
            <p>Longitude: ${satellite.observer_lng.toFixed(4)}</p>
            <p>Altitude: ${satellite.satalt.toFixed(0)} km</p>
          </div>
        </div>
      `
      this.satelliteCardsTarget.insertAdjacentHTML('beforeend', cardHtml)
    })

    this.sidebarTitleTarget.textContent = `Satellites Above ${locationName}...`

    // Attach mouse and click events to cards
    const cards = this.satelliteCardsTarget.querySelectorAll('.satellite-card')
    cards.forEach((card) => {
      const index = card.getAttribute('data-index')
      const markerData = this.markers.find((m) => m.index == index)

      card.addEventListener('mouseenter', () => {
        if (markerData) {
          markerData.element.style.backgroundColor = 'blue'
        }
      })
      card.addEventListener('mouseleave', () => {
        if (markerData) {
          markerData.element.style.backgroundColor = 'red'
        }
      })
      card.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.selectSatelliteByIndex(index)
        if (document.activeElement) document.activeElement.blur()
      })
    })
  }

  // Highlights a selected marker and opens its popup
  selectSatelliteByIndex(index) {
    this.markers.forEach((m) => {
      m.element.style.backgroundColor = 'red'
      m.marker.getPopup().remove()
    })
    if (this.currentPopup) this.currentPopup.remove()

    const markerData = this.markers.find((m) => m.index == index)
    if (markerData) {
      markerData.element.style.backgroundColor = '#002aff'
      const popupOptions = {
        offset: this.isMobileView() ? { 'bottom': [0, -15] } : 25
      }
      const popupContent = markerData.marker.getPopup()._content.innerHTML
      const popup = new mapboxgl.Popup(popupOptions).setHTML(popupContent)

      markerData.marker.setPopup(popup)
      markerData.marker.togglePopup()
      this.currentPopup = popup

      this.map.flyTo({ center: markerData.marker.getLngLat(), zoom: 6 })
      if (document.activeElement) document.activeElement.blur()
    }
  }

  // Helpers
  isMobileView() {
    return window.innerWidth <= 768
  }
}
