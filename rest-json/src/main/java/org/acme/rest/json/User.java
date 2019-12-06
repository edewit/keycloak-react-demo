package org.acme.rest.json;

public class User {
    private final String userName;

    User(String username) {
        this.userName = username;
    }

    public String getUserName() {
        return userName;
    }
}
