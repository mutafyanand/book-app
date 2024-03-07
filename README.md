## Run Locally

Install project with yarn

```
   yarn
``` 

write your server port in next.config.js file ,for example my backend is running on 5000 port

```

const nextConfig = {
  env: {
    ServerPort: "http://localhost:5000"
  },
  ...
};
``` 

to run the project  


```
yarn dev
``` 