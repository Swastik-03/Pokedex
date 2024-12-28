# Pokedex Lite Web App

## Description

Pokedex Lite is a web application that allows users to explore Pokémon by searching, filtering by type, viewing details, and managing favorites. The app integrates with the PokéAPI to fetch Pokémon data, display it in a responsive UI, and support features like pagination, search, filtering by type, and persistent favorites.

## Features

- **Pokémon Listing**: Displays Pokémon names and images in a responsive grid layout.
- **Search**: Allows users to search for Pokémon by name.
- **Filter by Type**: Filter Pokémon by their types (e.g., Fire, Water, Grass).
- **Pagination**: Load Pokémon data in chunks to improve performance.
- **Favorites**: Mark Pokémon as favorites and persist them in local storage.
- **Pokémon Details**: View detailed information about a Pokémon in a modal (including stats, abilities, and types).
- **User Authentication (Bonus)**: Login with GitHub using OAuth via NextAuth.
- **Responsive Design**: Works well on mobile, tablet, and desktop devices.

## Technologies Used

- **ReactJS**: A JavaScript library for building user interfaces. React's component-based architecture is ideal for building dynamic, interactive UIs like this one.
- **Next.js**: A React framework for building server-rendered applications. Next.js is used for its built-in routing, SSR capabilities, and optimization features.
- **NextAuth.js**: An authentication library for Next.js. It is used to implement OAuth authentication with GitHub.
- **PokéAPI**: A public API that provides Pokémon data. It is used to fetch Pokémon information, types, and other related data.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly.
- **Lucide-React**: A library of open-source icons for React. Used for search and favorite icons in the UI.

## Installation and Running the App

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pokedex-lite.git
cd pokedex-lite
```

### 2.Install Dependencies
Run the following command to install the necessary dependencies:

```bash
npm install
```
### 3.Set Up Environment Variables
Create a ```.env.local``` file in the root of your project and add the following environment variables:
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```
You can get the GitHub OAuth credentials from the [GitHub Developer Portal](https://github.com/settings/apps).

### 4. Run the Development Server
Once the dependencies are installed, run the development server:
```bash
npm run dev
```
The app should now be accessible at ```http://localhost:3000```

## How it Works 

### Data Fetching

The app fetches data from the PokéAPI, which provides information about Pokémon, their types, and other details. The main endpoints used are:

* /pokemon: Fetches a list of Pokémon.
* /type: Fetches a list of available Pokémon types.
* /pokemon/{id}: Fetches detailed information about a specific Pokémon.

### Features Breakdown

#### Pagination
The app fetches a list of 20 Pokémon per page using the ```limit``` and ```offset``` parameters from the PokéAPI. This allows users to navigate through pages of Pokémon without overwhelming the app with too much data at once.

#### Search
When a user searches for a Pokémon, the app filters through the entire Pokémon list. This can be inefficient for large datasets, so we’ve designed the search functionality to query the entire list of Pokémon names and URLs from the ```/pokemon``` endpoint, allowing for faster searching.
#### Filter by Type
When filtering by type, the app queries the ```/type``` endpoint to get a list of all Pokémon types. Then, it filters the Pokémon by matching their types. If a Pokémon has multiple types, it’s included in the filtered list. This involves connecting the Pokémon type API with each Pokémon’s type, checking if it matches the selected filter(s).
#### Favorites
Favorites are stored in ```localStorage``` so that they persist across page reloads. The user can mark a Pokémon as a favorite, and the app will store the Pokémon's name and URL.
#### Pokémon Details
When a user selects a Pokémon, the app fetches detailed information from the ```/pokemon/{id}``` endpoint, which includes stats, abilities, and types. This information is displayed in a modal.

#### User Authentication (Bonus Feature)
The app uses NextAuth.js to handle user authentication. GitHub OAuth is implemented to allow users to log in using their GitHub accounts. This feature is optional but adds a layer of interactivity and personalization to the app.

## Challenges and Solutions

### 1.Loading Pokémon Images Efficiently
The PokéAPI does not provide direct access to images in the Pokémon list. Instead, images are fetched from each individual Pokémon’s detailed data. To optimize performance, I initially faced the challenge of loading Pokémon images only when necessary. I implemented pagination to load images for only the Pokémon currently displayed on the page. However, this presented a challenge when dealing with search and filter features, as the images for the filtered Pokémon had to be fetched dynamically, which could lead to additional loading time.
#### Solution:
To solve this, I first fetch only the names and URLs of Pokémon from the /pokemon endpoint. Then, based on the current page, search, or type filter, I fetch the details for only the relevant Pokémon. This reduces the number of unnecessary API calls and ensures that images and detailed data are only loaded when required.

### 2.Handling Search and Filters Efficiently
The main challenge with search and filters is that Pokémon can have multiple types, and when searching or filtering, the app needs to go through the entire Pokémon list to match the criteria. For example, when filtering by type, I had to check the types of all Pokémon in the database, even if they weren’t currently visible on the page. This required querying the entire database and checking each Pokémon’s types, which could be inefficient with a large dataset.

#### Solution:
I solved this by first fetching a list of Pokémon names and URLs, and then fetching detailed data (including types and images) only for the Pokémon on the current page. For filtering by type, I queried the /type endpoint to get all Pokémon that belong to the selected type(s). If a Pokémon had multiple types, I checked if any of the selected types are present in the Pokémon's list of types. This approach allowed me to reduce unnecessary API calls and optimize performance.

### 3.Handling Multiple Types for Pokémon
Many Pokémon have multiple types, such as "Fire" and "Flying" for Charizard. When filtering by type, I needed to account for Pokémon with multiple types, ensuring that the app correctly matches Pokémon that have one or more of the selected types.
#### Solution:
To handle this, I implemented a check to see if any of the selected types match the Pokémon's types. If a Pokémon has multiple types, I checked if any of the selected types are present in the Pokémon's list of types. This ensures that Pokémon with multiple types are included in the filtered list.

## Live Demo
You can view the deployed app at: [Pokedex Lite - Live Demo](https://pokedex-beta-one.vercel.app/)

## Conclusion
This project demonstrates how to build a dynamic, responsive web app that interacts with an external API to fetch and display data. By implementing pagination, search, type filtering, and user authentication, I was able to create a full-featured Pokédex with optimized performance.