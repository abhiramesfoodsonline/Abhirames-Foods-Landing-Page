package com.admin.backend.services;

import com.admin.backend.models.PageViewModel;
import com.admin.backend.repositories.PageViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PageViewService {
    @Autowired
    private PageViewRepository pageViewRepository;

    public void track(String path) {
        PageViewModel view = new PageViewModel();
        view.setPath(path);
        view.setViewedAt(LocalDateTime.now());
        pageViewRepository.save(view);
    }

    public long getWeeklyViews() {
        return pageViewRepository.countByViewedAtAfter(
                LocalDateTime.now().minusDays(7)
        );
    }
}