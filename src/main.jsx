import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';
import './index.css';
import './lib/i18n';

// Initialize Sentry Error Tracking
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
});

// Initialize PostHog Analytics
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
  });
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key (Clerk)");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </StrictMode>,
);
