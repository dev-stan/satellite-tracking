# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "popper", to: "popper.js", preload: true
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
# config/importmap.rb
pin "mapbox-gl", to: "https://unpkg.com/mapbox-gl@2.15.0/dist/mapbox-gl.js", preload: true

