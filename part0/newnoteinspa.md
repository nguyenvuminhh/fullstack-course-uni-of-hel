sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: [{content: "hh", date: "2024-06-23T14:03:02.306Z"},...]
    deactivate server