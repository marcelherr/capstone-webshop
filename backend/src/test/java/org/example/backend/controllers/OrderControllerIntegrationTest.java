package org.example.backend.controllers;

import org.example.backend.models.Order;
import org.example.backend.models.Product;
import org.example.backend.repositories.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    OrderRepository orderRepository;

    @Test
    void getAllOrders_Test_When_DbEmpty_Then_returnEmptyArray() throws Exception {

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void addOrderTest_whenNewOrderExists_thenReturnNewOrder() throws Exception {

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                     {
                                         "orderDateTime": "2024-09-12T10:30:00",
                                         "products": [
                                             {
                                                 "name": "TestProduct1",
                                                 "price": 10.0,
                                                 "description": "Test description 1"
                                             }
                                         ]
                                     }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.products[0].name").value("TestProduct1"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getOrderById_Test_whenIdExists() throws Exception {

        Product product = new Product("1", "TestProduct1", 10.0, "Test description 1");
        Order order = new Order("1", LocalDateTime.of(2024, 9, 12, 10, 30), List.of(product), 90);
        orderRepository.save(order);

        mockMvc.perform(get("/api/orders/1"))

                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "1",
                            "orderDateTime": "2024-09-12T10:30:00",
                            "products": [
                                {
                                    "name": "TestProduct1",
                                    "price": 10.0,
                                    "description": "Test description 1"
                                }
                            ]
                        }
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getOrderById_Test_whenIdDoesNotExist() throws Exception {

        mockMvc.perform(get("/api/orders/1"))

                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                        {
                          "message":"No order found with id: 1",
                          "statusCode":404
                        }
                        """));
    }


    @Test
    @WithMockUser
    void deleteOrder_Test() throws Exception {

        Product product = new Product("1", "TestProduct1", 10.0, "Test description 1");
        Order order = new Order("1", LocalDateTime.of(2024, 9, 12, 10, 30), List.of(product), 90);
        orderRepository.save(order);

        mockMvc.perform(delete("/api/orders/1"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

}