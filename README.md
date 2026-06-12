# Hunter Journal

## [See the App!](https://your-deploy-url-here.com)

![App Logo](src/resources/images/hk-logo.png)

## Description

Hunter Journal is a Hollow Knight-inspired React app for browsing, searching, creating, editing, and deleting enemy entries. Users can also explore game locations and see which enemies appear in each location.

#### [Client Repo here](https://github.com/Yemi7/hunter-journal-client)
#### [Server Repo here](https://your-server-repository-url-here.com)

## Technologies, Libraries & APIs used

- React
- Vite
- JavaScript
- HTML
- CSS
- Sass
- Bootstrap
- React Bootstrap
- React Router DOM
- Axios
- JSON server / REST API

## Backlog Functionalities

- Add user authentication so each user can manage their own journal.
- Add create, edit, and delete functionality for locations.
- Add enemy defeat progress tracking.
- Add stronger form validation and error messages.
- Add confirmation modals before deleting enemies.
- Add responsive styling improvements for smaller screens.
- Add richer search and filtering options.

# Client Structure

## User Stories

- **404** - The user can see an error page when they visit a route that does not exist.
- **Homepage** - The user can access the homepage to understand what the Hunter Journal is about.
- **About page** - The user can read about the project and credits.
- **Theme toggle** - The user can switch between dark and light themes.
- **Search enemies** - The user can search for enemies from the navbar.
- **Enemy journal** - The user can see a list of enemies and browse the journal.
- **Filter enemies** - The user can filter enemies by location.
- **Enemy details** - The user can open an enemy details page to see its image, description, behaviour, health, geo, and locations.
- **Create enemy** - The user can create a new enemy.
- **Edit enemy** - The user can edit an enemy and update its linked locations.
- **Delete enemy** - The user can delete an enemy from the journal.
- **Location list** - The user can see all locations.
- **Location details** - The user can open a location details page to see images, description, tram access, and enemies in that location.

## Client Routes

## React Router Routes (React App)

| Path | Page | Components | Behavior |
| --- | --- | --- | --- |
| `/` | Home | MyNavbar | Shows the app introduction and links to the journal and locations |
| `/about` | About | MyNavbar | Shows project information, credits, and links |
| `/journal` | Journal | MyNavbar, LoadingScreen | Shows all enemies, selected enemy preview, location filter, and create/delete/details actions |
| `/enemy-details/:enemyId` | EnemyDetails | MyNavbar, LoadingScreen | Shows one enemy's full details and links to related locations |
| `/edit-enemy/:enemyId` | EditEnemy | MyNavbar, LoadingScreen | Shows a form to update an existing enemy |
| `/create-enemy` | CreateEnemy | MyNavbar, LoadingScreen | Shows a form to create a new enemy |
| `/location-list` | LocationList | MyNavbar, LoadingScreen | Shows all locations |
| `/location-details/:locationId` | LocationDetails | MyNavbar, LoadingScreen | Shows one location's details, image carousel, and related enemies |
| `/error` | ErrorPage | MyNavbar | Shows the error page after failed requests |
| `*` | ErrorPage | MyNavbar | Shows the error page for unknown routes |

## Other Components

- MyNavbar
- LoadingScreen
- AddForm

## API Models

### Enemy

```js
{
  id: string,
  name: string,
  images: string,
  briefDescription: string,
  behaviour: string,
  health: number,
  geo: number,
  locationIds: string[]
}
```

### Location

```js
{
  id: string,
  location: string,
  description: string,
  images: string[],
  tramAccess: boolean,
  enemyIds: string[]
}
```

## Environment Variables

Create a `.env` file in the client root and add the API URL:

```bash
VITE_SERVER_URL=http://localhost:5005
```

Use the correct port for your server.

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

## Links

### Collaborators

[Oluyemi Ogunbadejo](https://github.com/Yemi7)

### Project

[Repository Link Client](https://github.com/Yemi7/hunter-journal-client)

[Repository Link Server](https://your-server-repository-url-here.com)

[Deploy Link](https://your-deploy-url-here.com)

### Trello

[Link to your trello board](https://your-trello-url-here.com)

### Slides

[Slides Link](https://your-slides-url-here.com)
