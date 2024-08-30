package org.example.backend.products.services;

import org.example.backend.products.models.Product;
import org.example.backend.products.repositories.ProductRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ProductServiceUnitTest {

    private final ProductRepository productRepository = mock(ProductRepository.class);
    private final ProductService productService = new ProductService(productRepository);

    @Test
    void getAllProducts_Test() {

        List<Product> allProducts = List.of(
                new Product("1", "Product 1"),
                new Product("2", "Product 2")
        );

        List<Product> expectedProducts = List.of(
                new Product("1", "Product 1"),
                new Product("2", "Product 2")
        );

        when(productRepository.findAll()).thenReturn(allProducts);
        List<Product> actualProducts = productService.getAllProducts();

        verify(productRepository).findAll();
        assertEquals(expectedProducts, actualProducts);
    }

    @Test
    void getAllBooks_WhenEmpty_ReturnsEmptyList() {
        List<Product> actualBooks = productService.getAllProducts();
        List<Product> expectedBooks = new ArrayList<>();

        assertEquals(expectedBooks, actualBooks);
    }

}