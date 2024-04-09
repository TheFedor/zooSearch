package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.ServiceInfrastructureAvatarsEntity;
import com.example.zoomapsearchadntest.entities.ServiceInfrastructureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceInfrastructureAvatarsRepository extends JpaRepository<ServiceInfrastructureAvatarsEntity, Long> {
}
