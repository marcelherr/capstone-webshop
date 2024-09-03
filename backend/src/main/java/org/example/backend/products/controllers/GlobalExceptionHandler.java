package org.example.backend.products.controllers;

import org.example.backend.products.models.ErrorMessage;
import org.example.backend.products.models.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)

    public ResponseEntity<ErrorMessage> handleProductNotFoundException(ProductNotFoundException error) {
        ErrorMessage errorMessage = new ErrorMessage(error.getMessage(), 404);
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

}
