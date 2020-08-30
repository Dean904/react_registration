package com.assessments.availity.react_registration.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthcareProviderRepository extends JpaRepository<HealthcareProvider, Integer> {

	HealthcareProvider findByNpiNumber(Integer npiNumber);
	
}
