# ECOMVISION
MERN Admin dashboard for ecommerce app.

## Client

`ReactJs`, `React Material`, `Redux toolkit`, `Nivo charts`

add `.env.local` file to add backend base URL.
```bash
`REACT_APP_BASE_URL=http://localhost:5001`
```

### Installation
```bash
npm install
```

### Start local server
```bash
npm start
```



## Server

`NodeJs`, `mongoose`

add `env` file to configure `mongoose`
```bash
MONGO_URL=URL TO MONGO DB
PORT=PORT(5001)
```
### Installation
```bash
npm install
```
### MongoDB config
After creating mongodb
Uncomment the following code from `index.js` in server folder.
```bash
    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
```

### Start local server
```bash
npm start
```

### Comment data populating code
again comment below  code.( This code will add date to the mongodb, once data populated, it is no longer needed)
```bash
    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
```

