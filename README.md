# shiptrack
track your packages for the holiday



### install & run

create a config file, app.json, that looks like this:

```
{
  "apps" : [{
    "name"        : "static-api-server",
    "script"      : "server.js",
    "watch"       : false,
    "node_args"   : "--harmony",
    "merge_logs"  : true,
    "cwd"         : "/home/rabbit/scripts/shiptrack",
    "exec_mode"   : "fork",
    "env": {
        "REDIS_ADDRESS": "127.0.0.1",
        "FACEBOOK_APP_KEY": "xxxxxxxxx",
        "FACEBOOK_APP_SECRET": "xxxxxxxxx"
    }
  }]
}
```


install dependencies

    npm install

run

    npm start

pm2 will take over, forking the process into the background. manage the server process using pm2

    pm2 list

pm2 will show the process as 'static-api-server'. check it's log using `pm2 logs static-api-server`

## client side brainstorming

### Backbone


#### Models

* user
  * id
  * name (optional)
  * email (optional)
  * facebook (optional)
  * twitter (optional)

* tracking detail
  * tracking number
  * carrier
  * notification method
  * associated user id


#### collections

* tracking details
* users



