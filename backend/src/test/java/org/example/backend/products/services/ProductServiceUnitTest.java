package org.example.backend.products.services;

import org.example.backend.products.dto.ProductDto;
import org.example.backend.products.models.Product;
import org.example.backend.products.models.ProductNotFoundException;
import org.example.backend.products.repositories.ProductRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

        ProductDto productDto = new ProductDto("TestProduct1");
        Product productToSave = new Product("1", productDto.name());
        when(productRepository.save(productToSave)).thenReturn(productToSave);
        when(idService.randomId()).thenReturn(productToSave.id());

        Product actual = productService.saveProduct(productDto);

        Product expected = new Product("1", productDto.name());
        verify(productRepository).save(productToSave);
        verify(idService).randomId();

        assertEquals(expected, actual);
    }

    @Test
    void getProduct_Test_whenProductExists_thenReturnProduct() {

        Product product = new Product("1", "TestProduct1");
        when(productRepository.findById("1")).thenReturn(Optional.of(product));

        Product actual = productService.getProductById("1");

        Product expected = new Product("1", "TestProduct1");
        verify(productRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getProduct_Test_whenProductDoesNotExists_thenThrow() {

        when(productRepository.findById("1")).thenReturn(Optional.empty());
     
        assertThrows(ProductNotFoundException.class, () -> productService.getProductById("1"));
        verify(productRepository).findById("1");
    }
}

