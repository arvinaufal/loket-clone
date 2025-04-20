# Loket Clone: A Sibling of Loket.com

Web-based application that allows users to add and remove ticket wishlists, as well as search for tickets based on specific keywords.

This project is a functional clone of Loket.com, built for educational purposes as part of Hacktiv8 Indonesia's Phase 3 curriculum. It mimics core features of the original platform, including ticket browsing, wishlist management, and keyword-based search.

## Table of Contents
- [Loket Clone: A Sibling of Loket.com](#loket-clone-a-sibling-of-loketcom)
  - [Table of Contents](#table-of-contents)
  - [Technology Used and How It Works](#technology-used-and-how-it-works)
    - [\> Technology Stack :](#-technology-stack-)
      - [1. **NextJs**](#1-nextjs)
      - [2. **TypeScript**](#2-typescript)
      - [3. **MongoDB**](#3-mongodb)
  - [Installation and Environment Setup](#installation-and-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
      - [1. Clone the repository:](#1-clone-the-repository)
      - [2. Set up the project:](#2-set-up-the-project)
  - [API endpoints in NextJs](#api-endpoints-in-nextjs)
    - [Available Endpoints:](#available-endpoints)
  - [Contact](#contact)


## Technology Used and How It Works

### > Technology Stack :

#### 1. **NextJs**
   - **Role**: Fullstack Framework
   - **Description**: Next.js powers both the frontend and backend of this application, enabling server-side rendering (SSR), client-side rendering (CSR), API routes, and dynamic UI updates. It provides a seamless experience for users browsing events and managing wishlists, while also handling admin-side ticket/products management (if applicable).
   - **How It Works**:
     - Next.js serves the responsive frontend (pages, components, and search functionality).
     - API routes (in /pages/api) process ticket searches, wishlist updates, and user authentication.
     - Dynamic routing (e.g., /whislists/[id]) generates whislist detail pages on demand.

#### 2. **TypeScript**
   - **Role**: Type-Safe JavaScript
   - **Description**: TypeScript ensures code reliability by enforcing type checks during development, reducing runtime errors in features like search filters and wishlist interactions.
   - **How It Works**:
     - Interfaces define event data structures (e.g., Ticket/Product, User).
     - Type guards validate API responses (e.g., when fetching tickets/products from MongoDB).

#### 3. **MongoDB**
   - **Role**: Database
   - **Description**: MongoDB stores ticket data, user wishlists, and ticket/product details in flexible, JSON-like documents.
   - **How It Works**:
     - All client data and request information are securely stored in MongoDB.
     - The NextJs interacts with MongoDB to retrieve and update data as needed.

<br>

## Installation and Environment Setup

### Prerequisites
- Typescript
- NextJs
- MongoDB
- Git

### Steps
#### 1. Clone the repository:
  + Clone the github repository
    ```bash
    git clone https://github.com/arvinaufal/loket-clone
    ```
  + Move to the project folder
    ```bash
    cd loket-clone
    ```

#### 2. Set up the project:
  + Install the required packages
    ```bash
      composer i
    ```
  + Add a `.env` file, and fill the following keys below:
    ```bash
        NODE_ENV=
        MONGODB_CONNECTION_URI=
        MONGODB_DB_NAME=
        NEXT_PUBLIC_BASE_URL=
        JWT_SECRET_KEY=
    ```

  + Create the mongodb database

  + Run the development server
    ```bash
        npm run dev
    ```

## API endpoints in NextJs
### Available Endpoints:

 + /api/products - API for READ Products/Tickets.
 + /api/wishlists - API for READ, CREATE, and DELETE Wishlists.
 + /api/users - API for Auth.


## Contact

If you have any questions or encounter any problems during the installation, please do not hesitate to contact me on Gmail: arvinaufalagustian@gmail.com