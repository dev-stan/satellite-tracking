
# [Satellite Tracker Web App](https://satellitesaboveme.com)

## About

[This website](https://satellitesaboveme.com) tracks satellites above the user's location using the [N2YO radio passes API endpoint](https://www.n2yo.com/api/). It visualizes satellite positions on a map and provides basic information about each object. 

By default, the app displays satellites within a 30° radius of the user’s location. Users can adjust this radius in the **Run** section of the app.



---

https://github.com/user-attachments/assets/06ea856c-87fe-446f-a866-8d63562f8779



## Features
- Real-time satellite tracking
- Map visualization using Mapbox
- Integration with Google Analytics for interaction tracking
- Radius customization for satellite visibility

---

## Getting Started

### Prerequisites
- **Ruby version:** 3.2.0 (or the version specified in `.ruby-version`).
- **Rails version:** 7.0+.
- **System dependencies:** PostgreSQL, Node.js, Yarn.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dev-stan/satelite-tracking.git
   cd satelite-tracking
   ```

2. Install dependencies:
   ```bash
   bundle install
   yarn install
   ```

3. Set up the database:
   ```bash
   rails db:create db:migrate
   ```

4. Configure API keys:
   - Add your N2YO API key and Mapbox token to the environment variables:
     ```bash
     export N2YO_API_KEY=your_n2yo_key
     export MAPBOX_TOKEN=your_mapbox_token
     ```

---

## Running the App

Start the development server:
```bash
rails server
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing

Run the test suite:
```bash
rails test
```

---

## Deployment Instructions

1. Push your changes to the production branch.
2. Deploy using Dokku or any preferred deployment tool:
   ```bash
   git push dokku main
   ```

---

## Future Enhancements
- Enable filtering by satellite types (e.g., weather, communication, scientific).
- Display historical satellite data.
- Add a notification system for upcoming visible satellite passes.

---

For issues or contributions, open a ticket or submit a pull request on the [GitHub repository](https://github.com/dev-stan-satelite-tracking).
