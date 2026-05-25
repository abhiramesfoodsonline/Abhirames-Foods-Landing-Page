package com.admin.backend.exceptions;

public class ProductInUseException extends RuntimeException {
    public ProductInUseException(String message) {
        super(message);
    }
}