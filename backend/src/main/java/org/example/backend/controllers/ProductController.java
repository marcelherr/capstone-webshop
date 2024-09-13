package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ProductDto;
import org.example.backend.models.Product;
import org.example.backend.services.ProductService;
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
    public Product addProduct(@RequestBody ProductDto productDto) {
        return productService.saveProduct(productDto);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    @PutMapping(path = {"{id}/update", "{id}"})
    public Product update(@PathVariable String id, @RequestBody ProductDto product) {
        return productService.updateProduct(product, id);
    }

}
