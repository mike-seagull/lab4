package objects;

public class Todo {

	private int id;
	private String message;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public boolean equals(Todo todo) {
		if (todo.getId() == id && message.equals(todo.getMessage())) {
			return true;
		}else {
			return false;
		}
	}
}
