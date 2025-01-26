import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "searchForm",
    "searchQuery"
  ]

  connect() {
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
            this.element.dispatchEvent(new CustomEvent("search:completed", {
                detail: { satellites: data.satellites, lat: data.observer_lat, lng: data.observer_lng, query },
                bubbles: true

              }))
          })
          .catch((error) => {
            console.error('Error:', error)
            alert(`An error occurred: ${error.message}`)
          })
      })
  }

}