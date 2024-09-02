package org.example.backend.products.services;

import org.example.backend.products.dto.ProductDto;
import org.example.backend.products.models.Product;
import org.example.backend.products.repositories.ProductRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ProductServiceUnitTest {

    private final ProductRepository productRepository = mock(ProductRepository.class);
    private final IdService idService = mock(IdService.class);
    private final ProductService productService = new ProductService(productRepository, idService);

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
    void getAllProducts_WhenEmpty_ReturnsEmptyList() {
        List<Product> actualProducts = productService.getAllProducts();
        List<Product> expectedProducts = new ArrayList<>();

        assertEquals(expectedProducts, actualProducts);
    }

    @Test
    void addProductTest_whenNewProductAsInput_thenReturnNewProduct() {

        // GIVEN
        ProductDto productDto = new ProductDto("TestProduct1");
        Product productToSave = new Product("1", productDto.name());
        when(productRepository.save(productToSave)).thenReturn(productToSave);
        when(idService.randomId()).thenReturn(productToSave.id());

        // WHEN
        Product actual = productService.saveProduct(productDto);

        // THEN
        Product expected = new Product("1", productDto.name());
        verify(productRepository).save(productToSave);
        verify(idService).randomId();

        assertEquals(expected, actual);
    }
}

