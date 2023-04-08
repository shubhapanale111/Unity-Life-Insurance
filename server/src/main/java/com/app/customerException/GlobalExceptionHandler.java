package com.app.customerException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
@ExceptionHandler(UserNotFoundException.class)
public ResponseEntity<ApiResponse>userNotFoundExceptionHandler(UserNotFoundException e)
{
	String message=e.message;
	ApiResponse apiResponse=new ApiResponse(message,HttpStatus.NOT_FOUND);

	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
	
}
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ApiResponse>resourceNotFoundExceptionHandler(ResourceNotFoundException e)
{
	String message=e.message;
	ApiResponse apiResponse=new ApiResponse(message,HttpStatus.NOT_FOUND);

	return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
	
}
@ExceptionHandler(IOException.class)
public ResponseEntity<ApiResponse>IOExceptionHandler(IOException e)
{
	
	ApiResponse apiResponse=new ApiResponse("Copying File Failed",HttpStatus.BAD_REQUEST);

	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
	
}
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>>handleMethodArgumentNotValidException(MethodArgumentNotValidException e)
{
	Map<String,String>failedValidations=new HashMap<String,String>();
	e.getBindingResult().getAllErrors().forEach((error)->{
		String fieldName=((FieldError)error).getField();
		String fieldMessage=((FieldError)error).getDefaultMessage();
		failedValidations.put(fieldName, fieldMessage);
	});
	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failedValidations);
	
}
}
