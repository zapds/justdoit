# Just Do It. 
A todo app that motivates you to Just Do It.

# Features
- Easy login using Google OAuth2
- Real time cloud PostgreSQL sync (via WebSocket)
- Dark mode feature to protect your retina
- Pin to top supported
- Customizable sorting
- Motivational video included
- 

# Installation
Deployed at https://justdoit.zapdos.me. To run locally, 

1. Clone this repository 
```bash
git clone https://github.com/zapds/justdoit.git
```

2. Create a PostgreSQL instance (https://neon.tech/ recommended), and create the tables provided in `schema.sql`

3. Obtain the database connection URL

4. Add Google cloud credentials & database URL in `.env` file for OAuth2 
```bash
DATABASE_URL="postgres://neondb_owner..."
GOOGLE_CLIENT_ID="....apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="..."
```

5. Install dependencies
```bash
cd justdoit
npm i
```

6. Run development server
```bash
npm run dev
``` 