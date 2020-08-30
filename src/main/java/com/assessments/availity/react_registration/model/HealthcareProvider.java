package com.assessments.availity.react_registration.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Healthcare_Provider")
public class HealthcareProvider {
	
	public HealthcareProvider() {}
 	
	public HealthcareProvider(Integer npiNumber) {
		this.npiNumber = npiNumber;
	}

	@Id
	private Integer npiNumber;
	
	private String firstName;

	private String lastName;

	private String businessAddress;

	private String telephoneNumber;

	private String emailAddress;

	public Integer getNpiNumber() {
		return npiNumber;
	}

	public void setNpiNumber(Integer npiNumber) {
		this.npiNumber = npiNumber;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	public String getTelephoneNumber() {
		return telephoneNumber;
	}

	public void setTelephoneNumber(String telephoneNumber) {
		this.telephoneNumber = telephoneNumber;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	@Override
	public String toString() {
		return "HealthcareProvider [npiNumber=" + npiNumber + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", businessAddress=" + businessAddress + ", telephoneNumber=" + telephoneNumber + ", emailAddress="
				+ emailAddress + "]";
	}

}
