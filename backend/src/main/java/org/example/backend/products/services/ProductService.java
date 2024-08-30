package org.example.backend.products.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.products.dto.ProductDto;
import org.example.backend.products.models.Product;
import org.example.backend.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final IdService idService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(ProductDto productDto) {
        Product productToSave = new Product(
                idService.randomId(),
                productDto.name()
        );
        return productRepository.save(productToSave);
    }

}
