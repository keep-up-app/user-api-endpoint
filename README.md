[![game-workflow-shield]][game-repo]


# User Endpoint

## Overview

This repo contains the user source code for the [user endpoint](https://user-endpoint-api.herokuapp.com). The endpoint handles *all* that has to do with manipulating user data/information between the application and the data persistency layer (MongoDB Database). This is a stateless RESTful API.

## User Object

|name|description|type|default|required| 
|---:|---|:---:|:---:|:---:| 
| **`username`** | The username of the user |*string* || true |
| **`password`** |  The **encrypted** password of the user |*string* || true |
| **`email`** | A valid email address of the user to receive notifications with |*string* || true |
| **`steamid`** | The unique base64 id attributed to each Steam user |*integer* |*null* | false |
| **`created_at`** | The time at which the account was created | *datetime* |
| **`token`** | The temporary valid token of the the user to be used instead of the username/password credentials |*string* |
| **`auth:enabled`** | Determines whether the user has two factor authentification enabled on the account. If enabled, login method changes for this user globally. If a smartphone  application were to be developped and the user signed in, they would go through the two-step verification process |*boolean* | false |
| **`auth:secret`** | The secret used to generate 2FA token. **server-sided only** |*string* | null |

## Endpoint URIs

* ### **`/user/create`**

##### Description: Creates a new user

> * http verb: *`POST`*
> * reponse code: `201`
> * response type: *JSON*
>
> Returns a [User](#user-object) object

##### Url Body Paramaters:

|param|description|type|default| 
|---:|---|:---:|:---:| 
| **`email`** | A valid email of the user. |*string* |
| **`password`** | A valid desired password that presents both charaters and numbers (integers) |*string* |

#### Usage

Creating a new user with data:
* `email`: **example@email.com**
* `password`: **alphanumerical_1234**

```
https://game-api-endpoint.herokuapp.com/game/owned/76561198272843849
```

Will yeild:

```json
{
    "auth": {
        "enabled": false,
        "secret": null
    },
    "steamid": null,
    "_id": "25e9aecd-acc1-4513-b960-ee4c1915a613",
    "username": "DELICATE-MOOSE",
    "email": "example@email.com",
    "password": "$2b$10$qioDW8dyjyqphazY.72jiuOiCiUry1Sy4epwp1zwRfQIPciQUB/7a",
    "token": "5d8daee76568f53f6c00be4a46c268",
    "created_at": "Sun Jan 10 2021"
}
```

### NOTE: Registering uers through [register endpoint controller][register-repo] omits `password` field entirely 

* ##### Error case: **user exists**
> reponse code: `400`

```json
{
    "error": "User already exists."
}
```

</br>


[user-workflow-shield]: https://github.com/noahgreff/user-api-endpoint/workflows/User%20Endpoint%20CI/badge.svg
[user-repo]: https://github.com/noahgreff/user-api-endpoint/

[register-repo]: https://github.com/noahgreff/register-controller-api/


