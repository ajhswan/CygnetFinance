# create-react-app with a Node server on Heroku

A minimal example of using a Node backend (server for API, proxy, & routing) with a [React frontend](https://github.com/facebookincubator/create-react-app).

* 📐 [Design Points](#user-content-design-points)
* 🕺 [Demo](#user-content-demo)
* 🚀 [Deploy to Heroku](#user-content-deploy-to-heroku)
* ⤵️ [Switching from create-react-app-buildpack](#user-content-switching-from-create-react-app-buildpack)
* 🎛 [Runtime Config](#user-content-runtime-config)
* 💻 [Local Development](#user-content-local-development)

To deploy a frontend-only React app, use the static-site optimized  
▶️ [create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack)


## Design Points

A combo of two npm projects, the backend server and the frontend UI. So there are two `package.json` configs and thereforce [two places to run `npm` commands](#user-content-local-development):

  1. [**Node server**](server/): [`./package.json`](package.json)
      * [deployed automatically](https://devcenter.heroku.com/categories/deployment) via heroku/nodejs buildpack
  2. [**React UI**](react-ui/): [`react-ui/package.json`](react-ui/package.json)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)
      * deployed via `build` script in the Node server's [`./package.json`](package.json)
      * module cache configured by `cacheDirectories`

Includes a minimal [Node Cluster](https://nodejs.org/docs/latest-v8.x/api/cluster.html) [implementation](server/index.js) to parallelize the single-threaded Node process across the available CPU cores.

## Demo

[Demo deployment](https://cra-node.herokuapp.com/): example API call from the React UI is [fetched with a relative URL](react-ui/src/App.js#L16) that is served by an Express handler in the Node server.


## Deploy to Heroku

```bash
cd into project root folder
heroku create
git push heroku master
```

This deployment will automatically:

  * detect [Node buildpack](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)
  * build the app with
    * `npm install` for the Node server
    * `npm run build` for create-react-app
  * launch the web process with `npm start`
    * serves `../react-ui/build/` as static files
    * customize by adding API, proxy, or route handlers/redirectors

⚠️ Using npm 5’s new `package-lock.json`? We resolved a compatibility issue. See [PR](https://github.com/mars/heroku-cra-node/pull/10) for more details.

👓 More about [deploying to Heroku](https://devcenter.heroku.com/categories/deployment).


## Switching from create-react-app-buildpack

If an app was previously deployed with [create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack), then a few steps are required to migrate the app to this architecture:

1. Remove **create-react-app-buildpack** from the app; [heroku/nodejs buildpack](https://devcenter.heroku.com/articles/nodejs-support#activation) will be automatically activated
  
    ```bash
    heroku buildpacks:clear
    ```
1. Move the root React app files (including dotfiles) into a `react-ui/` subdirectory

    ```bash
    mkdir react-ui
    git mv -k [!react-ui]* react-ui/
    mv node_modules react-ui/
    
    # If you see "fatal: Not a git repository", then fix that error
    mv react-ui/.git ./
    ```
    ⚠️ *Some folks have reported problems with these commands. Using the `bash` shell will probably allow them to work. Sorry if they do not work for you, know that the point is to move **everything** in the repo into the `react-ui/` subdirectory. Except for `.git/` which should remain at the root level.* 
1. Create a root [`package.json`](package.json), [`server/`](server/), & [`.gitignore`](.gitignore) modeled after the code in this repo
1. Commit and deploy ♻️
  
    ```bash
    git add -A
    git commit -m 'Migrate from create-react-app-buildpack to Node server'
    git push heroku master
    ```
1. If the app uses [Runtime configuration](https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-runtime-configuration), then follow [Runtime config](#user-content-runtime-config) below to keep it working.

## Runtime Config

create-react-app itself supports [configuration with environment variables](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables). These compile-time variables are embedded in the bundle during the build process, and may go stale when the app slug is promoted through a pipeline or otherwise changed without a rebuild. See create-react-app-buildpack's docs for further elaboration of [compile-time vs runtime variables](https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-compile-time-vs-runtime).

[create-react-app-buildpack's runtime config](https://github.com/mars/create-react-app-buildpack/blob/master/README.md#user-content-runtime-configuration) makes it possible to dynamically change variables, no rebuild required. That runtime config technique may be applied to Node.js based apps such as this one.

1. Add the inner buildpack to your app, so that the `heroku/nodejs` buildpack is last:

   ```bash
   heroku buildpacks:add -i 1 https://github.com/mars/create-react-app-inner-buildpack
   
   # Verify that create-react-app-inner-buildpack comes before nodejs
   heroku buildpacks
   ```
2. Set the bundle location for runtime config injection:

   ```bash
   heroku config:set JS_RUNTIME_TARGET_BUNDLE='/app/react-ui/build/static/js/*.js'
   ```
3. Now, build the app with this new setup:

   ```bash
   git commit --allow-empty -m 'Enable runtime config with create-react-app-inner-buildpack'
   git push heroku master
   ```

## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`
1. **React UI** in `react-ui/` directory.

### Run the API server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node

```bash
npm install package-name --save
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](react-ui/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd react-ui/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd react-ui/

npm install package-name --save
```
