package org.acme.rest.json;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.containsInAnyOrder;

import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class FruitResourceTest {

    @Test
    public void testList() {
        given()
          .when().get("/api/fruits")
          .then()
             .statusCode(401);
    }

    @Test
    public void testAdd() {
        given()
            .body("{\"name\": \"Pear\", \"description\": \"Winter fruit\"}")
            .header("Content-Type", MediaType.APPLICATION_JSON)
        .when()
            .post("/api/fruits")
        .then()
            .statusCode(401);
    }
}
