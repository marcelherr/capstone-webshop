package org.example.backend.products.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.products.models.Product;
import org.example.backend.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
