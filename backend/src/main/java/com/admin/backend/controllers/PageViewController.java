package com.admin.backend.controllers;

import com.admin.backend.services.PageViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/page-views")
public class PageViewController {
    @Autowired
    private PageViewService pageViewService;

    // Frontend calls this every time a page loads
    @PostMapping("/track")
    public ResponseEntity<Void> track(@RequestParam String path) {
        pageViewService.track(path);
        return ResponseEntity.ok().build();
    }

    // Frontend calls this to get the count
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("weeklyViews", pageViewService.getWeeklyViews());
        return ResponseEntity.ok(stats);
    }
}