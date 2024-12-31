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
  - Update match data in the Google Sheet via Airtable API.

## 2.7 View Upcoming Matches
- Users can view a full list of matches for the next game week.
