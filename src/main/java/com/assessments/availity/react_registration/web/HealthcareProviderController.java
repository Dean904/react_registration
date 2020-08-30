package com.assessments.availity.react_registration.web;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assessments.availity.react_registration.model.HealthcareProvider;
import com.assessments.availity.react_registration.model.HealthcareProviderRepository;

@RestController
@RequestMapping("/api")
public class HealthcareProviderController {

	private static final Logger log = LoggerFactory.getLogger(HealthcareProviderController.class);
	
    private HealthcareProviderRepository healthcareProviderRepository;

    public HealthcareProviderController(HealthcareProviderRepository healthcareProviderRepository) {
        this.healthcareProviderRepository = healthcareProviderRepository;
    }
    
    /**
     * See all providers @ http://localhost:8080/api/providers
     * 
     */
    @GetMapping("/providers")
    public Collection<HealthcareProvider> providers() {
        return healthcareProviderRepository.findAll();
    }
    
    @GetMapping("/provider/{id}")
    public ResponseEntity<?> getHealthcareProvider(@PathVariable Integer id) {
        log.info("Request to get provider: {}", id);
        Optional<HealthcareProvider> provider = healthcareProviderRepository.findById(id);
        return provider.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping("/provider")
    public ResponseEntity<HealthcareProvider> createProvider(@Valid @RequestBody HealthcareProvider provider) throws URISyntaxException {
        log.info("Request to create provider: {}", provider);
        HealthcareProvider result = healthcareProviderRepository.save(provider);
        return ResponseEntity.created(new URI("/api/provider/" + result.getNpiNumber()))
                .body(result);
    }
    
    @PutMapping("/provider/{id}")
    public ResponseEntity<HealthcareProvider> updateProvider(@Valid @RequestBody HealthcareProvider provider) {
        log.info("Request to update provider: {}", provider);
        HealthcareProvider result = healthcareProviderRepository.save(provider);
        return ResponseEntity.ok().body(result);
    }
    
    @DeleteMapping("/provider/{id}")
    public ResponseEntity<?> deleteProvider(@PathVariable Integer id) {
        log.info("Request to delete provider: {}", id);
        healthcareProviderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}
