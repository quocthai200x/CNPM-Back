#### Hướng dẫn cài đặt:
+ Tải project về máy (yêu cầu máy có sẵn nodejs)
+ Cài đặt các dependencies thông qua lệnh: **npm install** (lưu ý: cần chỉ đường dẫn về project)
+ Để chạy, lệnh: **npm run dev** (lệnh này sẽ chạy trên môi trường dev)
+ Nếu project bị app crushed, lỗi thì khả năng như sau:
    - Lỗi trùng cổng, lên gg search **how to kill process port** rồi vào stackoverflow
    - Lỗi liên quan đến cài đặt môi trường, nếu kiểm tra trong project mà thiếu file **.env** thì project này sẽ không hoạt động được


#### File .env như sau:
APP_ID=my_PRJ
PORT=6969
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=mySecret
OPENAPI_SPEC=/api/spec
OPENAPI_ENABLE_RESPONSE_VALIDATION=false
DB_USER=quocthai2000x
DB_PASSWORD=Ta0kh0ngn0i
DB_NAME=linux



# my_PRJ

My cool app

## Get Started

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

## How do I modify the example API and make it my own?

There are two key files that enable you to customize and describe your API:
1. `server/routes.js` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.
2. `server/common/api.yaml` - This file contains your [OpenAPI spec](https://swagger.io/specification/). Describe your API here. It's recommended that you to declare any and all validation logic in this YAML. `express-no-stress-typescript`  uses [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator) to automatically handle all API validation based on what you've defined in the spec.

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```





#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open your browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```

#### Debug with VSCode

Add these [contents](https://github.com/cdimascio/generator-express-no-stress/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file
## Lint It

View prettier linter output

```
npm run lint
```

Fix all prettier linter errors

```
npm run lint
```

## Deploy It

Deploy to CloudFoundry

```shell
cf push my_PRJ
```


   
