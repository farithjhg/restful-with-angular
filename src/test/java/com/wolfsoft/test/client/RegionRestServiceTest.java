package com.wolfsoft.test.client;

import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.wolfsoft.hr.entity.Regions;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.MediaType;

import java.io.IOException;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static junit.framework.Assert.*;

public class RegionRestServiceTest {

    private final ClientProvider clientProvider;
    private WebResource webService;

    public RegionRestServiceTest() {
        clientProvider = new ClientProvider();
    }

    @Before
    public void startServer() throws IOException {
        webService = clientProvider.getWebResource();
    }

    @After
    public void stopServer() {
        
    }


    @Test
    public void testGetAllRegionsShouldReturnSuccessStatus() throws IOException {
        ClientResponse resp = webService.path("getAllRegions")
                .accept(MediaType.APPLICATION_JSON)
                .get(ClientResponse.class);
        System.out.println("Got stuff: " + resp);

        assertEquals(200, resp.getStatus());
    }

    @Test
    public void testGetAllRegionsShouldReturnJSArray() throws IOException {
        ClientResponse resp = webService.path("getAllRegions")
                .accept(MediaType.APPLICATION_JSON)
                .get(ClientResponse.class);
        System.out.println("Got stuff: " + resp);
        String actual = resp.getEntity(String.class);
        JSONArray array = null;
        JSONObject obj = null;
        try {
			array = new JSONArray(actual);
			for (int i = 0; i < array.length(); i++) {
				obj = array.getJSONObject(i);
				System.out.println("Object "+(i+1)+"/"+array.length()+": "+obj.toString());
				System.out.println("regionId: "+obj.get("regionId"));
				System.out.println("regionName: "+obj.get("regionName"));
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
        assertTrue("Result must be a JavaScript array: But it starts with '{'!", !actual.startsWith("{"));
        assertTrue("Result must be a JavaScript array: But it does not start with '['!", actual.startsWith("["));
    }

    @Test
    public void testGetRegionByIdShouldReturnSuccessStatus() throws IOException {
        ClientResponse resp = webService.path("/1")
                .accept(MediaType.APPLICATION_JSON)
                .get(ClientResponse.class);
        System.out.println("Got stuff: " + resp);

        assertEquals(200, resp.getStatus());
    }

    @Test
    public void testGetRegionByIdOneShouldReturnFirstRegion() throws IOException {
        ClientResponse resp = webService.path("/1")
                .accept(MediaType.APPLICATION_JSON)
                .get(ClientResponse.class);
        System.out.println("Got stuff: " + resp);
        String actual = resp.getEntity(String.class);
        JSONObject obj = null;
        try {
			obj = new JSONObject(actual);
			System.out.println("Object: "+obj.toString());
	        assertNotNull(obj);
	        assertTrue(obj.getString("regionId").equals("1"));
		} catch (JSONException e) {
			e.printStackTrace();
		}        
    }

    @Test
    public void testCreateRegionShouldReturnNewRegionWithCorrectId() throws IOException {
    	Regions region = new Regions();
    	region.setRegionId(3);
    	region.setRegionName("Asia");
        ClientResponse resp = webService.path("")
                .type(MediaType.APPLICATION_JSON_TYPE)
                .accept(MediaType.APPLICATION_JSON)
                .post(ClientResponse.class, region);

        System.out.println("Got stuff: " + resp);
        String actual = resp.getEntity(String.class);
        String expectedId = "\"regionId\":3";

        assertTrue(actual.contains(expectedId));
    }

    @Test
    public void testUpdateRegionShouldReturnUpdatedRegion() throws IOException {

    	Regions updateRegion = new Regions();
    	updateRegion.setRegionId(8);
    	updateRegion.setRegionName("Regions");

        ClientResponse resp = webService.path("/8")
                .type(MediaType.APPLICATION_JSON_TYPE)
                .accept(MediaType.APPLICATION_JSON)
                .put(ClientResponse.class, updateRegion);

        System.out.println("Got stuff: " + resp);
        String actual = resp.getEntity(String.class);
        String expectedId = "\"regionId\":8";
        String expectedName = "\"regionName\":\"Regions\"";

        assertTrue(actual.contains(expectedId));
        assertTrue(actual.contains(expectedName));
    }

    @Test
    public void testRemoveRegionShouldReturnSuccessStatus() throws IOException {
    	
    	Regions deleteObject = new Regions();
    	deleteObject.setRegionId(8);
    	deleteObject.setRegionName("Regions");
    	
        ClientResponse resp = webService.path("/8")
                .type(MediaType.APPLICATION_JSON_TYPE)
                .accept(MediaType.APPLICATION_JSON)
                .delete(ClientResponse.class);

        System.out.println("Got stuff: " + resp);
        assertEquals(204, resp.getStatus());  // 204: no content
    }
    
}
