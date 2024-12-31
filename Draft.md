# Project Overview

## Objective
To build a web application that allows users to:
- Predict the outcomes of soccer matches.
- Track and compare predictions against actual results.
- View a leaderboard ranking users based on their prediction accuracy.

## Tools and Technologies
- **Authentication**: [clerk/clerk-react](https://clerk.dev/)
- **UI Components**: [shadcn/ui](https://shadcn.dev/)
- **Database**: Airtable (via API)
- **API Calls**: [axios](https://axios-http.com/)
- **Navigation**: [react-router-dom](https://reactrouter.com/)
- **Framework**: [Next.js](https://nextjs.org/) (using App Router)

---

# Core Features and Functionalities

## 2.1 User Authentication
- Users must log in with a password.
- Each user must have a unique username.
- **Implementation**: Use `clerk/clerk-react` for managing authentication.

## 2.2 Home Page
- Display a welcome message.
- Provide buttons to:
  - Enter predictions.
  - View the leaderboard.

## 2.3 Enter Predictions
- Users can enter predictions for all matches in the next game week only.
- **Definition of next game week**:
  - The game week with the lowest number where all matches have a status: `not Started`.
- **Constraints**:
  - Predictions cannot be entered for game weeks that have already started.
  - Matches data will be fetched from a Google Sheet via Airtable API.

## 2.4 View Predictions
- Users can view predictions made by all users for the current game week.
- **Definition of current game week**:
  - The game week with the lowest number where at least one match is scheduled to start later than `NOW` and has a status: `not Started`.

## 2.5 View Leaderboard
- Display a leaderboard that shows:
  - User rankings by total points.
  - Points from the previous game week.
- **Data Source**: Fetched from Airtable.

## 2.6 Match Results Update
- A background job will:
  - Fetch match results daily at 17:00 EST via [RapidAPI](https://rapidapi.com/).
  - Update match data in the database via Airtable API.

## 2.7 View Upcoming Matches
- Users can view a full list of matches for the next game week.

# 3. Project Setup and Best Practices

## 3.1 Project Setup
- All new components should go in `/components` at the root (not in the app folder) and be named like `example-cor`.
- All new pages go in `/app`.
- Use the Next.js 14 App Router.
- All data fetching should be done in a server component and passed down as props.
- Client components (using `useState`, hooks, etc.) require the `'use client'` directive at the top of the file.

## 3.2 Server-Side API Calls
- All interactions with external APIs (e.g., Reddit, OpenAI) should be performed server-side.
- Create dedicated API routes in the `pages/api` directory for each external API interaction.
- Client-side components should fetch data through these API routes, not directly from external APIs.

## 3.3 Environment Variables
- Store all sensitive information (API keys, credentials) in environment variables.
- Use an `.env.local` file for local development and ensure it is listed in `.gitignore`.
- For production, set environment variables in the deployment platform (e.g., Vercel).
- Access environment variables only in server-side code or API routes.

## 3.4 Error Handling and Logging
- Implement comprehensive error handling in both client-side components and server-side API routes.
- Log errors on the server-side for debugging purposes.
- Display user-friendly error messages on the client-side.

## 3.5 Type Safety
- Use TypeScript interfaces for all data structures, especially API responses.
- Avoid using the `any` type to ensure type safety.

## 3.6 API Client Initialization
- Initialize API clients as needed to streamline server-side interactions and reduce redundancy.

# 4. Intergration details
# Requirements

## 4.1 Authentication
- **Sign In/Sign Up**: Use Clerk components for user authentication.
- **Unique Username**: Enforce unique username constraints via validation.

## 4.2 Predictions Management
- Users can fetch upcoming matches using the API.
- **API Example**:
  - **Request**:
    ```javascript
    axios.get('/api/matches/upcoming');
    ```
  - **Response**:
    ```json
    [
      {
        "matchId": 1,
        "homeTeam": "Team A",
        "awayTeam": "Team B",
        "gameWeek": 12,
        "status": "not Started",
        "startTime": "2024-01-15T15:00:00Z"
      }
    ]
    ```

## 4.3 Leaderboard
- Users can view the leaderboard using the API.
- **API Example**:
  - **Request**:
    ```javascript
    axios.get('/api/leaderboard');
    ```
  - **Response**:
    ```json
    [
      {
        "username": "user1",
        "totalPoints": 45,
        "previousWeekPoints": 10,
        "rank": 1
      },
      {
        "username": "user2",
        "totalPoints": 40,
        "previousWeekPoints": 8,
        "rank": 2
      }
    ]
    ```

## 4.4 Match Results Update
- Match results will be updated daily using a CRON job.
- **Example CRON Job**:
  ```javascript
  const updateMatchResults = async () => {
    const results = await axios.get('https://api.rapidapi.com/matches');
    await airtableClient.update('Matches', results.data);
  };

  setInterval(updateMatchResults, 24 * 60 * 60 * 1000); // Run daily



