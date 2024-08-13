# Task Manager App

A robust and efficient Task Manager application designed to streamline your daily tasks. This app allows users to create, read, update, and delete tasks with ease, all while ensuring smooth asynchronous handling for a seamless user experience.

## Features

1. **CRUD Operations**: Manage your tasks effectively with full Create, Read, Update, and Delete functionalities.
2. **Async Handling**: Ensures smooth and efficient data processing, enhancing user experience by handling operations asynchronously.

## How to Run?

1. Install the necessary dependencies:

   ```bash
   npm install

   ```

2. Set up environment variables by filling in the required details in the .env file.

3. Generate Prisma client:

   ```bash
   npx prisma generate

   ```

4. Push the Prisma schema to your database :

   ```bash
   npx prisma db push

   ```

5. Start the development server :

   ```bash
   npm run dev

   ```
