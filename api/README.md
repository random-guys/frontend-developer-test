Note:

> The API stores the changes in memory, as well as receipts in the receipts folder, restarting the API server will wipe all changes.

# Running the API

To run the api for testing locally simply use the commands:
```sh
npm install
npm start
```
If you use Yarn rather than npm you can also run:
```sh
yarn
yarn start
```

API is now running at `http://localhost:3000`

# Expenses API Documentation

## 1. Listing expenses
---

```
GET /expenses
```

#### Query parameters:
- `limit`: number of expenses to fetch.
- `offset`: number of expenses to skip, for pagination.

#### Example:

```
GET /expenses?limit=25&offset=25
```
This query gets the second page of 25 expenses.

## 2. Get a single expense by ID
---
```
GET /expenses/:id
```
#### Path parameters:
- `id`: The id of the expense to get

## 3. Updating an expense
---
```
PUT /expenses/:id
```
#### Path parameters:
- `id`: The id of the expense to update

#### Body parameters:
- `comment`: The comment to set on an expense


## 4. Uploading a receipt to an expense
---
```
POST /expenses/:id/receipts
```
#### Form parameters:
- `receipt`: The file to add to the expense
