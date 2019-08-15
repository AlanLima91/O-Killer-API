```json
{
    "users": [
        {
            "_id": 1,
            "username": "demo",
            "alive": false,
            "password": "on s'en fout",
            "tags": [
                "5d5436e6df81b529464f3de1",
                "5d9464f3d5436e6de1f81b52"
            ]
        }
    ],
    "tags": [
        {
            "_id": "5d5436e6df81b529464f3de1",
            "name": "example"
        }
    ],
    "missions": [
        {
            "_id": 1,
            "target": "Marjo",
            "action": 2,
            "done": false
        }
    ],
    "actions": [
        {
            "_id": 2,
            "todo": "boire du thé",
            "level": 1,
            "tags": [
                "poison",
                "boisson"
            ],
            "actionType": 3
        }
    ],
    "actionType": [
        {
            "_id": 1,
            "name": "Action"
        },
        {
            "_id": 2,
            "name": "Expression"
        },
        {
            "_id": 3,
            "name": "Partage"
        }
    ],
    "gameplay":[
        {
            "_id": "HEXADECIMAL VALUE",
            "duree": "slnsf",
            "heure de début": "zojgznkg",
            "difficulté": 5,
            "gamers": [
                1,
                3,
                7,
                9
            ]
        }
    ],
    "question": [
        {
            "_id": 1,
            "value": "QUESTION ICI",
            "tags": [
                "Sport",
                "Technologie",
                "Art"
            ],
            "answer": [
                "Sport",
                "Technologie",
                "Art"
            ]
        }
    ]
}
```
# Create GamePlay
```json
{
  "duree":{"value":4,"typeDuree":"heure"},
  "level":3,
  "gamers":[{"key":"test3"},{"key":"test4"}]
}
```

# Norme d'écriture

Une fonction appelé via une URL devrait avoir sa `method HTTP` en `prefix` et sa `ressource` en `radical` : 

```js
public function postUser(req, res) {
    // ...
}
public function getUsers(req, res) {
    // For Get ALL
}
public function getUser(req, res) {
    // For Get ONE
}
public function patchUser(req, res) {
    // For Get ALL
}
public function deleteUser(req, res) {
    // For Get ALL
}
```