<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Resonance

A mobile-optimized resonant breathing app designed to maximize heart rate variability and vagal tone through paced 0.1Hz respiratory cycles.

View your app in AI Studio: https://ai.studio/apps/4ad45936-3f78-4328-b65f-0fc5822b4591

## Tech Stack

- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

## Run Locally

**Prerequisites:** Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key if you plan to extend the AI features.

3. **Run the app:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs TypeScript type checking.
- `npm run clean`: Removes the `dist` directory.

## Contributing

We welcome contributions! To start contributing:

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies** using `npm install`.
3. **Make your changes**.
4. **Test your changes**: Ensure the app builds and lints correctly by running:
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**: Ensure your commit messages are descriptive.
6. **Push to your fork** and submit a Pull Request.

Please make sure your code adheres to the existing styling and conventions used in the project.
