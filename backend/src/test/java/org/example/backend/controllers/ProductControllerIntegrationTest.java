package org.example.backend.controllers;

import org.example.backend.models.Product;
import org.example.backend.repositories.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class ProductControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ProductRepository productRepository;

    @Test
    void getAllProducts_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));

    }

    @Test
    @DirtiesContext
    void addProductTest_whenNewProductExists_thenReturnNewProduct() throws Exception {

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                     {
                                         "name": "TestProduct1"
                                     }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("TestProduct1"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getProductById_Test_whenIdExists() throws Exception {

        productRepository.save(new Product("1", "TestProduct1", 1.0, "description1"));

        mockMvc.perform(get("/api/products/1"))

                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                             "id": "1",
                             "name": "TestProduct1" ,
                             "price": 1.0,
                             "description": "description1" 
                        }
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getProductById_Test_whenIdDoesNotExists() throws Exception {

        mockMvc.perform(get("/api/products/1"))

                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message":"No product found with id: 1",
                          "statusCode":404
                        }
                        """));
    }


    @Test
    @WithMockUser
    void deleteProduct() throws Exception {

        productRepository.save(new Product("1", "TestProduct1", 1.0, "description1"));

        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @DirtiesContext
    @Test
    void updateProduct_Test_When_IdMatches() throws Exception {

        productRepository.save(new Product("1", "TestProduct1", 1.0, "description1"));

        mockMvc.perform(put("/api/products/1/update")
                        .contentType("application/json")
                        .content("""
                                {
                                   "name": "TestProduct2",
                                   "price": 2.0,
                                   "description": "description2"
                                }
                                """))

                .andExpect(status().isOk())
                .andExpect(content().json("""
                        { "id": "1",
                           "name": "TestProduct2",
                           "price": 2.0,
                           "description": "description2"
                        }
                        """));
    }
}