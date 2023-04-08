package com.app.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.service.AdminService;
@SpringBootTest
public class AdminServiceTest {
    @Autowired
  public AdminService adminService;
    @Test
    public void getCustomers() {
        System.out.println(adminService.getAllCustomers());
        assertNotEquals(5, adminService.getAllCustomers().size());
        
    }
    @Test
    public void getCustomerPolicies() {
       assertEquals(1, adminService.getMyCustomerPolicies(1).size());
    }
    @Test
    public void getAgents() {
        assertEquals(12, adminService.getAllAgents().size());
    }

}
