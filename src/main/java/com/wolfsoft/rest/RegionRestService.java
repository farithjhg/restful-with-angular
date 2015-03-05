package com.wolfsoft.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.wolfsoft.hr.entity.Regions;
import com.wolfsoft.hr.factory.ServicesFactory;
import com.wolfsoft.hr.service.RegionsService;

import java.util.List;

@Path("/regions")
public class RegionRestService {

    private final RegionsService regionService;

    public RegionRestService() {
        this.regionService = ServicesFactory.getRegionsService();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Regions> getAllRegionsInJSON() {
        return regionService.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Regions getRegionById(@PathParam("id") int id) {
        return regionService.findByPK(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Regions save(Regions region) {
        return regionService.save(region);
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Regions update(Regions region) {
        return regionService.save(region);
    }


    @DELETE
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public void remove(@PathParam("id") int id) {
    	regionService.delete(regionService.findByPK(id));
    }    
}
