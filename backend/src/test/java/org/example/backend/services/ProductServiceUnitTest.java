package org.example.backend.services;

import org.example.backend.dto.ProductDto;
import org.example.backend.models.Product;
import org.example.backend.models.ProductNotFoundException;
import org.example.backend.repositories.ProductRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceUnitTest {

    private final ProductRepository productRepository = mock(ProductRepository.class);
    private final IdService idService = Mockito.mock(IdService.class);
    private final ProductService productService = new ProductService(productRepository, idService);

    @Test
    void getAllProducts_Test() {

        List<Product> allProducts = List.of(
                new Product("1", "Product 1", 1.0, "description1"),
                new Product("2", "Product 2", 1.5, "description2")
        );

        List<Product> expectedProducts = List.of(
                new Product("1", "Product 1", 1.0, "description1"),
                new Product("2", "Product 2", 1.5, "description2")
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

        ProductDto productDto = new ProductDto("TestProduct1", 1.0, "description1");
        Product productToSave = new Product("1", productDto.name(), productDto.price(), productDto.description());
        when(productRepository.save(productToSave)).thenReturn(productToSave);
        when(idService.randomId()).thenReturn(productToSave.id());

        Product actual = productService.saveProduct(productDto);

        Product expected = new Product("1", productDto.name(), productDto.price(), productDto.description());
        verify(productRepository).save(productToSave);
        verify(idService).randomId();

        assertEquals(expected, actual);
    }

    @Test
    void getProduct_Test_whenProductExists_thenReturnProduct() {

        Product product = new Product("1", "TestProduct1", 1.0, "description1");
        when(productRepository.findById("1")).thenReturn(Optional.of(product));

        Product actual = productService.getProductById("1");

        Product expected = new Product("1", "TestProduct1", 1.0, "description1");
        verify(productRepository).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getProduct_Test_whenProductDoesNotExists_thenThrow() {

        when(productRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.getProductById("1"));
        verify(productRepository).findById("1");
    }

    @Test
    void testUpdateProduct_Success() {

        String id = "1";
        Product existingProduct = new Product(id, "TestProduct1", 1.0, "description1");
        ProductDto updatedProductDto = new ProductDto("TestProduct2", 2.0, "description2");
        Product updatedProduct = new Product("1", "TestProduct2", 2.0, "description2");

        when(productRepository.findById(id)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(updatedProduct)).thenReturn(updatedProduct);

        Product result = productService.updateProduct(updatedProductDto, id);

        assertNotNull(result);
        assertEquals(updatedProduct, result);
        verify(productRepository).findById(id);
        verify(productRepository).save(updatedProduct);
    }

    @Test
    void testUpdateProduct_ProductNotFound() {

        String id = "1";
        ProductDto updatedProductDto = new ProductDto("TestProduct", 1.0, "description1");
        Product updatedProduct = new Product("1", "TestProduct", 1.0, "description1");

        when(productRepository.findById(id)).thenReturn(Optional.empty());

        ProductNotFoundException thrown = assertThrows(
                ProductNotFoundException.class,
                () -> productService.updateProduct(updatedProductDto, id)
        );
        assertEquals("No product found with id: " + id, thrown.getMessage());
        verify(productRepository).findById(id);
        verify(productRepository, never()).save(updatedProduct);
    }
}

