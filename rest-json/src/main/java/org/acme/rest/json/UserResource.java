package org.acme.rest.json;

import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.json.JsonString;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/api/users")
public class UserResource {
    @Inject
    @Claim(standard = Claims.preferred_username)
    Optional<JsonString> preferredUsername;

    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"user"})
    public User me() {
        return new User(preferredUsername.isPresent() ? preferredUsername.get().getString() : "");
    }
}
