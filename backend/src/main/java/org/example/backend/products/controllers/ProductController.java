package org.example.backend.products.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.products.dto.ProductDto;
import org.example.backend.products.models.Product;
import org.example.backend.products.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")

public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public Product addABook(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }
}
