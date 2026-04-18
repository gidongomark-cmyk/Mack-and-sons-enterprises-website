# Setup Instructions for Mack and Sons Enterprises Website

## Running the Backend Express Server

To set up and run the backend Express server:

1. Clone the repository:
   ```bash
   git clone https://github.com/gidongomark-cmyk/Mack-and-sons-enterprises-website.git
   cd Mack-and-sons-enterprises-website
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set up your environment variables accordingly. You can use the `.env.example` as a reference.

4. Start the Express server:
   ```bash
   npm start
   ```

   The server should now be running at `http://localhost:3000`.

## Running the React Native Mobile App Using Expo

To set up and run the React Native mobile app:

1. Make sure you have [Expo CLI](https://docs.expo.dev/get-started/installation/) installed. You can install it globally using npm:
   ```bash
   npm install -g expo-cli
   ```

2. Change to the mobile app directory (if applicable, adjust the path as necessary):
   ```bash
   cd mobile
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Start the Expo development server:
   ```bash
   expo start
   ```

5. Follow the on-screen instructions to run the app on your device or emulator.

---