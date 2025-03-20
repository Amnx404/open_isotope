# LiteLLM Proxy with PayU Integration

A unified API proxy service for LLM providers with seamless PayU wallet integration. This service allows you to manage multiple LLM providers through a single endpoint while handling payments and usage tracking efficiently.

## Features

- **Unified API Access**: Single endpoint for multiple LLM providers
- **PayU Integration**: Secure wallet-based payment processing
- **Usage Analytics**: Track API usage and costs
- **User Authentication**: Secure access with NextAuth.js
- **Modern Tech Stack**: Built with T3 Stack (Next.js, tRPC, Prisma, Tailwind CSS)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- PayU merchant account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Configure your environment variables in `.env`
5. Initialize the database:
   ```bash
   npm run db:push
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration

The following environment variables are required:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `PAYU_MERCHANT_KEY`: Your PayU merchant key
- `PAYU_MERCHANT_SALT`: Your PayU merchant salt

## API Usage

Once set up, you can access the LLM providers through our unified API endpoint. Detailed API documentation is available in the dashboard after signing in.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Tailwind CSS](https://tailwindcss.com) - Styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
