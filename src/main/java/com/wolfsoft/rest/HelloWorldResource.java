package com.wolfsoft.rest;

import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;

// The Java class will be hosted at the URI path "/helloworld"
@Path("helloworld")
public class HelloWorldResource {
    
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    @Path("getMessage")
    public String getClichedMessage() {
        // Return some cliched textual content
        return "Hello World - Farith";
    }
    
    @GET
    @Path("{name}")
    public String sayHello(@PathParam("name") String name){
        StringBuilder stringBuilder = new StringBuilder("SandBox | Hello ");
        stringBuilder.append(name).append("!");

        return stringBuilder.toString();
    }    
}