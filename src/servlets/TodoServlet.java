package servlets;

import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServlet;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import objects.Todo;

/**
 * Servlet implementation class Todo
 */
@Path("/todo")
public class TodoServlet extends HttpServlet {
	ConcurrentHashMap<Integer, Todo> data;

    public TodoServlet() {
        super();
        data = new ConcurrentHashMap<Integer, Todo>();
    }
    @GET
    @Path("{id}")
    public Response getSpecificTodo(@PathParam("id") int id) {
    	return Response.ok(data.get(id), "application/json").build();
    }
    @GET
    public Response getAllTodos() {
    	return Response.ok(data, "application/json").build();
    }
    @POST
    public Response createTodo(Todo todo) {
    	data.put(todo.getId(), todo);
    	boolean success = true;
    	String json = "{ \"success\": " + success + "}"; 
    	return Response.ok(json, "application/json").build();
    }
    @PUT
    public Response updateTodo(Todo todo) {
    	boolean success = false;
    	if (data.replace(todo.getId(), todo) != null) {
    		success = true;
    	}
    	String json = "{ \"success\": " + success + "}"; 
    	return Response.ok(json, "application/json").build();
    	
    }
    @DELETE
    @Path("{id}")
    public Response deleteTodo(@PathParam("id") int id) {
		data.remove(id);
		boolean success = false;
		if (data.get(id) == null) {
			success = true;
		}
    	String json = "{ \"success\": " + success + "}"; 
    	return Response.ok(json, "application/json").build();
    }

}
