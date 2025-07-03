# Currency Rate Viewer

This is a simple web application that displays the latest and historical exchange rates.

## Features

- View the latest exchange rates for various currencies.
- Select a date to view historical exchange rates.
- Infinite scroll to lazy-load more currencies.
- Docker support for easy setup.

## Tech Stack

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Prisma](https://www.prisma.io/) - ORM
- [SQLite](https://www.sqlite.org/index.html) - Database

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Local Development

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd currency-rate
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up the database**

    This command will create the `dev.db` SQLite database file and run the seed script to populate it with initial data.

    ```bash
    npx prisma db push --accept-data-loss
    npx prisma db seed
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker

1.  **Build the Docker image**

    ```bash
    docker build -t currency-rate .
    ```

2.  **Run the Docker container**

    ```bash
    docker run -p 3000:3000 currency-rate
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

    Note: The Docker container uses the production build of the application. The database is bundled with the image.

## API Endpoint

The application provides a single API endpoint to fetch exchange rates.

- `GET /api/rates`

**Query Parameters:**

- `date` (optional): The date for which to fetch historical rates, in `YYYY-MM-DD` format. If not provided, the latest rates for all currencies are returned.
- `page` (optional): The page number for pagination (12 items per page). Defaults to `1`.

"""
Scaling Consideration

- the requirement are up to day level of currency querying, if we have to scale into minute / seconds of currency, the design will not scale. Would recommend to use Clickhouse as a timeseries database solution.
