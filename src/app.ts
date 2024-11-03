import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import { matches } from './routes/matches.js';
import { photos } from './routes/photos.js';
import Keycloak, { KeycloakConfig } from 'keycloak-connect';

// TODO: use knex
const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());
// app.set('trust proxy', true);

const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
  }),
);

const keycloakConfig = {
  resource: process.env.KEYCLOAK_CLIENT_ID,
  'auth-server-url': process.env.KEYCLOAK_SERVER_URL,
  realm: process.env.KEYCLOAK_REALM,
  'bearer-only': false,
  'ssl-required': 'none', // local
  'confidential-port': 0,
  credentials: {
    secret: process.env.KEYCLOAK_SECRET,
  },
} as KeycloakConfig;
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(
  keycloak.middleware({
    logout: '/logout',
    admin: '/admin',
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.send(`
    <h1>Welcome to bgames back</h1>
    <a href="/login">Login/Signup</a>
    <a href="/protected">Protected</a>
  `);
});

app.get('/protected', keycloak.protect(), (_req: Request, res: Response) => {
  res.send(`
    <h1>Protected Content</h1>
    <p>Only authenticated users are allowed to see it.</p>
    <a href="/logout">Logout</a>
  `);
});

app.get('/login', keycloak.protect(), (_req: Request, res: Response) => {
  res.redirect('/protected');
});

app.use('/api/matches', matches);
app.use('/api/photos', photos);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
