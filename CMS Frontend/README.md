# CMS Frontend

## Public Dev Environment

Please see [the cloudwatch dashboard](https://cloudwatch.amazonaws.com/dashboard.html?dashboard=Curtin-Biomedical-Frontends&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTM2MzgzNzMzODU0NCIsIlUiOiJ1cy1lYXN0LTFfNnhHMVc0ajZXIiwiQyI6IjNwdmY4M3Vmb3JmaHJiMXUyZHR1NHZhN204IiwiSSI6InVzLWVhc3QtMToxOWQ2NjMxNy0xMzExLTQ0ODItYjE3ZC04ZjcyZWI0YjQwYzUiLCJNIjoiUHVibGljIn0=)

## Local Dev Environment

### `yarn install`
Read the yarn.lock and install all packages listed there

### `yarn test`
Run the react test suite and check everything is still working according to snapshots.

### `yarn start`
Run the app in development mode

### `yarn build`
Build the app for a static deployment

## CI/CD Deployment
Deploy the app by running the BuildTestDeploy script.