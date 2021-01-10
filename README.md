[![game-workflow-shield]][game-repo]


# User Endpoint

## Overview

This repo contains the user source code for the [user endpoint](https://user-api-endpoint.herokuapp.com). The endpoint handles *all* that has to do with manipulating user data/information between the application and the data persistency layer (MongoDB Database). This is a stateless RESTful API.

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

#### NOTE: Registering users through [register endpoint controller](https://github.com/noahgreff/register-controller-api/) omits sensitive fields such as `password` entirely 

</br>

* ### **`/user/find`**

##### Description: Creates a new user

> * http verb: *`POST`*
> * reponse code: `200`
> * response type: *JSON*
>
> Returns a [User](#user-object) object

##### Url Body Paramaters:

|param|description|type|default|
|---:|---|:---:|:---:| 
| **`email`** | A valid email of the user. |*string* |
| **`username`** | The username of the user |*string* |
| **`steamid`** | The unique base64 id attributed to each Steam user |*integer* |

#### Usage

Finding a user with data:
* `steamid`: **76561198272843849**

Will yeild:

```json
{
    "auth": {
        "enabled": false,
    },
    "steamid": "76561198272843849",
    "_id": "25e9aecd-acc1-4513-b960-ee4c1915a613",
    "username": "DELICATE-MOOSE",
    "email": "example@email.com",
    "created_at": "Sun Jan 10 2021"
}
```

</br>

* ### **`/user/update`**

##### Description: Updates an existing user's information

#### NOTE: Only the owner of the account who has access to the `token` can update information

> * http verb: *`PUT`*
> * reponse code: `200`
> * response type: *JSON*
>
> Returns a [User](#user-object) object

##### Url Body Paramaters:

The body of this request is composed of two segments:
* `find`: specifies which user to update 
* `with`: specifies what infromation to update and how

* Example

```json
{
    "find": {
        "email" : "example@email.com"
    },
    "with": {
        "steamid": 76561198272843849
    }
}
```

|param|description|type|default|
|---:|---|:---:|:---:| 
| **`username`** | The username of the user |*string* |
| **`password`** |  The **encrypted** password of the user |*string* |
| **`email`** | A valid email address of the user to receive notifications with |*string* |
| **`steamid`** | The unique base64 id attributed to each Steam user |*integer* |*null* |
| **`auth:enabled`** | Determines whether the user has two factor authentification enabled on the account. If enabled, login method changes for this user globally. If a smartphone  application were to be developped and the user signed in, they would go through the two-step verification process |*boolean* |

#### Usage

Update a user with `email` **example@email.com** with data:
* `auth:enabled`: **true**

Will yeild:

```json
{
    "_id": "25e9aecd-acc1-4513-b960-ee4c1915a613",
    "email": "example@email.com",
    "username": "DELICATE-MOOSE",
    "token": "5d8daee76568f53f6c00be4a46c268",
    "created_at": "Sun Jan 10 2021",
    "steamid": "76561198272843849",
    "auth": {
        "enabled": true
    }
}
```

Note how `auth:enabled` is now set to **true**. This user now has an account the required two factor authentification and next time they will login in the will be asked to enter a token sent to them by email.

</br>







[user-workflow-shield]: https://github.com/noahgreff/user-api-endpoint/workflows/User%20Endpoint%20CI/badge.svg
[user-repo]: https://github.com/noahgreff/user-api-endpoint/
