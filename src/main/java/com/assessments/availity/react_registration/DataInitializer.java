package com.assessments.availity.react_registration;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.assessments.availity.react_registration.model.HealthcareProvider;
import com.assessments.availity.react_registration.model.HealthcareProviderRepository;

@Component
public class DataInitializer implements CommandLineRunner  {

	private final HealthcareProviderRepository repository;

    public DataInitializer(HealthcareProviderRepository repository) {
        this.repository = repository;
    }
	
	@Override
	public void run(String... args) throws Exception {
		
        Stream.of(345674, 587651, 987654).forEach(npiNumber ->
                repository.save(new HealthcareProvider(npiNumber)));	
        
        repository.findAll().forEach(System.out::println);
        
	}
	
}
