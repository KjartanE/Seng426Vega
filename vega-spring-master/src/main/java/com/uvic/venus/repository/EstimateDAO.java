package com.uvic.venus.repository;

import com.uvic.venus.model.Estimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimateDAO extends JpaRepository<Estimate, String> {}
