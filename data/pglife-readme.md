# 🏠 PG Life — Paying Guest (PG) Accommodation Listing Platform

**PG Life** is a full-stack web application that helps students and working professionals discover, compare, and shortlist Paying Guest (PG) / hostel accommodations across major Indian cities. Users can search PGs by city, filter and sort listings, view detailed property pages with photos, ratings, amenities and an interactive map, mark properties as "interested" (wishlist), and manage everything from a personal dashboard.

> Tagline used on the homepage: **"Happiness per Square Foot"**

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Schema (inferred)](#database-schema-inferred)
- [API Endpoints](#api-endpoints)
- [Pages / Routes](#pages--routes)
- [Setup & Installation](#setup--installation)
- [Screenshots / Assets](#screenshots--assets)
- [Known Limitations](#known-limitations)
- [Possible Future Improvements](#possible-future-improvements)
- [Author](#author)

---

## Overview

PG Life is built as a **hybrid PHP + React application**:

- The **backend** is plain PHP (procedural style) with **MySQL** as the database, handling authentication, sessions, and data APIs.
- The **frontend** for the core listing page (`property_list.php`) is a **React app** (Create React App) that is built and its compiled bundle is copied/served alongside the PHP pages — the React app fetches property data from PHP JSON API endpoints (`/api/*.php`) using `fetch()`.
- Other pages (home, property detail, dashboard, login/signup) are rendered server-side with PHP, styled with **Bootstrap 4**, **Font Awesome**, and custom CSS, with **jQuery/Bootstrap JS** for modals and carousels.
- Property location is geocoded on the fly using the **OpenStreetMap Nominatim API** and rendered on an interactive map using **Leaflet.js**.

This project appears to be a learning/portfolio project demonstrating full-stack skills: relational DB design, session-based auth, REST-ish JSON APIs, React state management (class components + props), and third-party API/map integration.

---

## Key Features

### 🔍 Discovery
- **City-based search** from the homepage (Delhi, Mumbai, Bengaluru, Hyderabad quick-links + free-text city search box).
- **Property listing page** (React-powered) showing all PGs in a selected city.
- **Sorting** — by rent, ascending or descending.
- **Filtering** — by gender preference (Male / Female / Unisex / No filter), via a modal.
- **Property image previews** pulled dynamically from each property's image folder.

### 🏘️ Property Details
- **Image carousel** (Bootstrap carousel) built from all images in the property's folder.
- **Star ratings** for Cleanliness, Food Quality, and Safety, plus an aggregated overall rating (computed as the average, rendered as full/half/empty stars).
- **Amenities** grouped into categories: Building, Common Area, Bedroom, Washroom (icons: AC, bed, CCTV, dining, fire extinguisher, geyser, lift, parking, power backup, RO water, TV, washing machine, WiFi).
- **Rent display** formatted in ₹ per month.
- **Interested / Wishlist toggle** (heart icon) with a live "N interested" counter.
- **User testimonials** section per property.
- **Interactive location map** — the property address is geocoded via the Nominatim API and plotted on a Leaflet map with a marker/popup.
- Breadcrumb navigation (Home → City → Property).

### 👤 User Accounts
- **Signup** modal (full name, phone, email, password, college name, gender) with server-side duplicate-email check and SHA-1 password hashing.
- **Login** modal (email + password) using PHP sessions.
- **Logout** (session destroy).
- **Dashboard** page showing:
  - User profile (name, email, phone, college).
  - List of all properties the user has marked as "interested", with the same card layout (image, rating, gender icon, rent, "View" link).

### ⚙️ Behind the Scenes
- Session-based auth guarding the dashboard route (redirects to home if not logged in).
- JSON APIs return `Access-Control-Allow-Origin: *` headers to support the decoupled React fetch calls.
- Interested/uninterested is a simple toggle (insert/delete row) against a join table.

---

## Tech Stack

| Layer            | Technology |
|-------------------|------------|
| Backend language   | PHP (procedural, `mysqli`) |
| Database           | MySQL (`pg_life` database) |
| Frontend (listing) | React 17 (Create React App, class components) |
| Frontend (rest)    | Server-rendered PHP + Bootstrap 4 + jQuery |
| Styling            | Bootstrap 4, Font Awesome, custom CSS per page |
| Maps / Geocoding   | Leaflet.js (map rendering) + OpenStreetMap Nominatim API (address → lat/lng) |
| Auth               | PHP native sessions (`$_SESSION`), SHA-1 password hashing |
| Data format         | JSON (for React ↔ PHP API communication) |

**React dependencies:** `react` 17, `react-dom` 17, `react-scripts` 4 (Create React App), Testing Library packages, `web-vitals`.

---

## Architecture

```
┌────────────────────┐        fetch (JSON)        ┌──────────────────────────┐
│  React App          │ ─────────────────────────▶ │  PHP API layer (/api)    │
│  (property_list.php │ ◀───────────────────────── │  get_properties_by_city  │
│   embeds React root) │                            │  toggle_interested       │
└────────────────────┘                             │  login_submit / signup   │
                                                     └───────────┬──────────────┘
                                                                 │ mysqli
                                                                 ▼
┌────────────────────┐   server-rendered PHP        ┌──────────────────────────┐
│  index.php           │ ─────────────────────────▶ │  MySQL: pg_life           │
│  property_detail.php │                             │  users, properties,       │
│  dashboard.php        │                            │  cities, amenities,       │
│  login/signup modals  │                            │  testimonials,            │
└────────────────────┘                              │  interested_users_properties│
                                                      └──────────────────────────┘
```

- **Session-driven personalization**: `user_id` from `$_SESSION` is used server-side (and passed implicitly via cookies to the JSON APIs) to determine whether the current user has already marked a property as "interested".
- **Decoupled listing UI**: unlike other pages, the property list page delegates rendering entirely to a mounted React app (`<div id="root">`), which is the most "modern" part of the stack — a natural place to plug in new interactive/AI features.

---

## Project Structure

```
PG Life/
├── index.php                     # Homepage — city search + quick city links
├── property_list.php             # Mounts the React app (listing page) for a given city
├── property_list_without_react.php  # Legacy/plain-PHP version of the listing page
├── property_detail.php           # Server-rendered property detail page (images, ratings,
│                                  #   amenities, testimonials, Leaflet map)
├── dashboard.php                 # Logged-in user's profile + interested properties
├── login_form.php / login_submit.php     # Standalone (legacy/demo) login form+handler
├── register_form.php / register_submit.php # Standalone (legacy/demo) registration form+handler
├── logout.php                    # Destroys session
│
├── api/                          # JSON API endpoints consumed by the React app
│   ├── get_properties_by_city.php
│   ├── toggle_interested.php
│   ├── login_submit.php
│   └── signup_submit.php
│
├── include/                      # Shared PHP partials
│   ├── database_connect.php      # mysqli connection to `pg_life` DB
│   ├── header.php                # Nav bar (auth-aware)
│   ├── footer.php
│   ├── head_links.php            # <head> includes (CSS/JS/CDN links)
│   ├── login_modal.php
│   └── signup_modal.php
│
├── css/                          # Page-specific stylesheets + bootstrap.min.css
├── js/                           # jquery.js, bootstrap.min.js, page scripts, compiled React chunks
├── img/                          # Logo, city icons, gender icons, amenity SVGs, property photos
│   ├── amenities/                # ac, bed, cctv, dining, fireext, geyser, lift, parking,
│   │                              #   powerbackup, rowater, tv, washingmachine, wifi (SVGs)
│   └── properties/<property_id>/ # Photos per property, looked up dynamically with glob()
│
└── react-app/                    # Create React App source for the listing page
    ├── src/
    │   ├── 1/
    │   │   ├── App.js            # Root component: fetches properties, handles sort/filter/interested
    │   │   ├── FilterBar.js      # Sort + "open filter modal" bar
    │   │   ├── FilterModal.js    # Gender filter modal
    │   │   ├── PropertyCard.js   # Individual property card (image, rating, rent, heart)
    │   │   ├── Stars.js          # Reusable star-rating renderer
    │   │   ├── Interested.js     # Interested/heart toggle UI
    │   │   ├── NoProperty.js     # Empty-state component
    │   │   └── utils.js          # base_path helper for API calls
    │   └── *_css.js              # Per-component CSS-in-JS style modules
    ├── public/                   # CRA public assets (favicon, manifest, index.html)
    ├── build/                    # Production build output (already compiled, copied into /js and /css)
    └── package.json
```

---

## Database Schema (inferred)

The exact `CREATE TABLE` statements aren't included in the project, but the schema can be reconstructed from the SQL queries used across the codebase:

**`users`**
| Column | Notes |
|---|---|
| id | PK |
| full_name | |
| email | unique, used for login |
| password | SHA-1 hashed |
| phone | |
| gender | male / female |
| college_name | |

**`cities`**
| Column | Notes |
|---|---|
| id | PK |
| name | e.g. Delhi, Mumbai, Bengaluru, Hyderabad |

**`properties`**
| Column | Notes |
|---|---|
| id | PK |
| city_id | FK → cities.id |
| name | |
| address | used for geocoding via Nominatim |
| gender | male / female / unisex |
| rent | numeric (₹ / month) |
| description | |
| rating_clean | float, 0–5 |
| rating_food | float, 0–5 |
| rating_safety | float, 0–5 |

**`amenities`**
| Column | Notes |
|---|---|
| id | PK |
| name | e.g. "WiFi", "CCTV" |
| type | Building / Common Area / Bedroom / Washroom |
| icon | filename (SVG) in `img/amenities/` |

**`properties_amenities`** (join table)
| Column | Notes |
|---|---|
| property_id | FK |
| amenity_id | FK |

**`interested_users_properties`** (join / wishlist table)
| Column | Notes |
|---|---|
| user_id | FK |
| property_id | FK |

**`testimonials`**
| Column | Notes |
|---|---|
| id | PK |
| property_id | FK |
| user_name | |
| content | testimonial text |

> Note: property images are **not** stored in the DB — they're resolved at runtime with PHP's `glob("img/properties/<id>/*")`, so the first file found becomes the "cover image" and all files populate the carousel.

---

## API Endpoints

All under `/api/`, return `application/json` with permissive CORS (`Access-Control-Allow-Origin: *`).

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `api/get_properties_by_city.php?city={name}` | Returns all properties in a city, each enriched with `interested_users_count`, `is_interested` (for current session user), and a resolved `image` path. |
| GET | `api/toggle_interested.php?property_id={id}` | Adds/removes the current logged-in user's "interested" mark on a property. Returns `is_logged_in: false` if not authenticated (frontend then opens the login modal). |
| POST | `api/login_submit.php` | Authenticates via email + SHA-1 password match, sets session vars. |
| POST | `api/signup_submit.php` | Registers a new user after checking for duplicate email. |

---

## Pages / Routes

| Route | Description |
|---|---|
| `index.php` | Home — city search bar + 4 major-city quick links |
| `property_list.php?city={name}` | React-rendered listing for a city (sort/filter/interested) |
| `property_list_without_react.php` | Plain-PHP equivalent listing page (no JS framework) |
| `property_detail.php?property_id={id}` | Full property page: carousel, ratings, amenities, description, Leaflet map, testimonials |
| `dashboard.php` | Logged-in user profile + their interested properties (auth-protected) |
| `login_form.php`, `register_form.php` | Simple standalone demo forms (separate from the modal-based auth flow) |
| `logout.php` | Ends the session |

---

## Setup & Installation

### Prerequisites
- PHP 7+ with the `mysqli` extension
- MySQL / MariaDB server
- A local server stack such as **XAMPP / WAMP / LAMP** (the DB connection is hardcoded to `127.0.0.1`, user `root`, no password)
- Node.js + npm (only needed if you want to rebuild the React app from source)

### Steps

1. **Clone/extract the project** into your web server's document root (e.g. `htdocs/PG Life` for XAMPP).
2. **Create the database**:
   ```sql
   CREATE DATABASE pg_life;
   ```
   Then create the tables described in [Database Schema](#database-schema-inferred) and seed them with cities, properties, amenities, and users.
3. **Configure the DB connection** in `include/database_connect.php` if your MySQL credentials differ from the default (`root` / no password / `127.0.0.1`).
4. **Add property images** under `img/properties/<property_id>/` — at least one image per property, since the app resolves cover images and carousels via `glob()`.
5. **Start your PHP + MySQL server** (e.g. via XAMPP control panel) and visit:
   ```
   http://localhost/PG Life/index.php
   ```
6. *(Optional)* **Rebuild the React listing app** if you make changes to it:
   ```bash
   cd react-app
   npm install
   npm run build
   ```
   Then copy the new build output into the top-level `js/` and `css/` folders (the current wiring expects `js/2.*.chunk.js` and `js/main.*.chunk.js` to be referenced directly from `property_list.php`).

---

## Screenshots / Assets

The `img/` folder includes UI assets worth noting for documentation/demo purposes:
- `img/logo.png` — app logo
- `img/bg.png`, `img/bg2.png`, `img/bg3.png` — hero/background images
- `img/delhi.png`, `img/mumbai.png`, `img/bangalore.png`, `img/hyderabad.png`, `img/chennai.png` — city icons
- `img/male.png`, `img/female.png`, `img/unisex.png` — gender badges
- `img/amenities/*.svg` — amenity icon set
- `img/properties/<id>/*` — actual property photos used across listing/detail pages

---

## Known Limitations

*(Useful context if you plan to discuss this project's trade-offs, e.g. in interviews or in an "Ask Me" RAG assistant.)*

- **Security**: SQL queries are built via direct string interpolation (e.g. in `api/get_properties_by_city.php`, `login_submit.php`) — vulnerable to SQL injection; would need prepared statements (`mysqli`/PDO) in production.
- **Password hashing**: uses SHA-1, which is outdated — should be replaced with `password_hash()`/`password_verify()` (bcrypt/argon2).
- **Hardcoded DB credentials** and `127.0.0.1` host — not environment-configurable.
- **Mixed rendering strategy**: only the listing page uses React; the rest of the app is server-rendered PHP, which is inconsistent architecture (though understandable for an incremental/learning project).
- **Geocoding on every page load**: `property_detail.php` calls the Nominatim API synchronously on each request with no caching — slow and rate-limit-prone at scale.
- **No dedicated backend framework** (no Laravel/Slim) — plain procedural PHP scripts per route.
- **CORS is fully open** (`Access-Control-Allow-Origin: *`) on JSON APIs.

---

## Possible Future Improvements

- Add prepared statements / an ORM to eliminate SQL injection risk.
- Move to `password_hash()` and add rate-limiting on login/signup.
- Migrate the whole frontend to React (or Next.js) for a single consistent rendering model, or conversely, drop React and keep it pure PHP for simplicity — the current split is more historical than deliberate.
- Add image upload (from an admin panel) instead of manually placing files in `img/properties/<id>/`.
- Cache geocoding results per property instead of calling Nominatim on every page view.
- **Add a RAG-powered "Ask Me" assistant** — e.g., embed this README + the codebase into a vector store and expose a chat widget that can answer questions like "What tech stack does PG Life use?" or "How does the interested/wishlist feature work?" This README is written to be a good knowledge source for exactly that kind of assistant.

---

## Author

Built by **Mahboob Raza** — This project demonstrates PHP + MySQL backend fundamentals, session-based auth, JSON API design, and integrating a React frontend with a traditional server-rendered app — alongside third-party map/geocoding integration (Leaflet + OpenStreetMap Nominatim).