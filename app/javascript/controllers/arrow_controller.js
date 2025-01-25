// app/javascript/controllers/scroll_controller.js

import { Controller } from "@hotwired/stimulus"

/**
 * ScrollController handles the scroll behavior for the floating arrow button.
 */
export default class extends Controller {
  // Define targets if needed (not required in this case)
  
  /**
   * Called when the controller is connected to the DOM.
   */
  connect() {
    console.log("ArrowController connected")
  }

  /**
   * Handles the click event on the floating arrow button.
   * @param {Event} event - The click event.
   */
  scroll(event) {
    event.preventDefault()

    if (this.isMobileView()) {
      // On mobile devices, scroll to the map element
      const mapElement = document.getElementById('map')
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.error("Map element with ID 'map' not found.")
      }
    } else {
      // On larger screens, scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  /**
   * Determines if the current view is considered mobile.
   * @returns {boolean} True if the viewport width is less than 900px, false otherwise.
   */
  isMobileView() {
    return window.innerWidth < 900
  }
}
