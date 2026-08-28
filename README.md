# Reise

Reise is an AI-powered Next.js application for searching one-day travel destinations from a given location with preferred vibes.

My goal was to build a nice portfolio project using the latest technologies and libraries available at that time, implementing their best practices and patterns.

You can see it in action [here](https://ai.mtansk.com).

## Key Features

- **Finding Destinations:** The user enters a start location and desired vibes, and the AI suggests one-day trip destinations with _rich details_.
- **Rich Destination Details:** Each suggestion includes a description, weather forecast, practical tips, and quick links to Google Maps and Google Travel.
- **Favorites:** The user can add and manage their favorite suggestions.
- **Guest Mode and Authorization:** Fully functional guest mode with optional one-click authorization with Google and seamless data transfer to a registered account.

## Tech Stack & APIs

- **Core:** Next.js, TypeScript
- **State & Data:** TanStack Query, Zustand, Zod
- **Authentication:** NextAuth.js
- **UI & Styles:** Shadcn UI, Tailwind CSS
- **Database:** Prisma ORM, PostgreSQL
- **Infrastructure & Deployment:** Linux, Coolify, Docker
- **APIs:** Gemini API, Google OAuth 2.0, OpenWeatherMap, Photon

## What I am Proud Of

- **High Performance:** The application is highly optimized, achieving a 100/100 score in Google Lighthouse Performance.
- **Seamless Data Migration:** One-click data migration pipeline that transfers data from guest mode to a registered user account.
- **Optimistic UI:** TanStack Query's optimistic updates keep the UI instantly responsive without waiting for server response.
- **Design:** Slightly modified Shadcn components + own ideas and animations look very nice.

## Space for Improvements

- **Testing:** Add unit and integration test coverage.
- **Logging:** Implement structured logging.
- **Version Control:** Use Git branches.
- **New Features:** Add suggestions sharing and attractions search within the recommended locations.

## Quick Walkthrough

This short 40-seconds video shows main features of the app, including destinations search, optimistic updates, further suggestions within search, authorization, and data transfer.

https://github.com/user-attachments/assets/34e09cb9-76d9-4d9d-870a-b7cac6fdb57b
