package com.app.customerException;

@SuppressWarnings("serial")
public class UserNotFoundException extends RuntimeException {
	String message;
public UserNotFoundException(String message) {
	super(message);
	this.message=message;
}
}
