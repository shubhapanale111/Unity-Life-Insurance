package com.app.customerException;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {
	String message;
public ResourceNotFoundException(String message) {
	super(message);
	this.message=message;
}
}
