package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.AdminApplicationResponse;
import com.airecruitx.airecruitx_backend.dto.AdminDashboardResponse;
import com.airecruitx.airecruitx_backend.dto.AdminJobResponse;
import com.airecruitx.airecruitx_backend.dto.AdminUserResponse;
import com.airecruitx.airecruitx_backend.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(
            AdminService adminService) {

        this.adminService = adminService;
    }

    // =========================================================
    // ADMIN DASHBOARD
    // =========================================================

    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {

        return adminService.getDashboard();
    }

    // =========================================================
    // ALL USERS
    // =========================================================

    @GetMapping("/users")
    public List<AdminUserResponse> getAllUsers() {

        return adminService.getAllUsers();
    }

    // =========================================================
    // ALL JOBS
    // =========================================================

    @GetMapping("/jobs")
    public List<AdminJobResponse> getAllJobs() {

        return adminService.getAllJobs();
    }

    // =========================================================
    // ALL APPLICATIONS
    // =========================================================

    @GetMapping("/applications")
    public List<AdminApplicationResponse>
    getAllApplications() {

        return adminService.getAllApplications();
    }
}