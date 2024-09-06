package org.example.backend.products.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.products.dto.ProductDto;
import org.example.backend.products.models.Product;
import org.example.backend.products.models.ProductNotFoundException;
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
                productDto.name(),
                productDto.price(),
                productDto.description()
        );
        return productRepository.save(productToSave);
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No product found with id: " + id));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(ProductDto updateProduct, String id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("No product found with id: " + id))
                .withName(updateProduct.name())
                .withPrice(updateProduct.price())
                .withDescription(updateProduct.description());
        return productRepository.save(product);
    }

}
