# VS

## Setup

- `npm install`
- To run the app, you'll need to create a postgresql table: `voronoi-studio`.
- Sync and seed your database by running `npm run seed`.

You should be ready to start the app now!

- `start:dev` will both start your server and build your client side files using webpack
- `start:dev:logger` is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- `start:dev:seed` will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
