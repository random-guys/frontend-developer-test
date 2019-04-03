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

# Payments API Documentation

## 1. Listing payments
---

```
GET /payments
```

#### Query parameters:
- `limit`: number of payments to fetch.
- `offset`: number of payments to skip, for pagination.

#### Example:

```
GET /payments?limit=25&offset=25
```
This query gets the second page of 25 payments.

## 2. Get a single payment by ID
---
```
GET /payments/:id
```
#### Path parameters:
- `id`: The id of the payment to get

## 3. Updating an payment
---
```
PUT /payments/:id
```
#### Path parameters:
- `id`: The id of the payment to update

#### Body parameters:
- `comment`: The comment to set on an payment


## 4. Uploading a receipt to an payment
---
```
POST /payments/:id/receipts
```
#### Form parameters:
- `receipt`: The file to add to the payment
